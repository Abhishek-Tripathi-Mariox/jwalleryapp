import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';

const AppliedCouponModal = ({ visible, onClose, code = 'CITINEW', amount = 100 }) => (
  <Modal
    visible={visible}
    animationType="fade"
    transparent
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <AntDesign name="checkcircleo" size={70} color="#27C46A" style={{ marginBottom: 10 }} />
        <Text style={styles.title}>Applied Coupons</Text>
        <Text style={styles.desc}>
          You saved {amount}/- on your order with{'\n'}
          <Text style={styles.code}>{code} Code</Text>
        </Text>
        <TouchableOpacity style={styles.okBtn} onPress={onClose}>
          <Text style={styles.okBtnText}>Ok! Thanks</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    width: '90%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    marginTop: 2,
    textAlign: 'center',
  },
  desc: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 22,
  },
  code: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
  },
  okBtn: {
    marginTop: 6,
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  okBtnText: {
    color: Colors.theme1,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AppliedCouponModal;