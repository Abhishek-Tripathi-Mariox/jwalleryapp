import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../components/Header/BackHeader';
import { request } from '../../utils/api';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Fetch from backend when notifications API is available
      const res = await request('/user/notifications');
      if (res?.code === 1 && Array.isArray(res.data)) {
        setNotifications(res.data);
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
  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={{ backgroundColor: Colors.GRAY9, height: 50, width: 50, borderRadius: 50, justifyContent: 'center' }}>
        <Text style={{ color: Colors.theme1, fontSize: 22, fontWeight: '500', textAlign: 'center' }}>{item.title[0]}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
