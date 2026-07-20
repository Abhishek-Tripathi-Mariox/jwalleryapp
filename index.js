/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

// Must be registered outside the component tree, before AppRegistry —
// this is what lets a push wake the app from a killed/background state.
// No-ops (rejects, caught here) until google-services.json /
// GoogleService-Info.plist are added — see android/app/build.gradle and
// ios/shopnear/AppDelegate.swift.
try {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Push received in background:', remoteMessage.messageId);
  });
} catch (e) {
  console.log('Firebase messaging not configured yet:', e.message);
}

AppRegistry.registerComponent(appName, () => App);
