
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/DashboardScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import Alert from '../components/Modal/Alert';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../themes/Colors';

const Tab = createBottomTabNavigator();
const ICON_SIZE = 24;


// Simple default tab bar icons
const getTabBarIcon = (route, color, size) => {
  if (route.name === 'Home') {
    return <AntDesign name="home" size={size} color={color} />;
  } else if (route.name === 'Category') {
    return <MaterialIcons name="receipt-long" size={size} color={color} />;
  } else if (route.name === 'Cart') {
    return <Feather name="shopping-cart" size={size} color={color} />;
  } else if (route.name === 'Profile') {
    return <Ionicons name="person-outline" size={size} color={color} />;
  }
  return null;
};


const MyBottomTabs = () => {
  const [modalAlert, setModalAlert] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#bbb',
          tabBarStyle: {
            backgroundColor: Colors.theme1,
            borderTopWidth: 0.5,
            borderTopColor: '#eee',
            height: Platform.OS === 'ios' ? 75 : 65,
            paddingBottom: Platform.OS === 'ios' ? 16 : 8,
            paddingTop: Platform.OS === 'ios' ? 12 : 4,
          },
          tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, 24),
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '500',
            marginBottom: Platform.OS === 'ios' ? 2 : 0,
          },
        })}
      >
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="Category" component={CategoryScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={MyProfileScreen} />
      </Tab.Navigator>
      <Alert modalAlert={modalAlert} setModalAlert={setModalAlert} />
    </>
  );
};

export default MyBottomTabs;

// No custom styles needed for default tab bar
