import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Svg, Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';

const { width } = Dimensions.get('window');

const products = [
  {
    id: '1',
    title: 'Front Tie Mini Dress',
    price: '$ 59.00',
    rating: 3.5,
    reviews: 38,
    image: AppImages.wishlist, // Replace with your product image
  },
  {
    id: '2',
    title: 'Front Tie Mini Dress',
    price: '$ 59.00',
    rating: 3.5,
    reviews: 38,
    image: AppImages.wishlist,
  },
  {
    id: '3',
    title: 'Front Tie Mini Dress',
    price: '$ 59.00',
    rating: 3.5,
    reviews: 38,
    image: AppImages.wishlist,
  },
  {
    id: '4',
    title: 'Front Tie Mini Dress',
    price: '$ 59.00',
    rating: 3.5,
    reviews: 38,
    image: AppImages.wishlist,
  },
  {
    id: '5',
    title: 'Front Tie Mini Dress',
    price: '$ 59.00',
    rating: 3.5,
    reviews: 38,
    image: AppImages.wishlist,
  },
  {
    id: '6',
    title: 'Front Tie Mini Dress',
    price: '$ 59.00',
    rating: 3.5,
    reviews: 38,
    image: AppImages.wishlist,
  },
];

const THEME_COLOR = Colors.theme1;
const WishlistScreen = ({ navigation }) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.headerWrapper}>
      <Image
        source={AppImages.background1}
        style={styles.headerBackground}
        resizeMode="cover"
      />
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.headerWave} />
    </View>
    {/* Product Grid */}
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image source={item.image} style={styles.productImage} />
            <TouchableOpacity style={styles.heartIcon}>
              <View style={styles.heartCircle}>
                <AntDesign name="heart" size={20} color={THEME_COLOR} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.ratingRow}>
            {(() => {
              const stars = [];
              let rating = item.rating;
              for (let i = 1; i <= 5; i++) {
                if (rating >= 1) {
                  stars.push(
                    <Svg key={i} width={17} height={17} viewBox="0 0 24 24" style={{ marginRight: 1, marginTop: 1 }}>
                      <Path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        fill="#4CB050"
                        stroke="#4CB050"
                        strokeWidth={0.5}
                      />
                    </Svg>
                  );
                } else if (rating >= 0.5) {
                  stars.push(
                    <Svg key={i} width={17} height={17} viewBox="0 0 24 24" style={{ marginRight: 1, marginTop: 1 }}>
                      <Defs>
                        <ClipPath id={`halfStar${i}`}>
                          <Rect x="0" y="0" width="12" height="24" />
                        </ClipPath>
                      </Defs>
                      <G>
                        <Path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill="#4CB050"
                          stroke="#4CB050"
                          strokeWidth={0.5}
                          clipPath={`url(#halfStar${i})`}
                        />
                        <Path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill="none"
                          stroke="#4CB050"
                          strokeWidth={0.5}
                        />
                      </G>
                    </Svg>
                  );
                } else {
                  stars.push(
                    <Svg key={i} width={18} height={18} viewBox="0 0 24 24" style={{ marginRight: 1, marginTop: 1 }}>
                      <Path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        fill="none"
                        stroke="#4CB050"
                        strokeWidth={0.5}
                      />
                    </Svg>
                  );
                }
                rating -= 1;
              }
              return stars;
            })()}
            <Text style={styles.reviewText}> {item.rating} </Text>
            <Text style={styles.reviewCountText}>({item.reviews})</Text>
          </View>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  </View>
);

const CARD_WIDTH = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    position: 'relative',
    backgroundColor: THEME_COLOR,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    marginBottom: 0,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 120,
    opacity: 0.18,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 40,
    zIndex: 2,
  },
  headerWave: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    textAlign: 'center',
  },
  grid: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#F6F6F6',
    borderRadius: 18,
    margin: 8,
    width: CARD_WIDTH,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 14,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    minHeight: 230,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 14,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  heartCircle: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 4,
  },
  productTitle: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  productPrice: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 0,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  reviewText: {
    fontSize: 12,
    color: '#222',
    marginLeft: 4,
    fontWeight: '600',
    marginTop: 1,
    marginRight: 2,
    letterSpacing: 0.1,
  },
  reviewCountText: {
    fontSize: 12,
    color: '#B0B0B0',
    fontWeight: '500',
    marginTop: 1,
    marginLeft: 0,
    letterSpacing: 0.1,
  },
  bottomBarLabel: {
    color: '#fff',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  bottomBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    backgroundColor: 'transparent',
    alignItems: 'center',
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  bottomBarBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    zIndex: 1,
    borderColor: '#fff',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: THEME_COLOR,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: 70,
    marginHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '92%',
    position: 'absolute',
    left: '4%',
    right: '4%',
    bottom: 0,
    zIndex: 2,
    borderColor: '#fff',
    borderWidth: 4,
  },
  bottomBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 8,
  },
  fabProfileWrapper: {
    position: 'absolute',
    alignItems: 'center',
    left: '50%',
    transform: [{ translateX: -36 }],
    bottom: 18,
    zIndex: 30,
  },
  fabProfileOuter: {
    backgroundColor: '#fff',
    borderRadius: 36,
    padding: 4,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  fabProfile: {
    backgroundColor: THEME_COLOR,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 8,
  },
  fabProfileLabel: {
    color: THEME_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});

export default WishlistScreen;