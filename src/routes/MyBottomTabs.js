import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/DashboardScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Alert from '../components/Modal/Alert';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TAB_BG_COLOR = Colors.theme1;
const ICON_SIZE = 25;

import { getTokenStorage } from '../utils/tokenStorage';
import { Colors } from '../themes/Colors';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  // Handler to check token and navigate accordingly
  const handleTabPress = async (routeName) => {
    if (routeName === 'Cart' || routeName === 'MyProfile') {
      const token = await getTokenStorage();
      if (!token) {
        navigation.navigate('Login');
        return;
      }
    }
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.customTabBarContainer}>
      <View style={styles.tabBarBg} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        let icon;
        let LargeIcon = null;
        if (route.name === 'Home') {
          icon = <AntDesign name="home" size={ICON_SIZE} color="#fff" />;
          LargeIcon = <AntDesign name="home" size={28} color="#fff" />;
        } else if (route.name === 'Search') {
          icon = <Feather name="search" size={ICON_SIZE} color="#fff" />;
          LargeIcon = <Feather name="search" size={28} color="#fff" />;
        } else if (route.name === 'Order') {
          icon = <MaterialIcons name="receipt-long" size={ICON_SIZE} color="#fff" />;
          LargeIcon = <MaterialIcons name="receipt-long" size={28} color="#fff" />;
        } else if (route.name === 'Cart') {
          icon = <Feather name="shopping-cart" size={ICON_SIZE} color="#fff" />;
          LargeIcon = <Feather name="shopping-cart" size={28} color="#fff" />;
        } else if (route.name === 'Profile') {
          icon = <Ionicons name="person-outline" size={ICON_SIZE} color="#fff" />;
          LargeIcon = <Ionicons name="person-outline" size={28} color="#fff" />;
        }

        if (isFocused) {
          // Floating circular active tab
          return (
            <View key={route.key} style={styles.homeTabWrapper}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: true }}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => handleTabPress(route.name)}
                style={[
                  styles.homeButton,
                  { backgroundColor: TAB_BG_COLOR, borderColor: '#fff', borderWidth: 5 },
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.homeIconCircle}>
                  {LargeIcon}
                </View>
              </TouchableOpacity>
              <Text style={[styles.tabLabel, { color: '#fff', fontWeight: 'bold', marginTop: 2 }]}>{label}</Text>
            </View>
          );
        } else {
          // Flat inactive tab
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => handleTabPress(route.name)}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              {icon}
              <Text style={styles.tabLabel}>{label}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const MyBottomTabs = () => {
  const [modalAlert, setModalAlert] = useState(false);

  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="Order" component={Dashboard} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={MyProfileScreen} />
      </Tab.Navigator>
      <Alert modalAlert={modalAlert} setModalAlert={setModalAlert} />
    </>
  );
};

export default MyBottomTabs;

const styles = StyleSheet.create({
  customTabBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    height: 80,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    position: 'relative',
  },
  tabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: TAB_BG_COLOR,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 64,
    top: 16,
    zIndex: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
    height: 64,
    marginTop: 16,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '400',
  },
  homeTabWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: -24,
    zIndex: 2,
  },
  homeButton: {
    backgroundColor: TAB_BG_COLOR,
    borderRadius: 40,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  homeIconCircle: {
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: TAB_BG_COLOR,
  },
});