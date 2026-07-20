import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View, TextInput, Image,
  KeyboardAvoidingView, ScrollView, Platform, Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constants/app.image';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../../constants/api';
import { setTokenStorage } from '../../utils/tokenStorage';
import { showToast } from '../../utils/toast';
import { fetchAndStoreAppConfig } from '../../utils/appConfig';
import { registerDeviceToken } from '../../utils/pushNotifications';
import { Colors } from '../../themes/Colors';
import { useLogos } from '../../utils/LogoContext';

const LoginScreen = (props) => {
  const navigation = props.navigation
  const { logos } = useLogos();
  const loginLogoUrl = logos.mobile_splash?.imageUrl || logos.primary?.imageUrl;
  const [OTPView, setOTPView] = useState(false)
  const [mobileNum, setMobileNum] = useState('')
  const [txnId, setTxnId] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Function to send OTP
  const handleSendOtp = async () => {
    if (!mobileNum || mobileNum.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countryCode: '+91',
          mobileNumber: mobileNum,
        }),
      });
      const data = await response.json();
      if (data.code === 1) {
        setTxnId(data.data.txnId);
        setOTPView(true);
        showToast(data.message || 'OTP sent to your registered mobile number.', 'success');
      } else {
        showToast(data.message || 'Failed to send OTP.', 'error');
      }
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      showToast('Please enter the 6-digit OTP.', 'error');
      return;
    }
    if (!txnId) {
      showToast('Missing transaction ID. Please request OTP again.', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/auth/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          txnId: txnId,
          otp: enteredOtp,
        }),
      });
      const data = await response.json();
      if (data.code === 1) {
        if (data.data && data.data.token) {
          await setTokenStorage(data.data.token);
          // Fetch and store app config keys (Razorpay, Google Maps, Firebase)
          await fetchAndStoreAppConfig();
          registerDeviceToken().catch(() => {});
        }
        showToast(data.message || 'OTP verified successfully.', 'success');
        navigation.navigate('MainTabs')
      } else {
        showToast(data.message || 'Incorrect OTP, try again!', 'error');
      }
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input automatically if the current one is filled
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['bottom']}>
      <LinearGradient
        colors={['#FFFFFF', '#FFF6C9']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.backgroundGradient}
      >
       <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
       >
       <ScrollView
         contentContainerStyle={{ flexGrow: 1 }}
         keyboardShouldPersistTaps="handled"
         showsVerticalScrollIndicator={false}
       >
        {/* Header Banner */}
        <View style={[styles.headerBanner, keyboardVisible && styles.headerBannerCompact]}>
          <Image
            source={loginLogoUrl ? { uri: loginLogoUrl } : AppImages.jlogo1}
            style={[styles.image, keyboardVisible && styles.imageCompact]}
          />
        </View>

        {/* Content */}
        <View style={styles.contentArea}>
          {OTPView ? (
            <>
              <Text style={styles.heading}>Phone verification</Text>
              <Text style={styles.subHeading}>
                We've sent a 6-digit verification code to your mobile number. Please enter the code below to verify your identity.
              </Text>

              <View style={styles.container}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={styles.OTPInput}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    placeholderTextColor={'gray'}
                    maxLength={1}
                  />
                ))}
              </View>
              <TouchableOpacity>
                <Text style={{ padding: 5, paddingTop: 10, color: '#5A5A5A', fontSize: 15, textAlign: 'right' }}>
                  Didn't receive code? <Text style={{ color: Colors.theme1, fontWeight: '700' }}>Resend again</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOtp}>
                <Text style={styles.text}>Verify</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.heading}>Sign in</Text>

              <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor={'#D0D0D0'}
                keyboardType='number-pad'
                maxLength={10}
                value={mobileNum}
                onChangeText={(val) => setMobileNum(val)}
              />

              <TouchableOpacity
                onPress={handleSendOtp}
                activeOpacity={0.85}
                style={styles.button}
              >
                <Text style={styles.text}>{loading ? 'Sending...' : 'Get OTP'}</Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={styles.termsText}>
            By continuing you agree to our{' '}
            <Text style={styles.linkText}>Terms of Services</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
       </ScrollView>
       </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
export default LoginScreen;