import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
    mainContainer: {
        // paddingHorizontal: '3%',
        height: '100%',
        backgroundColor: Colors.WHITE
    },
    cardTxt: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500'
    },
    TxtSmlGray: {
        color: Colors.GRAY4,
        fontSize: 13
    },
    cardCont: {
        width: '96%',
        backgroundColor: '#fff',
        elevation: 4,
        borderRadius: 15,
        height: 'auto',
        marginVertical: height * 0.006,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: height * 0.02,
        paddingBottom: height * 0.04
    },
    flexRow: { flexDirection: 'row' },
    Txt: {
        color: Colors.GRAY3,
        fontSize: 15, paddingHorizontal: height * 0.01
    },
    borderBtn: {
        borderColor: Colors.GRAY4,
        width: 'auto',
    },
    borderBtnTxt: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.THEMECOLOR
    },
    backgroundVideo: {
        width: '100%',
        height: 190, // or any other size you prefer
    },
    image: {
        height: height * 0.15,
        width: height * 0.17,
        borderRadius: 15,
        alignSelf: 'center'
    },
    widthAuto: { width: 'auto' },
    width55: { width: '60%' },
    AddBtn: {
        backgroundColor: Colors.WHITE,
        padding: height * 0.01,
        position: 'absolute',
        bottom: -12,
        borderRadius: 30,
        paddingHorizontal: width * 0.04,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.THEMECOLOR
    },
    AddBtnTxt: { color: Colors.BLACK, fontSize: 13 },
    AddCartBtn:{
        backgroundColor: Colors.THEMECOLOR,
        padding: height * 0.01,
        position: 'absolute',
        bottom: -12,
        borderRadius: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        width: width * 0.28,
        justifyContent: 'space-around'
    },
    TxtWhite: {
        color: Colors.WHITE,
        fontSize: 16,
    },
});