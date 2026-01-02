import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';

const earringsData = [
  {
    id: '1',
    image: AppImages.jwel,
    title: 'TIFFANY AND CO.',
    subtitle: 'Floral Rise Necklace',
    price: 'Rs.730',
    rating: 4.8,
  },
  {
    id: '2',
    image: AppImages.jwel1,
    title: 'TIFFANY AND CO.',
    subtitle: 'Floral Rise Necklace',
    price: 'Rs.920',
    rating: 4.8,
  },
  {
    id: '3',
    image: AppImages.jwel2,
    title: 'TIFFANY AND CO.',
    subtitle: 'Floral Rise Necklace',
    price: 'Rs.440',
    rating: 4.8,
  },
  {
    id: '4',
    image: AppImages.jwel3,
    title: 'TIFFANY AND CO.',
    subtitle: 'Floral Rise Necklace',
    price: 'Rs.870',
    rating: 4.8,
  },
    {
    id: '5',
    image: AppImages.jwel4,
    title: 'TIFFANY AND CO.',
    subtitle: 'Floral Rise Necklace',
    price: 'Rs.870',
    rating: 4.8,
  },
    {
    id: '6',
    image: AppImages.jwel5,
    title: 'TIFFANY AND CO.',
    subtitle: 'Floral Rise Necklace',
    price: 'Rs.870',
    rating: 4.8,
  },
];

export default function EarringsListScreen({ navigation }) {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
    } else {
      navigation.navigate('ProductList', { category: categoryKey, categoryLabel });
    }
    if (categoryKey === 'necklaces') {
      navigation.navigate('NecklaceList', { category: categoryKey, categoryLabel });
    } else {
      navigation.navigate('ProductList', { category: categoryKey, categoryLabel });
    }
  };

  const renderItem = ({ item }) => {
    const isWishlisted = wishlist[item.id];
    return (
      <View style={styles.productCard}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productSubtitle}>{item.subtitle}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>{item.rating} Ratings</Text>
          </View>
          <TouchableOpacity style={styles.buyNowBtn}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.wishlistBtn} onPress={() => toggleWishlist(item.id)}>
          <Image
            source={
              isWishlisted
                ? require('../../assets/images/redheart.png') // Use a filled heart icon if available
                : require('../../assets/images/redfill.png') // Use an outlined heart icon
            }
            style={[
              styles.wishlistIcon,
              isWishlisted && { tintColor: '#C8002F' },
              !isWishlisted && { tintColor: '#C8002F' },
            ]}
          />
        </TouchableOpacity>
      </View>
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

          <Text style={styles.headerTitle}>Earrings</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/jnot.png')} style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/images/jbag1.png')} style={styles.headerIcon1} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image source={require('../../assets/images/jsearch.png')} style={styles.searchIcon} />
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
          <Text style={styles.earringsCount}>521 EARRINGS</Text>
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

      <FlatList
        data={earringsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    backgroundColor: '#C8002F',
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
    tintColor: Colors.maroon3,
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
    marginTop: 30
  },
  searchIcon: {
    width: 22,
    height: 22,
    tintColor: '#C8002F',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'red',
  },
  voiceIcon: {
    width: 24,
    height: 24,
    tintColor: '#C8002F',
    marginHorizontal: 0,
  },
  cameraIcon: {
    width: 27,
    height: 27,
    tintColor: '#C8002F',
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
  listContent: {
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    // backgroundColor: '#d31313ff',
    marginHorizontal: 16,
    marginBottom: 18,
    // borderRadius: 16,
    // elevation: 2,
    // shadowColor: '#C8002F',
    // shadowOpacity: 0.08,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: 2 },
    // padding: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 130,
    // borderRadius: 12,
    marginRight: 14,
    resizeMode:'contain'
    // backgroundColor: '#F8F8F8',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1,
    color: '#000000',
  },
  productSubtitle: {
    fontSize: 15,
    color: '#555555',
    marginTop: 1,
  },
  productPrice: {
    color: '#DD8560',
    fontWeight: '400',
    fontSize: 15,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingStar: {
    color: '#DD8560',
    fontSize: 16,
    marginRight: 3,
  },
  ratingText: {
    color: '#555555',
    fontSize: 12,
  },
  buyNowBtn: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  buyNowText: {
    color: '#555555',
    fontWeight: 'bold',
    fontSize: 13,
  },
  wishlistBtn: {
    marginLeft: 10,
    padding: 6,
  },
  wishlistIcon: {
    width: 28,
    height: 28,
    tintColor: '#C8002F',
  },
});