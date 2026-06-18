import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCart, updateCartItem, placeOrder } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import { useCart } from '../../utils/CartContext';

function CheckoutItem({ item, onQtyChange }) {
  const product = item.productId || item;
  const imageUrl = product.productImages?.[0]?.url || item.productImage;
  const currentQty = item.quantity || item.qty || 1;

  return (
    <View style={styles.cartItem}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.cartItemImage} />
      ) : (
        <View style={[styles.cartItemImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#999', fontSize: 10 }}>No Image</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.cartItemName}>{product.brand || product.productName || item.name}</Text>
        <Text style={styles.cartItemSubtitle}>{product.productName || item.subtitle}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity 
            onPress={() => currentQty > 1 && onQtyChange(item._id || item.id, -1)} 
            style={[styles.qtyBtn, currentQty <= 1 && { opacity: 0.4 }]}
            disabled={currentQty <= 1}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{currentQty}</Text>
          <TouchableOpacity onPress={() => onQtyChange(item._id || item.id, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cartItemPrice}>₹{product.discountPrice || product.price || item.price}</Text>
      </View>
    </View>
  );
}

export default function CheckoutScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();

  const loadCart = async () => {
    try {
      const res = await fetchCart();
      if (res?.code === 1 && res.data) {
        const list = res.data.cart?.items || res.data.items || res.data || [];
        setItems(Array.isArray(list) ? list : []);
      }
    } catch (e) {
      console.log('Checkout load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadCart();
    }, [])
  );

  const handleQtyChange = async (id, delta) => {
    const item = items.find(i => (i._id || i.id) === id);
    if (!item) return;
    const currentQty = item.quantity || item.qty || 1;
    const newQty = Math.max(1, currentQty + delta);
    if (newQty === currentQty) return; // Don't update if no change
    try {
      await updateCartItem(id, newQty);
      setItems(prev => prev.map(i => (i._id || i.id) === id ? { ...i, quantity: newQty, qty: newQty } : i));
      await refreshCart(); // Update cart badge count
    } catch (e) {
      console.log('Update qty error:', e);
    }
  };

  const handleCheckout = async () => {
    navigation.navigate('OrderPlaced');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <BackHeader
        navigation={navigation}
        title="CHECKOUT"
        rightIcon={AppImages.jnotification}
        onRightPress={() => navigation.navigate('Notification')}
      />
      {/* Cart List */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.theme1} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item._id || item.id || String(Math.random())}
          renderItem={({ item }) => (
            <CheckoutItem item={item} onQtyChange={handleQtyChange} />
          )}
          contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 8, paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>Your cart is empty.</Text>}
        />
      )}
      {/* Promo Code */}
      <View style={styles.promoRow}>
        <Image source={require('../../assets/images/discount.png')} style={styles.promoIcon} />
        <Text style={styles.promoText}>Add promo code</Text>
      </View>
      {/* Checkout Button */}
      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={handleCheckout}
      >
        <Image source={require('../../assets/images/jbag1.png')} style={styles.checkoutIcon} />
        <Text style={styles.checkoutBtnText}>CHECKOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginHorizontal: 16,
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 8,
  },
  promoIcon: {
    width: 22,
    height: 22,
    tintColor: Colors.theme1,
    marginRight: 8,
  },
  promoText: {
    fontSize: 16,
    color: '#888',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme1,
    paddingVertical: 18,
    paddingHorizontal: 0,
    justifyContent: 'center',
    marginTop: 8,
  },
  checkoutIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 12,
  },
  checkoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
  },
});
