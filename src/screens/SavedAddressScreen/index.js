import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';

const { width } = Dimensions.get('window');


const initialAddresses = [
  {
    id: '1',
    label: 'Deliver to Mithu (Home)',
    address: '32 main, mangal bazar rd, noida, uttar pradesh, 201309',
    phone: '+91 8178496252',
    email: 'mithukumar08907@gmail.com',
    type: 'Home',
  },
  {
    id: '2',
    label: 'Deliver to Mithu(Work)',
    address: '32 main, mangal bazar rd, noida, uttar pradesh, 201309',
    phone: '+91 8178496252',
    email: 'mithukumar08907@gmail.com',
    type: 'Work',
  },
];

export default function SavedAddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddAddress = (addressData) => {
    // Compose address string for display
    const composedAddress = `${addressData.houseNo}, ${addressData.apartment}, ${addressData.city}, ${addressData.state}, ${addressData.pincode}`;
    setAddresses(prev => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        label: `Deliver to ${addressData.fullName} (${addressData.addressType})`,
        address: composedAddress,
        phone: '',
        email: addressData.email,
        type: addressData.addressType,
      },
    ]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader
        navigation={navigation}
        title="ADDRESS"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {addresses.map(addr => (
          <View key={addr.id} style={styles.addressCard}>
            <View style={styles.addressRow}>
              <Feather name="map-pin" size={18} color="#101820" style={{ marginRight: 8 }} />
              <Text style={styles.addressLabel}>{addr.label}</Text>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>{addr.address}</Text>
            <Text style={styles.addressMeta}>{addr.phone}   |   {addr.email}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addAddressBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addAddressText}>+ Add Address</Text>
        </TouchableOpacity>
      </ScrollView>
      <AddressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddAddress}
      />
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
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  addressCard: {
    backgroundColor: '#FFFFFF80',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    width: width - 32,
    shadowColor: '#DDDDDDDD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffffff'
    // elevation: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  changeBtn: {
    borderWidth: 1,
    borderColor: '#FFC700',
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
    backgroundColor: '#FFFDE9'
  },
  changeText: {
    color: '#FFC700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addressText: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 2,
  },
  addressMeta: {
    fontSize: 12,
    color: '#333333',
  },
  addAddressBtn: {
    borderWidth: 1,
    borderColor: '#B0011D',
    borderRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 0,
    width: width - 32,
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: '#FFFFFF80'
  },
  addAddressText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
  },
});
import AddressModal from './AddressModal';
