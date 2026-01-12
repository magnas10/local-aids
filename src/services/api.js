// API Configuration
// DIRECT CONNECTION FIX: Use full URL to bypass proxy issues
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
  console.log('Making API call to:', `${API_BASE_URL}${url}`);
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  console.log('API response status:', response.status);
  
  // Handle unauthorized errors
  if (response.status === 401) {
    console.log('Unauthorized - removing token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionally redirect to login
    // window.location.href = '/login';
  }

  return response;
};

// Parse response and handle errors
const handleResponse = async (response) => {
  // Clone the response so we can read it multiple times if needed
  const responseClone = response.clone();
  
  let data;
  try {
    data = await response.json();
  } catch (err) {
    // When JSON parsing fails, try to read as text from the cloned response
    console.error('Failed to parse JSON response:', err);
    console.error('Response status:', response.status);
    try {
      const rawText = await responseClone.text();
      console.error('Raw response body:', rawText);
      // Surface a more helpful, user-friendly error
      const snippet = rawText ? rawText.slice(0, 1000) : '<empty body>';
      if (snippet.trim().startsWith('<')) {
        // Likely an HTML error page
        throw new Error('Server returned a non-JSON (HTML) response. Please check server logs (server console) for details.');
      }
      throw new Error(`Server response was not valid JSON. Response body: ${snippet}`);
    } catch (readErr) {
      console.error('Failed to read raw response body:', readErr);
      throw new Error('Server response was not valid JSON and response body could not be read.');
    }
  }
  
  console.log('Response data:', data);
  
  if (!response.ok) {
    console.error('Response not ok, status:', response.status);
    let errorMessage = '';
    
    if (data && data.message) {
      errorMessage = data.message;
    } else if (data && data.errors && Array.isArray(data.errors)) {
      errorMessage = data.errors.map(e => e.message || e.msg || JSON.stringify(e)).join('; ');
    } else if (data && data.errors && typeof data.errors === 'object') {
      errorMessage = Object.values(data.errors).map(e => e.message || e).join('; ');
    } else {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
    
    console.error('API Error:', errorMessage);
    const error = new Error(errorMessage);
    error.errors = data && data.errors;
    throw error;
  }
  
  return data;
};

// ============ AUTH API ============
export const authAPI = {
  register: async (userData) => {
    try {
      console.log('AuthAPI register called with:', userData);
      console.log('API URL:', `${API_BASE_URL}/auth/register`);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      console.log('Register response status:', response.status);
      return handleResponse(response);
    } catch (error) {
      console.error('Network error during registration:', error);
      // Only treat as network error if it's actually a fetch/network issue
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure both frontend (port 3000) and backend (port 5001) are running.');
      }
      // Re-throw API errors as-is
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('AuthAPI login called with:', { email: credentials.email });
      console.log('API URL:', `${API_BASE_URL}/auth/login`);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      console.log('Login response status:', response.status);
      return handleResponse(response);
    } catch (error) {
      console.error('Network error during login:', error);
      // Only treat as network error if it's actually a fetch/network issue
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please ensure both frontend (port 3000) and backend (port 5001) are running.');
      }
      // Re-throw API errors (like invalid credentials) as-is
      throw error;
    }
  },

  getMe: async () => {
    const response = await authFetch('/auth/me');
    return handleResponse(response);
  },

  updatePassword: async (passwords) => {
    const response = await authFetch('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await authFetch('/auth/logout', { method: 'POST' });
    return handleResponse(response);
  },
};

// ============ USERS API ============
export const usersAPI = {
  getAll: async (page = 1, limit = 100) => {
    const response = await authFetch(`/users?page=${page}&limit=${limit}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await authFetch(`/users/${id}`);
    return handleResponse(response);
  },

  updateProfile: async (id, userData) => {
    // Use admin update endpoint for admin operations
    const response = await authFetch(`/users/${id}/admin-update`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  updateRole: async (id, role) => {
    const response = await authFetch(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await authFetch(`/users/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },
};

// ============ EVENTS API ============
export const eventsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/events?${queryString}`);
    return handleResponse(response);
  },

  getUpcoming: async (limit = 5) => {
    const response = await fetch(`${API_BASE_URL}/events/upcoming?limit=${limit}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    return handleResponse(response);
  },

  create: async (eventData) => {
    const response = await authFetch('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  },

  update: async (id, eventData) => {
    const response = await authFetch(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await authFetch(`/events/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },

  register: async (id) => {
    const response = await authFetch(`/events/${id}/register`, { method: 'POST' });
    return handleResponse(response);
  },

  cancelRegistration: async (id) => {
    const response = await authFetch(`/events/${id}/register`, { method: 'DELETE' });
    return handleResponse(response);
  },
};

// ============ DONATIONS API ============
export const donationsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await authFetch(`/donations?${queryString}`);
    return handleResponse(response);
  },

  getMyDonations: async () => {
    const response = await authFetch('/donations/my');
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/donations/stats`);
    return handleResponse(response);
  },

  create: async (donationData) => {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/donations`, {
      method: 'POST',
      headers,
      body: JSON.stringify(donationData),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await authFetch(`/donations/${id}`);
    return handleResponse(response);
  },
};

// ============ MESSAGES API ============
export const messagesAPI = {
  getAll: async (folder = 'inbox', page = 1) => {
    const response = await authFetch(`/messages?folder=${folder}&page=${page}`);
    return handleResponse(response);
  },

  getUnreadCount: async () => {
    const response = await authFetch('/messages/unread-count');
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await authFetch(`/messages/${id}`);
    return handleResponse(response);
  },

  send: async (messageData) => {
    const response = await authFetch('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
    return handleResponse(response);
  },

  markAsRead: async (id) => {
    const response = await authFetch(`/messages/${id}/read`, { method: 'PUT' });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await authFetch(`/messages/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },
};

// ============ CONTACT API ============
export const contactAPI = {
  submit: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return handleResponse(response);
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await authFetch(`/contact?${queryString}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await authFetch(`/contact/${id}`);
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await authFetch(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  addNote: async (id, content) => {
    const response = await authFetch(`/contact/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await authFetch(`/contact/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },
};

// ============ GALLERY API ============
export const galleryAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/gallery?${queryString}`, { headers });
    return handleResponse(response);
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/gallery/categories`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`);
    return handleResponse(response);
  },

  upload: async (formData) => {
    const token = getAuthToken();
    console.log('galleryAPI.upload called', {
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'none',
      formDataEntries: Array.from(formData.entries()).map(([key, value]) => ({
        key,
        valueType: typeof value,
        isFile: value instanceof File,
        fileName: value instanceof File ? value.name : undefined
      }))
    });
    
    if (!token) {
      throw new Error('Not logged in. Please login to upload images.');
    }
    
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // FormData for file upload
    });
    
    console.log('Upload response status:', response.status);
    return handleResponse(response);
  },

  approve: async (id) => {
    const response = await authFetch(`/gallery/${id}/approve`, {
      method: 'PUT',
    });
    return handleResponse(response);
  },

  reject: async (id, reason) => {
    const response = await authFetch(`/gallery/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await authFetch(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await authFetch(`/gallery/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },
};

