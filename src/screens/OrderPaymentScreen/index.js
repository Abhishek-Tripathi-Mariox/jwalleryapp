import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImages } from '../../constants/app.image';
import OrderSummaryModal from './OrderSummaryModal';
import OrderPlacedModal from '../../components/Modal/OrderPlacedModal';
import OrderTrackModal from '../../components/Modal/OrderTrackModal';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';

const { width } = Dimensions.get('window');

const OrderPaymentScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState('HDFC');
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [orderPlacedVisible, setOrderPlacedVisible] = useState(false);
  const [orderTrackVisible, setOrderTrackVisible] = useState(false);

  const handlePay = () => {
    setOrderPlacedVisible(true);
  };

  const handleTrackOrder = () => {
    setOrderPlacedVisible(false);
    setOrderTrackVisible(true);
  };

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
          rightIcon={require('../../assets/images/jnot.png')}
         onRightPress={() => navigation.navigate('Notification')}
        />

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Green Banner */}
          <View style={styles.greenBanner}>
            <Text style={styles.greenBannerText}>FREE gift worth ₹ 499 on prepaid orders</Text>
          </View>

          {/* Order Summary */}
          <TouchableOpacity style={styles.summaryBox} onPress={() => setSummaryVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/images/newcart.png')} style={styles.summaryIcon} />
              <Text style={styles.summaryLabel}>Order Summary </Text>
              <Image source={AppImages.jdown} style={styles.summaryIcon} />
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ textAlign: 'center' }}>

              <Text style={styles.summaryOldPrice}>₹3,100</Text>
              <Text style={styles.summaryNewPrice}>₹1,188</Text>
            </View>
          </TouchableOpacity>

          {/* Address */}
          <View style={styles.addressBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>

              <View style={{ marginLeft: 0, flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../../assets/images/newloc1.png')} style={styles.addressIcon} />
                  <Text style={styles.addressName}>Deliver to Mithu</Text>
                </View>
                <Text style={styles.addressText}>32 main, mangal bazar rd, noida, uttar pradesh, 201309</Text>
                <Text style={styles.addressText}>+91 8178496252   mithukumar08907@gmail.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Coupon Input */}
          <View style={styles.couponBox}>
            <TextInput
              placeholder="Enter coupon code"
              style={styles.couponInput}
              placeholderTextColor="#000000"
            />
            <View style={styles.couponRow}>
              <Image source={require('../../assets/images/discount.png')} style={styles.couponIcon} />
              <Text style={styles.couponText}>8 coupons available</Text>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={styles.changeBtnText}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* Frequent Methods */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Frequent Methods</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
              <Text style={styles.addCardText}>Add New Card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardRow}>
            <TouchableOpacity style={styles.cardOption} onPress={() => setSelectedCard('HDFC')}>
              <View style={selectedCard === 'HDFC' ? styles.radioSelected : styles.radioUnselected} />
              <View>
                <Text style={styles.cardText}>HDFC Bank</Text>
                <Text style={styles.cardNumber}>•••• •••• •••• 8743</Text>
              </View>
              <View>
                <Image source={require('../../assets/images/visalogo.png')} style={styles.cardLogo} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardOption} onPress={() => setSelectedCard('ICICI')}>
              <View style={selectedCard === 'ICICI' ? styles.radioSelected : styles.radioUnselected} />
              <View>
                <Text style={styles.cardText}>ICICI Bank</Text>
                <Text style={styles.cardNumber}>•••• •••• •••• 4553</Text>
              </View>
              <View>
                <Image source={require('../../assets/images/icici.png')} style={styles.cardLogo} />
              </View>
            </TouchableOpacity>

          </View>

          {/* Payment UPI Coupons */}
          <Text style={styles.sectionLabel1}>Payment UPI Coupons</Text>
          <View style={styles.couponBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/images/cred.png')} style={styles.couponIconBig} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.couponTitle}>Upto ₹200 cashback on using CRED UPI</Text>
                <Text style={styles.couponApplied}>Auto applied with select payment method</Text>
                <Text style={styles.couponDesc}>Upto ₹200 cashback on using CRED UPI</Text>
                <Text style={styles.couponKnowMore}>Know more</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payBtnText}>Pay</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.couponBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/images/cred.png')} style={styles.couponIconBig} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.couponTitle}>Upto ₹200 cashback on using CRED UPI</Text>
                <Text style={styles.couponApplied}>Auto applied with select payment method</Text>
                <Text style={styles.couponDesc}>Upto ₹200 cashback on using CRED UPI</Text>
                <Text style={styles.couponKnowMore}>Know more</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payBtnText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Pay Button */}
        <TouchableOpacity style={styles.payBottomBtn} onPress={handlePay}>
          <Text style={styles.payBottomBtnText}>Pay</Text>
        </TouchableOpacity>
        <OrderSummaryModal visible={summaryVisible} onClose={() => setSummaryVisible(false)} />
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