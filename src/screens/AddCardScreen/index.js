import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Colors } from '../../themes/Colors';

export default function AddCardScreen({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconCircle}>
              <Text style={styles.modalCheck}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalMsg}>Your new card has been added.</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>Thanks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.headerBackIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NEW CARD</Text>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Add Debit or Credit Card</Text>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your card number"
          placeholderTextColor="#A7A5AF"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
          maxLength={19}
        />
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="#bbb"
              value={expiry}
              onChangeText={setExpiry}
              maxLength={5}
              keyboardType="number-pad"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Security Code</Text>
            <View style={styles.cvcRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="CVC"
                placeholderTextColor="#bbb"
                value={cvc}
                onChangeText={setCvc}
                maxLength={4}
                keyboardType="number-pad"
                secureTextEntry
              />
              <TouchableOpacity style={styles.cvcInfoBtn}>
                <Text style={styles.cvcInfoText}>?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addCardBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addCardBtnText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

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
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
    marginLeft: -30,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(255,251,230,0.5)',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#323135',
    marginBottom: 24,
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#323135',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#EEEEF1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },
  cvcRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cvcInfoBtn: {
    marginLeft: 8,
    backgroundColor: '#eee',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    right:10,
    borderWidth:1,
    borderColor:'#A7A5AF',
  },
  cvcInfoText: {
    color: '#A7A5AF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addCardBtn: {
    backgroundColor: Colors.theme1,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  addCardBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  modalIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalCheck: {
    color: '#1DB954',
    fontSize: 36,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    marginTop: 2,
    textAlign: 'center',
  },
  modalMsg: {
    fontSize: 15,
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
  },
  modalBtn: {
    backgroundColor: Colors.theme1,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
});