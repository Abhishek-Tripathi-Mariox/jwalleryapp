import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showToast } from '../../utils/toast';

const THEME = '#930e6e';

const fmtDateTime = (d) => {
  try {
    const dt = d ? new Date(d) : new Date();
    return (
      dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ', ' + dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    );
  } catch (e) { return ''; }
};
const fmtDate = (d) => {
  try { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch (e) { return ''; }
};

// A few decorative confetti pieces on the magenta hero.
const CONFETTI = [
  { top: 24, left: 30, c: '#FF77A9', r: '20deg' }, { top: 40, left: 250, c: '#FFD166', r: '-15deg' },
  { top: 70, left: 70, c: '#7AD7F0', r: '40deg' }, { top: 90, left: 290, c: '#FF8C42', r: '10deg' },
  { top: 150, left: 20, c: '#FFD166', r: '-30deg' }, { top: 160, left: 300, c: '#9B5DE5', r: '25deg' },
  { top: 200, left: 50, c: '#7AD7F0', r: '-10deg' }, { top: 210, left: 270, c: '#FF77A9', r: '35deg' },
];

export default function OrderPlacedModal({ visible, onClose, onTrackOrder, order, paymentMode, methodKey, onContinueShopping }) {
  const orderId = order?.orderId || order?._id || 'SWZ' + Date.now().toString().slice(-8);
  const orderDate = fmtDateTime(order?.createdAt);
  const estDelivery = order?.estimatedDelivery
    ? fmtDate(order.estimatedDelivery)
    : fmtDate(Date.now() + 5 * 24 * 60 * 60 * 1000);
  const methodLabel = paymentMode === 'cod'
    ? 'Cash on Delivery'
    : methodKey === 'card' ? 'Card'
    : methodKey === 'netbanking' ? 'Net Banking'
    : methodKey === 'wallet' ? 'Wallet'
    : methodKey === 'emi' ? 'EMI' : 'UPI';

  const copyId = () => {
    try {
      const { Clipboard } = require('react-native');
      Clipboard?.setString?.(String(orderId));
    } catch (e) {}
    showToast('Order ID copied', 'success');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={false} onRequestClose={onClose}>
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <AntDesign name="arrowleft" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Payment</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Hero */}
          <View style={styles.hero}>
            {CONFETTI.map((c, i) => (
              <View key={i} style={[styles.confetti, { top: c.top, left: c.left, backgroundColor: c.c, transform: [{ rotate: c.r }] }]} />
            ))}
            <View style={styles.checkOuter}>
              <View style={styles.checkInner}>
                <AntDesign name="check" size={48} color="#1DA851" />
              </View>
            </View>
            <Text style={styles.confirmTitle}>Order Confirmed!</Text>
            <Text style={styles.confirmSub}>Thank you for your purchase.</Text>

            {/* Detail card */}
            <View style={styles.card}>
              <View style={styles.cardRowTop}>
                <View>
                  <Text style={styles.cardKey}>Order ID</Text>
                  <Text style={styles.orderId}>{orderId}</Text>
                </View>
                <TouchableOpacity style={styles.copyBtn} onPress={copyId}>
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardDivider} />
              <Row label="Order Date" value={orderDate} />
              <View style={styles.cardDivider} />
              <Row label="Estimated Delivery" value={estDelivery} />
              <View style={styles.cardDivider} />
              <Row label="Payment Method" value={methodLabel} />
            </View>
          </View>
        </ScrollView>

        {/* Bottom buttons */}
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.trackBtn} onPress={onTrackOrder} activeOpacity={0.85}>
            <Text style={styles.trackText}>Track Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={onContinueShopping || onClose} activeOpacity={0.85}>
            <Text style={styles.continueText}>Continue to shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.cardKey}>{label}</Text>
      <Text style={styles.cardVal}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  topTitle: { fontSize: 17, fontWeight: '600', color: '#222' },

  hero: { backgroundColor: '#7A0C49', borderRadius: 20, margin: 14, paddingTop: 40, paddingBottom: 24, paddingHorizontal: 18, alignItems: 'center', overflow: 'hidden' },
  confetti: { position: 'absolute', width: 10, height: 10, borderRadius: 2 },
  checkOuter: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#930e6e', alignItems: 'center', justifyContent: 'center', elevation: 6 },
  checkInner: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  confirmTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginTop: 22 },
  confirmSub: { fontSize: 16, color: '#F2D6E6', marginTop: 6, marginBottom: 22 },

  card: { width: '100%', backgroundColor: '#FBF4F8', borderRadius: 14, padding: 18 },
  cardRowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardKey: { fontSize: 13, color: '#888' },
  orderId: { fontSize: 18, fontWeight: '800', color: '#222', marginTop: 4 },
  copyBtn: { borderWidth: 1, borderColor: THEME, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8 },
  copyText: { color: THEME, fontWeight: '700' },
  cardDivider: { height: 1, backgroundColor: '#eee', marginVertical: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardVal: { fontSize: 14, fontWeight: '700', color: '#222' },

  bottom: { paddingHorizontal: 30, paddingBottom: 24, paddingTop: 6 },
  trackBtn: { borderWidth: 1.5, borderColor: '#222', borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginBottom: 14 },
  trackText: { fontSize: 16, fontWeight: '600', color: '#222' },
  continueBtn: { backgroundColor: THEME, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  continueText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
