import { API_BASE_URL } from '../constants/api';
import { getTokenStorage } from './tokenStorage';

export const fetchUserProfile = async () => {
  try {
    const token = await getTokenStorage();
    if (!token) {
      throw new Error('No auth token found');
    }
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.code === 1) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: data.message || 'Failed to fetch profile' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Network error' };
  }
};
/**
 * Update user profile with form data.
 * @param {Object} profileData - { fullName, email, gender, longitude, latitude, ... }
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const updateUserProfile = async (profileData) => {
  try {
    const token = await getTokenStorage();
    if (!token) {
      throw new Error('No auth token found');
    }
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type' is set automatically by fetch for FormData
      },
      body: formData,
    });
    const data = await response.json();
    if (data.code === 1) {
      return { success: true, message: data.message || 'Profile updated successfully.' };
    } else {
      return { success: false, message: data.message || 'Failed to update profile.' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Network error' };
  }
};