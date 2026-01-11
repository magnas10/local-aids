import React, { useState, useRef } from 'react';
import { uploadAvatar, deleteAvatar } from '../services/avatarAPI';
import './AvatarUpload.css';

function AvatarUpload({ user, updateUser, profileData }) {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (20MB limit)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert('File size must be less than 20MB');
      return;
    }

    try {
      setUploadingAvatar(true);
      console.log('Uploading avatar:', file.name);

      const response = await uploadAvatar(file);
      console.log('Avatar upload successful:', response);

      // Update user in context with the new avatar
      if (updateUser && response.user) {
        // Force update by creating new user object
        const updatedUser = { ...response.user };
        updateUser(updatedUser);
        
        // Force re-render by updating the avatar timestamp
        window.location.reload();
      }

      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Avatar upload error:', error);
      alert(error.message || 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle avatar deletion
  const handleDeleteAvatar = async () => {
    if (!window.confirm('Are you sure you want to delete your profile photo?')) {
      return;
    }

    try {
      setUploadingAvatar(true);
      console.log('Deleting avatar');

      const response = await deleteAvatar();
      console.log('Avatar delete successful:', response);

      // Update user in context
      if (updateUser && response.user) {
        const updatedUser = { ...response.user };
        updateUser(updatedUser);
        
        // Force re-render
        window.location.reload();
      }

      alert('Avatar deleted successfully!');
    } catch (error) {
      console.error('Avatar delete error:', error);
      alert(error.message || 'Failed to delete avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Get the correct avatar URL
  const getAvatarUrl = () => {
    if (!profileData.avatar) {
      return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
    }
    
    // If it's already a full URL, use it
    if (profileData.avatar.startsWith('http')) {
      return profileData.avatar;
    }
    
    // If it's a relative path, construct the full URL
    if (profileData.avatar.startsWith('/uploads/')) {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      return `${API_BASE_URL}${profileData.avatar}?t=${timestamp}`;
    }
    
    return profileData.avatar;
  };

  return (
    <div className="profile-avatar-large">
      <img 
        src={getAvatarUrl()} 
        alt={profileData.name} 
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
        }}
      />
      <div className="avatar-actions">
        <button 
          className="avatar-edit-btn" 
          aria-label="Edit profile photo"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingAvatar}
        >
          {uploadingAvatar ? '⏳' : '📷'}
        </button>
        {profileData.avatar && (
          <button 
            className="avatar-delete-btn" 
            aria-label="Delete profile photo"
            onClick={handleDeleteAvatar}
            disabled={uploadingAvatar}
          >
            🗑️
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        style={{ display: 'none' }}
      />
      {profileData.verified && <span className="verified-badge" title="Verified Volunteer">✓</span>}
    </div>
  );
}

export default AvatarUpload;