import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Image } from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppImages } from '../../constants/app.image';

const reasons = [
  'Change of mind',
  'Delay in delivery',
  'Price concerns',
  'Mistakes in delivery',
  'Accidental order placement',
];

export default function OrderCancellationModal({ visible, onClose }) {
  const [selectedReason, setSelectedReason] = useState(reasons[0]);
  const [feedback, setFeedback] = useState('');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <AntDesign name="close" size={28} color="#868686" />
          </TouchableOpacity>
          <Text style={styles.title}>Order Cancellation</Text>
          <View style={styles.divider} />

          <View style={styles.sadFaceContainer}>
            <Text style={styles.sadFace}>☹️</Text>
          </View>
          <Text style={styles.heading}>We are sad to see you go...</Text>
          <Text style={styles.subheading}>
            Before you cancel, please let us know the reason you are cancelling your order. Every bit of feedback helps!
          </Text>

          <View style={styles.reasonsContainer}>
            {reasons.map((reason, idx) => (
              <TouchableOpacity
                key={reason}
                style={styles.reasonRow}
                onPress={() => setSelectedReason(reason)}
              >
                <View style={selectedReason === reason ? styles.radioSelected : styles.radio} />
                <Text style={styles.reasonText}>{reason}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Anything you want to share? (Optional)"
            placeholderTextColor="#908c8cff"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelLink} onPress={onClose}>
            <Text style={styles.cancelLinkText}>Nah, I changed my mind! go back to my order</Text>
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
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    minHeight: 480,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,
    color: '#0F0F0F',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#afaaaaff',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 2,
    borderRadius: 2,
  },
  sadFaceContainer: {
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 0,
  },
  sadFace: {
    fontSize: 70,
    color: '#868686',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 2,
  },
  subheading: {
    color: '#000000',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
  },
  reasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  radioSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#504e4eff',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  reasonText: {
    color: '#000000',
    fontSize: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#888585ff',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#222',
    minHeight: 60,
    marginBottom: 14,
    marginTop: 4,
  },
  submitBtn: {
    borderWidth: 1,
    borderColor: '#E63030',
    borderRadius: 45,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  submitBtnText: {
    color: '#E63030',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cancelLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  cancelLinkText: {
    color: '#2947DF',
    fontWeight: 'bold',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});