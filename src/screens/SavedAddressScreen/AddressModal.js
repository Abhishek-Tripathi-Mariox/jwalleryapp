import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const AddressModal = ({ visible, onClose, onSave }) => {
  const [pincode, setPincode] = useState('201309');
  const [city, setCity] = useState('Ghaziabad');
  const [state, setState] = useState('Uttar Pradesh');
  const [houseNo, setHouseNo] = useState('');
  const [apartment, setApartment] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [addressType, setAddressType] = useState('Home');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <AntDesign name="close" size={26} color="#6B3A3A" />
          </TouchableOpacity>
          {/* Title */}
          <Text style={styles.title}>Add Delivery Address</Text>
          <View style={styles.divider} />

          {/* Use Current Location */}
          <TouchableOpacity style={styles.locationBtn}>
            <Feather name="crosshair" size={20} color="#6B3A3A" style={{ marginRight: 8 }} />
            <Text style={styles.locationText}>Use Current Location</Text>
          </TouchableOpacity>

          {/* Pincode */}
          <TextInput
            style={styles.input}
            placeholder="Pincode*"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            placeholderTextColor="#BDBDBD"
          />
          {/* City and State */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City*"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={[styles.input, styles.halfInput, { marginLeft: 12 }]}
              placeholder="State*"
              value={state}
              onChangeText={setState}
              placeholderTextColor="#BDBDBD"
            />
          </View>
          {/* House No. */}
          <TextInput
            style={styles.input}
            placeholder="House No.*"
            value={houseNo}
            onChangeText={setHouseNo}
            placeholderTextColor="#BDBDBD"
          />
          {/* Apartment */}
          <TextInput
            style={styles.input}
            placeholder="Apartment"
            value={apartment}
            onChangeText={setApartment}
            placeholderTextColor="#BDBDBD"
          />

          {/* Customer Information */}
          <Text style={styles.sectionLabel}>Customer Informations*</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name*"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address*"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
          />

          <Text style={styles.infoText}>
            <Feather name="info" size={14} color="#222" />
            {' '}Please enter the complete address for smooth delivery
          </Text>

          {/* Save Address As */}
          <Text style={styles.sectionLabel}>Save Address As</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.typeBtn, addressType === 'Home' && styles.typeBtnActive]}
              onPress={() => setAddressType('Home')}
            >
              <Text style={[styles.typeBtnText, addressType === 'Home' && styles.typeBtnTextActive]}>Home</Text>
              <View style={[styles.radioOuter, addressType === 'Home' && styles.radioOuterActive]}>
                {addressType === 'Home' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeBtn, addressType === 'Work' && styles.typeBtnActive, { marginLeft: 16 }]}
              onPress={() => setAddressType('Work')}
            >
              <Text style={[styles.typeBtnText, addressType === 'Work' && styles.typeBtnTextActive]}>Work</Text>
              <View style={[styles.radioOuter, addressType === 'Work' && styles.radioOuterActive]}>
                {addressType === 'Work' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueBtn} onPress={() => onSave && onSave({ pincode, city, state, houseNo, apartment, fullName, email, addressType })}>
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopEndRadius: 28,
    borderTopStartRadius: 28,
    width: '100%',
    paddingHorizontal: 22,
    paddingBottom: 10,
    paddingTop: 36,
    alignItems: 'stretch',
    position: 'absolute',
    bottom: 0
  },
  closeBtn: {
    position: 'absolute',
    right: 18,
    top: -18,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 4,
    color: '#222',
    letterSpacing: 1,
  },
  divider: {
    height: 2,
    backgroundColor: '#222',
    width: 120,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 2,
    borderRadius: 2,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignSelf: 'stretch',
  },
  locationText: {
    fontSize: 16,
    color: '#6B3A3A',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5
  },
  halfInput: {
    flex: 1,
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    color: '#222',
  },
  infoText: {
    fontSize: 13,
    color: '#222',
    marginBottom: 10,
    marginTop: 2,
  },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  typeBtnActive: {
    borderColor: '#6B3A3A',
  },
  typeBtnText: {
    fontSize: 16,
    color: '#222',
    marginRight: 10,
  },
  typeBtnTextActive: {
    color: '#6B3A3A',
    fontWeight: 'bold',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#6B3A3A',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#6B3A3A',
  },
  continueBtn: {
    backgroundColor: '#8B005D',
    borderRadius: 32,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AddressModal;
