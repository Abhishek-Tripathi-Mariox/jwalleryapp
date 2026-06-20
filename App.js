import React, { useEffect } from 'react';
import Navigator from './src/routes/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { LogoProvider } from './src/utils/LogoContext';
import './src/i18n';
import { loadStoredLanguage } from './src/i18n';

const App = () => {
  useEffect(() => { loadStoredLanguage(); }, []);
  return (
    <LogoProvider>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar backgroundColor="#930e6e" barStyle="light-content" translucent={false} />
        <Navigator />
        <Toast />
      </SafeAreaProvider>
    </LogoProvider>
  );
}
export default App;