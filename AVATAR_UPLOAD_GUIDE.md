# Avatar Upload Troubleshooting Guide

## I've Fixed the Following Issues:

### 1. **Avatar Display Logic**
- Updated `AvatarUpload.js` to check `user.profileImage` first (the actual field from backend)
- Added fallback to `profileData.avatar` for compatibility
- Fixed URL construction for uploaded images

### 2. **State Persistence**
- Added `localStorage.setItem('user', ...)` after successful upload/delete
- Added 500ms delay before page reload to ensure state is saved
- Both upload and delete now properly persist changes

### 3. **Delete Button Visibility**
- Fixed condition to check both `user.profileImage` and `profileData.avatar`
- Button now shows when you have an uploaded avatar

## How to Test Avatar Upload:

1. **Login to your account** at http://localhost:3000/login

2. **Navigate to Profile** page

3. **Upload Avatar:**
   - Click the camera icon (📷) on your profile picture
   - Select an image file (JPEG, PNG, GIF, or WebP)
   - File must be under 20MB
   - You'll see an alert confirming upload
   - Page will reload automatically showing your new avatar

4. **Delete Avatar:**
   - Click the trash icon (🗑️) next to the camera icon
   - Confirm the deletion
   - Avatar will reset to default

## Common Issues & Solutions:

### Issue: "No file uploaded" error
**Solution:** Make sure you're selecting a valid image file

### Issue: Avatar doesn't show after upload
**Solution:** 
- Check browser console for errors (F12)
- Verify the backend server is running on port 5002
- Check that `/uploads/avatars/` directory exists

### Issue: Upload fails with network error
**Solution:**
- Ensure both servers are running: `npm run dev`
- Frontend should be on port 3000
- Backend should be on port 5002

## Backend Details:

- **Upload Endpoint:** `POST /api/users/avatar`
- **Delete Endpoint:** `DELETE /api/users/avatar`
- **Requires:** JWT authentication (Bearer token)
- **Field Name:** `profileImage` in User model
- **Storage:** `server/uploads/avatars/`
- **Served At:** `http://localhost:5002/uploads/avatars/[filename]`

## Testing from Browser Console:

```javascript
// Check your current user data
console.log(JSON.parse(localStorage.getItem('user')));

// Check your avatar URL
const user = JSON.parse(localStorage.getItem('user'));
console.log('Avatar:', user?.profileImage);
```

## File Upload Flow:

1. User clicks camera icon → opens file picker
2. File selected → `handleAvatarUpload()` validates file
3. Valid file → creates FormData with file
4. Sends POST to `/api/users/avatar` with auth header
5. Backend saves to `uploads/avatars/` folder
6. Backend updates `user.profileImage` in database
7. Returns updated user object
8. Frontend updates context and localStorage
9. Page reloads to show new avatar

## Need More Help?

Check browser console (F12 → Console tab) for error messages and share them for specific troubleshooting.
