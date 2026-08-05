import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Small count overlay for cart/bag icons. Renders nothing while the cart is
// empty so it never covers the icon with an empty red dot.
export default function CartBadge({ count }) {
  if (!count || count <= 0) return null;
  return (
    <View style={styles.badge} pointerEvents="none">
      <Text style={styles.text} numberOfLines={1}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#930e6e',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    zIndex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
