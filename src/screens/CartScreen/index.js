import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../components/Header/BackHeader';
import { fetchCart, updateCartItem, removeFromCart, fetchAddresses, fetchWishlist, addToCart, fetchProfile } from '../../utils/api';
import { resizedImage } from '../../utils/imageProxy';
import { useFocusEffect } from '@react-navigation/native';
import { useCart } from '../../utils/CartContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppImages } from '../../constants/app.image';

const THEME = '#930e6e';
const fmt = (n) => Number(n || 0).toLocaleString('en-IN');

const ASSURANCE = [
  { icon: <FontAwesome name="diamond" size={20} color="#fff" />, label: '100% purity\nof 24k Gold' },
  { icon: <Ionicons name="shield-checkmark-outline" size={22} color="#fff" />, label: '2 years\nwarranty' },
  { icon: <Ionicons name="infinite" size={22} color="#fff" />, label: 'Premiere\nDesign' },
  { icon: <Ionicons name="arrow-undo-outline" size={22} color="#fff" />, label: 'easy 3-5\nDays return' },
];

function CartItem({ item, onQtyChange, onRemove }) {
  const prod = item.productId || {};
  const imageUrl = item.productImage || prod.productImages?.[0]?.url;
  const price = item.unitPrice || prod.discountPrice || prod.price || 0;
  const oldPrice = prod.price && prod.discountPrice && prod.price > prod.discountPrice ? prod.price : 0;
  return (
    <View style={styles.cartItem}>
      {imageUrl ? (
        <Image source={{ uri: resizedImage(imageUrl, 300) }} style={styles.cartItemImage} />
      ) : (
        <View style={[styles.cartItemImage, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#999', fontSize: 10 }}>No Image</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cartItemName} numberOfLines={1}>{item.productName || prod.productName || 'Product'}</Text>
          <TouchableOpacity onPress={() => onRemove(item._id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        {(prod.brand || prod.material) ? <Text style={styles.cartItemSub}>{prod.brand || prod.material}</Text> : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Text style={styles.cartItemPrice}>₹{fmt(price)}</Text>
          {oldPrice ? <Text style={styles.cartItemOld}>₹{fmt(oldPrice)}</Text> : null}
        </View>
        <View style={styles.freeShipRow}>
          <Icon name="truck-fast-outline" size={15} color={THEME} />
          <Text style={styles.freeShipText}> Free Shipping</Text>
        </View>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => item.quantity > 1 && onQtyChange(item._id, item.quantity - 1)}
            style={[styles.qtyBtn, item.quantity <= 1 && { opacity: 0.4 }]}
            disabled={item.quantity <= 1}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onQtyChange(item._id, item.quantity + 1)} style={[styles.qtyBtn, styles.qtyBtnPlus]}>
            <Text style={[styles.qtyBtnText, { color: '#fff' }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function CartScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [address, setAddress] = useState(null);
  const [points, setPoints] = useState(0);
  const { refreshCart } = useCart();

  const loadCart = async () => {
    try {
      const [cartRes, wishRes, addrRes, profRes] = await Promise.all([
        fetchCart().catch(() => null),
        fetchWishlist().catch(() => null),
        fetchAddresses().catch(() => null),
        fetchProfile().catch(() => null),
      ]);
      if (profRes?.code === 1 && profRes.data) {
        const u = profRes.data.user || profRes.data;
        setPoints(u.loyaltyPoints || 0);
      }
      if (cartRes?.code === 1 && cartRes.data) {
        const cartItems = cartRes.data.items || cartRes.data.cart?.items || cartRes.data || [];
        setItems(Array.isArray(cartItems) ? cartItems : []);
      }
      if (wishRes?.code === 1 && wishRes.data) {
        const w = wishRes.data.wishlist || wishRes.data.items || wishRes.data || [];
        setWishlist((Array.isArray(w) ? w : []).slice(0, 6));
      }
      if (addrRes?.code === 1 && addrRes.data) {
        const list = addrRes.data.addresses || addrRes.data || [];
        const arr = Array.isArray(list) ? list : [];
        setAddress(arr.find(a => a.isSelected || a.isDefault) || arr[0] || null);
      }
    } catch (e) {
      console.log('Cart load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { setLoading(true); loadCart(); }, []));

  const handleQtyChange = async (itemId, newQty) => {
    try {
      await updateCartItem(itemId, newQty);
      setItems(prev => prev.map(it => (it._id === itemId ? { ...it, quantity: newQty } : it)));
      await refreshCart();
    } catch (e) { console.log('Qty update error:', e); }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setItems(prev => prev.filter(it => it._id !== itemId));
      await refreshCart();
    } catch (e) { console.log('Remove error:', e); }
  };

  const handleWishlistAdd = async (productId) => {
    try { await addToCart(productId, 1); await refreshCart(); loadCart(); } catch (e) {}
  };

  const subTotal = items.reduce((s, it) => {
    const prod = it.productId || {};
    return s + (it.unitPrice || prod.discountPrice || prod.price || 0) * (it.quantity || 1);
  }, 0);
  const originalTotal = items.reduce((s, it) => {
    const prod = it.productId || {};
    return s + (prod.price || prod.discountPrice || 0) * (it.quantity || 1);
  }, 0);
  const discount = Math.max(0, originalTotal - subTotal);
  const itemCount = items.reduce((s, it) => s + (it.quantity || 1), 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <BackHeader navigation={navigation} title="Cart" showBack={true} showLogo={false}
        rightIconName="heart-outline"
        onRightPress={() => navigation.navigate('Wishlist')} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={THEME} />
        </View>
      ) : items.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="cart-outline" size={70} color="#ddd" />
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginTop: 12 }}>Your cart is empty</Text>
          <Text style={{ fontSize: 14, color: '#888', marginTop: 4 }}>Browse products and add items</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Reward points bar */}
          <View style={styles.rewardBar}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rewardLabel}>Reward points · {points}</Text>
              <View style={styles.rewardTrack}>
                <View style={[styles.rewardFill, { width: `${Math.min(100, (points % 1000) / 10)}%` }]} />
              </View>
            </View>
            <View style={styles.rewardInfo}>
              <Text style={{ color: THEME, fontWeight: '700' }}>!</Text>
            </View>
          </View>

          {/* Cart items */}
          {items.map((it) => (
            <CartItem key={it._id} item={it} onQtyChange={handleQtyChange} onRemove={handleRemove} />
          ))}

          {/* Add Coupon & Rewards */}
          <TouchableOpacity style={styles.couponRow} activeOpacity={0.8} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.couponText}>Add Coupon & Rewards</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="pricetag-outline" size={18} color={THEME} />
              <Ionicons name="chevron-forward" size={18} color="#888" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>

          {/* Assurance row */}
          <View style={styles.assuranceRow}>
            {ASSURANCE.map((a, i) => (
              <View key={i} style={styles.assuranceItem}>
                <View style={styles.assuranceIcon}>{a.icon}</View>
                <Text style={styles.assuranceLabel}>{a.label}</Text>
              </View>
            ))}
          </View>

          {/* Product detail summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryHead}>Product detail</Text>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryKey}>Subtotal ( {itemCount} item )</Text>
              <Text style={styles.summaryVal}>₹{fmt(originalTotal || subTotal)}</Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryKey}>Shipping</Text>
              <Text style={[styles.summaryVal, { color: '#1DA851' }]}>FREE</Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryKey}>Discount</Text>
              <Text style={[styles.summaryVal, { color: '#1DA851' }]}>-₹{fmt(discount)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryLine}>
              <Text style={styles.summaryTotal}>Total Amount</Text>
              <Text style={[styles.summaryTotal, { color: THEME }]}>₹{fmt(subTotal)}</Text>
            </View>
          </View>
          <Text style={styles.secureText}>100%  Secure payments</Text>

          {/* Deliver to */}
          <View style={styles.deliverCard}>
            <View style={styles.deliverHead}>
              <Text style={styles.deliverTitle}>Deliver to</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SavedAddress')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.changesText}>Changes</Text>
                <Ionicons name="chevron-forward" size={16} color={THEME} />
              </TouchableOpacity>
            </View>
            <View style={styles.deliverDivider} />
            {address ? (
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.timeline}>
                  <Ionicons name="home-outline" size={20} color={THEME} />
                  <View style={styles.timelineLine} />
                  <View style={styles.timelineDot} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.deliverName}>{address.name || address.fullName || 'User'}</Text>
                  <Text style={styles.deliverLine}>{address.phone ? `+91${address.phone}` : ''}</Text>
                  <Text style={styles.deliverLine}>
                    {[address.address || address.houseNo, address.apartment, address.city, address.state, address.pinCode || address.pincode].filter(Boolean).join(', ')}
                  </Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('AddShippingAddress')}>
                <Text style={{ color: THEME, fontWeight: '600' }}>+ Add Delivery Address</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Your Wishlist */}
          {wishlist.length > 0 && (
            <View style={{ marginTop: 18 }}>
              <View style={styles.wishHead}>
                <Text style={styles.wishTitle}>Your Wishlist ({wishlist.length})</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.viewAll}>View All </Text>
                  <Ionicons name="arrow-forward" size={14} color={THEME} />
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
                {wishlist.map((p) => {
                  const prodObj = (p.productId && typeof p.productId === 'object') ? p.productId : null;
                  const pid = (typeof p.productId === 'string' ? p.productId : prodObj?._id) || p._id;
                  const img = p.productImage || p.productImages?.[0]?.url || prodObj?.productImages?.[0]?.url;
                  const name = p.productName || prodObj?.productName || 'Product';
                  const price = p.discountPrice || p.price || prodObj?.discountPrice || prodObj?.price;
                  return (
                    <View key={p._id || pid} style={styles.wishCard}>
                      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: pid })} activeOpacity={0.85}>
                        {img ? <Image source={{ uri: resizedImage(img, 300) }} style={styles.wishImage} /> : <View style={[styles.wishImage, { backgroundColor: '#eee' }]} />}
                      </TouchableOpacity>
                      <Text style={styles.wishName} numberOfLines={1}>{name}</Text>
                      <Text style={styles.wishPrice}>₹{fmt(price)}</Text>
                      <TouchableOpacity style={styles.wishAddBtn} onPress={() => handleWishlistAdd(pid)}>
                        <Icon name="cart-outline" size={14} color={THEME} />
                        <Text style={styles.wishAddText}> Add to Cart</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      )}

      {/* Bottom bar */}
      {!loading && items.length > 0 && (
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomTotal}>₹{fmt(subTotal)}</Text>
            {discount > 0 && <Text style={styles.bottomOld}>₹{fmt(originalTotal)}</Text>}
          </View>
          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Checkout')} activeOpacity={0.85}>
            <Text style={styles.continueText}>Continue to Payment</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  rewardBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FCEFF6', borderRadius: 12, marginHorizontal: 14, marginTop: 12, marginBottom: 6, padding: 14 },
  rewardLabel: { fontSize: 13, color: '#444', marginBottom: 8 },
  rewardTrack: { height: 6, borderRadius: 3, backgroundColor: '#F2D6E6' },
  rewardFill: { height: 6, borderRadius: 3, backgroundColor: THEME },
  rewardInfo: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: THEME, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },

  cartItem: { flexDirection: 'row', marginHorizontal: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  cartItemImage: { width: 92, height: 92, borderRadius: 10, marginRight: 14, backgroundColor: '#f2f2f2', resizeMode: 'cover' },
  cartItemName: { flex: 1, fontSize: 16, fontWeight: '700', color: '#222' },
  cartItemSub: { fontSize: 12, color: '#888', marginTop: 2 },
  cartItemPrice: { fontSize: 15, fontWeight: '700', color: THEME },
  cartItemOld: { fontSize: 12, color: '#aaa', textDecorationLine: 'line-through', marginLeft: 8 },
  freeShipRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  freeShipText: { fontSize: 12, color: THEME },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { borderRadius: 6, borderWidth: 1, borderColor: '#ddd', width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
  qtyBtnPlus: { backgroundColor: THEME, borderColor: THEME },
  qtyBtnText: { fontSize: 18, color: '#222', fontWeight: 'bold' },
  qtyText: { fontSize: 15, fontWeight: '700', color: '#222', marginHorizontal: 14 },

  couponRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 14, marginTop: 14, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: THEME, borderStyle: 'dashed' },
  couponText: { fontSize: 15, fontWeight: '700', color: '#222' },

  assuranceRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#F6F6F6', marginHorizontal: 14, marginTop: 14, borderRadius: 12, paddingVertical: 14 },
  assuranceItem: { alignItems: 'center', flex: 1 },
  assuranceIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: THEME, alignItems: 'center', justifyContent: 'center' },
  assuranceLabel: { fontSize: 10, color: '#444', textAlign: 'center', marginTop: 6, fontWeight: '500' },

  summaryCard: { backgroundColor: '#FCEFF6', marginHorizontal: 14, marginTop: 16, borderRadius: 12, padding: 16 },
  summaryHead: { fontSize: 15, fontWeight: '700', color: '#222', marginBottom: 12 },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryKey: { fontSize: 14, color: '#555' },
  summaryVal: { fontSize: 14, color: '#222', fontWeight: '600' },
  summaryDivider: { height: 1, borderBottomWidth: 1, borderColor: '#E9C9DC', borderStyle: 'dashed', marginVertical: 4 },
  summaryTotal: { fontSize: 17, fontWeight: '800', color: '#222', marginTop: 4 },
  secureText: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 8 },

  deliverCard: { marginHorizontal: 14, marginTop: 14, borderRadius: 14, borderWidth: 1, borderColor: '#eee', padding: 16 },
  deliverHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  deliverTitle: { fontSize: 15, fontWeight: '700', color: '#222' },
  changesText: { color: THEME, fontWeight: '700', fontSize: 13 },
  deliverDivider: { height: 1, backgroundColor: '#eee', marginBottom: 12 },
  timeline: { alignItems: 'center', width: 22 },
  timelineLine: { width: 2, flex: 1, minHeight: 26, backgroundColor: THEME, marginTop: 2 },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: THEME, marginTop: 2 },
  deliverName: { fontSize: 15, fontWeight: '700', color: '#222' },
  deliverLine: { fontSize: 13, color: '#555', marginTop: 2 },

  wishHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 14, marginBottom: 10 },
  wishTitle: { fontSize: 14, fontWeight: '700', color: THEME },
  viewAll: { fontSize: 12, color: THEME, fontWeight: '600' },
  wishCard: { width: 120, marginRight: 12 },
  wishImage: { width: 120, height: 110, borderRadius: 10, backgroundColor: '#f2f2f2', resizeMode: 'cover' },
  wishName: { fontSize: 12, color: '#333', fontWeight: '600', marginTop: 6 },
  wishPrice: { fontSize: 13, color: THEME, fontWeight: '700', marginTop: 2 },
  wishAddBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: THEME, borderRadius: 8, paddingVertical: 6, marginTop: 6 },
  wishAddText: { fontSize: 11, color: THEME, fontWeight: '700' },

  bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  bottomTotal: { fontSize: 20, fontWeight: '800', color: THEME },
  bottomOld: { fontSize: 13, color: '#aaa', textDecorationLine: 'line-through' },
  continueBtn: { backgroundColor: THEME, borderRadius: 12, paddingHorizontal: 28, paddingVertical: 15 },
  continueText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default CartScreen;
