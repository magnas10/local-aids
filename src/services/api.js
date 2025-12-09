// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
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
  
  // Handle unauthorized errors
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionally redirect to login
    // window.location.href = '/login';
  }

  return response;
};

// Parse response and handle errors
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.message || data.errors?.[0]?.msg || 'Something went wrong';
    throw new Error(error);
  }
  
  return data;
};

// ============ AUTH API ============
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
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
  getAll: async (page = 1, limit = 10) => {
    const response = await authFetch(`/users?page=${page}&limit=${limit}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await authFetch(`/users/${id}`);
    return handleResponse(response);
  },

  updateProfile: async (userData) => {
    const response = await authFetch('/users/profile', {
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
    const response = await fetch(`${API_BASE_URL}/gallery?${queryString}`);
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
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // FormData for file upload
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

// Export all APIs
export default {
  auth: authAPI,
  users: usersAPI,
  events: eventsAPI,
  donations: donationsAPI,
  messages: messagesAPI,
  contact: contactAPI,
  gallery: galleryAPI,
  partners: partnersAPI,
};
