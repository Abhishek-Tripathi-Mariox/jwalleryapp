import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../themes/Colors';

const { width } = Dimensions.get('window');

const user = {
  name: 'Sunie Pham',
  email: 'sunieux@gmail.com',
  avatar: require('../../assets/images/profile.jpeg'), // Replace with your avatar asset
};

const menu = [
  { key: 'address', label: 'Address', icon: <Feather name="map-pin" size={22} color="#b0b0b0" /> },
  { key: 'payment', label: 'Payment method', icon: <Feather name="credit-card" size={22} color="#b0b0b0" /> },
  { key: 'voucher', label: 'Voucher', icon: <MaterialIcons name="confirmation-number" size={22} color="#b0b0b0" /> },
  { key: 'wishlist', label: 'My Wishlist', icon: <AntDesign name="hearto" size={22} color="#b0b0b0" /> },
  { key: 'rate', label: 'Rate this app', icon: <AntDesign name="staro" size={22} color="#b0b0b0" /> },
  { key: 'logout', label: 'Log out', icon: <Feather name="log-out" size={22} color="#b0b0b0" /> },
];

const THEME_COLOR = Colors.theme1;

const MyProfileScreen = ({ navigation }) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity>
        <AntDesign name="arrowleft" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Profile</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="hearto" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSettingScreen')}>
          <Feather name="settings" size={26} color="#222" />
        </TouchableOpacity>
      </View>
      {/* Menu List */}
      <View style={styles.menuList}>
        {menu.map((item, idx) => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={
              item.label === 'My Wishlist'
                ? () => navigation && navigation.navigate('Wishlist')
                : item.label === 'Address'
                  ? () => navigation && navigation.navigate('SavedAddress')
                  : item.label === 'Payment method'
                    ? () => navigation && navigation.navigate('PaymentMethod')
                    :
                    item.label === 'Rate this app'
                      ? () => navigation && navigation.navigate('FeedbackScreen')
                      : undefined
            }
          >
            <View style={styles.menuIcon}>{item.icon}</View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <AntDesign name="right" size={18} color="#b0b0b0" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingTop: 18,
    paddingBottom: 90,
    alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 18,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    width: width - 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 18,
    backgroundColor: '#F7F7F7',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  menuList: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 12,
    paddingVertical: 2,
    width: width - 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  menuIcon: {
    marginRight: 18,
    width: 28,
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
});

export default MyProfileScreen;