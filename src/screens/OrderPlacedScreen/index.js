import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';

const { width } = Dimensions.get('window');

const OrderPlacedScreen = ({ navigation }) => {
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

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 2 }}>
          {/* Shipping Address */}
          <Text style={styles.sectionLabel}>SHIPPING ADDRESS</Text>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.addressName}>Ryan Quinn</Text>
            <Text style={styles.addressText}>106 Yemen Stree, Yemen town{'\n'}Yemen, NH 11523</Text>
            <Text style={styles.addressText}>(112) 453-1617289</Text>
            <TouchableOpacity
              style={styles.addAddressRow}
              onPress={() => navigation.navigate('AddShippingAddress')}
            >
              <Text style={styles.addAddressText}>Add shipping address</Text>
              <View style={styles.addAddressBtn}>
                <Text style={styles.addAddressBtnText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Shipping Method */}
          <Text style={styles.sectionLabel}>SHIPPING METHOD</Text>
          <View style={styles.selectRow}>
            <Text style={styles.selectText}>Pickup at store</Text>
            <Text style={styles.selectFree}>FREE</Text>
            <Image source={require('../../assets/images/downar.png')} style={styles.selectArrow} />
          </View>

          {/* Payment Method */}
          <Text style={styles.sectionLabel}>PAYMENT METHOD</Text>
          <View style={styles.selectRow}>
            <Text style={styles.selectText}>select payment method</Text>
            <Image source={require('../../assets/images/downar.png')} style={styles.selectArrow} />
          </View>

        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>$1410.5</Text>
        </View>
        {/* Place Order Button */}
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={() => navigation.navigate('OrderPaymentScreen')}
        >
          <Image source={require('../../assets/images/jbag1.png')} style={styles.placeOrderIcon} />
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  sectionLabel: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 2,
  },
  addressName: {
    fontSize: 19,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
    letterSpacing: 1,
  },
  addressText: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 2,
    marginTop: 5,
    letterSpacing: 0.5,
  },
  addAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 17,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    elevation: 1,
    width: '100%'
  },
  addAddressText: {
    fontSize: 16,
    color: '#555555',
    fontWeight: 'bold',
    marginRight: 8,
  },
  addAddressBtn: {
    borderRadius: 50,
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
    top: 5
  },
  addAddressBtnText: {
    color: '#555555',
    fontSize: 25,
    fontWeight: '500',

  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 17,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    elevation: 1,
    width: '100%'
  },
  selectText: {
    fontSize: 17,
    color: '#555555',
    flex: 1,
    fontWeight: 'bold',
  },
  selectFree: {
    fontSize: 15,
    color: '#555555',
    fontWeight: 'bold',
    marginRight: 8,
  },
  selectArrow: {
    width: 18,
    height: 18,
    tintColor: '#555555',
    marginLeft: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 20
  },
  totalLabel: {
    fontSize: 15,
    color: '#333333',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  totalValue: {
    fontSize: 17,
    color: Colors.theme1,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  placeOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme1,
    paddingVertical: 18,
    paddingHorizontal: 0,
    justifyContent: 'center',
    marginTop: 8,
  },
  placeOrderIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 12,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
  },
});

export default OrderPlacedScreen;