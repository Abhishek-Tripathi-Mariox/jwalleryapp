import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';

const THEME_COLOR = Colors.theme1;

const categories = [
  { key: 'filter', label: 'Filter', icon: AppImages.filter },
  { key: 'all', label: 'All', icon: AppImages.skirt },
  { key: 'shirts', label: 'shirts', icon: AppImages.Fshirt },
  { key: 'jeans', label: 'jeans', icon: AppImages.Fpant },
  { key: 'skirts', label: 'skirts', icon: AppImages.skirt },
  { key: 'shorts', label: 'shorts', icon: AppImages.skirt },
  { key: 'joggers', label: 'joggers', icon: AppImages.skirt },
  { key: 'formal', label: 'formal', icon: AppImages.skirt },
  { key: 'kurta', label: 'kurta', icon: AppImages.skirt },
  { key: 'sleepwear', label: 'sleepwear', icon: AppImages.skirt },
];

const products = [
  {
    id: '1',
    name: 'Linen Dress',
    price: 52.00,
    oldPrice: 90.00,
    rating: 4.5,
    ratingCount: 64,
    image: AppImages.girl,
    favorite: true,
  },
  {
    id: '2',
    name: 'Fitted Waist Dress',
    price: 47.99,
    oldPrice: null,
    rating: 4.3,
    ratingCount: 53,
    image: AppImages.clean2,
    favorite: false,
  },
  {
    id: '3',
    name: 'Maxi Dress',
    price: 68.00,
    oldPrice: null,
    rating: 4.7,
    ratingCount: 41,
    image: AppImages.clean3,
    favorite: false,
  },
  {
    id: '4',
    name: 'Front Tie Mini Dress',
    price: 59.00,
    oldPrice: 82.00,
    rating: 4.2,
    ratingCount: 38,
    image: AppImages.clean4,
    favorite: true,
  },
  {
    id: '5',
    name: 'Summer Dress',
    price: 39.99,
    oldPrice: null,
    rating: 4.6,
    ratingCount: 27,
    image: AppImages.profile,
    favorite: false,
  },
];

const ProductCard = ({ item, selected }) => (
  <View style={[styles.productCard, selected && styles.productCardSelected]}>
    <Image source={item.image} style={styles.productImage} />
    <TouchableOpacity style={styles.favoriteIcon}>
      <AntDesign name={item.favorite ? "heart" : "hearto"} size={20} color={item.favorite ? THEME_COLOR : "#B0B0B0"} />
    </TouchableOpacity>
    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
    <View style={styles.priceRow}>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      {item.oldPrice && (
        <Text style={styles.productOldPrice}>${item.oldPrice.toFixed(2)}</Text>
      )}
    </View>
    <View style={styles.ratingRow}>
      <AntDesign name="star" size={14} color="#1DBF73" />
      <Text style={styles.ratingText}>{item.rating}</Text>
      <Text style={styles.ratingCount}>({item.ratingCount})</Text>
    </View>
  </View>
);

const ICON_SIZE = 36; // Larger icon size for filter

const DressDetailScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('3'); // Highlight Maxi Dress as in the design
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Color and size state
  const colorOptions = [
    { key: 'beige', color: '#E9CBBF' },
    { key: 'black', color: '#000' },
    { key: 'pink', color: '#F66A7B' },
  ];
  const sizeOptions = ['S', 'M', 'L'];
  const [selectedColor, setSelectedColor] = useState('beige');
  const [selectedSize, setSelectedSize] = useState('L');

  // Collapsible description state
  const [descExpanded, setDescExpanded] = useState(false);
  const descriptionText =
    "Sportswear is no longer under culture, it is no longer indie or cobbled together as it once was. Sport is fashion today. The top is oversized in fit and style, may need to size down.";

  // Placeholder images for carousel
  const productImages = [
    AppImages.sportswear,
    AppImages.sportswear,
    AppImages.sportswear,
  ];

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    setCarouselIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Custom Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Jeans, skirts shirts & blouses
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="hearto" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="shopping-cart" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Main Content */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map((cat, idx) => {
              // Special styling for filter button
              if (idx === 0) {
                const isSelected = selectedCategory === cat.key;
                return (
                  <TouchableOpacity
                    key={cat.key}
                    style={[
                      styles.categoryItem,
                      styles.filterButton,
                      isSelected && {
                        backgroundColor: THEME_COLOR,
                        borderColor: THEME_COLOR,
                        borderWidth: 1.5,
                      },
                    ]}
                    onPress={() => setSelectedCategory(cat.key)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={cat.icon}
                      style={{
                        width: ICON_SIZE,
                        height: ICON_SIZE,
                        marginBottom: 4,
                        resizeMode: 'contain',
                        tintColor: '#fff'
                      }}
                    />
                    <Text style={[
                      styles.categoryLabel,
                      { color: '#fff', fontWeight: 'bold' }
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              }
              // All other categories
              return (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryItem,
                    selectedCategory === cat.key && styles.categoryItemSelected,
                    idx === 1 && styles.allButton,
                  ]}
                  onPress={() => setSelectedCategory(cat.key)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={cat.icon}
                    style={[
                      styles.categoryIcon,
                      selectedCategory === cat.key
                        ? { tintColor: THEME_COLOR }
                        : { tintColor: '#B0B0B0' }
                    ]}
                  />
                  <Text style={[
                    styles.categoryLabel,
                    selectedCategory === cat.key && styles.categoryLabelSelected,
                    idx === 1 && styles.categoryLabelBold
                  ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {/* Main Content Area */}
        <View style={{ flex: 1, padding: 7 }}>
          {/* Shop Card */}
           <ScrollView style={{ marginBottom: -290, height: 0 }} horizontal showsHorizontalScrollIndicator={false}>
                      <View style={styles.shopCard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, width: '100%' }}>
                          <Image source={AppImages.shop} style={styles.shopImage} />
                          <View style={styles.shopInfo}>
                            <Text style={styles.shopName}>Trendy Apparel</Text>
                            <View style={styles.shopRow}>
                              <Text style={styles.shopMeta}>12–15mins</Text>
                              <Text style={styles.dot}>•</Text>
                              <Text style={styles.shopMeta}>1.2 km</Text>
                              <Text style={styles.dot}>•</Text>
                              <MaterialIcons name="local-shipping" size={16} color="#B0B0B0" />
                              <Text style={styles.shopMeta}>FREE</Text>
                            </View>
                            <View style={styles.offerRow}>
                              <Text style={styles.offerText}>Flat ₹ 150 off above ₹ 150</Text>
                            </View>
                            <View style={styles.shopRow}>
                              <AntDesign name="star" size={16} color="#FFD700" />
                              <Text style={styles.ratingText}>4.5 (By 200+)</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.statusRow}>
                          <Text style={styles.statusText}>Last 100 Order without Complaints</Text>
                        </View>
                      </View>
                      <View style={{width:4}}></View>
                      <View style={styles.shopCard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, width: '100%' }}>
                          <Image source={AppImages.shop} style={styles.shopImage} />
                          <View style={styles.shopInfo}>
                            <Text style={styles.shopName}>Trendy Apparel</Text>
                            <View style={styles.shopRow}>
                              <Text style={styles.shopMeta}>12–15mins</Text>
                              <Text style={styles.dot}>•</Text>
                              <Text style={styles.shopMeta}>1.2 km</Text>
                              <Text style={styles.dot}>•</Text>
                              <MaterialIcons name="local-shipping" size={16} color="#B0B0B0" />
                              <Text style={styles.shopMeta}>FREE</Text>
                            </View>
                            <View style={styles.offerRow}>
                              <Text style={styles.offerText}>Flat ₹ 150 off above ₹ 150</Text>
                            </View>
                            <View style={styles.shopRow}>
                              <AntDesign name="star" size={16} color="#FFD700" />
                              <Text style={styles.ratingText}>4.5 (By 200+)</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.statusRow}>
                          <Text style={styles.statusText}>Last 100 Order without Complaints</Text>
                        </View>
                      </View>
                    </ScrollView>
          {/* Product Detail View */}
          <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, marginTop:20, flex: 1 }}>
            {/* Product Image Carousel */}
            <View>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ width: '100%', height: 150 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {productImages.map((img, idx) => (
                  <Image
                    key={idx}
                    source={img}
                    style={{
                      width: 250,
                      height: 150,
                      borderRadius: 16,
                      marginRights: idx !== productImages.length - 1 ? 10 : 0,
                      resizeMode: 'contain',
                    }}
                  />
                ))}
              </ScrollView>
              {/* Dots Indicator */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, height:16 }}>
                {productImages.map((_, idx) => (
                  <View
                    key={idx}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: carouselIndex === idx ? '#E33C84' : '#E0E0E0',
                      marginHorizontal: 4,
                    }}
                  />
                ))}
              </View>
            </View>
            {/* Product Info */}
            <View style={{ marginTop: 15, marginBottom: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Sportwear Set</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginRight: 10 }}>₹ 80.00</Text>
                <AntDesign name="star" size={16} color="#1DBF73" />
                <Text style={{ fontSize: 15, color: '#1DBF73', fontWeight: 'bold', marginLeft: 4 }}>5.0</Text>
                <Text style={{ fontSize: 13, color: '#888', marginLeft: 4 }}>(83)</Text>
              </View>
            </View>
            {/* Color Selector */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold', color: '#222', marginRight: 10 }}>Color</Text>
              <View style={{ flexDirection: 'row' }}>
                {colorOptions.map(opt => (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => setSelectedColor(opt.key)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: opt.color,
                      marginRight: 8,
                      borderWidth: 2,
                      borderColor: selectedColor === opt.key ? '#E33C84' : '#fff',
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {selectedColor === opt.key && (
                      <AntDesign name="check" size={14} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Size Selector */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold', color: '#222', marginRight: 10 }}>Size</Text>
              <View style={{ flexDirection: 'row' }}>
                {sizeOptions.map(size => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: selectedSize === size ? '#222' : '#F5F5F5',
                      marginRight: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: selectedSize === size ? '#222' : '#E0E0E0',
                    }}
                  >
                    <Text style={{ color: selectedSize === size ? '#fff' : '#888', fontWeight: 'bold' }}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Description */}
            <View style={{ marginTop: 8 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 16, flex: 1 }}>Description</Text>
                <AntDesign name="down" size={18} color="#888" />
              </TouchableOpacity>
              <Text style={{ color: '#444', fontSize: 14 }}>
                Sportswear is no longer under culture, it is no longer indie or cobbled together as it once was. Sport is fashion today. The top is oversized in fit and style, may need to size down. <Text style={{ color: '#1DA1F2', fontWeight: 'bold' }}>Read more</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
    shadowColor: '#E33C84',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  sidebar: {
    width: 90,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
    paddingTop: 18,
    paddingBottom: 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 0,
  },
  categoryItem: {
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 14,
    width: 70,
  },
  categoryItemSelected: {
    backgroundColor: '#FFF0F0',
    borderColor: THEME_COLOR,
    borderWidth: 1.5,
  },
  filterButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    marginBottom: 10,
    width: 70,
  },
  allButton: {
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    marginBottom: 10,
    width: 70,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 13,
    color: '#B0B0B0',
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryLabelSelected: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 13,
  },
  categoryLabelBold: {
    fontWeight: 'bold',
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    padding: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#rgba(227, 60, 132, 1)',
    flex: 1,
    width: '95%',
    height:180
  },
  shopImage: {
    width: 80,
    height: 110,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
  },
  shopInfo: {
    flex: 1,
    width: '100%',
  },
  shopName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  shopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
    width: '70%',
  },
  shopMeta: {
    fontSize: 13,
    color: '#888',
    marginRight: 4,
  },
  dot: {
    fontSize: 13,
    color: '#888',
    marginHorizontal: 2,
  },
  offerRow: {
    backgroundColor: '#E6F9E6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginVertical: 4,
    width: '80%',
  },
  offerText: {
    color: '#1DBF73',
    fontSize: 11,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 13,
    color: '#222',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  statusRow: {
    marginTop: 12,
    backgroundColor: 'rgba(227, 248, 255, 1)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: '100%',
  },
  statusText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500'
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  productCardSelected: {
    borderColor: '#1DA1F2',
    borderWidth: 2,
    shadowColor: '#1DA1F2',
    shadowOpacity: 0.15,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    zIndex: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    marginRight: 8,
  },
  productOldPrice: {
    fontSize: 13,
    color: '#B0B0B0',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: '#1DBF73',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  ratingCount: {
    fontSize: 12,
    color: '#888',
    marginLeft: 2,
  },
});


export default DressDetailScreen;

