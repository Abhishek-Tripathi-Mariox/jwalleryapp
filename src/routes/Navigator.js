import { enableScreens } from 'react-native-screens';
enableScreens();
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreens } from '../constants/app.screens';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={AppScreens.SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={AppScreens.LoginScreen}
          options={{ headerShown: false }}
        />
     
        <Stack.Screen
          name="Home"
          component={AppScreens.MyBottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProfile"
          component={AppScreens.MyProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={AppScreens.ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SavedAddress"
          component={AppScreens.SavedAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedbackScreen"
          component={AppScreens.FeedbackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderScreen"
          component={AppScreens.OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WriteReviewScreen"
          component={AppScreens.WriteReviewScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="CustomerServiceChatScreen"
          component={AppScreens.CustomerServiceChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderCancellationModal"
          component={AppScreens.OrderCancellationModal}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="OrderConfirmedScreen"
          component={AppScreens.OrderConfirmedScreen}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="OrderTrackingScreen"
          component={AppScreens.OrderTrackingScreen}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="DressDetailScreen"
          component={AppScreens.DressDetailScreen}
          options={{ headerShown: false }}
        /> */}
      <Stack.Screen
        name="EarringsList"
        component={AppScreens.EarringsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NecklaceList"
        component={AppScreens.NecklaceListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={AppScreens.ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={AppScreens.CheckoutScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
          name="OrderPlaced"
          component={AppScreens.OrderPlacedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddShippingAddress"
          component={AppScreens.AddShippingAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderPaymentScreen"
          component={AppScreens.OrderPaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCard"
          component={AppScreens.AddCardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
