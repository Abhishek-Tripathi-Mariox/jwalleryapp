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