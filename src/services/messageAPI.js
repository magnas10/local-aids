// Message API service functions
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Get auth token
const getAuthToken = () => localStorage.getItem('token');

// Get all conversations
export const getConversations = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/messages/conversations`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch conversations');
  }

  return response.json();
};

// Get messages in a conversation
export const getConversationMessages = async (conversationId, page = 1) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/messages/${conversationId}?page=${page}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch messages');
  }

  return response.json();
};

// Create a new conversation
export const createConversation = async (type, participantIds, name = null, description = null) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/messages/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      type,
      participantIds,
      name,
      description
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create conversation');
  }

  return response.json();
};

// Send a message
export const sendMessage = async (conversationId, content, replyToId = null) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      conversationId,
      content,
      replyToId
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send message');
  }

  return response.json();
};

// Search users
export const searchUsers = async (query) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/messages/users/search?query=${encodeURIComponent(query)}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to search users');
  }

  return response.json();
};

// Get unread message count
export const getUnreadCount = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/messages/conversations/unread/count`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch unread count');
  }

  return response.json();
};
