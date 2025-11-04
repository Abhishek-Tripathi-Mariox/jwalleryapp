import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
  } from '@react-navigation/native';
  import {onlineManager} from '@tanstack/react-query';
  import {useFormik} from 'formik';
  
  import {AppConstants, AppScreens} from '~/constants';
  import Loader from '~/helpers/Loader';
  import {useSendOtpApiAction} from '~/store';
  import {noInternetAlert, showSnackbar} from '~/utils';
  import {LoginSchema} from '~/validation';
  
  export const useLoginController = () => {
    /* Navigation Hook */
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const {params: loginParams} =
      useRoute<RouteProp<MainStackParamList, AppScreens.LoginScreen>>();
  
    const {mutateAsync: sendOtp} = useSendOtpApiAction();
  
    /* SafeArea Hook */
    /* Redux Hook */
    /* Reference Hook */
    /* State Hook */
    /* Formik Hook */
    const formik = useFormik({
      initialValues: {mobileNumber: '', termsChecked: false},
      validationSchema: LoginSchema,
      onSubmit: (values: LoginParams) => onSubmit(values),
    });
  
    /* Functions */
    const onSubmit = (params: LoginParams) => {
      //Check form is valid
      if (!formik.isValid) {
        return;
      }
      // Check internet connection is available
      if (!onlineManager.isOnline()) {
        noInternetAlert();
        return;
      }
      Loader.showLoader();
  
      const payload: SendOtpRequest = {
        countryCode: AppConstants.COUNTY_CODE,
        phoneNumber: params.mobileNumber,
        role: AppConstants.ROLE,
      };
      sendOtp(payload)
        .then(response => {
          Loader.hideLoader();
          showSnackbar(response?.message);
          navigation.navigate(AppScreens.OTPScreen, {
            mobileNumber: params.mobileNumber,
            isFromService: loginParams?.isFromService ?? false,
          });
        })
        .catch(err => {
          showSnackbar(err);
        })
        .finally(() => {
          Loader.hideLoader();
        });
    };
    const onTermsPress = () => {
      navigation.navigate(AppScreens.TermsOfUseScreen, {});
    };
  
    const onPrivacyPress = () => {
      navigation.navigate(AppScreens.PrivacyPolicyScreen, {});
    };
  
    return {
      formik,
      loginParams,
      onTermsPress,
      onPrivacyPress,
    };
  };
  