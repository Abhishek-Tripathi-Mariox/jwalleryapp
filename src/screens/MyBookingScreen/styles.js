import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: '3%',
        height: '100%',
        backgroundColor: Colors.MAINBG
    },
    Txt: {
        color: '#000',
        fontSize: 15,
    },
    cardTxt: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500'
    },
    cardCont: {
        width: '99%',
        backgroundColor: '#fff',
        // elevation: 1,
        borderRadius: 10,
        height: 'auto',
        marginVertical: height * 0.006,
        alignSelf: 'center',
        padding: height * 0.02,
        gap: height * 0.018,
        borderWidth: 1,
        borderColor: Colors.GRAY1
    },
    flexRow: { flexDirection: 'row' },
    Txt: {
        color: Colors.GRAY3,
        fontSize: 13, paddingHorizontal: height * 0.01
    },
    borderBtn:{
        borderRadius: 30,
        borderWidth: 1.2,
        borderColor: Colors.GRAY4,
        width: 'auto',
        padding: height * 0.012
    },
    borderBtnTxt:{
        fontSize: 15,
        fontWeight: '500',
        color: Colors.GRAY4
    }
});