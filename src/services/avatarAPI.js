// Avatar upload utility functions
import { authAPI } from './api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Parse response and handle errors
const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error('Failed to parse JSON response:', err);
    throw new Error('Server response was not valid JSON');
  }
  
  console.log('Response data:', data);
  
  if (!response.ok) {
    const error = data.message || data.errors?.[0]?.msg || `HTTP ${response.status}: ${response.statusText}`;
    console.error('API Error:', error);
    throw new Error(error);
  }
  
  return data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/users/avatar`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return handleResponse(response);
};

export const deleteAvatar = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/users/avatar`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};