import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/DashboardScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import GiftUnder1999Screen from '../screens/GiftUnder1999Screen';
import StoreLocatorScreen from '../screens/StoreLocatorScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const THEME = '#930e6e';
const INACTIVE = '#9aa0a6';

const getTabIcon = (routeName, color, size) => {
  switch (routeName) {
    case 'Home':
      return <AntDesign name="home" size={size} color={color} />;
    case 'Categories':
      return <MaterialIcons name="grid-view" size={size} color={color} />;
    case 'Gifts':
      return <Ionicons name="gift-outline" size={size} color={color} />;
    case 'Stores':
      return <Ionicons name="location-outline" size={size} color={color} />;
    case 'Profile':
      return <Ionicons name="person-outline" size={size} color={color} />;
    default:
      return null;
  }
};

const MyBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: THEME,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.activeIconBox : styles.iconBox}>
            {getTabIcon(route.name, focused ? '#fff' : INACTIVE, 22)}
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Categories" component={CategoryScreen} options={{ tabBarLabel: 'Categories' }} />
      <Tab.Screen name="Gifts" component={GiftUnder1999Screen} options={{ tabBarLabel: 'Gift <1999' }} />
      <Tab.Screen name="Stores" component={StoreLocatorScreen} options={{ tabBarLabel: 'Store' }} />
      <Tab.Screen name="Profile" component={MyProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: '500',
    marginTop: 2,
  },
  iconBox: {
    width: 46,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconBox: {
    width: 46,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME,
  },
});

export default MyBottomTabs;
