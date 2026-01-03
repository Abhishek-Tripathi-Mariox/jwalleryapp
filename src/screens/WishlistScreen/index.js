import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';

// Dummy wishlist data (can be replaced with real data)
const wishlistData = [
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
];

export default function WishlistScreen({ navigation }) {
    const [wishlist, setWishlist] = useState({});

    const toggleWishlist = (id) => {
        setWishlist((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderItem = ({ item }) => {
        const isWishlisted = wishlist[item.id] !== false; // default true
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
                    <TouchableOpacity style={styles.buyNowBtn}
                        onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}>
                        <Text style={styles.buyNowText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.wishlistBtn} onPress={() => toggleWishlist(item.id)}>
                    <Image
                        source={
                            isWishlisted
                                ? require('../../assets/images/redheart.png')
                                : require('../../assets/images/redfill.png')
                        }
                        style={styles.wishlistIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backIconContainer}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Wishlist</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Image source={require('../../assets/images/jnot.png')} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Image source={require('../../assets/images/jbag1.png')} style={styles.headerIcon1} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Wishlist List */}
            <FlatList
                data={wishlistData.filter(item => wishlist[item.id] !== false)}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.emptyText}>No items in wishlist.</Text>}
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
        marginTop: 40,
    },
});
