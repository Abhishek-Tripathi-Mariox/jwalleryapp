import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../components/Header/BackHeader';
import { fetchCart, updateCartItem, removeFromCart } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import { useCart } from '../../utils/CartContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function CartItem({ item, onQtyChange, onRemove }) {
  const prod = item.productId || {};
  const imageUrl = item.productImage || prod.productImages?.[0]?.url;
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={[styles.cartItemName, { flex: 1 }]}>{item.productName || prod.productName || 'Product'}</Text>
          <TouchableOpacity onPress={() => onRemove(item._id)} style={styles.deleteBtn}>
            <Icon name="delete-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cartItemSubtitle}>
          {[item.size, item.color].filter(Boolean).join(' | ')}
        </Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity 
            onPress={() => item.quantity > 1 && onQtyChange(item._id, item.quantity - 1)} 
            style={[styles.qtyBtn, item.quantity <= 1 && { opacity: 0.4 }]}
            disabled={item.quantity <= 1}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onQtyChange(item._id, item.quantity + 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cartItemPrice}>₹{item.unitPrice || prod.discountPrice || prod.price || 0}</Text>
      </View>
    </View>
  );
}

function CartScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();

  const loadCart = async () => {
    try {
      const res = await fetchCart();
      if (res?.code === 1 && res.data) {
        const cartItems = res.data.items || res.data.cart?.items || res.data || [];
        setItems(Array.isArray(cartItems) ? cartItems : []);
      }
    } catch (e) {
      console.log('Cart load error:', e);
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

  const handleQtyChange = async (itemId, newQty) => {
    try {
      await updateCartItem(itemId, newQty);
      setItems(prev =>
        prev.map(item =>
          item._id === itemId ? { ...item, quantity: newQty } : item
        )
      );
      await refreshCart(); // Update cart badge count
    } catch (e) {
      console.log('Qty update error:', e);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setItems(prev => prev.filter(item => item._id !== itemId));
      await refreshCart(); // Update cart badge count
    } catch (e) {
      console.log('Remove error:', e);
    }
  };

  const subTotal = items.reduce((sum, item) => {
    const prod = item.productId || {};
    const price = item.unitPrice || prod.discountPrice || prod.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
       <BackHeader
        navigation={navigation}
        title="CART"
        showBack={false}
        showLogo={true}
        rightIcon={AppImages.jnotification}
        onRightPress={() => navigation.navigate('Notification')}
      />
      {/* Cart List */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.theme1} />
        </View>
      ) : (
      <FlatList
        data={items}
        keyExtractor={item => item._id || item.id}
        renderItem={({ item }) => (
          <CartItem item={item} onQtyChange={handleQtyChange} onRemove={handleRemove} />
        )}
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 8, paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Image source={require('../../assets/images/jcart.png')} style={{ width: 80, height: 80, tintColor: '#ccc', marginBottom: 16 }} />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 6 }}>Your cart is empty</Text>
            <Text style={{ fontSize: 14, color: '#888' }}>Browse products and add items to your cart</Text>
          </View>
        }
      />
      )}
      {/* Subtotal */}
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>SUB TOTAL</Text>
        <Text style={styles.subtotalValue}>₹{subTotal.toLocaleString('en-IN')}</Text>
      </View>
      {/* Buy Now Button */}
      <View style={styles.buyNowContainer}>
        <TouchableOpacity
          style={styles.buyNowBtn}
          onPress={() => navigation.navigate('Checkout')}
          activeOpacity={0.85}
        >
          <Icon name="shopping-outline" size={22} color="#fff" />
          <Text style={styles.buyNowText}>PROCEED TO CHECKOUT</Text>
          <Icon name="chevron-right" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme1,
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
    tintColor: Colors.theme1,
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
  buyNowContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  buyNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 1.5,
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  deleteBtn: {
    padding: 6,
    marginTop: 4,
  },
});

export default CartScreen;