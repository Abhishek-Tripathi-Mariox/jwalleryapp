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

const { width, height } = Dimensions.get('window');

const Alert = ({ modalAlert, setModalAlert }) => {
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
                        <Ionicons name={"list"} size={32} color={'#000'} />

                        <Text style={[styles.modalText, { fontSize: 22, marginTop: 10 }]}>Today Missing Job <Text style={{ color: 'orange' }}>3</Text></Text>
                        <Text style={styles.modalText}><Text style={{ color: 'orange', fontSize: 22 }}>29:53</Text> minutes to expire</Text>

                        <TouchableOpacity
                            onPress={() => setModalAlert(false)}
                            style={{ elevation: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.THEMECOLOR, width: '46%', borderRadius: 25, paddingVertical: 16, marginTop: height * 0.02 }}>
                            <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '500', alignSelf: 'center', paddingLeft: width * 0.02 }}>Ok</Text>
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
    modalText: {
        marginBottom: 5,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Alert;