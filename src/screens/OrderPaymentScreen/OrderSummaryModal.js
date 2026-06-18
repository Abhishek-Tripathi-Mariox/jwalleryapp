import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppImages } from '../../constants/app.image';

const OrderSummaryModal = ({ visible, onClose, items = [] }) => (
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
          {items.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>No items</Text>
          ) : (
            items.map((item, index) => {
              const imageUrl = item.productImages?.[0]?.url || item.image;
              const name = item.productName || item.name || 'Product';
              const price = item.discountPrice || item.price || 0;
              const originalPrice = item.originalPrice || item.mrp || '';
              const qty = item.quantity || item.qty || 1;
              const isGift = item.isGift || false;

              return (
                <View key={item._id || item.id || index} style={styles.itemRow}>
                  {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.itemImage} />
                  ) : (
                    <View style={[styles.itemImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                      <Text style={{ color: '#999', fontSize: 8 }}>No Image</Text>
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName} numberOfLines={1}>{name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                      <Text style={isGift ? styles.giftPrice : styles.itemPrice}>
                        {isGift ? 'FREE Gift' : `₹ ${price}`}
                      </Text>
                      {originalPrice ? (
                        <Text style={styles.itemOldPrice}> ₹{originalPrice}</Text>
                      ) : null}
                    </View>
                    <Text style={styles.qtyText}>Quantity: {qty}</Text>
                  </View>
                </View>
              );
            })
          )}
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