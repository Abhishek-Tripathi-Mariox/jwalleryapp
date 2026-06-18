import React from 'react';
import { Colors } from './src/themes/Colors';
import Navigator from './src/routes/Navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { LogoProvider } from './src/utils/LogoContext';

const App = () => {
  return (
    <LogoProvider>
      <SafeAreaView style={{ flex: 1 }}  >
        <StatusBar backgroundColor={Colors.theme1} />
        <Navigator />
        <Toast />
      </SafeAreaView>
    </LogoProvider>
  );
}
export default App;