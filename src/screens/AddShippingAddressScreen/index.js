import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';
import KeyboardAware from '../../components/KeyboardAware';
import { addAddress } from '../../utils/api';
import { AppImages } from '../../constants/app.image';

const { width } = Dimensions.get('window');

const AddShippingAddressScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('Home');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!firstName.trim() || !address.trim() || !city.trim() || !state.trim() || !zipCode.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await addAddress({
        fullName: `${firstName} ${lastName}`.trim(),
        address: address,
        houseNo: address,
        city,
        state,
        pinCode: parseInt(zipCode) || 0,
        phone,
        addressType: selectedType,
      });
      if (res?.code === 1) {
        Alert.alert('Success', 'Address added successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', res?.message || 'Failed to add address');
      }
    } catch (e) {
      console.log('Add address error:', e);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#fffbe6', '#ffffff']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* Header */}

        <BackHeader
          navigation={navigation}
          title="ADD SHIPPING ADDRESS"
          rightIcon={AppImages.jnotification}
          onRightPress={() => navigation.navigate('Notification')}
        />

        {/* Form */}
        <KeyboardAware contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 18 }}>
          <View>
          <View style={styles.row}>
            <TextInput placeholder="First name" style={styles.inputHalf} placeholderTextColor="#979797" value={firstName} onChangeText={setFirstName} />
            <TextInput placeholder="Last name" style={styles.inputHalf} placeholderTextColor="#979797" value={lastName} onChangeText={setLastName} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Address" style={styles.input} placeholderTextColor="#979797" value={address} onChangeText={setAddress} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="City" style={styles.input} placeholderTextColor="#979797" value={city} onChangeText={setCity} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="State" style={styles.inputHalf} placeholderTextColor="#979797" value={state} onChangeText={setState} />
            <TextInput placeholder="ZIP code" style={styles.inputHalf} placeholderTextColor="#979797" value={zipCode} onChangeText={setZipCode} keyboardType="numeric" />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Phone number" style={styles.input} placeholderTextColor="#979797" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          <Text style={styles.saveAsLabel}>Save Address As</Text>
          <View style={styles.typeRow}>
            {['Home', 'Work', 'Other'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeBtn,
                  selectedType === type && styles.typeBtnSelected
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text style={styles.typeBtnText}>{type}</Text>
                <View style={[
                  styles.radioOuter,
                  selectedType === type && styles.radioOuterSelected
                ]}>
                  {selectedType === type && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

          {/* Add Now Button */}
          <TouchableOpacity style={[styles.addNowBtn, submitting && { opacity: 0.6 }]} onPress={handleSubmit} disabled={submitting}>
            <Text style={styles.addNowText}>{submitting ? 'SAVING...' : 'ADD NOW'}</Text>
          </TouchableOpacity>
        </KeyboardAware>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    marginHorizontal: 10
    // textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 15,
    color: '#222',
    marginBottom: 18,
    paddingVertical: 6,
    width: '100%',
  },
  inputHalf: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 15,
    color: '#222',
    marginBottom: 18,
    paddingVertical: 6,
    width: '45%',
  },
  saveAsLabel: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  typeRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    backgroundColor: '#fffcecff',
  },
  typeBtnSelected: {
    borderColor: '#000000',
    backgroundColor: '#fff',
  },
  typeBtnText: {
    fontSize: 13,
    color: '#000000',
    marginRight: 8,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#000000',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  addNowBtn: {
    backgroundColor: Colors.theme1,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 2,
  },
});

export default AddShippingAddressScreen;