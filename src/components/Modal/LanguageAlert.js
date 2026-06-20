import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Dimensions, Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n, { setAppLanguage } from '../../i18n';

const { width, height } = Dimensions.get('window');

const LanguageAlert = ({ modalAlert, setModalAlert }) => {

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language === 'hi' ? 'Hindi' : 'English');

    // Function to change selected language
    const Change = (language) => {
        setSelectedLanguage(language);
    };

    const handleSelect = async () => {
        await setAppLanguage(selectedLanguage === 'Hindi' ? 'hi' : 'en');
        setModalAlert(false);
    };

    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAlert}
                onRequestClose={() => setModalAlert(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>

                        <Text style={[styles.modalText, { fontSize: 20, marginTop: 10 }]}>CHOOSE LANGUAGE</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%', marginTop: 20 }}>

                            <TouchableOpacity
                                onPress={() => Change('Hindi')}
                                style={[
                                    styles.lanCard,
                                    { backgroundColor: selectedLanguage === 'Hindi' ? Colors.THEMECOLOR : Colors.WHITE },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.lanTxt,
                                        { color: selectedLanguage === 'Hindi' ? Colors.WHITE : Colors.THEMECOLOR },
                                    ]}
                                >
                                    Hindi (हिन्दी)
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => Change('English')}
                                style={[
                                    styles.lanCard,
                                    { backgroundColor: selectedLanguage === 'English' ? Colors.THEMECOLOR : Colors.WHITE },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.lanTxt,
                                        { color: selectedLanguage === 'English' ? Colors.WHITE : Colors.THEMECOLOR },
                                    ]}
                                >
                                    English
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleSelect}
                            style={{ elevation: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.THEMECOLOR, width: '46%', borderRadius: 25, paddingVertical: 15, marginTop: height * 0.05 }}>
                            <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '500', alignSelf: 'center', paddingLeft: width * 0.02 }}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    },
    modalContent: {
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        paddingVertical: 30
    },
    lanCard: {
        backgroundColor: Colors.THEMECOLOR,
        height: height * 0.17,
        width: height * 0.17, elevation: 10, borderRadius: 10, justifyContent: 'center'
    },
    lanTxt: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '500' },
    modalText: {
        marginBottom: 5,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default LanguageAlert;