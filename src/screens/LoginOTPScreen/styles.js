import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
  image: {
    width: width * 1,
    height: height * 0.09,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.MAINBG,
    justifyContent: 'center',
  },
  mainCard: {
    width: '100%',
    // height: 'auto',
    // elevation: 10,
    // backgroundColor: Colors.WHITE,
    alignSelf: 'center',
    // borderRadius: 20,
    padding: height * 0.035,
    paddingVertical: height * 0.045
  },
  Btn: {
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: height * 0.06,
    height: height * 0.09
  },
  text: {
    fontSize: 16,
    color: Colors.WHITE1,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium'
  },

  button: {
    backgroundColor: Colors.theme1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.031,
  },

  input: {
    height: 50,
    borderColor: Colors.GRAY5,
    borderWidth: 1,
    paddingHorizontal: 18,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    marginVertical: height * 0.02,
    color: Colors.BLACK,
  },
  OTPInput: {
    width: height * 0.062,
    height: height * 0.062,
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1.5,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 2,
    borderRadius: 7,
    marginTop: height * 0.02,
    color: '#000'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  heading: {
    color: Colors.BLACK1,
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: height * 0.005,
    // marginTop: height * 0.1,
    textAlign: 'center',
    fontFamily: 'Poppins-Semibold'

  },
  subHeading: {
    color: Colors.GRAY6,
    fontSize: 16,
    paddingVertical: 7,
    fontFamily: 'Poppind-regular',
    fontWeight: '400',
    textAlign: 'center'
  },
  termsText: {
    color: '#000',
    fontSize: 14.5,
    textAlign: 'center',
    marginTop: 12,
  },
  linkText: {
    color: '#56a7f9ff',
    textDecorationLine: 'underline',
  },
});