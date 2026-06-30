import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginOTPScreen';
import MyBottomTabs from '../routes/MyBottomTabs';
import MyProfileScreen from '../screens/MyProfileScreen';
import SavedAddressScreen from '../screens/SavedAddressScreen';
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
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CartScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';

export const AppScreens = {
  SplashScreen,
  LoginScreen,
  MyBottomTabs,
  MyProfileScreen,
  SavedAddressScreen,
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
  WishlistScreen,
  CartScreen,
  ProfileDetailScreen,
  PaymentMethodScreen,
  PoliciesScreen: require('../screens/PoliciesScreen').default,
};
