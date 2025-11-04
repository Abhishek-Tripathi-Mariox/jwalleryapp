// app.screens.js (or app.screens.ts)
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginOTPScreen';  // Import the actual component
import ServicesScreen from '../screens/ServicesScreen';
import MyBottomTabs from '../routes/MyBottomTabs';
import ServiceItemScreen from '../screens/ServiceItemScreen';
import AmountDtlsScreen from '../screens/AmountDtlsScreen';
import AddressDtlsScreen from '../screens/AddressDtlsScreen';
import LandingScreen from '../screens/LandingScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import WishlistScreen from '../screens/WishlistScreen';

import SavedAddressScreen from '../screens/SavedAddressScreen';

export const AppScreens = {
  SplashScreen,
  LoginScreen,
  MyBottomTabs,
  ServicesScreen,
  ServiceItemScreen,
  AmountDtlsScreen,
  AddressDtlsScreen,
  LandingScreen,
  MyProfileScreen,
  WishlistScreen,
  SavedAddressScreen
};
