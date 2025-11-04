import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import styles from './style';
import { AppImages } from '../../constants/app.image';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={AppImages.landing} style={styles.topImage} resizeMode="cover" />
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Support Local,{"\n"}Get What You Need Fast</Text>
        <Text style={styles.subtitle}>
          Browse real nearby stores, check available{"\n"}
          products, and shop directly without waiting.
        </Text>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing you agree to our{' '}
          <Text style={styles.linkText}>Terms of Services</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default LandingScreen;