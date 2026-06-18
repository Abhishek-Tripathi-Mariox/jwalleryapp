import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import { browseProducts } from '../../utils/api';
import { resizedImage } from '../../utils/imageProxy';

const THEME = '#930e6e';

const formatPrice = (n) => Number(n || 0).toLocaleString('en-IN');

export default function GiftUnder1999Screen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await browseProducts({ maxPrice: 1999, limit: 50 });
        const list = res?.data?.products || res?.data || [];
        setProducts(Array.isArray(list) ? list : []);
      } catch (e) {
        console.log('GiftUnder1999 load error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }) => {
    const img = item.productImages?.[0]?.url || item.productImage;
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
      >
        {img ? (
          <Image source={{ uri: resizedImage(img, 400) }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.noImage]}><Text style={{ color: '#999', fontSize: 12 }}>No Image</Text></View>
        )}
        {item.brand ? <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text> : null}
        <Text style={styles.name} numberOfLines={1}>{item.productName}</Text>
        <Text style={styles.price}>₹{formatPrice(item.discountPrice || item.price)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation} title="GIFT UNDER ₹1999" />
      {loading ? (
        <ActivityIndicator size="large" color={THEME} style={{ marginTop: 40 }} />
      ) : products.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>No gifts under ₹1999 right now.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ padding: 12, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 8,
    marginBottom: 12,
  },
  image: { width: '100%', height: 150, borderRadius: 8, resizeMode: 'cover', backgroundColor: '#f6f6f6' },
  noImage: { justifyContent: 'center', alignItems: 'center' },
  brand: { fontSize: 11, color: '#888', marginTop: 6 },
  name: { fontSize: 13, color: '#222', fontWeight: '500', marginTop: 2 },
  price: { fontSize: 14, color: THEME, fontWeight: '700', marginTop: 4 },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 15 },
});
