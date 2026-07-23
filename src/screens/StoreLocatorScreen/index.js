import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackHeader from '../../components/Header/BackHeader';
import { fetchStores } from '../../utils/api';

const THEME = '#930e6e';

function StoreCard({ store }) {
  const openMaps = () => {
    const query = store.latitude && store.longitude
      ? `${store.latitude},${store.longitude}`
      : store.address;
    if (!query) return;
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`).catch(() => {});
  };
  const call = () => store.phone && Linking.openURL(`tel:${store.phone}`).catch(() => {});

  return (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <Ionicons name="storefront" size={22} color={THEME} />
        <Text style={styles.storeTitle}>{store.name}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={18} color="#666" />
        <Text style={styles.infoText}>
          {[store.address, store.city, store.state, store.pincode].filter(Boolean).join(', ')}
        </Text>
      </View>
      {store.workingHours ? (
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#666" />
          <Text style={styles.infoText}>{store.workingHours}</Text>
        </View>
      ) : null}
      {store.phone ? (
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color="#666" />
          <Text style={styles.infoText}>{store.phone}</Text>
        </View>
      ) : null}

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={openMaps} activeOpacity={0.85}>
          <Ionicons name="navigate-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Directions</Text>
        </TouchableOpacity>
        {store.phone ? (
          <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={call} activeOpacity={0.85}>
            <Ionicons name="call-outline" size={18} color={THEME} />
            <Text style={[styles.btnText, { color: THEME }]}>Call</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default function StoreLocatorScreen({ navigation }) {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchStores();
        if (res?.code === 1 && Array.isArray(res.data)) setStores(res.data);
      } catch (e) {
        console.log('StoreLocator load error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation} title="STORE LOCATOR" />
      {loading ? (
        <ActivityIndicator size="large" color={THEME} style={{ marginTop: 40 }} />
      ) : stores.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="storefront-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Store details will be available soon.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {stores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  emptyText: { color: '#888', fontSize: 15 },
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 16, backgroundColor: '#fff', marginBottom: 16 },
  rowTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  storeTitle: { fontSize: 17, fontWeight: '700', color: '#222' },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 10 },
  infoText: { flex: 1, fontSize: 14, color: '#444', lineHeight: 20 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  btn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: THEME, paddingVertical: 12, borderRadius: 8 },
  btnOutline: { backgroundColor: '#fff', borderWidth: 1, borderColor: THEME },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
