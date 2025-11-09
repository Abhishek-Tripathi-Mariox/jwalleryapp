import { API_BASE_URL } from '../constants/api';
import { getTokenStorage } from './tokenStorage';

// Add a new address
export const addUserAddress = async (addressData) => {
    try {
        const token = await getTokenStorage();
        if (!token) throw new Error('No auth token found');
        const response = await fetch(`${API_BASE_URL}/user/address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
        });
        const data = await response.json();
        if (data.code === 1) {
            return { success: true, message: data.message || 'Address added successfully.' };
        } else {
            return { success: false, message: data.message || 'Failed to add address.' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Network error' };
    }
};

// List all addresses
export const listUserAddresses = async () => {
    try {
        const token = await getTokenStorage();
        if (!token) throw new Error('No auth token found');
        const response = await fetch(`${API_BASE_URL}/user/address`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.code === 1) {
            return { success: true, addresses: data.data.UserAddress || [], message: data.message };
        } else {
            return { success: false, addresses: [], message: data.message || 'Failed to fetch addresses.' };
        }
    } catch (error) {
        return { success: false, addresses: [], message: error.message || 'Network error' };
    }
};

// Select an address
export const selectUserAddress = async (addressId) => {
    try {
        const token = await getTokenStorage();
        if (!token) throw new Error('No auth token found');
        const response = await fetch(`${API_BASE_URL}/user/address/${addressId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.code === 1) {
            return { success: true, message: data.message || 'Address selected.' };
        } else {
            return { success: false, message: data.message || 'Failed to select address.' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Network error' };
    }
};

// Delete an address
export const deleteUserAddress = async (addressId) => {
    try {
        const token = await getTokenStorage();
        if (!token) throw new Error('No auth token found');
        const response = await fetch(`${API_BASE_URL}/user/address/${addressId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.code === 1) {
            return { success: true, message: data.message || 'Address deleted.' };
        } else {
            return { success: false, message: data.message || 'Failed to delete address.' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Network error' };
    }
};