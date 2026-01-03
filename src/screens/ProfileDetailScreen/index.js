import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Colors } from '../../themes/Colors';

// Dummy user data (replace with real user data as needed)
const user = {
  avatar: require('../../assets/images/jwel3.jpg'),
  name: 'Josephine Jackson',
  phone: '+91 6267266688',
  email: 'josephine.jackson@email.com',
  location: 'Brooklyn, NYC',
};


export default function ProfileDetailScreen({ navigation }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    address: '',
    pin: '',
    city: '',
    country: '',
  });
  const [avatar, setAvatar] = useState(user.avatar);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setForm({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: '',
      pin: '',
      city: '',
      country: '',
    });
    setEditMode(false);
  };
  const handleSave = () => {
    // Here you would typically update the user profile via API
    setEditMode(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
      </View>
      {/* User Info - Scrollable */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image source={avatar} style={styles.avatar} />
            {editMode && (
              <TouchableOpacity style={styles.avatarEditBtn}>
                <Image source={require('../../assets/images/jcam.png')} style={styles.avatarEditIcon} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.formGroupFull}>
            <Text style={styles.infoLabel}>Name</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={form.name}
              onChangeText={text => handleChange('name', text)}
              editable={editMode}
              placeholder="Full Name"
              placeholderTextColor="#bbb"
            />
          </View>
          <View style={styles.formGroupFull}>
            <Text style={styles.infoLabel}>Phone</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={form.phone}
              onChangeText={text => handleChange('phone', text)}
              editable={editMode}
              keyboardType="phone-pad"
              placeholder="Phone Number"
              placeholderTextColor="#bbb"
            />
          </View>
          <View style={styles.formGroupFull}>
            <Text style={styles.infoLabel}>Email</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={form.email}
              onChangeText={text => handleChange('email', text)}
              editable={editMode}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#bbb"
            />
          </View>
          <View style={styles.formGroupFull}>
            <Text style={styles.infoLabel}>Address</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={form.address}
              onChangeText={text => handleChange('address', text)}
              editable={editMode}
              placeholder="Street Address"
              placeholderTextColor="#bbb"
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 5, }}>
            <View style={[styles.formGroupFull, { width: '49.4%' }]}>
              <Text style={styles.infoLabel}>Pin Code</Text>
              <TextInput
                style={[styles.input, !editMode && styles.disabledInput]}
                value={form.pin}
                onChangeText={text => handleChange('pin', text)}
                editable={editMode}
                placeholder="Pin Code"
                placeholderTextColor="#bbb"
                keyboardType="numeric"
                maxLength={8}
              />
            </View>
            <View style={[styles.formGroupFull, { width: '49.4%' }]}>
              <Text style={styles.infoLabel}>City</Text>
              <TextInput
                style={[styles.input, !editMode && styles.disabledInput]}
                value={form.city}
                onChangeText={text => handleChange('city', text)}
                editable={editMode}
                placeholder="City"
                placeholderTextColor="#bbb"
              />
            </View>
          </View>
          <View style={styles.formGroupFull}>
            <Text style={styles.infoLabel}>Country</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={form.country}
              onChangeText={text => handleChange('country', text)}
              editable={editMode}
              placeholder="Country"
              placeholderTextColor="#bbb"
            />
          </View>
          {!editMode ? (
            <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActionsRow}>
              <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={handleSave}>
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.cancelBtn]} onPress={handleCancel}>
                <Text style={styles.actionTextCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    backgroundColor: Colors.theme1,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIconContainer: {
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.theme1,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: Colors.theme2
  },
  avatarWrapper: {
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.WHITE,
    borderWidth: 3,
    borderColor: Colors.theme1,
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: Colors.theme1,
    borderRadius: 16,
    padding: 5,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarEditIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.WHITE,
  },
  formGroupFull: {
    width: '100%',
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.theme1,
    marginBottom: 4,
    fontWeight: '700',
    marginLeft: 2,
    letterSpacing: 0.2,
  },
  input: {
    width: '100%',
    fontSize: 16,
    color: Colors.BLACK,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.theme1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 2,
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  disabledInput: {
    backgroundColor: Colors.GRAY9,
    color: Colors.GRAY6,
    borderColor: Colors.GRAY10,
  },
  editBtn: {
    marginTop: 24,
    backgroundColor: Colors.theme1,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  editText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  editActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 22,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  saveBtn: {
    backgroundColor: Colors.theme1,
  },
  cancelBtn: {
    backgroundColor: Colors.WHITE,
  },
  actionText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  actionTextCancel: {
    color: Colors.theme1,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
