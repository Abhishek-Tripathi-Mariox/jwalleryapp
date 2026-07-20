import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { request } from './api';

// Silently no-ops until Firebase is actually wired up natively
// (google-services.json / GoogleService-Info.plist) — see android/app/build.gradle
// and ios/shopnear/AppDelegate.swift for the corresponding guards.
export const requestNotificationPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } catch (e) {
    console.log('Notification permission request failed:', e);
    return false;
  }
};

const sendTokenToBackend = async (token) => {
  await request('PUT', '/auth/updateDeviceToken', {
    deviceToken: token,
    deviceType: Platform.OS,
  });
};

/**
 * Requests permission and registers this device's FCM token with the
 * backend. Call after login (a valid auth token must already be stored,
 * since /auth/updateDeviceToken requires it).
 */
export const registerDeviceToken = async () => {
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return null;

    const token = await messaging().getToken();
    if (token) await sendTokenToBackend(token);
    return token;
  } catch (e) {
    console.log('Device token registration failed:', e);
    return null;
  }
};

/** Keeps the backend's stored token current if FCM rotates it. */
export const setupTokenRefreshListener = () =>
  messaging().onTokenRefresh(async (token) => {
    try {
      await sendTokenToBackend(token);
    } catch (e) {
      console.log('Device token refresh update failed:', e);
    }
  });

/** Foreground pushes don't auto-display as OS notifications — call this to react to them (e.g. show a toast). */
export const setupForegroundNotificationListener = (onNotification) =>
  messaging().onMessage(async (remoteMessage) => {
    onNotification?.(remoteMessage);
  });

/** Handles the case where the app was opened by tapping a notification (from background or a cold start). */
export const setupNotificationOpenedListeners = (onNotificationOpen) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    onNotificationOpen?.(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) onNotificationOpen?.(remoteMessage);
    });
};
