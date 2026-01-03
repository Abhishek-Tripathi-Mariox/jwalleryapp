import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';

export default function OrderCancelModal({ visible, onClose, order, onCancelOrder, navigation }) {
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
            <AntDesign name="close" size={22} color="#999999" />
          </TouchableOpacity>
          <Text style={styles.title}>Cancel Order</Text>
          <View style={styles.divider} />

          {/* Order Info */}
          <View style={styles.orderInfoRow}>
            <Image
              source={order?.image || require('../../assets/images/jwel1.jpg')}
              style={styles.productImage}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.productName} numberOfLines={1}>
                {order?.name || 'Love & Money Attractor Brac...'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Text style={styles.productPrice}>₹ {order?.price || '499'}</Text>
                <Text style={styles.productMRP}>₹5,397</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <AntDesign name="star" size={14} color="#FFC107" />
                <Text style={styles.ratingText}>4.8</Text>
                <Text style={styles.reviewText}>(381 Reviews)</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          {/* Savings and Message */}
          <View style={{ alignSelf: 'center', justifyContent: 'center', }}>

            <View style={styles.savingsRow}>
              <Image source={require('../../assets/images/discount.png')} style={styles.promoIcon} />
              <Text style={styles.savingsText}>You saved 4000 on this product</Text>
            </View>
            <Text style={styles.cancelMsg}>
              if you cancel now, you may not be able to avail this deal again.
              {"\n"}Do you still want to cancel?
            </Text>
          </View>

          <View style={styles.sectionDivider1} />

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.dontCancelBtn} onPress={onClose}>
              <Text style={styles.dontCancelBtnText}>Don't cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancelOrder}>
              <Text style={styles.cancelBtnText}>Cancel Order</Text>
            </TouchableOpacity>

          </View>
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
    padding: 22,
    paddingBottom: 2,
    height: 310,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 10,
    zIndex: 2,
    borderRadius: 20,
    padding: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 4,
    color: '#0F0F0F',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#c2b4b4ff',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 2,
    borderRadius: 2,
  },
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: 82,
    height: 82,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  productName: {
    fontWeight: '600',
    fontSize: 13,
    color: '#000000',
    marginBottom: 2,
  },
  productPrice: {
    color: '#1D262D',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },
  productMRP: {
    color: '#8D9295',
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginLeft: 2,
  },
  ratingText: {
    color: '#FACC6A',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  reviewText: {
    color: '#000000',
    fontSize: 11,
    marginLeft: 4,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#c2b4b4ff',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 7,
    borderRadius: 2,
  },
    sectionDivider1: {
    height: 1,
    backgroundColor: '#c2b4b4ff',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    // marginTop: 7,
    borderRadius: 2,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    justifyContent:'center'
  },
  savingsText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 8,
  },
  promoIcon: {
    width: 18,
    height: 18,
    tintColor: '#1ECA6C',
    // marginRight: 8,
  },
  cancelMsg: {
    color: '#000000',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 18,
    alignSelf:'center',
    justifyContent:'center'
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  dontCancelBtn: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#2947DF',
    borderRadius: 8,
    paddingVertical: 6,
    marginRight: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dontCancelBtnText: {
    color: '#2947DF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelBtn: {
    width: '40%',
    borderWidth: 1,
    borderColor: Colors.theme1,
    borderRadius: 8,
    paddingVertical: 6,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: Colors.theme1,
    fontWeight: 'bold',
    fontSize: 14,
  },
});