import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');
const THEME_COLOR = '#FF6F61';

const OrderConfirmedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Confirmed</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Box */}
        <View style={styles.successBox}>
          <View style={styles.successIconCircle}>
            <AntDesign name="checkcircle" size={48} color="#4BB543" />
          </View>
          <Text style={styles.successText}>Your Order is Successful</Text>
          <Text style={styles.orderId}>Order Id: <Text style={{ color: '#FF6F61' }}>#123654789</Text></Text>
        </View>
        {/* Order Information */}
        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>Order Information</Text>
            <TouchableOpacity
              style={styles.trackBtn}
              onPress={() => navigation.navigate('OrderTrackingScreen')}
            >
              <Text style={styles.trackBtnText}>Track</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>Order Date: November 5, 2020 | 12:20p</Text>
          <Text style={styles.infoText}>Payment Method: Cash On Delivery</Text>
          <Text style={styles.infoText}>Address: B-137, Ground Floors - 27 Green Park,{"\n"}New Delhi - 110016</Text>
          <Text style={styles.infoText}>Phone: 9716046453</Text>
        </View>
        {/* Invoice Details */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Invoice Details</Text>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceItem}>Amritsari Kulcha</Text>
            <Text style={styles.invoiceQty}>x 3</Text>
            <Text style={styles.invoicePrice}>₹1228.00</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceItem}>Cocacola</Text>
            <Text style={styles.invoiceQty}>x 1</Text>
            <Text style={styles.invoicePrice}>₹78.00</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceItem}>Extra Chutney</Text>
            <Text style={styles.invoiceQty}>x 1</Text>
            <Text style={styles.invoicePrice}>₹20.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceItem}>Subtotal</Text>
            <Text style={styles.invoicePrice}>₹1326.00</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceItem}>GST</Text>
            <Text style={styles.invoicePrice}>₹117.00</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceItem}>Discount (-)</Text>
            <Text style={styles.invoicePrice}>- ₹100.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceGrand}>Grand Total</Text>
            <Text style={styles.invoiceGrand}>₹2265.40</Text>
          </View>
        </View>
        {/* Share Section */}
        <View style={styles.shareBox}>
          <Text style={styles.shareTitle}>Share with Friends and get exciting offers!</Text>
          <Text style={styles.shareText}>
            Help us spread the word by sharing our website with your friends and followers on social media!
          </Text>
        </View>
        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 20,
  },
  successBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    padding: 18,
    marginBottom: 18,
    width: width - 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  successIconCircle: {
    backgroundColor: '#EAFBE7',
    borderRadius: 40,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  orderId: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 2,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    width: width - 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  trackBtn: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  trackBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  invoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  invoiceItem: {
    flex: 2,
    fontSize: 14,
    color: '#222',
  },
  invoiceQty: {
    flex: 1,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  invoicePrice: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    textAlign: 'right',
  },
  invoiceGrand: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 6,
    width: '100%',
  },
  shareBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    width: width - 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  shareTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  shareText: {
    fontSize: 13,
    color: '#444',
  },
  continueBtn: {
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 12,
    width: width - 100,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderConfirmedScreen;