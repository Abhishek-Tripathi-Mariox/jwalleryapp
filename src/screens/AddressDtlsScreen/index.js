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

const AddressDtlsScreen = (props) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <View style={{ paddingHorizontal: '3%' }}>
                <BackHeader name={"back"} size={20} color={Colors.BLACK} label={"Back"} {...props} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal: '5%', gap: 20, marginTop: height * 0.02}}>
                    <Text style={styles.TxtBold}>Add your address and pay</Text>

                    <View style={styles.flexRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Pin code"
                            placeholderTextColor={'gray'}
                            keyboardType='number-pad'
                            maxLength={6}
                        />
                        <TouchableOpacity style={styles.NextBtn}>
                            <Text style={styles.NextBtnTxt}>{"Search"}</Text>
                        </TouchableOpacity>
                    </View>
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