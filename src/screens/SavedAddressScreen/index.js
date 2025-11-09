import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddAddressScreen from '../AddAddressScreen/index';
import { Colors } from '../../themes/Colors';

const { width } = Dimensions.get('window');
const THEME_COLOR = Colors.theme1;

import { useEffect } from 'react';
import { listUserAddresses, selectUserAddress, deleteUserAddress, addUserAddress } from '../../utils/userAddress';
import { showToast } from '../../utils/toast';

const SavedAddressScreen = ({ navigation }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  // To avoid hook order issues, define all hooks at the top level, not conditionally.

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAddresses() {
    setLoading(true);
    const result = await listUserAddresses();
    setLoading(false);
    if (result.success) {
      setAddresses(result.addresses);
    } else {
      showToast(result.message, 'error');
    }
  }

  async function handleSelect(addressId) {
    setLoading(true);
    const result = await selectUserAddress(addressId);
    setLoading(false);
    showToast(result.message, result.success ? 'success' : 'error');
    if (result.success) fetchAddresses();
  }

  async function handleDelete(addressId) {
    setLoading(true);
    const result = await deleteUserAddress(addressId);
    setLoading(false);
    showToast(result.message, result.success ? 'success' : 'error');
    if (result.success) fetchAddresses();
  }

  // Placeholder for edit functionality
  function handleEdit(address) {
    setShowAddAddress(true);
    // Pass address data to AddAddressScreen as needed
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Address</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="hearto" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading && <Text>Loading...</Text>}
        {!loading && addresses.length === 0 && (
          <Text style={{ color: '#888', marginTop: 20 }}>No addresses found.</Text>
        )}
        {!loading && addresses.map((item, idx) => (
          <View
            key={item._id}
            style={[
              styles.addressCard,
              item.isSelected && styles.selectedCard,
              idx === 0 && { borderColor: THEME_COLOR, borderWidth: 1.5 },
            ]}
          >
            <View style={styles.addressRow}>
              <View style={styles.radioCol}>
                <AntDesign
                  name={item.isSelected ? 'checkcircle' : 'circledowno'}
                  size={19}
                  color={item.isSelected ? THEME_COLOR : '#bbb'}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.addressLabel, item.isSelected && styles.selectedLabel]}>
                  {item.fullName}
                </Text>
                <Text style={styles.addressText}>{item.address}</Text>
                <Text style={styles.addressText}>{item.city}, {item.state} - {item.pinCode}</Text>
                <Text style={styles.addressText}>{item.phone}</Text>
                <Text style={styles.addressText}>Type: {item.addressType}</Text>
              </View>
              {item.isSelected && (
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              )}
              {!item.isSelected && (
                <View style={styles.actionIcons}>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => handleEdit(item)}>
                    <Feather name="edit" size={20} color={THEME_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => handleDelete(item._id)}>
                    <MaterialIcons name="delete-outline" size={22} color={THEME_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => handleSelect(item._id)}>
                    <AntDesign name="checkcircle" size={20} color={THEME_COLOR} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>
      <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddAddress(true)}>
        <Text style={styles.addBtnText}>Add New Address</Text>
      </TouchableOpacity>
      {/* Pass fetchAddresses to AddAddressScreen for refresh after add/edit */}
      <AddAddressScreen
        visible={showAddAddress}
        onClose={() => {
          setShowAddAddress(false);
          fetchAddresses();
        }}
        navigation={() => navigation.navigate('PaymentMethod')}
      />
    </View>
  );
};

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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 90,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderColor: '#eee',
    borderWidth: 1,
  },
  selectedCard: {
    borderColor: THEME_COLOR,
    borderWidth: 1.5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioCol: {
    marginRight: 12,
    marginTop: 2,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  selectedLabel: {
    color: THEME_COLOR,
  },
  addressText: {
    fontSize: 12,
    color: '#444',
    marginBottom: 2,
  },
  changeText: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 12,
    marginTop: 2,
  },
  actionIcons: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 2,
  },
  iconBtn: {
    marginLeft: 8,
  },
  addBtn: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default SavedAddressScreen;
