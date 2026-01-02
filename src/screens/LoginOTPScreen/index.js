import React, { useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View, TextInput, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constants/app.image';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../../constants/api';
import { setTokenStorage } from '../../utils/tokenStorage';
import { showToast } from '../../utils/toast';

const LoginScreen = (props) => {
  const navigation = props.navigation
  const [OTPView, setOTPView] = useState(false)
  const [mobileNum, setMobileNum] = useState('')
  const [txnId, setTxnId] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  // Function to send OTP
  const handleSendOtp = async () => {
        setOTPView(true);
        return
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
      navigation.navigate('Home')
      return
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
        }
        showToast(data.message || 'OTP verified successfully.', 'success');
        navigation.navigate('Home')
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
    <SafeAreaView
      style={styles.mainContainer}>
      <View style={styles.mainCard}>
        {OTPView ?
          <>
            {/* <Image
              source={AppImages.LOGO}
              style={styles.image}
            /> */}
            <Text style={styles.heading}>Phone verification</Text>
            <Text style={styles.subHeading}>We've sent a 6-digit verification code to your mobile numberor email. please enter the code below to verify your identity.</Text>

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
              <Text style={{ padding: 5, paddingTop: 10, color: '#5A5A5A', fontSize: 15, textAlign: 'right' }}>Didn’t receive code? <Text style={{ color: '#8A0017', fontWeight:'700' }}>Resend again</Text></Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyOtp}>
              <Text style={styles.text}>Verify</Text>
            </TouchableOpacity>
          </>
          :
          <>
            <Image
              source={AppImages.jlogo1}
              style={styles.image}
            />
            <Text style={styles.heading}>sign in</Text>

            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor={'gray'}
              keyboardType='number-pad'
              maxLength={10}
              val={mobileNum}
              onChangeText={(val) => setMobileNum(val)}
            />

            {/* <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsChecked(!isChecked)}
            >
              <Icon
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={28}
                color="black"
              />
              <Text style={styles.label}>By Signing up I agree to the terms of use and privacy policy</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={handleSendOtp}
              activeOpacity={0.85}
              style={{ width: '100%' }}
            >
              <LinearGradient
                colors={['#B4001E', '#8A0017']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.text}>{loading ? 'Sending...' : 'Get OTP'}</Text>
              </LinearGradient>
            </TouchableOpacity>



          </>
        }

        <Text style={styles.termsText}>
          By continuing you agree to our{' '}
          <Text style={styles.linkText}>Terms of Services</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>

      {!OTPView == <Text style={{ color: '#000', fontSize: 20, fontWeight: '400', position: 'absolute', bottom: 30, left: 340 }}>Skip</Text>}
    </SafeAreaView>
  );
}
export default LoginScreen;