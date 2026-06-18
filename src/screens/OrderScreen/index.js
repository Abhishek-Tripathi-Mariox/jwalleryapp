import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppImages } from '../../constants/app.image';
import OrderTrackModal from '../../components/Modal/OrderTrackModal';
import OrderCancelModal from '../../components/Modal/OrderCancelModal';
import OrderCancellationModal from '../../components/Modal/OrderCancellationModal';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';
import { fetchOrders, cancelOrder, reorder } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const TABS = ['Ongoing', 'Complete', 'Review'];

export default function OrderScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const [trackModalVisible, setTrackModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationModalVisible, setCancellationModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusMap = ['pending,confirmed,shipped', 'delivered', 'delivered'];

  const loadOrders = async (tabIdx) => {
    setLoading(true);
    try {
      const res = await fetchOrders(statusMap[tabIdx]);
      if (res?.code === 1 && res.data) {
        const list = res.data.orders || res.data || [];
        setOrders(Array.isArray(list) ? list : []);
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.log('Orders load error:', e);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders(activeTab);
    }, [activeTab])
  );

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      setCancelModalVisible(false);
      setCancellationModalVisible(true);
      loadOrders(activeTab);
    } catch (e) {
      console.log('Cancel order error:', e);
    }
  };

  const handleReorder = async (orderId) => {
    try {
      await reorder(orderId);
      loadOrders(activeTab);
    } catch (e) {
      console.log('Reorder error:', e);
    }
  };

function renderCard(order, tab, setTrackModalVisible, setSelectedOrder, setCancelModalVisible, navigation, handleReorder) {
  const firstItem = order.products?.[0] || order;
  const product = firstItem.productId || firstItem;
  const imageUrl = product.productImages?.[0]?.url || firstItem.productImage;
  const name = product.productName || firstItem.productName || 'Order Item';
  const price = order.grandTotal || firstItem.unitPrice || firstItem.totalPrice || 0;
  const deliveredDate = order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '';

  const renderImage = (style) => imageUrl ? (
    <Image source={{ uri: imageUrl }} style={style} />
  ) : (
    <View style={[style, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ color: '#999', fontSize: 10 }}>No Image</Text>
    </View>
  );

  if (tab === 0) {
    // Ongoing
    return (
      <View key={order._id} style={styles.orderCard}>
        {renderImage(styles.orderImage)}
        <View style={styles.orderInfo}>
          <Text style={styles.orderName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.orderPrice}>₹ {price}</Text>
          <TouchableOpacity
            style={styles.trackBtn}
            onPress={() => {
              setSelectedOrder(order);
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
      <View key={order._id} style={styles.orderCard}>
        {renderImage(styles.orderImage1)}
        <View style={styles.orderInfo}>
          <Text style={styles.orderName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.orderPrice}>₹ {price}</Text>
          <Text style={styles.deliveredText}>
            Delivered on {deliveredDate}
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
          <TouchableOpacity style={styles.orderAgainBtn} onPress={() => handleReorder(order._id)}>
            <Text style={styles.orderAgainBtnText}>Order Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (tab === 2) {
    // Review
    return (
      <View key={order._id} style={styles.orderCard}>
        {renderImage(styles.orderImage)}
        <View style={styles.orderInfo}>
          <Text style={styles.orderName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.deliveredText}>
            Delivered on {deliveredDate}
          </Text>
          <TouchableOpacity
            style={styles.reviewBtn}
            onPress={() => navigation.navigate('WriteReviewScreen', { orderId: order._id, product })}
          >
            <Text style={styles.reviewBtnText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return null;
}

  return (
    <View style={styles.container}>
      {/* Header */}
     <BackHeader
          navigation={navigation}
          title="ORDER"
        />

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
        {loading ? (
          <ActivityIndicator size="large" color={Colors.theme1} style={{ marginTop: 40 }} />
        ) : orders.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>No orders found.</Text>
        ) : (
          orders.map(order =>
            renderCard(
              order,
              activeTab,
              setTrackModalVisible,
              setSelectedOrder,
              setCancelModalVisible,
              navigation,
              handleReorder
            )
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
    </View>
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
    color: Colors.theme1,
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