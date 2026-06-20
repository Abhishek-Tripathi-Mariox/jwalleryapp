import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';
import { request } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppImages } from '../../constants/app.image';
import LanguageAlert from '../../components/Modal/LanguageAlert';

const { width } = Dimensions.get('window');

const menu = [
  { key: 'profile', label: 'Profile Details', icon: <Feather name="user" size={21} color="#000000" /> },
  { key: 'address', label: 'Address', icon: <Feather name="map-pin" size={21} color="#000000" /> },
  { key: 'wishlist', label: 'Wishlist', icon: <AntDesign name="hearto" size={21} color="#000000" /> },
  { key: 'orders', label: 'Orders', icon: <MaterialIcons name="receipt-long" size={21} color="#000000" /> },
  { key: 'payment', label: 'Payment Methods', icon: <Feather name="credit-card" size={21} color="#000000" /> },
  { key: 'language', label: 'Language', icon: <Feather name="globe" size={21} color="#000000" /> },
  { key: 'contact', label: 'Contact Us', icon: <Feather name="phone" size={21} color="#000000" /> },
];

export default function MyProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    location: '',
    loyaltyPoints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [langModal, setLangModal] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await request('GET', '/user/profile');
      if (res?.code === 1 && res.data) {
        const u = res.data.user || res.data;
        setUser({
          name: u.fullName || u.name || 'User',
          phone: u.mobileNumber || u.phone || '',
          location: u.city || (typeof u.location === 'string' ? u.location : ''),
          avatar: u.profileImages || u.profileImage || u.avatar,
          cover: u.coverImage,
          loyaltyPoints: u.loyaltyPoints || 0,
        });
      }
    } catch (e) {
      console.log('Profile load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadProfile();
    }, [])
  );

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (e) {
      console.log('Sign out error:', e);
    }
  };

  const avatarSource = user.avatar ? { uri: user.avatar } : require('../../assets/images/jwel3.jpg');
  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader
        navigation={navigation}
        title="PROFILE"
        showBack={false}
        showLogo={true}
        rightIcon={AppImages.jnotification}
        onRightPress={() => navigation.navigate('Notification')}
      />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.theme1} style={{ marginTop: 40 }} />
      ) : (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cover and Avatar */}
        <View style={styles.coverContainer}>
          <Image source={avatarSource} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.row}>
              <Feather name="phone" size={14} color="#888" />
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
            <View style={styles.row}>
              <Feather name="map-pin" size={14} color="#888" />
              <Text style={styles.location}>{user.location}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('ProfileDetail')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Loyalty points */}
        <View style={styles.loyaltyCard}>
          <View style={styles.loyaltyLeft}>
            <AntDesign name="star" size={20} color="#E0A100" />
            <Text style={styles.loyaltyLabel}>Loyalty Points</Text>
          </View>
          <Text style={styles.loyaltyValue}>{user.loyaltyPoints || 0}</Text>
        </View>
        {/* Menu List */}
        <View style={styles.menuList}>
          {menu.map((item, idx) => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                if (item.key === 'profile') navigation.navigate('ProfileDetail');
                if (item.key === 'address') navigation.navigate('SavedAddress');
                if (item.key === 'wishlist') navigation.navigate('Wishlist');
                if (item.key === 'orders') navigation.navigate('OrderScreen');
                if (item.key === 'payment') navigation.navigate('PaymentMethod');
                if (item.key === 'language') setLangModal(true);
                if (item.key === 'contact') navigation.navigate('CustomerServiceChat');
              }}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      )}
      <LanguageAlert modalAlert={langModal} setModalAlert={setLangModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme1,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-between',
  },
  headerBackBtn: {
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.theme1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    flex: 1,
    textAlign: 'center',
    marginLeft: -30,
  },
  headerBellBtn: {
    backgroundColor: 'transparent',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBellIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  coverContainer: {
    marginTop: 18,
    marginBottom: 8,
    marginHorizontal: 16,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loyaltyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#FFF6DA',
    borderWidth: 1,
    borderColor: '#F0DFA8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  loyaltyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loyaltyLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7A5A00',
  },
  loyaltyValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#930e6e',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    // marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  phone: {
    fontSize: 13,
    color: '#888888',
    marginLeft: 6,
  },
  location: {
    fontSize: 13,
    color: '#888888',
    marginLeft: 6,
  },
  editBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editText: {
    color: Colors.theme1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuList: {
    borderRadius: 18,
    marginHorizontal: 15,
    marginTop: 0,
    marginBottom: 12,
    paddingVertical: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cdc8c8ff',
    paddingTop: 25,
    paddingBottom: 12

  },
  menuIcon: {
    marginRight: 18,
    width: 28,
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  signOutBtn: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signOutText: {
    color: '#FA3636',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
});