// ============ HELP REQUESTS API ============
export const helpRequestsAPI = {
  submit: async (requestData) => {
    console.log('helpRequestsAPI.submit called with:', requestData);
    try {
      const jsonData = JSON.stringify(requestData);
      console.log('JSON stringified successfully');
      const response = await authFetch('/help-requests', {
        method: 'POST',
        body: jsonData,
      });
      console.log('Help request response received:', response);
      return handleResponse(response);
    } catch (error) {
      console.error('Error in submit:', error);
      throw error;
    }
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await authFetch(`/help-requests?${queryString}`);
    return handleResponse(response);
  },

  getOpportunities: async (limit = 5) => {
    const response = await authFetch(`/help-requests/opportunities?limit=${limit}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await authFetch(`/help-requests/${id}`);
    return handleResponse(response);
  },

  updateStatus: async (id, status, volunteerId = null) => {
    const response = await authFetch(`/help-requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, volunteerId }),
    });
    return handleResponse(response);
  },

  update: async (id, requestData, email) => {
    const response = await authFetch(`/help-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...requestData, email }),
    });
    return handleResponse(response);
  },

  delete: async (id, email) => {
    const response = await authFetch(`/help-requests/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },
};

// ============ PARTNERS API ============
export const partnersAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/partners?${queryString}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/partners/${id}`);
    return handleResponse(response);
  },

  create: async (partnerData) => {
    const response = await authFetch('/partners', {
      method: 'POST',
      body: JSON.stringify(partnerData),
    });
    return handleResponse(response);
  },

  update: async (id, partnerData) => {
    const response = await authFetch(`/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(partnerData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await authFetch(`/partners/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },
};

// Individual function exports for convenience
export const submitHelpRequest = helpRequestsAPI.submit;
export const getHelpRequests = helpRequestsAPI.getAll;
export const getHelpOpportunities = helpRequestsAPI.getOpportunities;
export const updateHelpRequestStatus = helpRequestsAPI.updateStatus;
export const updateHelpRequest = helpRequestsAPI.update;
export const deleteHelpRequest = helpRequestsAPI.delete;

// ============ NOTIFICATIONS API ============
export const notificationsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await authFetch(`/notifications?${queryString}`);
    return handleResponse(response);
  },

  getUnreadCount: async () => {
    const response = await authFetch('/notifications/unread-count');
    return handleResponse(response);
  },

  markAsRead: async (id) => {
    const response = await authFetch(`/notifications/${id}/read`, {
      method: 'PUT'
    });
    return handleResponse(response);
  },

  markAllAsRead: async () => {
    const response = await authFetch('/notifications/mark-all-read', {
      method: 'PUT'
    });
    return handleResponse(response);
  },

  // Admin functions
  create: async (notificationData) => {
    const response = await authFetch('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData)
    });
    return handleResponse(response);
  },

  getAllForAdmin: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await authFetch(`/notifications/admin?${queryString}`);
    return handleResponse(response);
  },

  update: async (id, notificationData) => {
    const response = await authFetch(`/notifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(notificationData)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await authFetch(`/notifications/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  }
};

// User management convenience exports
export const getAllUsers = usersAPI.getAll;
export const deleteUser = usersAPI.delete;
export const updateUserProfile = usersAPI.updateProfile;

// Notification convenience exports
export const getNotifications = notificationsAPI.getAll;
export const getUnreadNotificationCount = notificationsAPI.getUnreadCount;
export const markNotificationAsRead = notificationsAPI.markAsRead;
export const markAllNotificationsAsRead = notificationsAPI.markAllAsRead;
export const createNotification = notificationsAPI.create;
export const getAllNotificationsForAdmin = notificationsAPI.getAllForAdmin;
export const updateNotification = notificationsAPI.update;
export const deleteNotification = notificationsAPI.delete;

const api = {
  auth: authAPI,
  users: usersAPI,
  events: eventsAPI,
  donations: donationsAPI,
  messages: messagesAPI,
  contact: contactAPI,
  gallery: galleryAPI,
  partners: partnersAPI,
  helpRequests: helpRequestsAPI,
  notifications: notificationsAPI,
};

export default api;
