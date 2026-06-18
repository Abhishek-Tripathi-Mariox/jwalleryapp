import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  backgroundGradient: {
    flex: 1,
  },
  headerBanner: {
    width: '100%',
    height: 289,
    backgroundColor: '#940A57',
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBannerCompact: {
    height: 150,
  },
  image: {
    width: 320,
    height: 210,
    resizeMode: 'contain',
  },
  imageCompact: {
    width: 180,
    height: 110,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    color: '#2A2A2A',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 25,
    marginBottom: 20,
  },
  subHeading: {
    color: Colors.GRAY12,
    fontSize: 16,
    paddingVertical: 7,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderColor: '#B8B8B8',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: Colors.BLACK,
  },
  button: {
    height: 54,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#940A57',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
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
    color: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    color: '#A6A6A6',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  linkText: {
    color: '#123CC6',
    textDecorationLine: 'underline',
  },
});