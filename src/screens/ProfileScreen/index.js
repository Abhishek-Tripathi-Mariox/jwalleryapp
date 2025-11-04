import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');

const user = {
  name: 'Sunie Pham',
  email: 'sunieux@gmail.com',
  avatar: require('../../assets/images/profile.jpeg'), // Replace with your avatar asset
};

const menu = [
  { key: 'address', label: 'Address', icon: <Feather name="map-pin" size={22} color="#7B7B7B" /> },
  { key: 'homepage', label: 'Homepage', icon: <AntDesign name="home" size={22} color="#7B7B7B" />, active: true },
  { key: 'discover', label: 'Discover', icon: <Feather name="search" size={22} color="#7B7B7B" /> },
  { key: 'order', label: 'My Order', icon: <Feather name="shopping-bag" size={22} color="#7B7B7B" /> },
  { key: 'profile', label: 'My profile', icon: <AntDesign name="user" size={22} color="#7B7B7B" /> },
];

const otherMenu = [
  { key: 'wishlist', label: 'My Wishlist', icon: <AntDesign name="hearto" size={22} color="#7B7B7B" /> },
  { key: 'setting', label: 'Setting', icon: <Feather name="settings" size={22} color="#7B7B7B" /> },
  { key: 'support', label: 'Support', icon: <Feather name="mail" size={22} color="#7B7B7B" /> },
  { key: 'about', label: 'About us', icon: <Feather name="info" size={22} color="#7B7B7B" /> },
];

const ProfileScreen = ({ navigation }) => (
  <View style={styles.overlay}>
    <View style={styles.sidebar}>
      {/* User Info */}
      <View style={styles.userSection}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      {/* Menu */}
      <View style={styles.menuSection}>
        {menu.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[styles.menuItem, item.active && styles.menuItemActive]}
            activeOpacity={0.7}
            onPress={
              item.label === 'My profile'
                ? () => navigation && navigation.navigate('MyProfile')
                : undefined
            }
          >
            <View style={styles.menuIcon}>{item.icon}</View>
            <Text style={[styles.menuLabel, item.active && styles.menuLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Other Section */}
      <Text style={styles.otherLabel}>OTHER</Text>
      <View style={styles.menuSection}>
        {otherMenu.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={
              item.label === 'My Wishlist'
                ? () => navigation && navigation.navigate('Wishlist')
                : undefined
            }
          >
            <View style={styles.menuIcon}>{item.icon}</View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    {/* The rest of the app is visible in the background */}
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  sidebar: {
    width: '80%',
    height: height,
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 48,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F7F7F7',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#7B7B7B',
  },
  menuSection: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: '#F5F5F5',
  },
  menuIcon: {
    marginRight: 18,
    width: 28,
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: '#7B7B7B',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#222',
    fontWeight: 'bold',
  },
  otherLabel: {
    marginTop: 18,
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 13,
    color: '#A0A0A0',
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default ProfileScreen;
