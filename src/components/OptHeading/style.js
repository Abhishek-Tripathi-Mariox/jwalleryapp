import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../themes/Colors';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingVertical: height * 0.016,
        alignItems: 'center',
        paddingHorizontal: '5%',
        alignSelf: 'center'
    },
    line: {
        height: height * 0.0025,
        backgroundColor: Colors.GRAY1,
        borderRadius: 10
    },
    title: {
        color: Colors.GRAY2,
        fontWeight: '500',
        fontSize: 15,
        width: 'auto',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    flexRowSW: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: height * 0.016,
        paddingHorizontal: '3%',
    },
    RytTitle: {
        color: Colors.BLACK,
        fontWeight: '500',
        fontSize: 16,
    },
    ViewAllBtnTxt: {
        color: Colors.THEMECOLOR,
        fontSize: 16,
        fontWeight: '400',
        borderBottomWidth: 1.2,
        borderBottomColor: Colors.THEMECOLOR
    }
});