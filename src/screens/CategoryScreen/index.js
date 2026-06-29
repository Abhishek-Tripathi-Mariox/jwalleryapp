import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../themes/Colors';
import { fetchCategories, fetchProductsByCategory, addToCart, toggleWishlist, fetchWishlist } from '../../utils/api';
import BackHeader from '../../components/Header/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useCart } from '../../utils/CartContext';
import { AppImages } from '../../constants/app.image';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const fallbackIcons = {
  earrings: AppImages.jearing,
  rings: AppImages.jring,
  bracelets: AppImages.jbrace,
  chains: AppImages.jchain,
  necklaces: AppImages.jnecklace,
  pearl: AppImages.jpearl,
  bangles: AppImages.jbang,
  mangalsutra: AppImages.jmangalsutra,
};

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [wishlistedIds, setWishlistedIds] = useState(new Set());
  const { refreshCart, cartCount } = useCart();

  useEffect(() => {
    loadCategories();
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const res = await fetchWishlist();
      if (res?.code === 1 && res.data) {
        const wishlist = res.data.wishlist || res.data.items || res.data || [];
        const ids = new Set(wishlist.map(item => item.productId?._id || item.productId || item._id));
        setWishlistedIds(ids);
      }
    } catch (e) {
      console.log('Wishlist load error:', e);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      if (res?.code === 1 && res.data) {
        const list = res.data.categories || res.data || [];
        const mapped = list.map(c => ({
          _id: c._id,
          key: (c.categoryName || c.name || '').toLowerCase().replace(/\s+/g, ''),
          label: c.categoryName || c.name,
          image: c.image ? { uri: c.image } : null,
        }));
        setCategories(mapped);
        // Auto-select first category
        if (mapped.length > 0) {
          setSelectedCatId(mapped[0]._id);
          loadProducts(mapped[0]._id);
        }
      }
    } catch (e) {
      console.log('Categories load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (catId) => {
    setProductsLoading(true);
    try {
      const res = await fetchProductsByCategory(catId);
      if (res?.code === 1 && res.data) {
        const list = res.data.products || res.data || [];
        setProducts(Array.isArray(list) ? list : []);
      }
    } catch (e) {
      console.log('Products load error:', e);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleCategoryPress = (cat) => {
    setSelectedCatId(cat._id);
    loadProducts(cat._id);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { productId: product._id });
  };

  const handleAddToCart = async (product, e) => {
    e?.stopPropagation();
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

  const handleToggleWishlist = async (product, e) => {
    e?.stopPropagation();
    try {
      const res = await toggleWishlist(product._id);
      if (res?.code === 1) {
        const newSet = new Set(wishlistedIds);
        if (newSet.has(product._id)) {
          newSet.delete(product._id);
        } else {
          newSet.add(product._id);
        }
        setWishlistedIds(newSet);
      }
    } catch (e) {
      console.log('Wishlist error:', e);
    }
  };

  const handleSearch = (text) => {
    if (text && text.trim().length > 0) {
      navigation.navigate('EarringsList', { category: text.trim() });
    }
  };

  const handleImageSearch = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
      if (result.assets && result.assets.length > 0) {
        const fileName = result.assets[0].fileName || 'ImageSearch';
        handleSearch(fileName);
      }
    } catch (e) {
      Alert.alert('Image Search Error', e.message || 'Image selection failed');
    }
  };

  const handleViewAll = (cat) => {
    navigation.navigate('EarringsList', {
      category: cat.key,
      categoryLabel: cat.label,
      categoryId: cat._id,
    });
  };

  const selectedCat = categories.find(c => c._id === selectedCatId);

  const renderCategory = ({ item }) => {
    const isSelected = item._id === selectedCatId;
    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
        onPress={() => handleCategoryPress(item)}
      >
        {item.image ? (
          <View style={[styles.categoryImageWrapper, isSelected && styles.categoryImageWrapperSelected]}>
            <Image source={item.image} style={styles.categoryImage} />
          </View>
        ) : null}
        <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelSelected]} numberOfLines={1}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProduct = ({ item }) => {
    // Handle various image formats
    const productImages = item.productImages || [];
    let imageUrl = null;
    if (productImages.length > 0) {
      // Could be { url: string } or just string
      const firstImg = productImages[0];
      imageUrl = typeof firstImg === 'string' ? firstImg : firstImg?.url;
    }
    // Fallback to other image fields
    if (!imageUrl && item.image) {
      imageUrl = typeof item.image === 'string' ? item.image : item.image?.url;
    }
    
    console.log('Product Images Debug:', item.productName, { 
      productImages: item.productImages, 
      imageUrl,
      image: item.image 
    });

    const originalPrice = item.price || 0;
    const discountPrice = item.discountPrice || originalPrice;
    const discount = originalPrice > discountPrice ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;
    const isWishlisted = wishlistedIds.has(item._id);

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.85}
      >
        <View style={styles.productImageWrap}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.productImage}
            />
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
            onPress={(e) => handleToggleWishlist(item, e)}
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
            <Text style={styles.productPrice}>
              ₹{discountPrice.toLocaleString('en-IN')}
            </Text>
            {discount > 0 && (
              <Text style={styles.originalPrice}>
                ₹{originalPrice.toLocaleString('en-IN')}
              </Text>
            )}
          </View>
          {/* Rating */}
          {item.averageRating > 0 && (
            <View style={styles.ratingRow}>
              <AntDesign name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.averageRating.toFixed(1)}</Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.addToCartSmallBtn}
            onPress={(e) => handleAddToCart(item, e)}
          >
            <Feather name="shopping-cart" size={14} color="#fff" />
            <Text style={styles.addToCartSmallText}>Add</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#930e6e" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Gold Jewellery, Diamond more..."
            placeholderTextColor="#999"
            onSubmitEditing={e => handleSearch(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={handleImageSearch}>
            <Image source={require('../../assets/images/jj.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories horizontal scroll */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item._id || item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      />

      {/* Selected category products header */}
      {selectedCat && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{selectedCat.label}</Text>
          <TouchableOpacity onPress={() => handleViewAll(selectedCat)}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
      )}

      {productsLoading && (
        <ActivityIndicator size="small" color={Colors.theme1} style={{ marginVertical: 16 }} />
      )}
    </>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <BackHeader navigation={navigation} title="CATEGORIES" showBack={false} showLogo={true} />
        <ActivityIndicator size="large" color={Colors.theme1} style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <BackHeader
        navigation={navigation}
        title="CATEGORIES"
        showBack={false}
        showLogo={true}
        rightIconName="notifications-outline"
        onRightPress={() => navigation.navigate('Notification')}
      />

      <FlatList
        data={productsLoading ? [] : products}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !productsLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found in this category</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  // Search
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.theme1,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.BLACK,
    paddingVertical: 0,
    fontFamily: 'Poppins-Regular',
  },
  cameraIcon: {
    width: 22,
    height: 22,
    tintColor: Colors.theme1,
    marginLeft: 8,
  },
  // Categories horizontal
  categoriesScroll: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 76,
  },
  categoryItemSelected: {},
  categoryImageWrapper: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 38,
    padding: 10,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  categoryImageWrapperSelected: {
    borderColor: Colors.theme1,
    backgroundColor: Colors.LIGHT_THEME,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  categoryLabelSelected: {
    color: Colors.theme1,
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
  },
  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.BLACK,
    fontFamily: 'Poppins-SemiBold',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.theme1,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  // Product grid
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    width: CARD_WIDTH,
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
    height: CARD_WIDTH * 1.1,
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
  addToCartSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.theme1,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addToCartSmallText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  // Empty
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
});
