import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImages } from '../../constants/app.image';
import OrderSummaryModal from './OrderSummaryModal';
import OrderPlacedModal from '../../components/Modal/OrderPlacedModal';
import OrderTrackModal from '../../components/Modal/OrderTrackModal';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';
import { fetchCart, fetchAddresses, fetchCoupons, applyCoupon, placeOrder, verifyPayment, fetchBanners } from '../../utils/api';
import RazorpayCheckout from 'react-native-razorpay';

const { width } = Dimensions.get('window');

const OrderPaymentScreen = ({ navigation }) => {
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [orderPlacedVisible, setOrderPlacedVisible] = useState(false);
  const [orderTrackVisible, setOrderTrackVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartOriginalTotal, setCartOriginalTotal] = useState(0);
  const [address, setAddress] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponCount, setCouponCount] = useState(0);
  const [promoBanner, setPromoBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMode, setPaymentMode] = useState('online'); // 'online' or 'cod'
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    setLoading(true);
    try {
      const [cartRes, addrRes, couponRes, bannerRes] = await Promise.all([
        fetchCart(),
        fetchAddresses(),
        fetchCoupons(),
        fetchBanners(),
      ]);
      if (cartRes?.code === 1 && cartRes.data) {
        const cart = cartRes.data;
        setCartItems(cart.items || cart.cartItems || []);
        setCartTotal(cart.totalPrice || cart.total || 0);
        setCartOriginalTotal(cart.originalTotal || cart.subTotal || cart.totalPrice || 0);
      }
      if (addrRes?.code === 1 && addrRes.data) {
        const addresses = Array.isArray(addrRes.data) ? addrRes.data : addrRes.data.addresses || [];
        if (addresses.length > 0) {
          const defaultAddr = addresses.find(a => a.isDefault || a.isSelected) || addresses[0];
          setAddress(defaultAddr);
        }
      }
      if (couponRes?.code === 1 && couponRes.data) {
        const coupons = Array.isArray(couponRes.data) ? couponRes.data : couponRes.data.coupons || [];
        setCouponCount(coupons.length);
      }
      if (bannerRes?.code === 1 && bannerRes.data) {
        const banners = Array.isArray(bannerRes.data) ? bannerRes.data : bannerRes.data.banners || [];
        if (banners.length > 0) {
          setPromoBanner(banners[0]);
        }
      }
    } catch (e) {
      console.log('Checkout data error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await applyCoupon(couponCode);
      if (res?.code === 1) {
        loadCheckoutData();
      }
    } catch (e) {
      console.log('Apply coupon error:', e);
    }
  };

  const handlePay = async () => {
    if (!address?._id) {
      Alert.alert('Address Required', 'Please add a delivery address before placing the order.');
      navigation.navigate('AddShippingAddress');
      return;
    }
    setPlacing(true);
    try {
      const orderData = {
        addressId: address._id,
        paymentMode: paymentMode,
      };
      const res = await placeOrder(orderData);

      if (res?.code === 1 && res.data) {
        if (paymentMode === 'online' && res.data.razorpay) {
          // Open Razorpay checkout
          const razorpayData = res.data.razorpay;
          const options = {
            description: 'Swarnaz Jewelry Purchase',
            image: '',
            currency: razorpayData.currency || 'INR',
            key: razorpayData.keyId,
            amount: razorpayData.amount,
            order_id: razorpayData.orderId,
            name: 'Swarnaz',
            theme: { color: Colors.theme1 },
          };
          try {
            const paymentResult = await RazorpayCheckout.open(options);
            // Verify payment on backend
            const verifyRes = await verifyPayment({
              orderId: res.data.order._id || res.data.order.orderId,
              razorpayOrderId: razorpayData.orderId,
              razorpayPaymentId: paymentResult.razorpay_payment_id,
              razorpaySignature: paymentResult.razorpay_signature,
            });
            if (verifyRes?.code === 1) {
              setOrderPlacedVisible(true);
            } else {
              Alert.alert('Payment Verification Failed', verifyRes?.message || 'Please contact support.');
            }
          } catch (razorpayError) {
            console.log('Razorpay error:', razorpayError);
            Alert.alert('Payment Cancelled', 'Your order has been created. You can pay later from order details.');
            setOrderPlacedVisible(true);
          }
        } else {
          // COD order placed directly
          setOrderPlacedVisible(true);
        }
      } else {
        Alert.alert('Error', res?.message || 'Failed to place order');
      }
    } catch (e) {
      console.log('Place order error:', e);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const handleTrackOrder = () => {
    setOrderPlacedVisible(false);
    setOrderTrackVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.theme1} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#fffbe6', '#ffffff']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <BackHeader
          navigation={navigation}
          title="CHECKOUT"
          rightIcon={AppImages.jnotification}
         onRightPress={() => navigation.navigate('Notification')}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
          {/* Promo Banner */}
          {promoBanner && (
            <View style={styles.greenBanner}>
              <Text style={styles.greenBannerText}>{promoBanner.title}</Text>
            </View>
          )}

          {/* Order Summary */}
          <TouchableOpacity style={styles.summaryBox} onPress={() => setSummaryVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/images/newcart.png')} style={styles.summaryIcon} />
              <Text style={styles.summaryLabel}>Order Summary </Text>
              <Image source={AppImages.jdown} style={styles.summaryIcon} />
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ textAlign: 'center' }}>

              <Text style={styles.summaryOldPrice}>₹{cartOriginalTotal.toLocaleString('en-IN')}</Text>
              <Text style={styles.summaryNewPrice}>₹{cartTotal.toLocaleString('en-IN')}</Text>
            </View>
          </TouchableOpacity>

          {/* Address */}
          {address ? (
            <View style={styles.addressBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{ marginLeft: 0, flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../assets/images/newloc1.png')} style={styles.addressIcon} />
                    <Text style={styles.addressName}>Deliver to {address.name || address.fullName || 'User'}</Text>
                  </View>
                  <Text style={styles.addressText}>
                    {[address.address || address.houseNo, address.apartment, address.city, address.state, address.pinCode || address.pincode].filter(Boolean).join(', ')}
                  </Text>
                  <Text style={styles.addressText}>
                    {[address.phone && `+91 ${address.phone}`, address.email].filter(Boolean).join('   ')}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.navigate('AddShippingAddress')}>
                <Text style={styles.changeBtnText}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addressBox} onPress={() => navigation.navigate('AddShippingAddress')}>
              <Text style={styles.addressName}>+ Add Delivery Address</Text>
            </TouchableOpacity>
          )}

          {/* Coupon Input */}
          <View style={styles.couponBox}>
            <TextInput
              placeholder="Enter coupon code"
              style={styles.couponInput}
              placeholderTextColor="#000000"
              value={couponCode}
              onChangeText={setCouponCode}
              onSubmitEditing={handleApplyCoupon}
            />
            <View style={styles.couponRow}>
              <Image source={require('../../assets/images/discount.png')} style={styles.couponIcon} />
              <Text style={styles.couponText}>{couponCount} coupons available</Text>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={styles.changeBtnText}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* Frequent Methods */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Payment Methods</Text>
          </View>

          {/* Payment UPI */}
          <TouchableOpacity style={styles.couponBox} onPress={() => setPaymentMode('online')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={paymentMode === 'online' ? styles.radioSelected : styles.radioUnselected} />
              <Image source={require('../../assets/images/cred.png')} style={styles.couponIconBig} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.couponTitle}>Pay via UPI / Online</Text>
                <Text style={styles.couponApplied}>Instant payment via Razorpay</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Cash on Delivery */}
          <TouchableOpacity style={styles.couponBox} onPress={() => setPaymentMode('cod')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={paymentMode === 'cod' ? styles.radioSelected : styles.radioUnselected} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.couponTitle}>Cash on Delivery</Text>
                <Text style={styles.couponApplied}>Pay when you receive</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>

        {/* Pay Button */}
        <TouchableOpacity
          style={[styles.payBottomBtn, placing && { opacity: 0.6 }]}
          onPress={handlePay}
          disabled={placing}
        >
          <Text style={styles.payBottomBtnText}>
            {placing ? 'PLACING ORDER...' : paymentMode === 'online' ? `PAY ₹${cartTotal.toLocaleString('en-IN')}` : 'PLACE ORDER (COD)'}
          </Text>
        </TouchableOpacity>
        <OrderSummaryModal visible={summaryVisible} onClose={() => setSummaryVisible(false)} items={cartItems} />
        <OrderPlacedModal
          visible={orderPlacedVisible}
          onClose={() => setOrderPlacedVisible(false)}
          onTrackOrder={handleTrackOrder}
        />
        <OrderTrackModal
          visible={orderTrackVisible}
          onClose={() => setOrderTrackVisible(false)}
          navigation={navigation}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme1,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
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
    marginLeft: -30,
  },
  greenBanner: {
    backgroundColor: '#01A337',
    paddingVertical: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  greenBannerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  summaryBox: {
    backgroundColor: '#f8f8f1ff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fff',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },

  summaryIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#222',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    // letterSpacing: 1,
  },
  summaryOldPrice: {
    fontSize: 12,
    color: '#636060ff',
    textDecorationLine: 'line-through',
  },
  summaryNewPrice: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  addressBox: {
    backgroundColor: '#f8f8f1ff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fff',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  addressIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: '#222',
  },
  addressName: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 11,
    color: '#000000',
    marginBottom: 2,
    marginLeft: 25
  },
  changeBtn: {
    backgroundColor: '#FFFDE9',
    borderRadius: 22,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#FFC700',
    alignSelf: 'flex-start',
  },
  changeBtnText: {
    color: '#FFC700',
    fontWeight: '600',
    fontSize: 13,
  },
  couponInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 12,
  },
  couponIcon: {
    width: 22,
    height: 22,
    marginRight: 5,
    tintColor: Colors.theme1,
  },
  couponText: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#212529',
    fontWeight: 'bold',
    flex: 1,
  },
  sectionLabel1: {
    fontSize: 14,
    color: '#212529',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 15,
    marginBottom: 10
  },
  addCardText: {
    color: '#6574FF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardRow: {
    marginHorizontal: 12,
    marginBottom: 12,
    gap: 10
  },
  cardOption: {
    backgroundColor: '#f8f8f1ff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 0,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#fff',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  radioSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#1dbf3a',
    backgroundColor: '#1dbf3a',
    marginRight: 8,
  },
  radioUnselected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#212529',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cardNumber: {
    fontSize: 15,
    color: '#615D5D',
    marginLeft: 5,
  },
  cardLogo: {
    width: 45,
    height: 45,
    left: 110,
    marginBottom: 5
  },
  couponBox: {
    backgroundColor: '#f8f8f1ff',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#fff',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  couponIconBig: {
    width: 30,
    height: 35,
    marginBottom: 30
  },
  couponTitle: {
    fontSize: 13,
    color: '#000000',
    fontWeight: 'bold',
  },
  couponApplied: {
    fontSize: 10,
    color: '#01A337',
    fontWeight: 'bold',
  },
  couponDesc: {
    fontSize: 10,
    color: '#000000',
  },
  couponKnowMore: {
    fontSize: 12,
    color: '#000000',
  },
  payBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderWidth: 0.5,
    borderColor: '#000000',
    alignSelf: 'flex-end',
    marginLeft: 40,
  },
  payBtnText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  payBottomBtn: {
    backgroundColor: Colors.theme1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  payBottomBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
  },
});

export default OrderPaymentScreen;