import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';
import BackHeader from '../../components/Header/BackHeader';
import { fetchProductDetails, fetchProductReviews } from '../../utils/api';

const { width } = Dimensions.get('window');

export default function WriteReviewScreen({ navigation, route }) {
  const { product: routeProduct, productId } = route?.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState(routeProduct || null);
  const [reviews, setReviews] = useState([]);
  const [ratingsBreakdown, setRatingsBreakdown] = useState([0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(!routeProduct);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      if (productId && !routeProduct) {
        const res = await fetchProductDetails(productId);
        if (res?.code === 1 && res.data) {
          setProduct(res.data.product || res.data);
        }
      }
      const id = productId || routeProduct?._id;
      if (id) {
        const revRes = await fetchProductReviews(id);
        if (revRes?.code === 1 && revRes.data) {
          const revList = revRes.data.reviews || revRes.data || [];
          setReviews(Array.isArray(revList) ? revList : []);
          if (revRes.data.ratingsBreakdown) {
            setRatingsBreakdown(revRes.data.ratingsBreakdown);
          }
        }
      }
    } catch (e) {
      console.log('WriteReview data error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.theme1} />
      </View>
    );
  }

  const displayProduct = {
    name: product?.productName || product?.name || 'Product',
    price: product?.discountPrice || product?.price || 0,
    oldPrice: product?.originalPrice || product?.mrp || 0,
    image: product?.productImages?.[0]?.url ? { uri: product.productImages[0].url } : require('../../assets/images/jpinkear.jpg'),
    reviews: reviews.length || product?.reviewCount || 0,
    rating: product?.avgRating || product?.rating || 0,
  };

  return (
    <View style={styles.container}>
      {/* Modal for Feedback Success */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconContainer}>
              {/* Stars */}
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <AntDesign key={i} name="star" size={24} color="#FFC700" style={{ marginHorizontal: 2 }} />
                ))}
              </View>
              {/* Thumbs up icon */}
              <View style={styles.thumbCircle}>
                <AntDesign name="like1" size={40} color="#fff" />
              </View>
            </View>
            <Text style={styles.modalTitle}>Excellent!</Text>
            <Text style={styles.modalMsg}>Thanks for loving us!</Text>
            <Text style={styles.modalMsg2}>Spread the word by rating us on PlayStore</Text>
            <TouchableOpacity
              style={styles.rateUsBtn}
              onPress={() => {
                setModalVisible(false);
                // Add PlayStore link logic here if needed
              }}
            >
              <Text style={styles.rateUsBtnText}>Rate Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <BackHeader
        navigation={navigation}
        title="WRITE REVIEW"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        {/* Product Card */}
        <View style={styles.productCard}>
          <Image source={displayProduct.image} style={styles.productImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.productName} numberOfLines={1}>
              {displayProduct.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Text style={styles.productPrice}>₹ {displayProduct.price}</Text>
              {displayProduct.oldPrice ? <Text style={styles.productOldPrice}>₹{displayProduct.oldPrice}</Text> : null}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <AntDesign name="star" size={14} color="#FFC107" />
              <Text style={styles.reviewText}>({displayProduct.reviews} Reviews)</Text>
            </View>
          </View>
        </View>

        {/* Customer Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterBtnText}>All</Text>
              <AntDesign name="down" size={14} color="#1D262D" />
            </TouchableOpacity>
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingValue}>{displayProduct.rating} <Text style={styles.ratingOutOf}>/ 5</Text></Text>
            <AntDesign name="star" size={18} color="#FACC6A" style={{ marginLeft: 2 }} />
          </View>
          <View style={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map((star, idx) => (
              <View key={star} style={styles.ratingBarRow}>
                <Text style={styles.ratingBarLabel}>{star}</Text>
                <View style={styles.ratingBarBg}>
                  <View
                    style={[
                      styles.ratingBarFill,
                      {
                        width: `${(ratingsBreakdown[5 - star] / (Math.max(...ratingsBreakdown, 1))) * 100}%`,
                        backgroundColor:
                          star === 5
                            ? '#37B99E'
                            : star === 4
                              ? '#DB80FE'
                              : star === 3
                                ? '#EFC048'
                                : star === 2
                                  ? '#33C2EB'
                                  : '#FE7615',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.ratingBarCount}>
                  {ratingsBreakdown[5 - star]}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ borderWidth: 3, borderRadius: 10, width: '95%', alignSelf: 'center', borderColor: '#FFC700', marginTop: 10, }} ></View>
        {/* Feedback Section */}
        <View style={styles.section1}>
          <Text style={styles.sectionTitle}>Send us your Feedback!</Text>
          <View style={styles.emojiRow}>
            <Text style={styles.emoji}>😡</Text>
            <Text style={styles.emoji}>😕</Text>
            <Text style={styles.emoji}>😐</Text>
            <Text style={styles.emoji}>🙂</Text>
            <Text style={styles.emoji}>😃</Text>
          </View>
          <Text style={styles.suggestionText}>
            Got suggestions? We'd love to hear them! (Optional)
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder=""
            placeholderTextColor="#bbb"
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.sendBtnText}>Send Feedback</Text>
          </TouchableOpacity>
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterBtnText}>All</Text>
              <AntDesign name="down" size={14} color="#1D262D" />
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 10 }}>Coming soon</Text>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme1,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'space-between',
  },
  headerBackBtn: {
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.theme1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
    marginLeft: -30,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 5,
    padding: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.06,
    // shadowRadius: 8,
    // elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    marginRight: 8,
  },
  productOldPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 11,
    color: '#888',
    marginLeft: 4,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 0,
    marginTop: 18,
    padding: 24,
  },
  section1: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 20,
    marginTop: 28,
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3'

  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D262D',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFC700',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: '#FFFDE9',
  },
  filterBtnText: {
    color: '#222',
    fontWeight: 'bold',
    marginRight: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A3A3A',
    marginRight: 4,
  },
  ratingOutOf: {
    fontSize: 16,
    color: '#3A3A3A',
    fontWeight: 'bold',
  },
  ratingBars: {
    marginTop: 8,
    marginBottom: 8,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingBarLabel: {
    width: 16,
    fontSize: 12,
    color: '#888888',
    marginRight: 4,
  },
  ratingBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F3F3',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: 8,
    borderRadius: 4,
  },
  ratingBarCount: {
    width: 40,
    fontSize: 13,
    color: '#888',
    textAlign: 'right',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  emoji: {
    fontSize: 28,
  },
  suggestionText: {
    fontSize: 11,
    color: '#505050',
    marginTop: 8,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    minHeight: 60,
    padding: 8,
    fontSize: 15,
    color: '#222',
    marginBottom: 12,
    marginTop: 4,
  },
  sendBtn: {
    backgroundColor: Colors.theme1,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  bestSellerCard: {
    width: 115,
    height: 115,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bestSellerImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  modalIconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  thumbCircle: {
    backgroundColor: '#1DB954',
    borderRadius: 50,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    marginTop: 2,
    textAlign: 'center',
  },
  modalMsg: {
    fontSize: 13,
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  modalMsg2: {
    fontSize: 13,
    color: '#000000',
    marginBottom: 18,
    textAlign: 'center',
  },
  rateUsBtn: {
    backgroundColor: Colors.theme1,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  rateUsBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});