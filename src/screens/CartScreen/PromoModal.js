import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppliedCouponModal from './AppliedCouponModal';
import { Colors } from '../../themes/Colors';

const THEME_COLOR = Colors.theme1;

const offers = [
  {
    id: '1',
    code: 'CITINEW',
    description: 'Get unlimited 25% discount on your first order with ICICI Bank Credit & Debit Cards',
    condition: 'On orders above 299/-',
  },
  {
    id: '2',
    code: 'CITINEW',
    description: 'Get unlimited 25% discount on your first order with ICICI Bank Credit & Debit Cards',
    condition: 'On orders above 299/-',
  },
  {
    id: '3',
    code: 'CITINEW',
    description: 'Get unlimited 25% discount on your first order with ICICI Bank Credit & Debit Cards',
    condition: 'On orders above 299/-',
  },
  {
    id: '4',
    code: 'CITINEW',
    description: 'Get unlimited 25% discount on your first order with ICICI Bank Credit & Debit Cards',
    condition: 'On orders above 299/-',
  },
];

const PromoModal = ({ visible, onClose }) => {
  const [promo, setPromo] = useState('');
  const [appliedVisible, setAppliedVisible] = useState(false);

  const handleApply = () => {
    setAppliedVisible(true);
  };

  const handleAppliedClose = () => {
    setAppliedVisible(false);
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select / <Text style={{ fontWeight: '400' }}>Enter Promo Code</Text></Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name="closecircleo" size={26} color="#B0B0B0" />
              </TouchableOpacity>
            </View>
            {/* Promo Input */}
            <View style={styles.promoInputRow}>
              <TextInput
                style={styles.promoInput}
                placeholder="Enter Promo Code"
                placeholderTextColor="#B0B0B0"
                value={promo}
                onChangeText={setPromo}
              />
              <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
            {/* Offers */}
            <Text style={styles.availableOffersTitle}>Available Offers</Text>
            <FlatList
              data={offers}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.offerCard}>
                  <Text style={styles.offerDesc}>{item.description}</Text>
                  <Text style={styles.offerCond}>{item.condition}</Text>
                  <View style={styles.offerRow}>
                    <View style={styles.codeBox}>
                      <Text style={styles.codeText}>{item.code}</Text>
                    </View>
                    <TouchableOpacity onPress={handleApply}>
                      <Text style={styles.offerApply}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 16 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
      <AppliedCouponModal
        visible={appliedVisible}
        onClose={handleAppliedClose}
        code="CITINEW"
        amount={100}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 18,
    paddingBottom: 0,
    maxHeight: '90%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  promoInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 6,
  },
  applyBtn: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 8,
    marginLeft: 10,
    elevation: 2,
    shadowColor: '#F45C5C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  availableOffersTitle: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 2,
  },
  offerCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  offerDesc: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  offerCond: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeBox: {
    borderWidth: 1.5,
    borderColor: '#FFD580',
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
    borderStyle: 'dashed',
  },
  codeText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1.2,
  },
  offerApply: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default PromoModal;