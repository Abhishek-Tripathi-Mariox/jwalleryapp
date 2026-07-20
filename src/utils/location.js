import Geolocation from '@react-native-community/geolocation';

/** Resolves with { latitude, longitude }, rejects on denied permission / timeout. */
export const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
