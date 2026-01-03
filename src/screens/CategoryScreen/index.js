import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, Alert } from 'react-native';
// import Voice from 'react-native-voice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../themes/Colors';

const categories = [
  { key: 'earrings', label: 'Earrings', image: require('../../assets/images/jearing.png') },
  { key: 'rings', label: 'Rings', image: require('../../assets/images/jring.png') },
  { key: 'bracelets', label: 'Bracelets', image: require('../../assets/images/jbrace.png') },
  { key: 'chains', label: 'Chains', image: require('../../assets/images/jchain.png') },
  { key: 'necklaces', label: 'Necklaces', image: require('../../assets/images/jnecklace.png') },
  { key: 'pearl', label: 'Pearl', image: require('../../assets/images/jpearl.png') },
  { key: 'bangles', label: 'Bangles', image: require('../../assets/images/jbang.png') },
  { key: 'mangalsutra', label: 'Mangalsutra', image: require('../../assets/images/jmangalsutra.png') },
];

export default function CategoryScreen({ navigation }) {
  const isListening = useRef(false);

  // const handleSearch = (text) => {
  //   if (text && text.trim().length > 0) {
  //     navigation.navigate('ProductList', { category: text.trim() });
  //   }
  // };

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

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item.key, item.label)}>
      <View style={styles.categoryImageWrapper}>
        <Image source={item.image} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

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

          <Text style={styles.headerTitle}>Category</Text>
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
      </View>

      {/* Categories Grid */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.key}
        numColumns={4}
        contentContainerStyle={styles.categoriesGrid}
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
    tintColor: Colors.theme1,
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
    tintColor: Colors.theme1,
    marginHorizontal: 0,
  },
  cameraIcon: {
    width: 27,
    height: 27,
    tintColor: Colors.theme1,
    marginRight: 10,
  },
  categoriesGrid: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    margin: 12,
  },
  categoryImageWrapper: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 40,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  categoryImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
    marginTop: 2,
    fontWeight:'600'
  },
});