import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
    image: {
        width: width * 0.7,
        height: height * 0.067,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    mainContainer: {
        flex: 1,
        // backgroundColor: Colors.MAINBG,
        justifyContent: 'center',
    },
    mainCard: {
        // width: 169,
        // height: 169,
        // elevation: 10,
        // backgroundColor: Colors.WHITE,
        // alignSelf: 'center',
        // borderRadius: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
});