import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../themes/Colors';
import { fetchProductDetails, addToCart, toggleWishlist, fetchWishlist, browseProducts } from '../../utils/api';
import { resizedImage } from '../../utils/imageProxy';
import { useCart } from '../../utils/CartContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../../components/Bottom/BottomNavBar';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { product: routeProduct, productId } = route.params || {};
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [wishlisted, setWishlisted] = useState(false);
  const [product, setProduct] = useState(routeProduct || null);
  const [loading, setLoading] = useState(!routeProduct);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { refreshCart, cartCount } = useCart();

  useEffect(() => {
    if (productId && !routeProduct) {
      loadProduct();
    } else if (routeProduct) {
      setProduct(routeProduct);
    }
    checkWishlistStatus();
  }, [productId]);

  useEffect(() => {
    // Set default color and size
    if (product?.colors?.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product?.sizes?.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Fetch related products from the same category (shown on the same page).
  useEffect(() => {
    const catId = product?.categoryId?._id || product?.categoryId;
    const currentId = product?._id || productId;
    if (!catId) return;
    (async () => {
      try {
        const res = await browseProducts({ categoryIds: catId, limit: 12 });
        const list = res?.data?.products || res?.data || [];
        setRelatedProducts((Array.isArray(list) ? list : []).filter(p => p._id !== currentId).slice(0, 10));
      } catch (e) {
        console.log('Related products error:', e);
      }
    })();
  }, [product?._id]);

  const checkWishlistStatus = async () => {
    try {
      const id = routeProduct?._id || productId;
      if (!id) return;
      const res = await fetchWishlist();
      if (res?.code === 1 && res.data) {
        const wishlist = res.data.wishlist || res.data.items || res.data || [];
        const isInWishlist = wishlist.some(item => {
          const itemProductId = item.productId?._id || item.productId || item._id;
          return itemProductId === id;
        });
        setWishlisted(isInWishlist);
      }
    } catch (e) {
      console.log('Check wishlist error:', e);
    }
  };

  const loadProduct = async () => {
    try {
      const res = await fetchProductDetails(productId);
      if (res?.code === 1 && res.data) {
        setProduct(res.data.product || res.data);
      }
    } catch (e) {
      console.log('Product detail error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const id = product?._id || productId;
      if (!id) return;
      const res = await addToCart(id, 1, selectedSize || undefined, selectedColor || undefined);
      if (res?.code === 1) {
        await refreshCart();
        setShowCartModal(true);
      } else {
        Alert.alert('Error', res?.message || 'Failed to add to cart');
      }
    } catch (e) {
      console.log('Add to cart error:', e);
      Alert.alert('Error', 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      const id = product?._id || productId;
      if (!id) return;
      const res = await toggleWishlist(id);
      if (res?.code === 1) {
        const newState = res.data?.isWishlisted !== undefined ? res.data.isWishlisted : !wishlisted;
        setWishlisted(newState);
      } else {
        Alert.alert('Error', res?.message || 'Failed to update wishlist');
      }
    } catch (e) {
      console.log('Toggle wishlist error:', e);
      Alert.alert('Error', 'Failed to update wishlist');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.theme1} />
        </View>
      </SafeAreaView>
    );
  }

  // Handle various image formats
  const rawImages = product?.productImages || [];
  const images = rawImages.map(img => {
    if (typeof img === 'string') return { url: img };
    return img;
  }).filter(img => img?.url);
  
  // Fallback to single image field
  if (images.length === 0 && product?.image) {
    const singleImg = typeof product.image === 'string' ? product.image : product.image?.url;
    if (singleImg) images.push({ url: singleImg });
  }

  console.log('ProductDetail Images Debug:', { 
    productName: product?.productName,
    rawProductImages: product?.productImages,
    processedImages: images,
    image: product?.image 
  });

  const imageUrl = images[selectedImageIdx]?.url || images[0]?.url;
  
  const originalPrice = product?.price || 0;
  const discountPrice = product?.discountPrice || originalPrice;
  const discount = originalPrice > discountPrice ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PRODUCT DETAILS</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartBtn}>
            <Feather name="shopping-cart" size={22} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ color: '#999', fontSize: 16 }}>No Image Available</Text>
            </View>
          )}
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
          <TouchableOpacity style={styles.wishlistBtn} onPress={handleToggleWishlist}>
            <AntDesign 
              name={wishlisted ? "heart" : "hearto"} 
              size={24} 
              color={wishlisted ? "#FF4444" : "#666"} 
            />
          </TouchableOpacity>
        </View>

        {/* Image Thumbnails */}
        {images.length > 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.thumbnailScroll}
          >
            {images.map((img, i) => (
              <TouchableOpacity 
                key={i} 
                onPress={() => setSelectedImageIdx(i)}
                style={[styles.thumbnail, i === selectedImageIdx && styles.thumbnailActive]}
              >
                <Image source={{ uri: img.url }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Product Info */}
        <View style={styles.infoSection}>
          {product?.brand && (
            <Text style={styles.brandText}>{product.brand}</Text>
          )}
          <Text style={styles.productName}>{product?.productName || 'Product Name'}</Text>
          
          {/* Rating (if available) */}
          {product?.averageRating > 0 && (
            <View style={styles.ratingRow}>
              <AntDesign name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{product.averageRating.toFixed(1)}</Text>
              {product?.totalReviews > 0 && (
                <Text style={styles.reviewCount}>({product.totalReviews} reviews)</Text>
              )}
            </View>
          )}

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.discountPrice}>₹{discountPrice.toLocaleString('en-IN')}</Text>
            {discount > 0 && (
              <>
                <Text style={styles.originalPrice}>₹{originalPrice.toLocaleString('en-IN')}</Text>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveText}>Save {discount}%</Text>
                </View>
              </>
            )}
          </View>

          {/* Colors */}
          {product?.colors?.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Color</Text>
              <View style={styles.optionRow}>
                {product.colors.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      selectedColor === color && styles.colorOptionSelected,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <View style={[
                      styles.colorCircle,
                      { backgroundColor: getColorHex(color) }
                    ]} />
                    <Text style={[
                      styles.colorText,
                      selectedColor === color && styles.colorTextSelected
                    ]}>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Sizes */}
          {product?.sizes?.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Size</Text>
              <View style={styles.optionRow}>
                {product.sizes.map(size => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeOption,
                      selectedSize === size && styles.sizeOptionSelected,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextSelected
                    ]}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          {product?.productDescription && (
            <View style={styles.descSection}>
              <Text style={styles.descLabel}>Description</Text>
              <Text style={styles.descText}>{product.productDescription}</Text>
            </View>
          )}

          {/* Product Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailsLabel}>Product Details</Text>
            {product?.metalType && (
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Metal Type</Text>
                <Text style={styles.detailValue}>{product.metalType}</Text>
              </View>
            )}
            {product?.purity && (
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Purity</Text>
                <Text style={styles.detailValue}>{product.purity}</Text>
              </View>
            )}
            {product?.weight && (
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Weight</Text>
                <Text style={styles.detailValue}>{product.weight}g</Text>
              </View>
            )}
            {product?.sku && (
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>SKU</Text>
                <Text style={styles.detailValue}>{product.sku}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Related Products — same category, shown on the same page */}
        {relatedProducts.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>You may also like</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 12 }}>
              {relatedProducts.map((item) => {
                const rImg = item.productImages?.[0]?.url || item.productImage;
                return (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.relatedCard}
                    activeOpacity={0.85}
                    onPress={() => navigation.push('ProductDetail', { productId: item._id })}
                  >
                    {rImg ? (
                      <Image source={{ uri: resizedImage(rImg, 400) }} style={styles.relatedImage} />
                    ) : (
                      <View style={[styles.relatedImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ color: '#999', fontSize: 11 }}>No Image</Text>
                      </View>
                    )}
                    <Text style={styles.relatedName} numberOfLines={1}>{item.productName}</Text>
                    <Text style={styles.relatedPrice}>₹{Number(item.discountPrice || item.price || 0).toLocaleString('en-IN')}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomActionBar}>
        <TouchableOpacity 
          style={styles.addToCartBtn} 
          onPress={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Feather name="shopping-cart" size={20} color="#fff" />
              <Text style={styles.addToCartText}>ADD TO CART</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buyNowBtn}
          onPress={() => {
            handleAddToCart().then(() => {
              navigation.navigate('Cart');
            });
          }}
        >
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar />

      {/* Add to Cart Success Modal */}
      <Modal
        visible={showCartModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCartModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Success Icon */}
            <View style={styles.modalIconContainer}>
              <AntDesign name="checkcircle" size={60} color="#4CAF50" />
            </View>
            
            {/* Title */}
            <Text style={styles.modalTitle}>Added to Cart!</Text>
            
            {/* Message */}
            <Text style={styles.modalMessage}>
              {product?.productName || 'Item'} has been added to your shopping cart
            </Text>
            
            {/* Product Preview */}
            <View style={styles.modalProductPreview}>
              {images[0]?.url ? (
                <Image source={{ uri: images[0].url }} style={styles.modalProductImage} />
              ) : (
                <View style={[styles.modalProductImage, { backgroundColor: '#f0f0f0' }]} />
              )}
              <View style={styles.modalProductInfo}>
                <Text style={styles.modalProductName} numberOfLines={2}>{product?.productName}</Text>
                <Text style={styles.modalProductPrice}>₹{discountPrice?.toLocaleString('en-IN')}</Text>
              </View>
            </View>
            
            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.continueShoppingBtn}
                onPress={() => setShowCartModal(false)}
              >
                <Feather name="shopping-bag" size={18} color={Colors.theme1} />
                <Text style={styles.continueShoppingText}>Continue Shopping</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.goToCartBtn}
                onPress={() => {
                  setShowCartModal(false);
                  navigation.navigate('Cart');
                }}
              >
                <Feather name="shopping-cart" size={18} color="#fff" />
                <Text style={styles.goToCartText}>Go to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const getColorHex = (color) => {
  const colors = {
    gold: '#FFD700',
    silver: '#C0C0C0',
    rose: '#B76E79',
    white: '#FFFFFF',
    yellow: '#FFD700',
    gray: '#808080',
    black: '#000000',
  };
  return colors[color?.toLowerCase()] || '#E0E0E0';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  relatedCard: {
    width: 130,
    marginRight: 12,
  },
  relatedImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    resizeMode: 'cover',
    backgroundColor: '#f6f6f6',
  },
  relatedName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginTop: 6,
  },
  relatedPrice: {
    fontSize: 13,
    color: '#930e6e',
    fontWeight: '700',
    marginTop: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.theme1,
    height: 60,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
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
  headerRight: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtn: {
    padding: 4,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: width * 0.9,
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
    top: 16,
    left: 16,
    backgroundColor: '#FF4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  thumbnailScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  thumbnailActive: {
    borderColor: Colors.theme1,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoSection: {
    padding: 16,
  },
  brandText: {
    fontSize: 12,
    color: Colors.theme1,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  discountPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DD8560',
    fontFamily: 'Poppins-Bold',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  saveBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  saveText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  optionSection: {
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  colorOptionSelected: {
    borderColor: Colors.theme1,
    backgroundColor: Colors.LIGHT_THEME,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  colorText: {
    fontSize: 13,
    color: '#555',
    textTransform: 'capitalize',
  },
  colorTextSelected: {
    color: Colors.theme1,
    fontWeight: '600',
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  sizeOptionSelected: {
    borderColor: Colors.theme1,
    backgroundColor: Colors.LIGHT_THEME,
  },
  sizeText: {
    fontSize: 14,
    color: '#555',
  },
  sizeTextSelected: {
    color: Colors.theme1,
    fontWeight: '600',
  },
  descSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  descLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  descText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  detailsSection: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  detailsLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  detailKey: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  bottomActionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addToCartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.theme1,
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
    fontFamily: 'Poppins-Bold',
  },
  buyNowBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DD8560',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  // Cart Success Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
  modalProductPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 24,
  },
  modalProductImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  modalProductInfo: {
    flex: 1,
  },
  modalProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  modalProductPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DD8560',
    fontFamily: 'Poppins-Bold',
  },
  modalButtonContainer: {
    width: '100%',
    gap: 12,
  },
  continueShoppingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.theme1,
    paddingVertical: 14,
    borderRadius: 30,
  },
  continueShoppingText: {
    color: Colors.theme1,
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  goToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.theme1,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: Colors.theme1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  goToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
  },
});