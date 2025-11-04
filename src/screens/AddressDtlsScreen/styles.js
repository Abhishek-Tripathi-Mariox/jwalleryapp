import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
    
    TxtBold:{
        color: Colors.DARK_GRAY,
        fontSize: 17,
        fontWeight: '500'
    },
    flexRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', marginHorizontal: 2
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
        height: height * 0.07,
        width: '70%',
        borderRadius: 30,
        padding: height * 0.02,
        borderColor: Colors.GRAY1,
        borderWidth: 1,
        color: Colors.BLACK
    },
});