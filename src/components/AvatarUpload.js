import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAvatar, deleteAvatar } from '../services/avatarAPI';
import './AvatarUpload.css';

function AvatarUpload({ user, updateUser, profileData }) {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

      // Update user in context
      if (updateUser && response.user) {
        updateUser(response.user);
      }

      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Avatar upload error:', error);
      
      // Check if it's a token expiration error
      if (error.message.includes('token') || error.message.includes('authorized') || error.message.includes('invalid')) {
        alert('Your session has expired. Please log in again.');
        // Clear expired token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login
        navigate('/login');
      } else {
        alert(error.message || 'Failed to upload avatar');
      }
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

      
      // Check if it's a token expiration error
      if (error.message.includes('token') || error.message.includes('authorized') || error.message.includes('invalid')) {
        alert('Your session has expired. Please log in again.');
        // Clear expired token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login
        navigate('/login');
      } else {
        alert(error.message || 'Failed to delete avatar');
      }
      console.log('Avatar delete successful:', response);

      // Update user in context
      if (updateUser && response.user) {
        updateUser(response.user);
      }

      alert('Avatar deleted successfully!');
    } catch (error) {
      console.error('Avatar delete error:', error);
      alert(error.message || 'Failed to delete avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="profile-avatar-large">
      <img 
        src={
          profileData.avatar 
            ? (profileData.avatar.startsWith('http') ? profileData.avatar : profileData.avatar)
            : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        } 
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