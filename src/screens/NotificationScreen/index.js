import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../components/Header/BackHeader';

const notifications = [
  {
    id: '1',
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #1234 has been shipped!',
    icon: AppImages.jbag,
    time: '2h ago',
  },
  {
    id: '2',
    type: 'offer',
    title: 'Special Offer',
    message: 'Get 20% off on your next purchase!',
    icon: AppImages.discount,
    time: '5h ago',
  },
  {
    id: '3',
    type: 'alert',
    title: 'Account Update',
    message: 'Your profile was updated successfully.',
    icon: AppImages.jprofile,
    time: '1d ago',
  },
];

const NotificationScreen = ({ navigation }) => {
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
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.jbackground,
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
