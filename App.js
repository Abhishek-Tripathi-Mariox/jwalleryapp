import React from 'react';
import { Colors } from './src/themes/Colors';
import Navigator from './src/routes/Navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}  >
      <StatusBar backgroundColor={Colors.theme1} />
      <Navigator />
    </SafeAreaView>
  );
}
export default App;