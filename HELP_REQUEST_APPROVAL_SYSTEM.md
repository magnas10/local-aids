# Help Request Approval System Documentation

## Overview
The help request system now includes a complete admin approval workflow with automatic user notifications via direct messages.

## Status Flow

### 1. **Pending** (Default)
- All new help requests start with status: `pending`
- **NOT visible** in public Events section
- Only visible to admins in Admin Request Management
- **Action**: Admin must approve or reject

### 2. **Approved** ✅
- Request has been reviewed and approved by admin
- **VISIBLE** in public Events section
- Users can volunteer to help
- **Action**: Can be matched, marked in-progress, or completed

### 3. **Rejected** ❌
- Request denied by admin
- **NOT visible** in public Events section
- Cannot be volunteered for
- **Action**: Can be deleted permanently

### 4. **Cancelled**
- Request cancelled by user or admin
- **NOT visible** in public Events section
- **Action**: Can be deleted permanently

### 5. **Deleted** 🗑️
- Request permanently removed from database
- **User notification**: If admin deletes, user receives direct message
- Cannot be recovered

## Admin Workflow

### Step 1: Review Pending Requests
1. Go to Admin → Request Management
2. View all pending requests (default filter)
3. Review request details, urgency, location

### Step 2: Approve or Reject
**Approve Button (✓ Approve)**
- Changes status from `pending` → `approved`
- Request becomes visible in Events section
- Volunteers can now see and respond to it

**Reject Button (✗ Reject)**
- Changes status from `pending` → `rejected`
- Request remains hidden from Events
- User can see status in their "My Requests" page

### Step 3: Delete if Necessary
**Delete Button (🗑️ Delete)**
- Permanently removes request from database
- **Automatic notification**:
  - Creates direct message conversation with user
  - Sends system message explaining deletion
  - User can reply to admin for questions

## Public Events Section

### What Shows
**ONLY approved help requests appear**
- Status must be exactly: `approved`
- Pending requests are hidden until admin approves
- Rejected/cancelled requests never show

### What's Hidden
- ❌ Pending (awaiting approval)
- ❌ Rejected (denied by admin)
- ❌ Cancelled (user/admin cancelled)
- ❌ Deleted (permanently removed)

## User Notifications

### When Admin Deletes a Post
1. **Direct Message Created**:
   - System creates 1-on-1 conversation between admin and user
   - If conversation exists, it's reused

2. **System Message Sent**:
   ```
   Your help request "[helpType] - [description preview]" has been deleted 
   by an administrator. If you have any questions about this action, 
   please contact support.
   ```

3. **User Can View**:
   - User sees message in their Messages inbox
   - Can reply directly to admin
   - Can ask for clarification

### Notification Process
- **Automatic**: No admin action needed
- **Direct**: Message goes only to request creator
- **Traceable**: Conversation history preserved
- **Two-way**: User can respond with questions

## Database Changes

### HelpRequest Model
```javascript
status: {
  type: DataTypes.STRING,
  defaultValue: 'pending',
  validate: {
    isIn: [['pending', 'approved', 'rejected', 'matched', 'in-progress', 'completed', 'cancelled']]
  }
}
```

### New Statuses Added
- `approved` - Admin approved, visible in events
- `rejected` - Admin rejected, hidden from events

### Status Transitions
```
pending → approved → matched → in-progress → completed
pending → rejected (terminal)
any → cancelled (terminal)
any → deleted (removed from DB)
```

## API Endpoints

### GET /api/help-requests
**Query Params**:
- `showAsEvent=true` → Returns ONLY `approved` requests
- `status=pending` → Returns pending requests (admin only)

### PUT /api/help-requests/:id/status
**Body**: `{ "status": "approved" | "rejected" | ... }`
**Access**: Admin only
**Action**: Updates request status

