import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: Colors.WHITE,
        height: '100%',
        paddingHorizontal: '3%',
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
        backgroundColor: '#fff',
        width: '30%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: height * 0.019,
        elevation: 6,
        margin: 5,
    },
    Cardlabel: {
        color: Colors.DARK_GRAY,
        fontSize: 13,
        textAlign: 'center'
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
        marginVertical: height * 0.01,
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
        borderRadius: height * 0.02, // Optional: gives rounded corners to the image itself
        zIndex: 0, // Ensures the image stays on top of the background
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
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
        marginTop: height * 0.01
    }
});