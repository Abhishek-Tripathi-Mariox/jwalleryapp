import React, { useEffect } from 'react';
import { AppImages } from '../../constants/app.image';
import { styles } from './styles';
import { TimeOut } from './controller'
import { Colors } from '../../themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';

const SplashScreen = (props) => {

  useEffect(() => {
    TimeOut(props)
  }, [])

  return (
    <SafeAreaView
      style={styles.mainContainer}>
      <ImageBackground source={AppImages.BG_IMAGE} style={{ width: '100%', backgroundColor: Colors.theme1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.mainCard} onPress={()=> props.navigation.navigate('Landing')}>
          <Image
            source={AppImages.LOGO}
          style={{ height: 125, width: 125, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default SplashScreen;