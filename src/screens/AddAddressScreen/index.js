import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';

const THEME_COLOR = Colors.theme1;

import { addUserAddress } from '../../utils/userAddress';
import { showToast } from '../../utils/toast';
const tags = ['Home', 'Work', 'Hotel', 'Others'];

const AddAddressScreen = ({ visible, onClose, navigation }) => {
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedCity, setSelectedCity] = useState('Noida');
    const [selectedTag, setSelectedTag] = useState('Work');
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const addressData = {
            fullName,
            city: selectedCity,
            state: 'Uttar Pradesh', // You can make this dynamic if needed
            mobile,
            pinCode: 226010, // You can make this dynamic if needed
            address: `${address}, ${houseNo}, ${selectedSector}`,
            addressType: selectedTag,
        };
        const result = await addUserAddress(addressData);
        setLoading(false);
        showToast(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            onClose();
            if (navigation) navigation();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>Enter Address Details</Text>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="close" size={22} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TextInput style={styles.input} placeholder="Full Name*" placeholderTextColor="#B0B0B0" value={fullName} onChangeText={setFullName} />
                        <TextInput style={styles.input} placeholder="Contact Number*" placeholderTextColor="#B0B0B0" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
                        <TextInput style={styles.input} placeholder="Write your society & other address*" placeholderTextColor="#B0B0B0" value={address} onChangeText={setAddress} />
                        <TextInput style={styles.input} placeholder="House / Office No. / Floor*" placeholderTextColor="#B0B0B0" value={houseNo} onChangeText={setHouseNo} />
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                placeholder="Area*"
                                placeholderTextColor="#B0B0B0"
                                value={selectedSector}
                                onChangeText={setSelectedSector}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="City*"
                                placeholderTextColor="#B0B0B0"
                                value={selectedCity}
                                onChangeText={setSelectedCity}
                            />
                        </View>
                        <Text style={styles.tagLabel}>Tag this location for latter*</Text>
                        <View style={styles.tagRow}>
                            {tags.map(tag => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[
                                        styles.tagBtn,
                                        selectedTag === tag && { backgroundColor: THEME_COLOR }
                                    ]}
                                    onPress={() => setSelectedTag(tag)}
                                >
                                    <Text style={[
                                        styles.tagText,
                                        selectedTag === tag && { color: '#fff' }
                                    ]}>{tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.infoTitle}>Address Preview</Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                {address ? `Address: ${address}` : 'Address not entered yet.'}
                            </Text>
                            <Text style={styles.infoText}>
                                {houseNo ? `House/Office No.: ${houseNo}` : 'House/Office No. not entered yet.'}
                            </Text>
                            <Text style={styles.infoSoon}>We will reach you soon!</Text>
                        </View>
                        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
                            <Text style={styles.saveBtnText}>{loading ? 'Saving...' : 'Save & Continue'}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.10)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        // borderRadius: 22,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        padding: 18,
        marginTop: 40,
        marginBottom: -94,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        alignSelf: 'center',
        maxHeight: '92%',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#222',
    },
    input: {
        backgroundColor: Colors.WHITE1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 13,
        fontSize: 14,
        color: Colors.GRAY7,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        // shadow for iOS
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        // elevation for Android
        elevation: 3,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dropdown: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 13,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    dropdownText: {
        flex: 1,
        color: '#B0B0B0',
        fontSize: 15,
    },
    tagLabel: {
        fontWeight: 'bold',
        color: '#222',
        fontSize: 15,
        marginBottom: 8,
        marginTop: 2,
    },
    tagRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tagBtn: {
        backgroundColor: '#F8F8F8',
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingVertical: 7,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    tagText: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoBox: {
        backgroundColor: '#F8F8F8',
        borderRadius: 14,
        padding: 12,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    infoTitle: {
        color: Colors.RED1,
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 2,
    },
    infoText: {
        color: '#B0B0B0',
        fontSize: 13,
        marginBottom: 2,
    },
    infoSoon: {
        color: Colors.RED1,
        fontWeight: 'bold',
        fontSize: 13,
    },
    saveBtn: {
        backgroundColor: Colors.theme1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 8,
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
});

export default AddAddressScreen;
