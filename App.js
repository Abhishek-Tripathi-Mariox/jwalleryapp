import React, { useEffect } from 'react';
import Navigator from './src/routes/Navigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { LogoProvider } from './src/utils/LogoContext';
import './src/i18n';
import { loadStoredLanguage } from './src/i18n';
import { setupForegroundNotificationListener, setupTokenRefreshListener } from './src/utils/pushNotifications';

const App = () => {
  useEffect(() => { loadStoredLanguage(); }, []);

  useEffect(() => {
    let unsubscribeForeground, unsubscribeTokenRefresh;
    try {
      unsubscribeForeground = setupForegroundNotificationListener((remoteMessage) => {
        const { title, body } = remoteMessage.notification || {};
        if (title || body) {
          Toast.show({ type: 'info', text1: title || 'Notification', text2: body || '' });
        }
      });
      unsubscribeTokenRefresh = setupTokenRefreshListener();
    } catch (e) {
      console.log('Push notification listeners not available yet:', e.message);
    }
    return () => {
      unsubscribeForeground?.();
      unsubscribeTokenRefresh?.();
    };
  }, []);
  return (
    <LogoProvider>
      <SafeAreaProvider style={{ flex: 1 }}>
        {/* Transparent status bar (Android 15 edge-to-edge); we paint the area ourselves */}
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        {/* Magenta strip behind the status bar — consistent on every screen, white icons stay visible */}
        <SafeAreaView edges={['top']} style={{ backgroundColor: '#930e6e' }} />
        <View style={{ flex: 1 }}>
          <Navigator />
        </View>
        <Toast />
      </SafeAreaProvider>
    </LogoProvider>
  );
}
export default App;
