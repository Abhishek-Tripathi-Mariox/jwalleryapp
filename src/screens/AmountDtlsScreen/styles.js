import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: Colors.WHITE,
        height: '100%'
    },
    cardCont: {
        width: '94%',
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        height: 'auto',
        marginVertical: height * 0.009,
        alignSelf: 'center',
        padding: height * 0.025,
        gap: height * 0.019,
        borderWidth: 1,
        borderColor: Colors.GRAY1
    },
    flexRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flexRowBottomBorder:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY1,
        paddingBottom: height * 0.02
    },
    Txt:{
        color: Colors.DARK_GRAY,
        fontSize: 15,
    },
    TxtBold:{
        color: Colors.DARK_GRAY,
        fontSize: 16,
        fontWeight: '500'
    },
    TxtGray:{
        color: Colors.GRAY2,
        fontSize: 15,
    },
    gap4:{
        gap: 4
    },
    NextBtn:{
        backgroundColor: Colors.THEMECOLOR,
        paddingVertical: height * 0.017,
        paddingHorizontal: width * 0.06,
        borderRadius: 30, borderWidth: 1.5, borderColor: 'gray'
    },
    NextBtnTxt:{
       color: Colors.WHITE,
       fontSize: 15,
       fontWeight: '500'
    },
    input:{
        height: height * 0.08,
        width: '55%',
        borderRadius: 30,
        padding: height * 0.02,
        borderColor: Colors.GRAY1,
        borderWidth: 1,
        color: Colors.BLACK
    },
    promoIcon:{
        height: height * 0.02,
        width: height * 0.02,
    },
    promoIcomView:{
        height: height * 0.045,
        width: height * 0.045,
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#FFE5B4',
        justifyContent: 'center',
        alignItems: 'center'
    }
});