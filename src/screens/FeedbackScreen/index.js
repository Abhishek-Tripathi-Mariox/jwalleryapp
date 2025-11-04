import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes/Colors';

const { width } = Dimensions.get('window');
const THEME_COLOR = Colors.theme1;

const FeedbackScreen = ({ navigation }) => {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share your feedback</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.question}>What is your opinion of ShopNear?</Text>
        <View style={styles.starsRow}>
          {[1,2,3,4,5].map(i => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <AntDesign
                name="star"
                size={38}
                color={i <= rating ? '#000' : '#D3D3D3'}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Would you like to write anything about this product?"
            placeholderTextColor="#b0b0b0"
            multiline
            maxLength={200}
            value={feedback}
            onChangeText={setFeedback}
          />
          <Text style={styles.charCount}>50 characters</Text>
        </View>
        <View style={styles.imageRow}>
          <TouchableOpacity style={styles.imageBox}>
            <Feather name="image" size={32} color="#b0b0b0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageBox}>
            <Feather name="camera" size={32} color="#b0b0b0" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.sendButtonText}>Send feedback</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconCircle}>
              <AntDesign name="checkcircle" size={48} color="#4BB543" />
            </View>
            <Text style={styles.modalTitle}>Thank you for your feedback!</Text>
            <Text style={styles.modalText}>
              We appreciated your feedback.{"\n"}We'll use your feedback to improve your experience.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  star: {
    marginHorizontal: 6,
  },
  textAreaContainer: {
    width: width - 32,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    height: 220,
  },
  textArea: {
    fontSize: 16,
    color: '#222',
    minHeight: 70,
    textAlignVertical: 'top',
  },
  charCount: {
    color: '#888',
    fontSize: 13,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  imageRow: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 8,
  },
  imageBox: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderStyle: 'dashed',
  },
  sendButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 30,
    width: '80%',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  modalIconCircle: {
    backgroundColor: '#EAFBE7',
    borderRadius: 40,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 36,
    alignSelf: 'center',
marginTop: 20
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FeedbackScreen;