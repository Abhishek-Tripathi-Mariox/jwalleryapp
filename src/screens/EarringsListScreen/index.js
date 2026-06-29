import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';
import { fetchProductsByCategory, searchProducts, toggleWishlist as toggleWishlistAPI, addToCart } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useCart } from '../../utils/CartContext';


export default function EarringsListScreen({ navigation, route }) {
  const { categoryId, categoryLabel, category } = route.params || {};
  const [wishlist, setWishlist] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { refreshCart } = useCart();

  const handleAddToCart = async (product) => {
    try {
      const res = await addToCart(product._id, 1);
      if (res?.code === 1) {
        await refreshCart();
        Alert.alert('Added to Cart', `${product.productName} added to cart!`);
      } else {
        Alert.alert('Error', res?.message || 'Failed to add to cart');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to add to cart');
    }
  };

  const loadProducts = async () => {
    try {
      let res;
      if (categoryId) {
        res = await fetchProductsByCategory(categoryId);
      } else {
        res = await searchProducts(category || 'earrings');
      }
      if (res?.code === 1 && res.data) {
        const list = res.data.products || res.data || [];
        setProducts(Array.isArray(list) ? list : []);
      }
    } catch (e) {
      console.log('Products load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadProducts();
    }, [categoryId])
  );

  const handleSearch = async (text) => {
    if (!text || !text.trim()) return;
    setLoading(true);
    try {
      const res = await searchProducts(text.trim());
      if (res?.code === 1 && res.data) {
        const list = res.data.products || res.data || [];
        setProducts(Array.isArray(list) ? list : []);
      }
    } catch (e) {
      console.log('Search error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = async (productId) => {
    try {
      await toggleWishlistAPI(productId);
      setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
    } catch (e) {
      console.log('Toggle wishlist error:', e);
    }
  };

  // const handleVoiceSearch = async () => {
  //   try {
  //     if (isListening.current) {
  //       await Voice.stop();
  //       isListening.current = false;
  //       return;
  //     }
  //     Voice.onSpeechResults = (event) => {
  //       if (event.value && event.value.length > 0) {
  //         handleSearch(event.value[0]);
  //       }
  //       Voice.destroy().then(Voice.removeAllListeners);
  //       isListening.current = false;
  //     };
  //     Voice.onSpeechError = (e) => {
  //       Alert.alert('Voice Error', e.error?.message || 'Voice recognition failed');
  //       Voice.destroy().then(Voice.removeAllListeners);
  //       isListening.current = false;
  //     };
  //     isListening.current = true;
  //     await Voice.start('en-US');
  //   } catch (e) {
  //     Alert.alert('Voice Error', e.message || 'Voice recognition failed');
  //     isListening.current = false;
  //   }
  // };

  const handleImageSearch = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
      if (result.assets && result.assets.length > 0) {
        // For now, just use the file name as the search query
        const fileName = result.assets[0].fileName || 'ImageSearch';
        handleSearch(fileName);
      }
    } catch (e) {
      Alert.alert('Image Search Error', e.message || 'Image selection failed');
    }
  };

  const handleCategoryPress = (categoryKey, categoryLabel) => {
    if (categoryKey === 'earrings') {
      navigation.navigate('EarringsList', { category: categoryKey, categoryLabel });
    } else if (categoryKey === 'necklaces') {
      navigation.navigate('NecklaceList', { category: categoryKey, categoryLabel });
    } else {
      navigation.navigate('EarringsList', { category: categoryKey, categoryLabel });
    }
  };

  const renderItem = ({ item }) => {
    const isWishlisted = wishlist[item._id];
    const imageUrl = item.productImages?.[0]?.url || (typeof item.image === 'string' ? item.image : item.image?.url);
    const originalPrice = item.price || 0;
    const discountPrice = item.discountPrice || originalPrice;
    const discount = originalPrice > discountPrice ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { productId: item._id, product: item })}
        activeOpacity={0.85}
      >
        <View style={styles.productImageWrap}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ color: '#999', fontSize: 12 }}>No Image</Text>
            </View>
          )}
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={(e) => { e.stopPropagation(); handleToggleWishlist(item._id); }}
          >
            <AntDesign
              name={isWishlisted ? "heart" : "hearto"}
              size={18}
              color={isWishlisted ? "#FF4444" : "#666"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          {item.brand && (
            <Text style={styles.productBrand} numberOfLines={1}>{item.brand}</Text>
          )}
          <Text style={styles.productName} numberOfLines={2}>{item.productName}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>₹{discountPrice.toLocaleString('en-IN')}</Text>
            {discount > 0 && (
              <Text style={styles.originalPrice}>₹{originalPrice.toLocaleString('en-IN')}</Text>
            )}
          </View>
          {item.averageRating > 0 && (
            <View style={styles.ratingRow}>
              <AntDesign name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.averageRating?.toFixed(1) || item.rating || 0}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.addToCartBtn} onPress={(e) => { e.stopPropagation(); handleAddToCart(item); }}>
            <Feather name="shopping-cart" size={14} color="#fff" />
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIconContainer}
        >
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryLabel || 'Products'}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Feather name="bell" size={22} color="#fff" style={{ marginLeft: 12 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={AppImages.jbag} style={styles.headerIcon1} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search & Filters */}
      <View style={styles.headerExtras}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#930e6e" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Gold Jewellery, Diamond more..."
            onSubmitEditing={e => handleSearch(e.nativeEvent.text)}
          />
          {/* <TouchableOpacity onPress={handleVoiceSearch}> */}
          <Image source={require('../../assets/images/mm.png')} style={styles.voiceIcon} />
          {/* </TouchableOpacity> */}
          <TouchableOpacity onPress={handleImageSearch}>
            <Image source={require('../../assets/images/jj.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        {/* Category Title and Filters */}
        <View style={styles.categoryRow}>
          <Text style={styles.earringsCount}>{products.length} {(categoryLabel || 'PRODUCTS').toUpperCase()}</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterBtnText}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Image source={require('../../assets/images/vector.png')} style={styles.filterIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Image source={require('../../assets/images/filter.png')} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.theme1} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>No products found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: Colors.theme1,
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerExtras: {
    backgroundColor: Colors.theme1,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backIconContainer: {
    backgroundColor: '#fff',
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.theme1,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 19,
    fontWeight: '500',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginLeft: 12,
    tintColor: '#fff',
  },
  headerIcon1: {
    width: 24,
    height: 24,
    marginLeft: 12,
    tintColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 1,
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical: 3,
    // elevation: 2,
    width: '100%',
    marginTop: 10
  },
  searchIcon: {
    width: 22,
    height: 22,
    tintColor: Colors.theme1,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  voiceIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.theme1,
    marginHorizontal: 0,
  },
  cameraIcon: {
    width: 27,
    height: 27,
    tintColor: Colors.theme1,
    marginRight: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  earringsCount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtn: {
    backgroundColor: Colors.theme1,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  iconBtn: {
    backgroundColor: Colors.theme1,
    borderRadius: 20,
    padding: 3,
    margin: 2

  },
  filterIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    width: (Dimensions.get('window').width - 48) / 2,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  productImageWrap: {
    width: '100%',
    height: (Dimensions.get('window').width - 48) / 2 * 1.1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  productInfo: {
    padding: 10,
  },
  productBrand: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.theme1,
    textTransform: 'uppercase',
    marginBottom: 2,
    fontFamily: 'Poppins-SemiBold',
  },
  productName: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 4,
    minHeight: 36,
    fontFamily: 'Poppins-Medium',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DD8560',
    fontFamily: 'Poppins-SemiBold',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 6,
    fontFamily: 'Poppins-Regular',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 3,
    fontWeight: '500',
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.theme1,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
});