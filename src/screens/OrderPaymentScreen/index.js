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
import { fetchCart, fetchAddresses, fetchCoupons, applyCoupon, removeCoupon, placeOrder, verifyPayment, fetchBanners } from '../../utils/api';
import RazorpayCheckout from 'react-native-razorpay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PaymentBrandIcon from '../../components/icons/PaymentBrandIcons';

const { width } = Dimensions.get('window');

const OrderPaymentScreen = ({ navigation }) => {
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [orderPlacedVisible, setOrderPlacedVisible] = useState(false);
  const [orderTrackVisible, setOrderTrackVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartOriginalTotal, setCartOriginalTotal] = useState(0);
  const [cartShipping, setCartShipping] = useState(0);
  const [cartPlatformFee, setCartPlatformFee] = useState(0);
  const [cartGst, setCartGst] = useState(0);
  const [address, setAddress] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponCount, setCouponCount] = useState(0);
  const [promoBanner, setPromoBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [paymentMode, setPaymentMode] = useState('online'); // 'online' or 'cod'
  const [placedOrder, setPlacedOrder] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('gpay');
  const [placing, setPlacing] = useState(false);

  // All online methods route through Razorpay; only COD is handled directly.
  const selectMethod = (key) => {
    setSelectedMethod(key);
    setPaymentMode(key === 'cod' ? 'cod' : 'online');
  };
  const COD_FEE = 49;

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    setLoading(true);
    setLoadError(false);
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
        // Cart API returns { subtotal, grandTotal, ... } (see backend Cart
        // model) — grandTotal already includes shipping/platform fee minus
        // any coupon discount; subtotal is the pre-coupon sum.
        setCartTotal(cart.grandTotal ?? cart.subtotal ?? 0);
        setCartOriginalTotal(cart.subtotal ?? cart.grandTotal ?? 0);
        setCartShipping(cart.shippingCost || 0);
        setCartPlatformFee(cart.platformFee || 0);
        setCartGst(cart.gstAmount || 0);
        setAppliedCoupon(cart.couponCode || '');
        setCouponDiscount(Number(cart.couponDiscount) || 0);
      } else {
        // A bad (non-throwing) response left cartTotal at its 0 default —
        // that's the "payable amount shows zero" bug, not an empty cart.
        setLoadError(true);
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
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setApplyingCoupon(true);
    try {
      const res = await applyCoupon(couponInput.trim());
      if (res?.code === 1) {
        setCouponInput('');
        await loadCheckoutData();
      } else {
        Alert.alert('Coupon', res?.message || 'Could not apply this coupon.');
      }
    } catch (e) {
      console.log('Apply coupon error:', e);
      Alert.alert('Coupon', 'Could not apply coupon. Please try again.');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setApplyingCoupon(true);
    try {
      await removeCoupon();
      await loadCheckoutData();
    } catch (e) {
      console.log('Remove coupon error:', e);
    } finally {
      setApplyingCoupon(false);
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
        setPlacedOrder({ order: res.data.order, paymentMode, method: selectedMethod });
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
            // The checkout SDK only rejects when the payment did NOT go through
            // (user cancelled, wrong PIN, bank declined, UPI app/QR error, etc.) —
            // it never rejects after a successful charge. Showing the "Order
            // Confirmed" success screen here would tell the customer they paid
            // when they didn't. If a charge somehow does land after this point
            // (e.g. app backgrounded mid-payment), Razorpay's webhook reconciles
            // the order server-side independently of this screen.
            const cancelled = razorpayError?.code === 0 || razorpayError?.code === '0';
            Alert.alert(
              cancelled ? 'Payment Cancelled' : 'Payment Failed',
              cancelled
                ? 'You cancelled the payment before it completed. Your order has been saved as pending — you can check its status under My Orders.'
                : (razorpayError?.description ||
                    'Your payment could not be completed. Your order has been saved as pending — you can check its status under My Orders.'),
              [{ text: 'View My Orders', onPress: () => navigation.navigate('OrderScreen') }, { text: 'OK' }],
            );
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
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} edges={['bottom']}>
        <ActivityIndicator size="large" color={Colors.theme1} />
      </SafeAreaView>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }} edges={['bottom']}>
        <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 16 }}>
          Could not load your checkout details. Please try again.
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: Colors.theme1, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 24 }}
          onPress={loadCheckoutData}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <LinearGradient
        colors={['#fffbe6', '#ffffff']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <BackHeader
          navigation={navigation}
          title="Checkout"
          rightIconName="notifications-outline"
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

          {/* Total Payable card */}
          <View style={styles.totalCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.totalLabel}>total payable</Text>
              <Text style={styles.totalAmount}>₹{cartTotal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', height: 44 }}>
              <TouchableOpacity onPress={() => setSummaryVisible(true)}>
                <Text style={styles.viewDetail}>View Detail</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="shield-checkmark-outline" size={13} color="#888" />
                <Text style={styles.secureText}> Secure payments</Text>
              </View>
            </View>
          </View>

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

          {/* UPI */}
          <Text style={styles.groupTitle}>UPI</Text>
          <View style={styles.methodGroup}>
            {[
              { key: 'gpay', label: 'Google Pay', icon: <PaymentBrandIcon name="googlepay" size={20} /> },
              { key: 'phonepe', label: 'PhonePe', icon: <PaymentBrandIcon name="phonepe" size={20} /> },
              { key: 'paytm', label: 'Paytm', icon: <PaymentBrandIcon name="paytm" size={20} /> },
              { key: 'upi', label: 'Other UPI Apps', icon: <MaterialCommunityIcons name="bank-transfer" size={20} color="#222" /> },
            ].map((m, i, arr) => (
              <TouchableOpacity
                key={m.key}
                style={[styles.methodRow, i === arr.length - 1 && styles.methodRowLast]}
                onPress={() => selectMethod(m.key)}
                activeOpacity={0.7}
              >
                <View style={styles.methodIconWrap}>{m.icon}</View>
                <Text style={styles.methodLabel}>{m.label}</Text>
                <View style={selectedMethod === m.key ? styles.radioOn : styles.radioOff} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Cards */}
          <Text style={styles.groupTitle}>Cards</Text>
          <TouchableOpacity style={styles.cardAddRow} onPress={() => selectMethod('card')} activeOpacity={0.7}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="card-outline" size={20} color="#222" />
              <Text style={[styles.methodLabel, { marginLeft: 10 }]}>Add New Card</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.cardBrands}>VISA  MC  RuPay</Text>
              {selectedMethod === 'card' && <Ionicons name="checkmark-circle" size={20} color="#930e6e" style={{ marginLeft: 8 }} />}
            </View>
          </TouchableOpacity>

          {/* Other Options */}
          <Text style={styles.groupTitle}>Other Options</Text>
          <View style={styles.methodGroup}>
            {[
              { key: 'netbanking', label: 'Net Banking' },
              { key: 'emi', label: 'EMI (Easy Installments)' },
              { key: 'cod', label: 'Cash on Delivery', right: `₹${COD_FEE}` },
              { key: 'wallet', label: 'Wallets' },
            ].map((m, i, arr) => (
              <TouchableOpacity
                key={m.key}
                style={[styles.optionRow, i === arr.length - 1 && styles.methodRowLast]}
                onPress={() => selectMethod(m.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.methodLabel}>{m.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {m.right ? <Text style={styles.codFee}>{m.right}</Text> : null}
                  {selectedMethod === m.key
                    ? <Ionicons name="checkmark-circle" size={20} color="#930e6e" style={{ marginLeft: 8 }} />
                    : <Ionicons name="chevron-forward" size={18} color="#bbb" style={{ marginLeft: 8 }} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Offer & Deals */}
          <Text style={styles.groupTitle}>Offer & Deals</Text>
          <View style={styles.couponBox}>
            {appliedCoupon ? (
              <View style={styles.couponRow}>
                <Image source={require('../../assets/images/discount.png')} style={styles.couponIcon} />
                <Text style={[styles.couponText, { color: '#1DA851' }]}>
                  “{appliedCoupon}” applied{couponDiscount > 0 ? ` — you saved ₹${couponDiscount.toLocaleString('en-IN')}` : ''}
                </Text>
                <TouchableOpacity style={styles.changeBtn} onPress={handleRemoveCoupon} disabled={applyingCoupon}>
                  <Text style={styles.changeBtnText}>{applyingCoupon ? '...' : 'Remove'}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <TextInput
                  placeholder="Enter coupon code"
                  style={styles.couponInput}
                  placeholderTextColor="#999"
                  value={couponInput}
                  onChangeText={setCouponInput}
                  onSubmitEditing={handleApplyCoupon}
                  editable={!applyingCoupon}
                />
                <View style={styles.couponRow}>
                  <Image source={require('../../assets/images/discount.png')} style={styles.couponIcon} />
                  <Text style={styles.couponText}>{couponCount} coupons available</Text>
                  <TouchableOpacity style={styles.changeBtn} onPress={handleApplyCoupon} disabled={applyingCoupon}>
                    <Text style={styles.changeBtnText}>{applyingCoupon ? '...' : 'Apply'}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
        </KeyboardAvoidingView>

        {/* Pay Button */}
        <TouchableOpacity
          style={[styles.payBottomBtn, (placing || cartTotal <= 0) && { opacity: 0.6 }]}
          onPress={handlePay}
          disabled={placing || cartTotal <= 0}
        >
          <Text style={styles.payBottomBtnText}>
            {placing ? 'PLACING ORDER...' : paymentMode === 'cod' ? 'Place Order (COD)' : 'Pay Now'}
          </Text>
        </TouchableOpacity>
        <OrderSummaryModal
          visible={summaryVisible}
          onClose={() => setSummaryVisible(false)}
          items={cartItems}
          subtotal={cartOriginalTotal}
          shipping={cartShipping}
          platformFee={cartPlatformFee}
          gst={cartGst}
          couponCode={appliedCoupon}
          couponDiscount={couponDiscount}
          total={cartTotal}
        />
        <OrderPlacedModal
          visible={orderPlacedVisible}
          onClose={() => setOrderPlacedVisible(false)}
          onTrackOrder={handleTrackOrder}
          order={placedOrder?.order}
          paymentMode={placedOrder?.paymentMode}
          methodKey={placedOrder?.method}
          onContinueShopping={() => { setOrderPlacedVisible(false); navigation.navigate('MainTabs', { screen: 'Home' }); }}
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
  totalCard: {
    flexDirection: 'row',
    backgroundColor: '#FCEFF6',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E9C9DC',
    padding: 16,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#930e6e',
    marginTop: 6,
  },
  viewDetail: {
    fontSize: 13,
    color: '#930e6e',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  secureText: {
    fontSize: 11,
    color: '#888',
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  methodGroup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 12,
    marginBottom: 14,
    overflow: 'hidden',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  methodRowLast: {
    borderBottomWidth: 0,
  },
  methodIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodLabel: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  radioOn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#930e6e',
  },
  radioOff: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  cardAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginBottom: 14,
  },
  cardBrands: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  codFee: {
    fontSize: 14,
    fontWeight: '700',
    color: '#930e6e',
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