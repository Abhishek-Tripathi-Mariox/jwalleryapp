import { Platform, PermissionsAndroid } from 'react-native';

const requestAllPermissions = async () => {
  if (Platform.OS !== 'android') return;

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    ];

    // Photo/video picking goes through react-native-image-picker, which uses
    // the system photo picker (no permission needed) on Android 13+ and a
    // permission-less document/content picker on older versions — so no
    // READ_MEDIA_IMAGES / READ_MEDIA_VIDEO / *_EXTERNAL_STORAGE permission is
    // requested here. Google Play policy requires apps to rely on system
    // pickers instead of these broad storage permissions where possible.
    if (Platform.Version >= 33) {
      permissions.push(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    const results = await PermissionsAndroid.requestMultiple(permissions);
    console.log('Permissions results:', results);
    return results;
  } catch (err) {
    console.warn('Permission request error:', err);
  }
};

export { requestAllPermissions };
