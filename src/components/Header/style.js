import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../themes/Colors';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    backHeaderCont: {
        flexDirection: 'row',
        width: '40%',
        height: height * 0.065,
        alignItems: 'center'
    },
    backHeaderlabel: {
        color: Colors.GRAY3,
        fontSize: 18,
        fontWeight: '500',
        paddingLeft: width * 0.04,
        fontFamily: 'Poppins-Medium',
    },
    headerCont: {
        // backgroundColor: Colors.THEMECOLOR,
        borderBottomRightRadius: height * 0.045,
        borderBottomLeftRadius: height * 0.045,
        paddingVertical: height * 0.012,
        width: '100%',
        // opacity: 0.9
    },
    headerlabel: {
        color: Colors.WHITE,
        fontSize: 17,
        fontWeight: '500',
        paddingLeft: width * 0.03,
        fontFamily: 'Poppins-Medium',
    },
    profileIcon: {
        height: height * 0.055,
        width: height * 0.055,
        borderRadius: 30,
    },
    LOGOIcon: {
        width: width * 0.45,
        height: height * 0.045,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    headerLeftCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    searchCont: {
        backgroundColor: Colors.MAINBG,
        borderRadius: 30,
        width: '95%',
        height: height * 0.06,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: height * 0.025,
        alignSelf: 'center',
        elevation: 6,
        marginVertical: height * 0.01,
        marginTop: height * 0.015
    },
    searchTxt: {
        color: Colors.GRAY4,
        fontSize: 16,
        fontWeight: '400',
        left: width * 0.025,
        fontFamily: 'Poppins-Regular',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.theme1,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        height: 60,
    },
    headerBackBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 18,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '500',
        letterSpacing: 2,
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    headerRightBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRightIcon: {
        resizeMode: 'contain',
        width: 22,
        height: 22,
        tintColor: '#fff',
    },
    headerLogoContainer: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLogo: {
        width: 32,
        height: 32,
    },
});