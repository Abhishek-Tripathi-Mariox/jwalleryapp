import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList, Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import { Colors } from '../../themes/Colors';
import { Vector } from '../../assets/vector/vector.icon';
import PolicyView from '../../components/PolicyContainer/PolicyView';
import { AppImages } from '../../constants/app.image';
import BottomDetails from '../../components/Bottom/BottomDetails';
import { AppIcons } from '../../constants/app.icon';
import { styles } from './styles';
import BottomPayDtls from '../../components/Bottom/BottomPayDtls';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

import { useEffect } from 'react';
import { listUserAddresses, selectUserAddress, deleteUserAddress } from '../../utils/userAddress';
import { showToast } from '../../utils/toast';

const AddressDtlsScreen = (props) => {
    const { navigation } = props;
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAddresses = async () => {
        setLoading(true);
        const result = await listUserAddresses();
        setLoading(false);
        if (result.success) {
            setAddresses(result.addresses);
        } else {
            showToast(result.message, 'error');
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSelect = async (addressId) => {
        setLoading(true);
        const result = await selectUserAddress(addressId);
        setLoading(false);
        showToast(result.message, result.success ? 'success' : 'error');
        if (result.success) fetchAddresses();
    };

    const handleDelete = async (addressId) => {
        setLoading(true);
        const result = await deleteUserAddress(addressId);
        setLoading(false);
        showToast(result.message, result.success ? 'success' : 'error');
        if (result.success) fetchAddresses();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <View style={{ paddingHorizontal: '3%' }}>
                <BackHeader name={"back"} size={20} color={Colors.BLACK} label={"Back"} {...props} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: '5%', gap: 20, marginTop: height * 0.02 }}>
                    <Text style={styles.TxtBold}>Your Addresses</Text>
                    {loading && <Text>Loading...</Text>}
                    {!loading && addresses.length === 0 && (
                        <Text style={{ color: '#888', marginTop: 20 }}>No addresses found.</Text>
                    )}
                    {!loading && addresses.map(addr => (
                        <View key={addr._id} style={{ backgroundColor: '#f8f8f8', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{addr.fullName}</Text>
                            <Text>{addr.address}</Text>
                            <Text>{addr.city}, {addr.state} - {addr.pinCode}</Text>
                            <Text>Type: {addr.addressType}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: Colors.theme1, borderRadius: 8, padding: 8, marginRight: 10 }}
                                    onPress={() => handleSelect(addr._id)}
                                >
                                    <Text style={{ color: '#fff' }}>{addr.isSelected ? 'Selected' : 'Select'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: Colors.RED1, borderRadius: 8, padding: 8 }}
                                    onPress={() => handleDelete(addr._id)}
                                >
                                    <Text style={{ color: '#fff' }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <BottomPayDtls
                btnLabel={"Pay & Book Instant"}
                rytLabel={"Schedule for later"}
                amount={'219'}
                onPress={() => navigation.navigate("AmountDtlsScreen")}
            />

        </SafeAreaView>
    );
}
export default AddressDtlsScreen;