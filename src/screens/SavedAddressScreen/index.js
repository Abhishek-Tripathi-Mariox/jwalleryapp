import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';
import { request } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import AddressModal from './AddressModal';

const { width } = Dimensions.get('window');

export default function SavedAddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const loadAddresses = async () => {
    try {
      const res = await request('GET', '/user/address');
      if (res?.code === 1 && res.data) {
        const list = res.data.addresses || res.data || [];
        setAddresses(Array.isArray(list) ? list : []);
      }
    } catch (e) {
      console.log('Address load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadAddresses();
    }, [])
  );

  const handleAddAddress = async (addressData) => {
    try {
      const fullAddress = [addressData.houseNo, addressData.apartment, addressData.city, addressData.state]
        .filter(Boolean)
        .join(', ');
      
      const body = {
        houseNo: addressData.houseNo || '',
        apartment: addressData.apartment || '',
        address: fullAddress || addressData.houseNo || '',
        city: addressData.city || '',
        state: addressData.state || '',
        pinCode: parseInt(addressData.pincode || addressData.pinCode) || 0,
        fullName: addressData.fullName || '',
        email: addressData.email || '',
        addressType: addressData.addressType || 'Home',
      };

      let res;
      if (editIndex !== null && addresses[editIndex]) {
        // Edit address - update existing
        const addrId = addresses[editIndex]._id;
        res = await request('PUT', `/user/address/${addrId}`, body);
      } else {
        res = await request('POST', '/user/address', body);
      }
      
      if (res?.code === 1) {
        loadAddresses();
      } else {
        Alert.alert('Error', res?.message || 'Failed to save address');
      }
    } catch (e) {
      console.log('Address save error:', e);
      Alert.alert('Error', 'Failed to save address');
    }
    setModalVisible(false);
    setEditIndex(null);
  };

  // Prepare initial values for modal if editing
  const getEditInitialValues = () => {
    if (editIndex === null) return undefined;
    const addr = addresses[editIndex];
    if (!addr) return undefined;
    return {
      pincode: addr.pinCode || addr.pincode || '',
      city: addr.city || '',
      state: addr.state || '',
      houseNo: addr.houseNo || '',
      apartment: addr.apartment || '',
      fullName: addr.fullName || '',
      email: addr.email || '',
      addressType: addr.addressType || addr.type || 'Home',
    };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader
        navigation={navigation}
        title="ADDRESS"
      />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.theme1} style={{ marginTop: 40 }} />
      ) : (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {addresses.map((addr, idx) => {
          const label = addr.fullName ? `Deliver to ${addr.fullName} (${addr.addressType || 'Home'})` : (addr.label || 'Address');
          const addressText = addr.houseNo ? `${addr.houseNo}, ${addr.apartment || ''}, ${addr.city || ''}, ${addr.state || ''}, ${addr.pinCode || addr.pincode || ''}` : (addr.address || '');
          return (
            <View key={addr._id || addr.id || idx} style={styles.addressCard}>
              <View style={styles.addressRow}>
                <Feather name="map-pin" size={18} color="#101820" style={{ marginRight: 8 }} />
                <Text style={styles.addressLabel}>{label}</Text>
                <TouchableOpacity style={styles.changeBtn} onPress={() => { setEditIndex(idx); setModalVisible(true); }}>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.addressText}>{addressText}</Text>
              <Text style={styles.addressMeta}>{addr.phone || ''}   |   {addr.email || ''}</Text>
            </View>
          );
        })}
        <TouchableOpacity style={styles.addAddressBtn} onPress={() => { setEditIndex(null); setModalVisible(true); }}>
          <Text style={styles.addAddressText}>+ Add Address</Text>
        </TouchableOpacity>
      </ScrollView>
      )}
      <AddressModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); setEditIndex(null); }}
        onSave={handleAddAddress}
        initialValues={getEditInitialValues()}
      />
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
