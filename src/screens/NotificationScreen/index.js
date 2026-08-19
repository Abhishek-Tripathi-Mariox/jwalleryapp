import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../components/Header/BackHeader';
import { request } from '../../utils/api';

const formatTime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await request('/user/notifications');
      // Backend returns { page, limit, total, items }, not a bare array.
      if (res?.code === 1 && Array.isArray(res?.data?.items)) {
        setNotifications(res.data.items);
      } else {
        setNotifications([]);
      }
    } catch (e) {
      console.log('Notifications load error:', e);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item) => {
    if (item.type === 'order') {
      navigation.navigate('OrderScreen');
    }
  };

  const renderItem = ({ item }) => {
    const products = item.products || [];
    const first = products[0];
    const extra = products.length - 1;

    return (
      <TouchableOpacity
        style={[styles.notificationCard, !item.isRead && styles.notificationCardUnread]}
        activeOpacity={item.type === 'order' ? 0.7 : 1}
        onPress={() => handlePress(item)}
      >
        {first?.productImage ? (
          <Image source={{ uri: first.productImage }} style={styles.thumb} />
        ) : (
          <View style={{ backgroundColor: Colors.GRAY9, height: 50, width: 50, borderRadius: 50, justifyContent: 'center' }}>
            <Text style={{ color: Colors.theme1, fontSize: 22, fontWeight: '500', textAlign: 'center' }}>{item.title?.[0]}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {first ? (
            <>
              <Text style={styles.message} numberOfLines={1}>
                {first.productName}
                {first.quantity ? ` × ${first.quantity}` : ''}
                {extra > 0 ? `  +${extra} more item${extra > 1 ? 's' : ''}` : ''}
              </Text>
              {(item.orderNumber || item.totalAmount != null) && (
                <Text style={styles.orderMeta}>
                  {item.orderNumber ? `Order #${item.orderNumber}` : ''}
                  {item.totalAmount != null ? `  ·  Total ₹${item.totalAmount}` : ''}
                </Text>
              )}
            </>
          ) : (
            <Text style={styles.message}>{item.message}</Text>
          )}
          <Text style={styles.time}>{formatTime(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={Colors.THEMECOLOR} barStyle="light-content" />
      <BackHeader
        navigation={navigation}
        title="NOTIFICATION"
      />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.THEMECOLOR} style={{ marginTop: 40 }} />
      ) : notifications.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
          <Text style={{ fontSize: 40, marginBottom: 12 }}>🔔</Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 6 }}>No notifications yet</Text>
          <Text style={{ fontSize: 14, color: Colors.GRAY2, textAlign: 'center' }}>We'll notify you when there are updates on your orders or offers</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item._id || item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.THEMECOLOR,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginBottom: 8,
  },
  headerTitle: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    gap: 10
  },
  notificationCardUnread: {
    backgroundColor: '#FFF8E1',
  },
  thumb: {
    height: 50,
    width: 50,
    borderRadius: 8,
    backgroundColor: Colors.GRAY9,
  },
  orderMeta: {
    fontSize: 12,
    color: Colors.GRAY2,
    marginTop: 2,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.THEMECOLOR,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: Colors.GRAY2,
    marginTop: 2,
  },
});

export default NotificationScreen;
