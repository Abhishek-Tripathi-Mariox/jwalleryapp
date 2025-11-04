import React, { useState, useRef } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View, TextInput, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constants/app.image';
import { styles } from './styles';
import { Colors } from '../../themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = (props) => {
  const navigation = props.navigation
  const isDarkMode = useColorScheme() === 'dark';
  const [isChecked, setIsChecked] = useState(false);
  const [OTPView, setOTPView] = useState(false)
  const [mobileNum, setMobileNum] = useState('')

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

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

  const APICall = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 2b49e06599de3a61761ba62a70334e3f:ZTly8itkXhgscOztDpvowtZaTV1ks03V0FiqS4HQSc5fMpmbr8AXoFey16bPVK/jQuFuUKP5cDHG4JZUJWVo/djvEMQ4q9SOW6jFh6XCNPdskCwtSwPWRqsHMSrW8dM9OKffaY99j4rFh3tUKTjRdnmuch7XD6o4+lanTzYd1uNwvz0u7PhmfQLbj3rXJ+49BVA4aSjTejIrPtkGc3egNwhymCHLQzhZ/jv+b7CTyQ9PeG/ggWbuuqSkAPd6gMLe/hkJdAsHSsdE+iVUpX04yKDGD9Zw50Zzb1HX5CnWHP2OUqn6mT1MKz7/rt5rThRun8MDKF6mcY+EMcf2WOHFDaPLwyXvuBX+7BmznN8tSq8JGnw+zpFedqNkQY6gr4G6cv+L13Hd7bMkRQ+t/JV0S92GujQZipOH/kxPRJjuFtI=");

    const raw = JSON.stringify({
      "amount": 300,
      "currency": "INR",
      "description": "This is the testing payment 1"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://13.126.9.67:7250/v1/user/payment", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

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
              <Text style={{ padding: 5, paddingTop: 10, color: '#000', fontSize: 15, textAlign: 'right' }}>Didn’t receive code? <Text style={{ color: '#CE1D5A' }}>Resend again</Text></Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.text}>Verify</Text>
            </TouchableOpacity>
          </>
          :
          <>
            <Image
              source={AppImages.LOGO_2}
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
              onPress={() => setOTPView(true)}
              style={styles.button}
            >
              <Text style={styles.text}>Get OTP</Text>
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