import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';
import { AppIcons } from '../../constants/app.icon';
import { AppImages } from '../../constants/app.image';

const cartItems = [
  {
    id: '1',
    name: 'GIVA',
    subtitle: 'silver layered drop necklace',
    price: 500.5,
    image: AppImages.jwel,
    qty: 1,
  },
  {
    id: '2',
    name: 'FOREVERMARK',
    subtitle: 'Locke and Key',
    price: 910,
    image: AppImages.jwel1,
    qty: 1,
  },
  {
    id: '3',
    name: 'GIVA',
    subtitle: 'silver layered drop necklace',
    price: 500.5,
    image: AppImages.jwel2,
    qty: 1,
  },
  {
    id: '4',
    name: 'FOREVERMARK',
    subtitle: 'Locke and Key',
    price: 910,
    image: AppImages.jwel3,
    qty: 1,
  },
];

function CartItem({ item, onQtyChange }) {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemSubtitle}>{item.subtitle}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => onQtyChange(item.id, -1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.qty}</Text>
          <TouchableOpacity onPress={() => onQtyChange(item.id, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cartItemPrice}>Rs.{item.price}</Text>
      </View>
    </View>
  );
}

function CartScreen({ navigation }) {
  const [items, setItems] = useState(cartItems);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <Image source={require('../../assets/images/back.png')} style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CART</Text>
        <TouchableOpacity style={styles.headerBellBtn}>
          <Image source={require('../../assets/images/jnot.png')} style={styles.headerBellIcon} />
        </TouchableOpacity>
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
      {/* Subtotal */}
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>SUB TOTAL</Text>
        <Text style={styles.subtotalValue}>₹{subTotal.toFixed(1)}</Text>
      </View>
      {/* Buy Now Button */}
      <TouchableOpacity
        style={styles.buyNowBtn}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Image source={require('../../assets/images/jbag1.png')} style={styles.buyNowIcon} />
        <Text style={styles.buyNowText}>BUY NOW</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A1011B',
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
    tintColor: '#A1011B',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    flex: 1,
    textAlign: 'center',
    marginLeft: -30, // to visually center between icons
  },
  headerBellBtn: {
    backgroundColor: 'transparent',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBellIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 0,
  },
  cartItemImage: {
    width: 100,
    height: 140,
    marginRight: 14,
    resizeMode: 'cover',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
    letterSpacing: 2,
    marginTop: 8,
  },
  cartItemSubtitle: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  qtyBtn: {
    // backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  qtyBtnText: {
    fontSize: 22,
    color: '#222',
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 4,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#DD8560',
    fontWeight: '500',
    marginBottom: 2,
    marginTop: 0,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginHorizontal: 16,
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 8,
  },
  subtotalLabel: {
    fontSize: 16,
    color: '#333333',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  subtotalValue: {
    fontSize: 20,
    color: '#DD8560',
    fontWeight: '500',
    letterSpacing: 1,
  },
  buyNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A1011B',
    paddingVertical: 18,
    paddingHorizontal: 0,
    justifyContent: 'center',
    marginTop: 8,
  },
  buyNowIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 12,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
  },
});

export default CartScreen;