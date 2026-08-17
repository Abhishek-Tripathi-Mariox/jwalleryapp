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
  RefreshControl,
  BackHandler,
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
import { showToast } from '../../utils/toast';

const { width } = Dimensions.get('window');

const TABS = ['Ongoing', 'Complete', 'Review'];

// Backend OrderService.getUserOrders only recognizes these three literal
// keywords ("ongoing" | "complete" | "cancelled"); anything else silently
// matches no case and returns ALL orders unfiltered for every tab.
const statusMap = ['ongoing', 'complete', 'complete'];

// Mirrors backend OrderService.cancelOrder, which rejects status >= 3
// (On the Way / Delivered / Cancelled) — only Order Received (1) and
// Ready to Ship (2) can still be cancelled.
const isCancellable = (order) => (order?.status || 1) < 3;

// Keep in sync with backend OrderController's statusLabels map.
const STATUS_BADGES = {
  1: { label: 'Order Received', color: '#2947DF' },
  2: { label: 'Ready to Ship', color: '#B8860B' },
  3: { label: 'On the Way', color: '#0E8345' },
  4: { label: 'Delivered', color: '#0E8345' },
  5: { label: 'Cancelled', color: '#E63030' },
};

const formatUpdatedAt = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

function StatusBadge({ order }) {
  const badge = STATUS_BADGES[order?.status] || STATUS_BADGES[1];
  const updated = formatUpdatedAt(order?.updatedAt);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
      <View style={[styles.statusBadge, { backgroundColor: `${badge.color}1A`, borderColor: badge.color }]}>
        <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.label}</Text>
      </View>
      {updated ? <Text style={styles.statusUpdatedText}>Updated {updated}</Text> : null}
    </View>
  );
}

export default function OrderScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const [trackModalVisible, setTrackModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationModalVisible, setCancellationModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const loadOrders = async (tabIdx, { silent = false } = {}) => {
    if (!silent) setLoading(true);
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
      if (!silent) setLoading(false);
    }
  };

  const handlePullRefresh = async () => {
    setRefreshing(true);
    await loadOrders(activeTab, { silent: true });
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders(activeTab);
      // Admin-side status changes aren't pushed to the app — poll while this
      // screen is focused so badges stay current without a manual pull-to-refresh.
      const interval = setInterval(() => loadOrders(activeTab, { silent: true }), 20000);
      return () => clearInterval(interval);
    }, [activeTab])
  );

  // OrderScreen can end up with nothing beneath it in the stack (e.g. after
  // certain login-flow paths) — with no BackHandler, Android's hardware back
  // button then falls through to the OS default and exits the app instead of
  // just leaving this screen. Send the user to the main tabs in that case.
  useFocusEffect(
    useCallback(() => {
      const onHardwareBack = () => {
        if (navigation.canGoBack()) return false;
        navigation.navigate('MainTabs');
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onHardwareBack);
      return () => sub.remove();
    }, [navigation])
  );

  const handleConfirmCancel = () => {
    // "Don't cancel" vs "Cancel Order" in the confirm modal — proceeding
    // moves to reason selection; the actual API call happens on submit.
    setCancelModalVisible(false);
    setCancellationModalVisible(true);
  };

  const handleSubmitCancellation = async ({ reason }) => {
    if (!selectedOrder?._id) return;
    setCancelling(true);
    try {
      const res = await cancelOrder(selectedOrder._id, reason);
      if (res?.code === 1) {
        showToast('Your order has been cancelled successfully.', 'success');
        setCancellationModalVisible(false);
        loadOrders(activeTab);
      } else {
        showToast(res?.message || 'Could not cancel the order. Please try again.', 'error');
      }
    } catch (e) {
      console.log('Cancel order error:', e);
      showToast('Could not cancel the order. Please try again.', 'error');
    } finally {
      setCancelling(false);
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
          <StatusBadge order={order} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.trackBtn}
              onPress={() => {
                setSelectedOrder(order);
                setTrackModalVisible(true);
              }}
            >
              <Text style={styles.trackBtnText}>Track Order</Text>
            </TouchableOpacity>
            {isCancellable(order) && (
              <TouchableOpacity
                style={[styles.cancelBtn, { marginLeft: 8 }]}
                onPress={() => {
                  setSelectedOrder(order);
                  setCancelModalVisible(true);
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel Order</Text>
              </TouchableOpacity>
            )}
          </View>
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
          <StatusBadge order={order} />
          <Text style={styles.deliveredText}>
            Delivered on {deliveredDate}
          </Text>
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
          onBack={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('MainTabs'))}
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
      <ScrollView
        contentContainerStyle={styles.orderList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handlePullRefresh} colors={[Colors.theme1]} tintColor={Colors.theme1} />
        }
      >
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
        order={selectedOrder}
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
        onCancelOrder={handleConfirmCancel}
        navigation={navigation}
      />
      <OrderCancellationModal
        visible={cancellationModalVisible}
        onClose={() => setCancellationModalVisible(false)}
        onSubmit={handleSubmitCancellation}
        submitting={cancelling}
        orderId={selectedOrder?._id}
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
  statusBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusUpdatedText: {
    fontSize: 10,
    color: '#999',
    marginBottom: 4,
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