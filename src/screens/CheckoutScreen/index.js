import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCart, updateCartItem, placeOrder, applyCoupon } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import { useCart } from '../../utils/CartContext';
import { showToast } from '../../utils/toast';

const fmt = (n) => Number(n || 0).toLocaleString('en-IN');

function CheckoutItem({ item, onQtyChange }) {
  const product = item.productId || item;
  const imageUrl = product.productImages?.[0]?.url || item.productImage;
  const currentQty = item.quantity || item.qty || 1;
  const price = item.unitPrice || product.discountPrice || product.price || item.price || 0;
  const oldPrice = product.price && product.discountPrice && product.price > product.discountPrice ? product.price : 0;

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
        <Text style={styles.cartItemName} numberOfLines={2}>{product.productName || item.productName || product.brand || item.name || 'Product'}</Text>
        {(product.brand || product.material) ? <Text style={styles.cartItemSubtitle}>{product.brand || product.material}</Text> : null}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.cartItemPrice}>₹{fmt(price)}</Text>
          {oldPrice ? <Text style={styles.cartItemOld}>₹{fmt(oldPrice)}</Text> : null}
        </View>
      </View>
    </View>
  );
}

export default function CheckoutScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const { refreshCart } = useCart();

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      showToast('Please enter a promo code.', 'error');
      return;
    }
    setApplyingPromo(true);
    try {
      const res = await applyCoupon(promoCode.trim());
      if (res?.code === 1) {
        setAppliedCoupon(promoCode.trim().toUpperCase());
        showToast(res.message || 'Coupon applied!', 'success');
        loadCart();
      } else {
        showToast(res?.message || 'Invalid coupon code.', 'error');
      }
    } catch (e) {
      showToast('Could not apply coupon. Try again.', 'error');
    } finally {
      setApplyingPromo(false);
    }
  };

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

  const subTotal = items.reduce((s, it) => {
    const prod = it.productId || it;
    return s + (it.unitPrice || prod.discountPrice || prod.price || 0) * (it.quantity || it.qty || 1);
  }, 0);

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Cart Empty', 'Add items to your cart before checkout.');
      return;
    }
    navigation.navigate('OrderPaymentScreen');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <BackHeader
        navigation={navigation}
        title="Checkout"
        rightIconName="notifications-outline"
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
      {/* Subtotal */}
      {items.length > 0 && (
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>SUB TOTAL</Text>
          <Text style={styles.subtotalValue}>₹{fmt(subTotal)}</Text>
        </View>
      )}
      {/* Promo Code */}
      {appliedCoupon ? (
        <View style={styles.promoRow}>
          <Image source={require('../../assets/images/discount.png')} style={styles.promoIcon} />
          <Text style={[styles.promoText, { color: '#1DA851' }]}>“{appliedCoupon}” applied</Text>
          <TouchableOpacity onPress={() => { setAppliedCoupon(''); setPromoCode(''); }}>
            <Text style={{ color: '#930e6e', fontWeight: '700' }}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : showPromo ? (
        <View style={styles.promoInputRow}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            placeholderTextColor="#999"
            autoCapitalize="characters"
            value={promoCode}
            onChangeText={setPromoCode}
            onSubmitEditing={handleApplyPromo}
          />
          <TouchableOpacity style={styles.promoApplyBtn} onPress={handleApplyPromo} disabled={applyingPromo}>
            <Text style={styles.promoApplyText}>{applyingPromo ? '...' : 'Apply'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.promoRow} onPress={() => setShowPromo(true)} activeOpacity={0.7}>
          <Image source={require('../../assets/images/discount.png')} style={styles.promoIcon} />
          <Text style={styles.promoText}>Add promo code</Text>
        </TouchableOpacity>
      )}
      {/* Checkout Button */}
      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={handleCheckout}
      >
        <Image source={require('../../assets/images/jbag1.png')} style={styles.checkoutIcon} />
        <Text style={styles.checkoutBtnText}>Checkout</Text>
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
    color: '#930e6e',
    fontWeight: '700',
    marginBottom: 2,
    marginTop: 0,
  },
  cartItemOld: {
    fontSize: 13,
    color: '#aaa',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingTop: 8,
  },
  subtotalLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subtotalValue: {
    fontSize: 18,
    color: '#930e6e',
    fontWeight: '800',
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
    flex: 1,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 15,
    color: '#222',
    marginRight: 10,
  },
  promoApplyBtn: {
    backgroundColor: '#930e6e',
    borderRadius: 10,
    paddingHorizontal: 22,
    height: 46,
    justifyContent: 'center',
  },
  promoApplyText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
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
