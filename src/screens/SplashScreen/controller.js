import { getTokenStorage } from '../../utils/tokenStorage';
import { requestAllPermissions } from '../../utils/permissions';
import { registerDeviceToken } from '../../utils/pushNotifications';

const TimeOut = async (props) => {
    const { navigation } = props;
    await requestAllPermissions();
    const token = await getTokenStorage();
    if (token) {
        registerDeviceToken().catch(() => {});
        navigation.replace('MainTabs');
    } else {
        navigation.replace('Login');
    }
};

export { TimeOut };