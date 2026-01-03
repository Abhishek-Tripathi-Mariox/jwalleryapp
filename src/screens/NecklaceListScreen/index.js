import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';

const necklaceData = [
  {
    id: '1',
    image: AppImages.jwel,
    title: 'Tiffany and Co.',
    subtitle: 'floral rise necklace',
    price: 'Rs.720',
    colors: ['silver', 'gray', 'yellow'],
  },
  {
    id: '2',
    image: AppImages.jwel1,
    title: 'Tiffany and Co.',
    subtitle: 'floral rise necklace',
    price: 'Rs.920',
    colors: ['silver', 'gray', 'yellow'],
  },
  {
    id: '3',
    image: AppImages.jwel2,
    title: 'Tiffany and Co.',
    subtitle: 'floral rise necklace',
    price: 'Rs.440',
    colors: ['silver', 'gray', 'yellow'],
  },
  {
    id: '4',
    image: AppImages.jwel3,
    title: 'Tiffany and Co.',
    subtitle: 'floral rise necklace',
    price: 'Rs.870',
    colors: ['silver', 'gray', 'yellow'],
  },
    {
    id: '5',
    image: AppImages.jwel4,
    title: 'Tiffany and Co.',
    subtitle: 'floral rise necklace',
    price: 'Rs.440',
    colors: ['silver', 'gray', 'yellow'],
  },
  {
    id: '6',
    image: AppImages.jwel5,
    title: 'Tiffany and Co.',
    subtitle: 'floral rise necklace',
    price: 'Rs.870',
    colors: ['silver', 'gray', 'yellow'],
  },
];

const filterChips = ['Women', 'Necklace', 'Diamond'];

export default function NecklaceListScreen({ navigation }) {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => {
    const isWishlisted = wishlist[item.id];
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
        activeOpacity={0.85}
      >
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity style={styles.wishlistBtn} onPress={() => toggleWishlist(item.id)}>
          <Image
            source={
              isWishlisted
                ? require('../../assets/images/redheart.png') // Use a filled heart icon if available
                : require('../../assets/images/redfill.png') // Use an outlined heart icon
            }
            style={[
              styles.wishlistIcon,
              isWishlisted && { tintColor: '#DD8560' },
              !isWishlisted && { tintColor: '#DD8560' },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productSubtitle}>{item.subtitle}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: -10
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIconContainer}
          >
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Necklace</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/jnot.png')} style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/images/jbag1.png')} style={styles.headerIcon1} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Category Title and Filters */}
        <View style={styles.categoryRow}>
          <Text style={styles.necklaceCount}>52 NECKLACE</Text>
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

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {filterChips.map((chip, idx) => (
          <View key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
            <Text style={styles.chipClose}>×</Text>
          </View>
        ))}
      </ScrollView>
      {/* Product Grid */}
      <FlatList
        data={necklaceData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    backgroundColor: Colors.theme1,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backIconContainer: {
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    borderRadius: 50,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 28,
    height: 28,
    marginLeft: 16,
    tintColor: '#fff',
  },
  headerIcon1: {
    width: 30,
    height: 30,
    marginLeft: 10,
    tintColor: '#fff',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  necklaceCount: {
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
    backgroundColor: '#db1143ff',
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
    backgroundColor: '#db1143ff',
    borderRadius: 20,
    padding: 3,
    margin:2
  },
  filterIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  chipScroll: {
    marginTop: 16,
    // marginBottom: 8,
    paddingHorizontal: 8,
  },
  chip: {
    height:40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 13,
    paddingVertical: 6,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginBottom:17
  },
  chipText: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 6,
  },
  chipClose: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: 170,
    height: 250,
    marginBottom: 8,
  },
  wishlistBtn: {
    position: 'absolute',
    right: 5,
    zIndex: 2,
    padding: 4,
    bottom:90
  },
  wishlistIcon: {
    width: 28,
    height: 28,
    tintColor: '#DD8560',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    // letterSpacing: 1,
    color: '#000000',
    marginTop: 4,
  },
  productSubtitle: {
    fontSize: 15,
    color: '#555555',
    marginTop: 2,
    textTransform: 'lowercase',
  },
  productPrice: {
    color: '#DD8560',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
    marginBottom: 4,
  },
});