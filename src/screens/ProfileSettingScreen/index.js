import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { updateUserProfile } from '../../utils/userProfile';
import { showToast } from '../../utils/toast';

const { width } = Dimensions.get('window');
const THEME_COLOR = '#FF6F61';

const ProfileSettingScreen = ({ navigation }) => {
    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const profileData = {
            fullName,
            email,
            gender,
            phone,
        };
        const result = await updateUserProfile(profileData);
        setLoading(false);
        if (result.success) {
            showToast(result.message, 'success');
        } else {
            showToast(result.message, 'error');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile Setting</Text>
                <View style={{ width: 24 }} />
            </View>
            <View style={styles.content}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Image source={require('../../assets/images/profile.jpeg')} style={styles.avatar} />
                    <TouchableOpacity style={styles.cameraIcon}>
                        <Feather name="camera" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                {/* Form */}
                <View style={styles.formRow}>
                    <View style={styles.formField}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Enter your name"
                        />
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>Gender</Text>
                        <TextInput
                            style={styles.input}
                            value={gender}
                            onChangeText={setGender}
                            placeholder="Enter your gender"
                        />
                    </View>
                    <View style={styles.formField}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            editable={false}
                            placeholder="Phone (not editable)"
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save change'}</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME_COLOR,
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 18,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        elevation: 4,
    },
    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F7F7F7',
    },
    cameraIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#222',
        borderRadius: 20,
        padding: 6,
    },
    formRow: {
        flex: 1,
        width: '88%',
    },
    formField: {
        marginBottom: 25,},
    label: {
        fontSize: 14,
        color: '#b0b0b0',
        marginBottom: 4,
    },
    input: {
        fontSize: 16,
        color: '#222',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 4,
        backgroundColor: 'transparent',
    },
    saveButton: {
        backgroundColor: THEME_COLOR,
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignSelf: 'center',
        marginVertical: 10,
        width: '80%',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProfileSettingScreen;