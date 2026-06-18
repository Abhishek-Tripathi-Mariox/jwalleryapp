import { getTokenStorage } from '../../utils/tokenStorage';
import { requestAllPermissions } from '../../utils/permissions';

const TimeOut = async (props) => {
    const { navigation } = props;
    await requestAllPermissions();
    const token = await getTokenStorage();
    if (token) {
        navigation.replace('MainTabs');
    } else {
        navigation.replace('Login');
    }
};

export { TimeOut };