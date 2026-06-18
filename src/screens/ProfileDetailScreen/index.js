import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';
import { request } from '../../utils/api';
import { launchImageLibrary } from 'react-native-image-picker';
import { API_BASE_URL } from '../../constants/api';
import { getTokenStorage } from '../../utils/tokenStorage';

export default function ProfileDetailScreen({ navigation }) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    address: '',
    pin: '',
    city: '',
    country: '',
  });
  const [originalForm, setOriginalForm] = useState(null);
  const [avatar, setAvatar] = useState(require('../../assets/images/jwel3.jpg'));
  const [newAvatarUri, setNewAvatarUri] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await request('GET', '/user/profile');
      if (res?.code === 1 && res.data) {
        const u = res.data.user || res.data;
        const formData = {
          name: u.fullName || u.name || '',
          phone: u.mobileNumber || u.phone || '',
          email: u.email || '',
          gender: u.gender || '',
          address: u.address || '',
          pin: u.pincode || u.pin || '',
          city: u.city || '',
          country: u.country || 'India',
        };
        setForm(formData);
        setOriginalForm(formData);
        if (u.profileImages || u.profileImage) setAvatar({ uri: u.profileImages || u.profileImage });
      }
    } catch (e) {
      console.log('Profile load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    if (originalForm) setForm(originalForm);
    setNewAvatarUri(null);
    setEditMode(false);
  };

  const handlePickImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
    }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
        return;
      }
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setNewAvatarUri(asset.uri);
        setAvatar({ uri: asset.uri });
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // If new avatar selected, upload with FormData
      if (newAvatarUri) {
        const token = await getTokenStorage();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('fullName', form.name);
        formData.append('email', form.email);
        formData.append('gender', form.gender);
        formData.append('address', form.address);
        formData.append('pincode', form.pin);
        formData.append('city', form.city);
        formData.append('country', form.country);
        formData.append('profileImages', {
          uri: newAvatarUri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });

        const res = await fetch(`${API_BASE_URL}/user/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const data = await res.json();
        if (data?.code === 1) {
          setOriginalForm(form);
          setNewAvatarUri(null);
          setEditMode(false);
          Alert.alert('Success', 'Profile updated successfully');
        } else {
          Alert.alert('Error', data?.message || 'Failed to update profile');
        }
      } else {
        // No new image, just update text fields
        const res = await request('PUT', '/user/profile', {
          name: form.name,
          fullName: form.name,
          email: form.email,
          gender: form.gender,
          address: form.address,
          pincode: form.pin,
          city: form.city,
          country: form.country,
        });
        if (res?.code === 1) {
          setOriginalForm(form);
          setEditMode(false);
          Alert.alert('Success', 'Profile updated successfully');
        } else {
          Alert.alert('Error', res?.message || 'Failed to update profile');
        }
      }
    } catch (e) {
      console.log('Profile save error:', e);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.theme1} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <AntDesign name="arrowleft" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE DETAILS</Text>
        <View style={{ width: 36 }} />
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
              <TouchableOpacity style={styles.avatarEditBtn} onPress={handlePickImage}>
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
            <Text style={styles.infoLabel}>Gender</Text>
            <View style={styles.genderRow}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderChip,
                    form.gender === g && styles.genderChipActive,
                    !editMode && styles.disabledInput,
                  ]}
                  onPress={() => editMode && handleChange('gender', g)}
                  activeOpacity={editMode ? 0.7 : 1}
                >
                  <Text style={[styles.genderChipText, form.gender === g && styles.genderChipTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
              <TouchableOpacity 
                style={[styles.actionBtn, styles.saveBtn, saving && { opacity: 0.6 }]} 
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={styles.actionText}>{saving ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.cancelBtn]} 
                onPress={handleCancel}
                disabled={saving}
              >
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: Colors.theme1,
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIconContainer: {
    backgroundColor: '#fff',
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 19,
    fontWeight: '500',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
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
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.GRAY10,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderChipActive: {
    backgroundColor: Colors.theme1,
    borderColor: Colors.theme1,
  },
  genderChipText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
  genderChipTextActive: {
    color: '#fff',
    fontWeight: '600',
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
    paddingBottom: 30,
  },
});
