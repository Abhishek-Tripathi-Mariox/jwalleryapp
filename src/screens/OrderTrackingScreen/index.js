import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes/Colors';

const { width } = Dimensions.get('window');
const THEME_COLOR = Colors.theme1;

const OrderTrackingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <TouchableOpacity>
          <Feather name="phone-call" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Map Section */}
      <View style={styles.mapSection}>
        <Image
          source={require('../../assets/images/map-placeholder.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
        {/* Simulated route */}
        <View style={styles.routeOverlay}>
          <View style={[styles.dot, { top: 30, left: 60 }]} />
          <View style={[styles.dot, { top: 120, left: 180 }]} />
          <View style={styles.routeLine} />
        </View>
        {/* Map controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Feather name="eye" size={18} color="#222" />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', marginLeft: 8 }}>
            <TouchableOpacity style={styles.mapControlBtn}>
              <AntDesign name="plus" size={18} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapControlBtn}>
              <AntDesign name="minus" size={18} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Delivery Info */}
      <View style={styles.deliveryBox}>
        <View style={styles.deliveryRow}>
          <Image
            source={require('../../assets/images/delivery-boy.png')}
            style={styles.deliveryAvatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.deliveryName}>Matt</Text>
            <Text style={styles.deliveryRole}>Delivery boy</Text>
          </View>
          <TouchableOpacity>
            <Feather name="phone-call" size={22} color={THEME_COLOR} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Status Steps */}
      <View style={styles.statusBox}>
        <View style={styles.statusStep}>
          <View style={styles.statusDot} />
          <View style={styles.statusLine} />
          <View>
            <Text style={styles.statusTitle}>Order Picking</Text>
            <Text style={styles.statusDesc}>Estimated time: 3 mins</Text>
          </View>
        </View>
        <View style={styles.statusStep}>
          <View style={styles.statusDot} />
          <View style={styles.statusLine} />
          <View>
            <Text style={styles.statusTitle}>On the way</Text>
            <Text style={styles.statusDesc}>Estimated time: 10 mins</Text>
          </View>
        </View>
        <View style={styles.statusStep}>
          <View style={styles.statusDot} />
          <View>
            <Text style={styles.statusTitle}>Delivered</Text>
            <Text style={styles.statusDesc}>Address, House, Street etc</Text>
          </View>
        </View>
      </View>
      {/* Grand Total */}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Grand Total</Text>
        <Text style={styles.totalValue}>₹2265.40</Text>
      </View>
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
    paddingTop: 40,
    paddingBottom: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: 16,
  },
  mapSection: {
    width: width,
    height: 280,
    backgroundColor: '#eee',
    position: 'relative',
    marginBottom: 5,
  },
  mapImage: {
    width: width,
    height: '100%',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    position: 'absolute',
    top: 10,
    left: 0,
  },
  routeOverlay: {
    position: 'absolute',
    width: width,
    height: 180,
  },
  dot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME_COLOR,
    borderWidth: 2,
    borderColor: '#fff',
  },
  routeLine: {
    position: 'absolute',
    top: 37,
    left: 67,
    width: 120,
    height: 90,
    borderLeftWidth: 2,
    borderLeftColor: THEME_COLOR,
    borderBottomWidth: 2,
    borderBottomColor: THEME_COLOR,
    borderStyle: 'dashed',
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapControlBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  deliveryBox: {
    backgroundColor: THEME_COLOR,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  deliveryRole: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  statusBox: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 1,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME_COLOR,
    marginRight: 12,
    marginTop: 4,
  },
  statusLine: {
    width: 2,
    height: 32,
    backgroundColor: THEME_COLOR,
    marginRight: 12,
    marginTop: 4,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  statusDesc: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
});

export default OrderTrackingScreen;