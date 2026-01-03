import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginOTPScreen';
import MyBottomTabs from '../routes/MyBottomTabs';
import MyProfileScreen from '../screens/MyProfileScreen';
import SavedAddressScreen from '../screens/SavedAddressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import OrderPlacedScreen from '../screens/OrderPlacedScreen';
import AddShippingAddressScreen from '../screens/AddShippingAddressScreen';
import OrderPaymentScreen from '../screens/OrderPaymentScreen';
import EarringsListScreen from '../screens/EarringsListScreen';
import OrderScreen from '../screens/OrderScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import AddCardScreen from '../screens/AddCardScreen';
import CustomerServiceChatScreen from '../screens/CustomerServiceChatScreen';
import OrderCancellationModal from '../components/Modal/OrderCancellationModal';
import NotificationScreen from '../screens/NotificationScreen';

export const AppScreens = {
  SplashScreen,
  LoginScreen,
  MyBottomTabs,
  MyProfileScreen,
  SavedAddressScreen,
  ProfileScreen,
  FeedbackScreen,
  OrderPlacedScreen,
  AddShippingAddressScreen,
  OrderPaymentScreen,
  EarringsListScreen,
  NecklaceListScreen: require('../screens/NecklaceListScreen').default,
  ProductDetailScreen: require('../screens/ProductDetailScreen').default,
  CheckoutScreen: require('../screens/CheckoutScreen').default,
  OrderScreen,
  WriteReviewScreen,
  AddCardScreen,
  CustomerServiceChatScreen,
  OrderCancellationModal,
  NotificationScreen,
};
