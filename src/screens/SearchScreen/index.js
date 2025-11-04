import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constants/app.image';

const THEME_COLOR = '#F45C5C';

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

const SearchScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('3'); // Highlight Maxi Dress as in the design

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
        <View style={{ flex: 1, padding: 10 }}>
          {/* Shop Card */}
          <View style={styles.shopCard}>
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
              <View style={styles.statusRow}>
                <Text style={styles.statusText}>Last 100 Order without Complaints</Text>
              </View>
            </View>
          </View>
          {/* Product Grid */}
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelectedProduct(item.id)}
                style={{ width: '48%' }}
              >
                <ProductCard item={item} selected={selectedProduct === item.id} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
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
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
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
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
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
    width: 32,
    height: 32,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#B0B0B0',
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: THEME_COLOR,
    fontWeight: 'bold',
  },
  categoryLabelBold: {
    fontWeight: 'bold',
  },
  shopCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  shopImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
    resizeMode: 'cover',
  },
  shopInfo: {
    flex: 1,
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
    marginBottom: 2,
  },
  offerText: {
    color: '#1DBF73',
    fontSize: 13,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 13,
    color: '#222',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  statusRow: {
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#B0E0E6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#3A7CA5',
    fontSize: 12,
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

export default SearchScreen;