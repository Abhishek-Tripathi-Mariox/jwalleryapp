import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Linking, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';
import { request, fetchSupportInfo } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageAlert from '../../components/Modal/LanguageAlert';

const THEME = '#930e6e';
const fmt = (n) => Number(n || 0).toLocaleString('en-IN');

const ASSURANCE = [
  { icon: <FontAwesome name="diamond" size={18} color={THEME} />, label: '100% purity\nof 24k Gold' },
  { icon: <Ionicons name="shield-checkmark-outline" size={20} color={THEME} />, label: '2 years\nwarranty' },
  { icon: <Ionicons name="infinite" size={20} color={THEME} />, label: 'Premiere\nDesign' },
  { icon: <Ionicons name="arrow-undo-outline" size={20} color={THEME} />, label: 'easy 3-5\nDays return' },
];

const SOCIAL = [
  { name: 'facebook-square', url: 'https://facebook.com/swarnaz' },
  { name: 'instagram', url: 'https://instagram.com/swarnaz' },
  { name: 'twitter', url: 'https://twitter.com/swarnaz' },
  { name: 'whatsapp', url: 'https://wa.me/919319009460' },
];

export default function MyProfileScreen({ navigation }) {
  const [user, setUser] = useState({ name: '', phone: '', email: '', loyaltyPoints: 0 });
  const [loading, setLoading] = useState(true);
  const [langModal, setLangModal] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await request('GET', '/user/profile');
      if (res?.code === 1 && res.data) {
        const u = res.data.user || res.data;
        setUser({
          name: u.fullName || u.name || 'User',
          phone: u.mobileNumber || u.phone || '',
          email: u.email || '',
          avatar: u.profileImages || u.profileImage || u.avatar,
          loyaltyPoints: u.loyaltyPoints || 0,
        });
      }
    } catch (e) {
      console.log('Profile load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { setLoading(true); loadProfile(); }, []));

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (e) { console.log('Sign out error:', e); }
  };

  const openSocial = (url) => Linking.openURL(url).catch(() => {});
  const comingSoon = (label) => Alert.alert(label, 'Coming soon.');

  const ACCOUNT = [
    { icon: <Feather name="user" size={20} color="#444" />, label: 'Personal Information', onPress: () => navigation.navigate('ProfileDetail') },
    { icon: <Ionicons name="location-outline" size={20} color="#444" />, label: 'Delivery Address', onPress: () => navigation.navigate('SavedAddress') },
    { icon: <Feather name="credit-card" size={20} color="#444" />, label: 'Saved Cards', onPress: () => navigation.navigate('PaymentMethod') },
    { icon: <Feather name="shield" size={20} color="#444" />, label: 'Security & Privacy', onPress: () => comingSoon('Security & Privacy') },
    { icon: <Feather name="shopping-bag" size={20} color="#444" />, label: 'Order History', onPress: () => navigation.navigate('OrderScreen') },
    { icon: <Feather name="shopping-cart" size={20} color="#444" />, label: 'My Cart', onPress: () => navigation.navigate('Cart') },
    { icon: <Ionicons name="sync-outline" size={20} color="#444" />, label: 'Return Policy', onPress: () => comingSoon('Return Policy') },
    { icon: <Feather name="globe" size={20} color="#444" />, label: 'Language', onPress: () => setLangModal(true) },
  ];

  const SUPPORT = [
    { label: 'Help Center', onPress: () => navigation.navigate('CustomerServiceChat') },
    { label: 'Contact Us', onPress: () => navigation.navigate('CustomerServiceChat') },
    { label: 'Review', onPress: () => navigation.navigate('OrderScreen') },
  ];

  const avatarSource = user.avatar ? { uri: user.avatar } : require('../../assets/images/jwel3.jpg');

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation} title="About" showBack={false} showLogo={false}
        rightIconName="notifications-outline" onRightPress={() => navigation.navigate('Notification')} />

      {loading ? (
        <ActivityIndicator size="large" color={THEME} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* User card */}
          <TouchableOpacity style={styles.userCard} activeOpacity={0.8} onPress={() => navigation.navigate('ProfileDetail')}>
            <View style={styles.avatarWrap}>
              <Image source={avatarSource} style={styles.avatar} />
              <View style={styles.editPencil}><Feather name="edit-2" size={11} color="#fff" /></View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{user.name}</Text>
              {user.phone ? <Text style={styles.userMeta}>{user.phone}</Text> : null}
              {user.email ? <Text style={styles.userMeta}>{user.email}</Text> : null}
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          {/* Loyalty card */}
          <LinearGradient colors={['#C2186A', '#7A0C49']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loyaltyCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.loyaltyTop}>Available</Text>
              <Text style={styles.loyaltyTop}>Loyalty Point</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.loyaltyValue}>{fmt(user.loyaltyPoints)}</Text>
                <MaterialCommunityIcons name="medal-outline" size={22} color="#FFD166" style={{ marginLeft: 8 }} />
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.rewardBtn} onPress={() => Alert.alert('Rewards', `You have ${fmt(user.loyaltyPoints)} loyalty points.`)}>
                  <Text style={styles.rewardBtnText}>View Reward</Text>
                </TouchableOpacity>
                <MaterialCommunityIcons name="seal" size={26} color="#fff" style={{ marginLeft: 8 }} />
              </View>
            </View>
          </LinearGradient>

          {/* Account */}
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.list}>
            {ACCOUNT.map((it, i) => (
              <TouchableOpacity key={it.label} style={[styles.row, i === ACCOUNT.length - 1 && styles.rowLast]} onPress={it.onPress} activeOpacity={0.7}>
                <View style={styles.rowIcon}>{it.icon}</View>
                <Text style={styles.rowLabel}>{it.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bbb" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Assurance */}
          <View style={styles.assuranceRow}>
            {ASSURANCE.map((a, i) => (
              <View key={i} style={styles.assItem}>
                <View style={styles.assCircle}>{a.icon}</View>
                <Text style={styles.assLabel}>{a.label}</Text>
              </View>
            ))}
          </View>

          {/* Support */}
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.supportCard}>
            {SUPPORT.map((it, i) => (
              <TouchableOpacity key={it.label} style={[styles.row, i === SUPPORT.length - 1 && styles.rowLast]} onPress={it.onPress} activeOpacity={0.7}>
                <Text style={styles.rowLabel}>{it.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bbb" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Log out */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
            <Text style={styles.logoutText}>Log out  </Text>
            <Feather name="log-out" size={18} color={THEME} />
          </TouchableOpacity>

          {/* Follow us + Terms */}
          <View style={styles.footerRow}>
            <View>
              <Text style={styles.followLabel}>Follow us</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                {SOCIAL.map((s) => (
                  <TouchableOpacity key={s.name} onPress={() => openSocial(s.url)} style={styles.socialBtn}>
                    <FontAwesome name={s.name} size={22} color="#222" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => comingSoon('Terms and conditions')}>
              <Text style={styles.termsText}>Terms and conditions  </Text>
              <Feather name="menu" size={18} color="#222" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <LanguageAlert modalAlert={langModal} setModalAlert={setLangModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  userCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 14, marginTop: 14, borderRadius: 14, borderWidth: 1, borderColor: '#eee', padding: 14, elevation: 1 },
  avatarWrap: { marginRight: 14 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f2f2f2' },
  editPencil: { position: 'absolute', bottom: -2, right: -2, backgroundColor: THEME, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#fff' },
  userName: { fontSize: 17, fontWeight: '700', color: '#222' },
  userMeta: { fontSize: 13, color: '#666', marginTop: 2 },

  loyaltyCard: { flexDirection: 'row', marginHorizontal: 14, marginTop: 14, borderRadius: 16, padding: 18, minHeight: 120 },
  loyaltyTop: { color: '#F2D6E6', fontSize: 14, fontWeight: '600', lineHeight: 19 },
  loyaltyValue: { color: '#fff', fontSize: 30, fontWeight: '800' },
  rewardBtn: { borderWidth: 1, borderColor: '#FFD166', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  rewardBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginHorizontal: 18, marginTop: 18, marginBottom: 8 },
  list: { marginHorizontal: 14 },
  supportCard: { marginHorizontal: 14, backgroundColor: '#FCEFF6', borderRadius: 12, paddingHorizontal: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  rowLast: { borderBottomWidth: 0 },
  rowIcon: { width: 30, alignItems: 'center', marginRight: 8 },
  rowLabel: { flex: 1, fontSize: 15, color: '#333', fontWeight: '500' },

  assuranceRow: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 14, marginTop: 18 },
  assItem: { alignItems: 'center', flex: 1 },
  assCircle: { width: 50, height: 50, borderRadius: 25, borderWidth: 1.5, borderColor: THEME, alignItems: 'center', justifyContent: 'center' },
  assLabel: { fontSize: 9.5, color: '#555', textAlign: 'center', marginTop: 6, fontWeight: '500' },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#FCEFF6', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 30, marginTop: 22 },
  logoutText: { color: THEME, fontWeight: '700', fontSize: 16 },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginHorizontal: 18, marginTop: 24 },
  followLabel: { fontSize: 14, color: '#333', fontWeight: '600' },
  socialBtn: { marginRight: 14 },
  termsText: { fontSize: 13, color: '#333' },
});
