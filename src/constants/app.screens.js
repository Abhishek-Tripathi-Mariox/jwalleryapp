// app.screens.js (or app.screens.ts)
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginOTPScreen';  // Import the actual component
import MyBottomTabs from '../routes/MyBottomTabs';
import MyProfileScreen from '../screens/MyProfileScreen';
import SavedAddressScreen from '../screens/SavedAddressScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import DressDetailScreen from '../screens/DressDetailScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
// import OrderConfirmedScreen from '../screens/OrderConfirmedScreen';
import OrderPlacedScreen from '../screens/OrderPlacedScreen';
 import AddShippingAddressScreen from '../screens/AddShippingAddressScreen';
 import OrderPaymentScreen from '../screens/OrderPaymentScreen';
 // import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import EarringsListScreen from '../screens/EarringsListScreen';
// import SearchScreen from '../screens/SearchScreen';

import OrderScreen from '../screens/OrderScreen';

import WriteReviewScreen from '../screens/WriteReviewScreen';

import AddCardScreen from '../screens/AddCardScreen';
import CustomerServiceChatScreen from '../screens/CustomerServiceChatScreen';
import OrderCancellationModal from '../components/Modal/OrderCancellationModal';

export const AppScreens = {
  SplashScreen,
  LoginScreen,
  MyBottomTabs,
  MyProfileScreen,
  SavedAddressScreen,
  ProfileScreen,
  FeedbackScreen,
  // OrderConfirmedScreen,
  OrderPlacedScreen,
  AddShippingAddressScreen,
  OrderPaymentScreen,
  // OrderTrackingScreen,
  EarringsListScreen,
  NecklaceListScreen: require('../screens/NecklaceListScreen').default,
  ProductDetailScreen: require('../screens/ProductDetailScreen').default,
  CheckoutScreen: require('../screens/CheckoutScreen').default,
  // DressDetailScreen,
  // SearchScreen: require('../screens/SearchScreen').default,
  OrderScreen,
  WriteReviewScreen,
  AddCardScreen,
  CustomerServiceChatScreen,
  OrderCancellationModal
};
