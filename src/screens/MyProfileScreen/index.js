import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';

const { width } = Dimensions.get('window');

const user = {
  avatar: require('../../assets/images/jwel3.jpg'),
  cover: require('../../assets/images/jwel3.jpg'), //back
  name: 'Josephine Jackson',
  phone: '+91 6267266688',
  location: 'Brooklyn, NYC',
};

const menu = [
  { key: 'profile', label: 'Profile Details', icon: <Feather name="user" size={21} color="#000000" /> },
  { key: 'address', label: 'Address', icon: <Feather name="map-pin" size={21} color="#000000" /> },
  { key: 'wishlist', label: 'Wishlist', icon: <AntDesign name="hearto" size={21} color="#000000" /> },
  { key: 'orders', label: 'Orders', icon: <MaterialIcons name="receipt-long" size={21} color="#000000" /> },
  { key: 'payment', label: 'Payment Methods', icon: <Feather name="credit-card" size={21} color="#000000" /> },
  { key: 'contact', label: 'Contact Us', icon: <Feather name="phone" size={21} color="#000000" /> },
];

export default function MyProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader
        navigation={navigation}
        title="PROFILE"
        rightIcon={require('../../assets/images/jnot.png')}
        onRightPress={() => navigation.navigate('Notification')}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cover and Avatar */}
        <View style={styles.coverContainer}>
          <Image source={user.cover} style={styles.coverImage} />
          <Image source={user.avatar} style={styles.avatar} />
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
                if (item.key === 'contact') navigation.navigate('CustomerServiceChat');
              }}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
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
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  coverImage: {
    width: 350,
    height: 120,
    resizeMode: 'cover',
  },
  avatar: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 90,
    left: 12,
    backgroundColor: '#fff',
  },
  profileInfo: {
    marginTop: 5,
    marginLeft: 130,
    marginBottom: 8,
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
    position: 'absolute',
    right: 12,
    top: 127,
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