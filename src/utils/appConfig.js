import AsyncStorage from '@react-native-async-storage/async-storage';
import { request } from './api';

const APP_CONFIG_KEY = '@app_config';

/**
 * Fetch app config (API keys) from backend and store locally.
 * Called after login so the app has all required keys securely.
 */
export const fetchAndStoreAppConfig = async () => {
  try {
    const res = await request('/user/app-config');
    if (res?.code === 1 && res.data) {
      await AsyncStorage.setItem(APP_CONFIG_KEY, JSON.stringify(res.data));
      console.log('App config stored:', Object.keys(res.data));
      return res.data;
    }
  } catch (error) {
    console.log('Failed to fetch app config:', error);
  }
  return null;
};

/**
 * Get stored app config from local storage.
 */
export const getAppConfig = async () => {
  try {
    const config = await AsyncStorage.getItem(APP_CONFIG_KEY);
    return config ? JSON.parse(config) : null;
  } catch {
    return null;
  }
};

/**
 * Get a specific config value.
 * Example: getRazorpayKeyId() -> 'rzp_live_...'
 */
export const getRazorpayKeyId = async () => {
  const config = await getAppConfig();
  return config?.razorpay?.keyId || '';
};

export const getGoogleMapsApiKey = async () => {
  const config = await getAppConfig();
  return config?.googleMaps?.apiKey || '';
};

export const getFirebaseConfig = async () => {
  const config = await getAppConfig();
  return config?.firebase || null;
};

/**
 * Clear stored app config (call on logout).
 */
export const clearAppConfig = async () => {
  try {
    await AsyncStorage.removeItem(APP_CONFIG_KEY);
  } catch {
    // ignore
  }
};
