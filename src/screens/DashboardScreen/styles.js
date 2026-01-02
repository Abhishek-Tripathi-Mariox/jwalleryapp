import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
    sectionContainer: {
        height: '100%',
        backgroundColor: Colors.WHITE,
    },
    topBar: {
        backgroundColor: Colors.THEMECOLOR,
        paddingTop: 10,
        paddingBottom: 10,
    },
    topBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    logo: {
        width: 150,
        height: 45,
        resizeMode: 'contain',
    },
    iconButton: {
        width: 23,
        height: 23,
        tintColor: Colors.WHITE,
        resizeMode: 'contain'
    },
    notificationIcon: {
        width: 23,
        height: 23,
        tintColor: Colors.WHITE,
        marginRight: 12,
        resizeMode: 'contain'
    },
    cartIcon: {
        width: 23,
        height: 23,
        tintColor: Colors.WHITE,
        resizeMode: 'contain'
    },
    // searchContainer: {
    //     marginTop: 12,
    //     marginHorizontal: 16,
    // },
    goldPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 0,
    },
    goldPricePill: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 15,
    },
    gradientBox: {
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    goldPriceText: {
        color: Colors.WHITE,
        fontWeight: '600',
        fontSize: 12,
    },
    specialOffersContainer: {
        marginTop: 18,
        marginHorizontal: 0,
    },
    specialOffersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginLeft: 16,
        marginBottom: 12,
    },
    specialOffersImageWrapper: {
        // marginHorizontal: 8,
        // borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        width: '100%'
        // borderColor: Colors.YELLOW,
    },
    specialOffersImage: {
        width: '100%',
        height: 353,
        resizeMode: 'cover',
    },
    shopByCategorySection: {
        marginTop: 18,
        paddingTop: 18,
    },
    shopByCategoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 19
    },
    shopByCategoryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.BLACK,
    },
    seeAllText: {
        color: Colors.BLACK,
        fontWeight: '400',
        fontSize: 14,
    },
    categoryScroll: {
        marginTop: 2,
        marginBottom: 8,
        paddingLeft: 8,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 24,
    },
    categoryIconWrapper: {
        width: 65,
        height: 65,
        backgroundColor: '#fff',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientBorder: {
        padding: 2,   // thickness of border
        borderRadius: 50, // match inner view border radius
    },
    categoryIcon: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
    },
    categoryLabel: {
        fontSize: 15,
        color: Colors.BLACK,
        fontWeight: '600',
    },
    scrollSpacer: {
        height: 80,
    },
    SplCard: {
        height: height * 0.16,
        width: height * 0.16,
        backgroundColor: Colors.WHITE,
        elevation: 6,
        borderTopEndRadius: 50,
        borderBottomStartRadius: 50,
        margin: height * 0.0042,
        justifyContent: 'center',
        borderStartColor: Colors.THEMECOLOR,
        borderStartWidth: 1.2
    },
    brandIcon: {
        height: 45,
        width: 45,
        alignSelf: 'center',
    },
    roundView: {
        height: height * 0.13,
        width: height * 0.13,
        borderRadius: 50,
        elevation: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        borderEndColor: Colors.THEMECOLOR,
        borderEndWidth: 1.2
    },
    DSlabel: {
        color: Colors.GRAY3,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500'
    },
    serviceCard: {
        backgroundColor: Colors.LIGHT_THEME,
        width: '30%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: height * 0.019,
        // elevation: 6,
        margin: 5,
        // borderWidth: 1,
        // borderColor: Colors.GRAY1
    },
    Cardlabel: {
        color: Colors.DARK_GRAY,
        fontSize: 13,
        textAlign: 'center',
        fontWeight: '500',
        width: width * 0.25
    },
    wrapCard: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    videoCard: {
        height: height * 0.35,
        width: height * 0.195,
        backgroundColor: 'transparent',
        elevation: 10,
        borderRadius: height * 0.02,
        margin: 5,
        justifyContent: 'center',
        overflow: 'hidden',
        marginHorizontal: 6,
        zIndex: 0
    },
    bannerImg: {
        height: height * 0.19,
        width: height * 0.3,
        borderRadius: 20,
        elevation: 5,
        resizeMode: 'cover',
        marginRight: height * 0.025
    },
    imageBackground: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.THEMECOLOR,
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: height * 0.02,
        zIndex: 10,
        opacity: 0.3
    },
    images: {
        height: '100%',
        width: '100%',
        borderRadius: height * 0.02,
        zIndex: 0,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '100%',
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 5,
        paddingVertical: 30,
        position: 'absolute',
        bottom: 0,
        borderStartStartRadius: 30,
        borderEndStartRadius: 30,
        height: 'auto'
    },
    modalText: {
        marginBottom: 5,
        fontSize: 18,
        textAlign: 'center',
    },
    subServiceCard: {
        backgroundColor: '#fff',
        width: 'auto',
        height: 'auto',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderEndWidth: 3,
        borderEndColor: Colors.THEMECOLOR,
        elevation: 10,
        margin: 5,
        paddingVertical: height * 0.015,
        paddingHorizontal: height * 0.05
    },
    section: {
        marginTop: height * 0.015
    },
    bgElevation: {
        backgroundColor: Colors.WHITE,
        elevation: 6,
        borderRadius: 10
    },
    brandB: {
        height: 90,
        width: 90,
        borderWidth: 1,
        borderColor: Colors.GRAY1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5

    },
    brand: {
        height: 60,
        width: 70,
        resizeMode: 'contain'
    }
    /* Promo Codes Section Styles */
    // Use this as a reference for inline styles in DashboardScreen/index.js
    // If you want to move these to StyleSheet, add them inside the StyleSheet.create({ ... }) block above.
});