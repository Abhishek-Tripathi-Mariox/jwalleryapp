import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constants/app.image';
import PromoModal from './PromoModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const THEME_COLOR = '#F45C5C';

const cartItems = [
  {
    id: '1',
    name: 'Sportwear Set',
    price: 80.00,
    size: 'L',
    color: 'Cream',
    image: AppImages.girl,
    qty: 1,
  },
  {
    id: '2',
    name: 'Sportwear Set',
    price: 80.00,
    size: 'L',
    color: 'Cream',
    image: AppImages.clean2,
    qty: 1,
  },
  {
    id: '3',
    name: 'Sportwear Set',
    price: 80.00,
    size: 'L',
    color: 'Cream',
    image: AppImages.clean3,
    qty: 1,
  },
  {
    id: '4',
    name: 'Sportwear Set',
    price: 80.00,
    size: 'L',
    color: 'Cream',
    image: AppImages.clean4,
    qty: 1,
  },
];

const CartItem = ({ item, onQtyChange }) => (
  <View style={styles.cartItem}>
    <Image source={item.image} style={styles.cartItemImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>₹ {item.price.toFixed(2)}</Text>
      <Text style={styles.cartItemMeta}>Size: {item.size}  |  Color: {item.color}</Text>
    </View>
    <View style={styles.qtyContainer}>
      <TouchableOpacity onPress={() => onQtyChange(item.id, -1)} style={styles.qtyBtn}>
        <AntDesign name="minus" size={18} color="#888" />
      </TouchableOpacity>
      <Text style={styles.qtyText}>{item.qty}</Text>
      <TouchableOpacity onPress={() => onQtyChange(item.id, 1)} style={styles.qtyBtn}>
        <AntDesign name="plus" size={18} color="#888" />
      </TouchableOpacity>
    </View>
  </View>
);

const CartScreen = ({ navigation }) => {
  const [items, setItems] = useState(cartItems);
  const [promoVisible, setPromoVisible] = useState(false);

  const handleQtyChange = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const subTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = 17.4;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Your Cart
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="hearto" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Address Card */}
      <View style={styles.addressCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <AntDesign name="checkcircle" size={20} color={THEME_COLOR} />
          <Text style={styles.addressTitle}>  Delivery at (Home)</Text>
          <TouchableOpacity style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="edit-2" size={16} color={THEME_COLOR} />
            <Text style={styles.addressChange}>  Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.addressText}>
          555, FG, La Plaza, Abhay Khand, Indra Puram, Ghaziabad, U.P. 201310.  +91 8766 346 545
        </Text>
      </View>
      {/* Cart List */}
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CartItem item={item} onQtyChange={handleQtyChange} />
        )}
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 8, paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      />
      {/* Offers */}
      <View style={styles.offersSection}>
        <Text style={styles.offersTitle}>Offers</Text>
        <View style={styles.promoRow}>
          <TextInput
            style={styles.promoInput}
            placeholder="Select a promo code"
            placeholderTextColor="#B0B0B0"
            editable={false}
          />
          <TouchableOpacity onPress={() => setPromoVisible(true)}>
            <Text style={styles.promoApply}>View Offers/Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Summary */}
      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sub Total</Text>
          <Text style={styles.summaryValue}>₹{subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST</Text>
          <Text style={styles.summaryValue}>₹{gst.toFixed(2)}</Text>
        </View>
      </View>
      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutBtn}
        onPress={() => navigation.navigate('SavedAddress')}>
        <Text style={styles.checkoutBtnText}>Confirm & Checkout</Text>
      </TouchableOpacity>
      {/* Promo Modal */}
      <PromoModal visible={promoVisible} onClose={() => setPromoVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: THEME_COLOR,
    margin: 16,
    marginBottom: 8,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  addressTitle: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
  },
  addressChange: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
  },
  addressText: {
    color: '#7A7A7A',
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
    resizeMode: 'cover',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  cartItemPrice: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cartItemMeta: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 8,
  },
  offersSection: {
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 8,
  },
  offersTitle: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
    marginBottom: 6,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD580',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
  },
  promoInput: {
    flex: 1,
    fontSize: 15,
    color: '#B0B0B0',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  promoApply: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  summarySection: {
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#888',
  },
  summaryValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    margin: 16,
    marginTop: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default CartScreen;