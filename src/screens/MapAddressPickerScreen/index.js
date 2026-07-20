import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import BackHeader from '../../components/Header/BackHeader';
import { Colors } from '../../themes/Colors';
import { getCurrentPosition } from '../../utils/location';
import { reverseGeocode } from '../../utils/api';

// Default center (used only if the device's current location can't be
// read, e.g. permission denied) — India, roughly centered.
const FALLBACK_REGION = {
  latitude: 20.5937,
  longitude: 78.9629,
  latitudeDelta: 8,
  longitudeDelta: 8,
};

export default function MapAddressPickerScreen({ navigation }) {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(FALLBACK_REGION);
  const [locating, setLocating] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const coords = await getCurrentPosition();
        setRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (e) {
        console.log('Could not get current location:', e.message);
      } finally {
        setLocating(false);
      }
    })();
  }, []);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const res = await reverseGeocode(region.latitude, region.longitude);
      const data = (res?.code === 1 && res.data) || {};
      navigation.navigate('SavedAddress', {
        pickedLocation: {
          latitude: region.latitude,
          longitude: region.longitude,
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
        },
      });
    } catch (e) {
      console.log('Reverse geocode error:', e);
      Alert.alert('Location', 'Could not fetch address for this location. Please try again.');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation} title="PICK LOCATION" />

      {locating ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.theme1} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            initialRegion={region}
            onRegionChangeComplete={setRegion}
          />
          {/* Pin fixed at screen center — the map moves underneath it. */}
          <View style={styles.pinWrapper} pointerEvents="none">
            <Feather name="map-pin" size={36} color="#B0011D" />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.confirmBtn, confirming && { opacity: 0.6 }]}
        onPress={handleConfirm}
        disabled={confirming || locating}
      >
        {confirming ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.confirmBtnText}>Confirm Location</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -36,
  },
  confirmBtn: {
    backgroundColor: '#8B005D',
    borderRadius: 32,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