### DELETE /api/help-requests/:id
**Access**: Creator or Admin
**Action**: 
- Permanently deletes request
- If admin deletes someone else's post → sends DM notification
**Response**: `{ "message": "...", "notificationSent": true/false }`

## Frontend Components

### Admin Request Management
**File**: `src/pages/admin/AdminRequestManagement.js`

**Features**:
- Filter by status (pending, approved, rejected, etc.)
- Approve/Reject buttons for pending requests
- Delete button with confirmation
- Color-coded status badges

**Status Colors**:
- 🟡 Pending: #ffc107 (yellow)
- 🟢 Approved: #28a745 (green)
- 🔴 Rejected: #dc3545 (red)
- 🔵 Matched: #17a2b8 (cyan)
- ⚪ Completed: #28a745 (green)
- ⚫ Cancelled: #dc3545 (red)

### Events Page
**File**: `src/pages/Events.js`

**Filtering**:
```javascript
const activeRequests = response.helpRequests.filter(
  request => request.status === 'approved'
);
```

Only approved requests are displayed to public.

## User Experience

### For Request Creators
1. **Submit request** → Status: Pending
2. **Wait for admin review** → Not visible in events yet
3. **Admin approves** → Appears in events, volunteers can respond
4. **Admin rejects** → See status in "My Requests", can delete and resubmit
5. **Admin deletes** → Receive direct message notification

### For Volunteers
1. **Browse Events** → See only approved requests
2. **Select opportunity** → Contact or volunteer
3. **Trust** → All visible requests have been vetted by admins

### For Admins
1. **Review queue** → See all pending requests
2. **Make decision** → Approve or reject based on guidelines
3. **Manage lifecycle** → Update status, delete if necessary
4. **Communicate** → Automatic messages when deleting posts

## Security & Trust

### Why Approval System?
- **Quality Control**: Ensures legitimate requests
- **Safety**: Prevents spam or malicious posts
- **Trust**: Volunteers know requests are verified
- **Moderation**: Admins can remove inappropriate content

### Best Practices
1. **Review quickly**: Don't let pending requests wait
2. **Be transparent**: Use reject for clear violations
3. **Communicate**: Delete + message explains reasoning
4. **Track patterns**: Monitor for repeat issues

## Testing the System

### Test Scenario 1: Approval Flow
1. Create help request as user
2. Login as admin
3. Go to Request Management
4. Filter by "Pending Approval"
5. Click "✓ Approve" button
6. Visit Events page → Request should now be visible

### Test Scenario 2: Rejection Flow
1. Have pending request
2. Admin clicks "✗ Reject"
3. Visit Events page → Request should NOT be visible
4. Login as user → Check "My Requests" → See rejected status

### Test Scenario 3: Deletion with Notification
1. Admin deletes user's request
2. Login as that user
3. Go to Messages
4. See new message from admin about deletion
5. Can reply to admin for questions

## Troubleshooting

### Request Not Showing in Events
**Check**:
- Status is exactly "approved" (not "pending")
- showAsEvent = true in database
- Frontend filter is correct
- Browser cache cleared

### Notification Not Sent
**Check**:
- User has createdBy field set (logged in when creating)
- Conversation/Message models exist
- Admin user is authenticated
- Check server logs for errors

### Status Not Updating
**Check**:
- Admin role verified
- JWT token valid
- Status value in allowed list
- Database sync completed

## Future Enhancements

### Potential Additions
1. **Email notifications** when status changes
2. **Rejection reasons** from admin dropdown
3. **Auto-approve** for trusted users
4. **Expiry** for old pending requests
5. **Approval comments** visible to user
6. **Bulk actions** for multiple requests

## Summary

✅ **Pending requests** are hidden until approved  
✅ **Only approved requests** show in events  
✅ **Rejected/cancelled** never show publicly  
✅ **Deleted posts** trigger automatic user notification  
✅ **Direct messages** enable admin-user communication  
✅ **Complete audit trail** for all status changes  

This system ensures quality control while maintaining transparent communication with users.
