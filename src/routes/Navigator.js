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
          name="Landing"
          component={AppScreens.LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceItemScreen"
          component={AppScreens.ServiceItemScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AmountDtlsScreen"
          component={AppScreens.AmountDtlsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddressDtlsScreen"
          component={AppScreens.AddressDtlsScreen}
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
          name="Profile"
          component={AppScreens.ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Wishlist"
          component={AppScreens.WishlistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SavedAddress"
          component={AppScreens.SavedAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={AppScreens.PaymentMethodScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileSettingScreen"
          component={AppScreens.ProfileSettingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedbackScreen"
          component={AppScreens.FeedbackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderConfirmedScreen"
          component={AppScreens.OrderConfirmedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderTrackingScreen"
          component={AppScreens.OrderTrackingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
