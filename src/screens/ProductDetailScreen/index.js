import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params || {};
  const [selectedColor, setSelectedColor] = useState('silver');
  const [wishlisted, setWishlisted] = useState(false);

  // Fallback for demo if no product passed
  const displayProduct = {
    image: product?.image || require('../../assets/images/jearing.png'),
    title: product?.title || 'FOREVERMARK',
    subtitle: product?.subtitle || 'Silver Layered Drop Necklace',
    price: product?.price || '$12,005.07',
    colors: product?.colors || ['silver', 'gray', 'yellow'],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/jlogo.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/jnot.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/jbag1.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Product Image */}
      <Image source={displayProduct.image} style={styles.productImage} />
      {/* Dots */}
      <View style={styles.dotsRow}>
        {[0, 1, 2, 3, 4].map(i => (
          <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
        ))}
      </View>
      {/* Product Info */}
      <View style={styles.infoSection}>
        <Text style={styles.productTitle}>{displayProduct.title}</Text>
        <Text style={styles.productSubtitle}>{displayProduct.subtitle}</Text>
        <Text style={styles.productPrice}>{displayProduct.price}</Text>
        <View style={styles.colorRow}>
          <Text style={styles.colorLabel}>Color</Text>
          {displayProduct.colors.map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                color === selectedColor && styles.colorCircleSelected,
                color === 'silver' && { backgroundColor: '#D1D1D1' },
                color === 'gray' && { backgroundColor: '#B0B0B0' },
                color === 'yellow' && { backgroundColor: '#FFD700' },
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>
      {/* Add to Basket */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToBasketBtn}>
          <Text style={styles.addToBasketText}>+  ADD TO BASKET</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWishlisted(w => !w)}>
          <Image
            source={
              wishlisted
                ? require('../../assets/images/redheart.png') // Use a filled heart icon if available
                : require('../../assets/images/redfill.png') // Use an outlined heart icon
            }
            style={styles.wishlistIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8002F',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'space-between',
  },
  logo: {
    width: 170,
    height: 40,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 28,
    height: 28,
    marginLeft: 16,
    tintColor: '#fff',
  },
  productImage: {
    width: '93%',
    height: '50%',
    // borderRadius: 16,
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: '#C8002F',
  },
  infoSection: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    // letterSpacing: 2,
    color: '#000000',
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 4,
      letterSpacing: 1,
  },
  productPrice: {
    color: '#DD8560',
    fontWeight: '400',
    fontSize: 18,
    marginBottom: 8,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  colorLabel: {
    fontSize: 17,
    color: '#555555',
    marginRight: 12,
  },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleSelected: {
    borderColor: '#c19090ff',
    borderWidth: 1.5,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8002F',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
  },
  addToBasketBtn: {
    flex: 1,
    backgroundColor: '#C8002F',
    borderRadius: 8,
    paddingVertical: 7,
  },
  addToBasketText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    // letterSpacing: 1,
  },
  wishlistIcon: {
    width: 33,
    height: 33,
    tintColor: '#fff',
  },
});