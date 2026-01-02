import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppImages } from '../../constants/app.image';

const orderItems = [
  {
    id: 1,
    name: 'Love & Money Attractor Brac...',
    price: '₹ 499',
    oldPrice: '₹5,397',
    qty: 1,
    image: require('../../assets/images/jearing.png'),
  },
  {
    id: 2,
    name: 'Love & Money Attractor Brac...',
    price: '₹ 499',
    oldPrice: '₹5,397',
    qty: 1,
    image: require('../../assets/images/jearing.png'),
  },
  {
    id: 3,
    name: 'Love & Money Attractor Brac...',
    price: '₹ 499',
    oldPrice: '₹5,397',
    qty: 1,
    image: require('../../assets/images/jearing.png'),
  },
  {
    id: 4,
    name: 'Nepal Origin 5 Mukhi Rudraksha Bead - Free',
    price: 'FREE Gift',
    oldPrice: '',
    qty: 1,
    image: require('../../assets/images/jearing.png'),
    isGift: true,
  },
];

const OrderSummaryModal = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Order Summary</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionDivider1} />
        <ScrollView>
          {orderItems.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={AppImages.jwel1} style={styles.itemImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Text style={item.isGift ? styles.giftPrice : styles.itemPrice}>{item.price}</Text>
                  {item.oldPrice ? (
                    <Text style={styles.itemOldPrice}> {item.oldPrice}</Text>
                  ) : null}
                </View>
                <Text style={styles.qtyText}>Quantity: {item.qty}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
    maxHeight: '70%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  closeText: {
    fontSize: 22,
    color: '#1D262D',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdfff',
    paddingBottom: 10,
  },
  itemImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    marginRight: 12,
  },
  itemName: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
  itemOldPrice: {
    fontSize: 13,
    color: '#8b8888ff',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  giftPrice: {
    fontSize: 15,
    color: '#01A337',
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 14,
    color: '#1D262D',
    fontWeight:'bold'
  },
  sectionDivider1: {
    height: 1,
    backgroundColor: '#a09c9cff',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    // marginTop: 7,
    borderRadius: 2,
  },
});

export default OrderSummaryModal;