import React, { useState } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppImages } from '../../constants/app.image';
import { resizedImage } from '../../utils/imageProxy';

// Falls back to the Swarnaz logo both when no image URL is available and
// when the remote image fails to load (e.g. broken/expired S3 URL).
function SummaryItemImage({ uri }) {
  const [failed, setFailed] = useState(false);
  if (!uri || failed) {
    return <Image source={AppImages.jlogo} style={styles.itemImage} resizeMode="contain" />;
  }
  return (
    <Image
      source={{ uri: resizedImage(uri, 200) }}
      style={styles.itemImage}
      resizeMode="cover"
      onError={() => setFailed(true)}
    />
  );
}

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
              // Cart items snapshot the image onto `productImage` at add-time;
              // item.productId is just an id string when unpopulated, so fall
              // back to its populated productImages only if that ever changes.
              const imageUrl = item.productImage || item.productId?.productImages?.[0]?.url;
              const name = item.productName || item.name || 'Product';
              const price = item.discountPrice || item.price || 0;
              const originalPrice = item.originalPrice || item.mrp || '';
              const qty = item.quantity || item.qty || 1;
              const isGift = item.isGift || false;

              return (
                <View key={item._id || item.id || index} style={styles.itemRow}>
                  <SummaryItemImage uri={imageUrl} />
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
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
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