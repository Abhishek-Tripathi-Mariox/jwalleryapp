import React, { useEffect } from 'react';
import { AppImages } from '../../constants/app.image';
import { styles } from './styles';
import { TimeOut } from './controller'
import { Image, View, StatusBar, Dimensions } from 'react-native';
import { useLogos } from '../../utils/LogoContext';

const { width, height } = Dimensions.get('window');

const SplashScreen = (props) => {
  const { logos } = useLogos();
  const splashUrl = logos.mobile_splash?.imageUrl || logos.primary?.imageUrl;

  useEffect(() => {
    TimeOut(props)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#940A57', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor="#940A57" barStyle="light-content" />
      <Image
        source={splashUrl ? { uri: splashUrl } : AppImages.jlogo1}
        style={{ height: 300, width: width * 0.75, resizeMode: 'contain' }}
      />
    </View>
  );
}
export default SplashScreen;