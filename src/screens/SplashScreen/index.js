import React, { useEffect } from 'react';
import { AppImages } from '../../constants/app.image';
import { styles } from './styles';
import { TimeOut } from './controller'
import { Colors } from '../../themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = (props) => {

  useEffect(() => {
    TimeOut(props)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#fffbe6', '#ffffff']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image
            source={AppImages.jlogo1}
            style={{ height: 120, width: 180, resizeMode: 'contain', marginBottom: 24 }}
          />
        </View>
        {/* Optional: Add a subtle pattern or vector at the bottom if available */}
        {/* <Image
          source={AppImages.pattern} // Add a pattern image if you have one
          style={{
            position: 'absolute',
            bottom: 0,
            width: width,
            height: 120,
            opacity: 0.15,
            resizeMode: 'cover'
          }}
        /> */}
      </LinearGradient>
    </SafeAreaView>
  );
}
export default SplashScreen;