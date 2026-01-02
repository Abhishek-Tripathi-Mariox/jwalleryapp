import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppImages } from '../../constants/app.image';
import OrderTrackModal from '../../components/Modal/OrderTrackModal';
import OrderCancelModal from '../../components/Modal/OrderCancelModal';
import OrderCancellationModal from '../../components/Modal/OrderCancellationModal';

const { width } = Dimensions.get('window');

const TABS = ['Ongoing', 'Complete', 'Review'];

const ongoingOrders = [
  {
    id: 1,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
  },
  {
    id: 2,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
  },
  {
    id: 3,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
  },
  {
    id: 4,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
  },
  {
    id: 5,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
  },
];

const completedOrders = [
  {
    id: 1,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
  {
    id: 2,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
  {
    id: 3,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
  {
    id: 4,
    name: 'Love & Money Attractor Bracelet',
    price: 499,
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
];

const reviewOrders = [
  {
    id: 1,
    name: 'Love & Money Attractor Bracelet',
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
  {
    id: 2,
    name: 'Love & Money Attractor Bracelet',
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
  {
    id: 3,
    name: 'Love & Money Attractor Bracelet',
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
  {
    id: 4,
    name: 'Love & Money Attractor Bracelet',
    image: AppImages.jwel1,
    deliveredOn: 'may 06 2025',
  },
];

export default function OrderScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const [trackModalVisible, setTrackModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationModalVisible, setCancellationModalVisible] = useState(false);

  let ordersToShow = ongoingOrders;
  if (activeTab === 1) {
    ordersToShow = completedOrders;
  } else if (activeTab === 2) {
    ordersToShow = reviewOrders;
  }

function renderCard(order, tab, setTrackModalVisible, setSelectedOrder, setCancelModalVisible, navigation) {
  if (tab === 0) {
    // Ongoing
    return (
      <View key={order.id} style={styles.orderCard}>
        <Image source={order.image} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.orderName} numberOfLines={1}>
            {order.name}
          </Text>
          <Text style={styles.orderPrice}>₹ {order.price}</Text>
          <TouchableOpacity
            style={styles.trackBtn}
            onPress={() => {
              setTrackModalVisible(true);
            }}
          >
            <Text style={styles.trackBtnText}>Track Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (tab === 1) {
    // Completed
    return (
      <View key={order.id} style={styles.orderCard}>
        <Image source={order.image} style={styles.orderImage1} />
        <View style={styles.orderInfo}>
          <Text style={styles.orderName} numberOfLines={1}>
            {order.name}
          </Text>
          <Text style={styles.orderPrice}>₹ {order.price}</Text>
          <Text style={styles.deliveredText}>
            Delivered on {order.deliveredOn}
          </Text>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              setSelectedOrder(order);
              setCancelModalVisible(true);
            }}
          >
            <Text style={styles.cancelBtnText}>Cancel Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderAgainBtn}>
            <Text style={styles.orderAgainBtnText}>Order Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (tab === 2) {
    // Review
    return (
      <View key={order.id} style={styles.orderCard}>
        <Image source={order.image} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.orderName} numberOfLines={1}>
            {order.name}
          </Text>
          <Text style={styles.deliveredText}>
            Delivered on {order.deliveredOn}
          </Text>
          <TouchableOpacity
            style={styles.reviewBtn}
            onPress={() => navigation.navigate('WriteReviewScreen')}
          >
            <Text style={styles.reviewBtnText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return null;
}

  console.log('OrderScreen render');
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <Image source={require('../../assets/images/back.png')} style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ORDER</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab, idx) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabBtn,
              activeTab === idx && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab(idx)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === idx && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
            {idx < TABS.length - 1 && (
              <View style={styles.tabDivider} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Order List */}
      <ScrollView contentContainerStyle={styles.orderList}>
        {ordersToShow.map(order =>
          renderCard(
            order,
            activeTab,
            setTrackModalVisible,
            setSelectedOrder,
            setCancelModalVisible,
            navigation
          )
        )}
      </ScrollView>

      {/* Track Order Modal */}
      <OrderTrackModal
        visible={trackModalVisible}
        onClose={() => setTrackModalVisible(false)}
        onCancelOrder={() => {
          setTrackModalVisible(false);
          setCancelModalVisible(true);
        }}
        navigation={navigation}
      />
      {trackModalVisible && console.log('OrderTrackModal visible')}
      {/* Cancel Order Modal */}
      <OrderCancelModal
        visible={cancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        order={selectedOrder}
        onCancelOrder={() => {
          setCancelModalVisible(false);
          setCancellationModalVisible(true);
        }}
        navigation={navigation}
      />
      <OrderCancellationModal
        visible={cancellationModalVisible}
        onClose={() => setCancellationModalVisible(false)}
      />
      {cancelModalVisible && console.log('OrderCancelModal visible')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A1011B',
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
    tintColor: '#A1011B',
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F080',
    marginHorizontal: 0,
    // marginTop: 18,
    // borderRadius: 12,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#ffffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#C8002F',
    fontWeight: 'bold',
  },
  tabDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  orderList: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  orderCard: {
    backgroundColor: '#f8f8f1ff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth:1,
    borderColor:'#fff',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  orderImage: {
    width: 82,
    height: 86,
    borderRadius: 12,
    marginRight: 16,
    resizeMode: 'cover',
  },
    orderImage1: {
    width: 82,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
    resizeMode: 'cover',
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orderName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  orderPrice: {
    fontSize: 14,
    color: '#1D262D',
    marginBottom: 2,
    fontWeight:'500'
  },
  deliveredText: {
    fontSize: 11,
    color: '#868686',
    marginBottom: 5,
  },
  trackBtn: {
    borderWidth: 1,
    borderColor: '#01A337',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  trackBtnText: {
    color: '#01A337',
    fontWeight: '500',
    fontSize: 11,
  },
  orderAgainBtn: {
    borderWidth: 1,
    borderColor: '#01A337',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  orderAgainBtnText: {
    color: '#01A337',
    fontWeight: '500',
    fontSize: 11,
  },
  reviewBtn: {
    borderWidth: 1,
    borderColor: '#6F83E5',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  reviewBtnText: {
    color: '#6F83E5',
    fontWeight: '500',
    fontSize: 11,
  },
});