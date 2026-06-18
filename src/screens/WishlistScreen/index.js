import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';
import { fetchWishlist, removeFromWishlist } from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import BackHeader from '../../components/Header/BackHeader';

export default function WishlistScreen({ navigation }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWishlist = async () => {
        try {
            const res = await fetchWishlist();
            if (res?.code === 1 && res.data) {
                const list = res.data.wishlist || res.data.items || res.data || [];
                setItems(Array.isArray(list) ? list : []);
            }
        } catch (e) {
            console.log('Wishlist load error:', e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            loadWishlist();
        }, [])
    );

    const handleRemove = async (productId) => {
        try {
            await removeFromWishlist(productId);
            setItems(prev => prev.filter(i => (i.productId?._id || i.productId || i._id) !== productId));
        } catch (e) {
            console.log('Remove wishlist error:', e);
        }
    };

    const renderItem = ({ item }) => {
        const product = item.productId || item;
        const imageUrl = product.productImages?.[0]?.url;
        const price = product.discountPrice || product.price || 0;

        return (
            <View style={styles.productCard}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                ) : (
                    <View style={[styles.productImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ color: '#999', fontSize: 12 }}>No Image</Text>
                    </View>
                )}
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{product.brand || product.productName}</Text>
                    <Text style={styles.productSubtitle}>{product.productName}</Text>
                    <Text style={styles.productPrice}>₹{price}</Text>
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingStar}>★</Text>
                        <Text style={styles.ratingText}>{product.rating || 0} Ratings</Text>
                    </View>
                    <TouchableOpacity style={styles.buyNowBtn}
                        onPress={() => navigation.navigate('ProductDetailScreen', { productId: product._id, product })}>
                        <Text style={styles.buyNowText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.wishlistBtn} onPress={() => handleRemove(product._id)}>
                    <Image
                        source={require('../../assets/images/redheart.png')}
                        style={styles.wishlistIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                navigation={navigation}
                title="WISHLIST"
                rightIcon={AppImages.jnotification}
                onRightPress={() => navigation.navigate('Notification')}
            />
            {/* Wishlist List */}
            {loading ? (
                <ActivityIndicator size="large" color={Colors.theme1} style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => (item.productId?._id || item._id || String(Math.random()))}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.emptyText}>No items in wishlist.</Text>}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: Colors.theme1,
        paddingTop: 40,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: 20,
        fontWeight: '500',
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
    listContent: {
        paddingHorizontal: 0,
        paddingTop: 10,
        paddingBottom: 20,
    },
    productCard: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 18,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 130,
        marginRight: 14,
        resizeMode: 'contain',
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
        tintColor: Colors.theme1,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 60,
    },
});
