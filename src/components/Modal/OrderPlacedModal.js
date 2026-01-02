import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OrderTrackModal from '../../components/Modal/OrderTrackModal';

export default function OrderPlacedModal({ visible, onClose, onTrackOrder }) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconCircle}>
            <AntDesign name="checkcircle" size={60} color="#ffffff" />
          </View>
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.subtitle}>Your order has been Placed{'\n'}Successfully</Text>
          <TouchableOpacity style={styles.trackBtn} onPress={onTrackOrder}>
            <Text style={styles.trackBtnText}>Track Your Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 18,
    elevation: 10,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#30972cff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 0,
    // borderColor: '#1ECA6C',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#323135',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '500',
    lineHeight: 24,
  },
  trackBtn: {
    backgroundColor: '#A8011C',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  trackBtnText: {
    color: '#FBFBFC',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});