import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import { Colors } from '../../themes/Colors';
import BottomDetails from '../../components/Bottom/BottomDetails';
import { styles } from './styles';
import { AppIcons } from '../../constants/app.icon';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

const AmountDtlsScreen = (props) => {
    const navigation = props.navigation
    
    return (
        <SafeAreaView style={styles.sectionContainer}>
            <View style={{ paddingHorizontal: '3%' }}>
                <BackHeader name={"back"} size={20} color={Colors.BLACK} label={"Back"} {...props} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.cardCont}>
                    <View style={styles.gap4}>
                        <Text style={styles.TxtBold}>Added Service</Text>
                        <Text style={styles.TxtGray}>1 Item</Text>
                    </View>
                    <View style={styles.flexRowBottomBorder}>
                        <Text style={[styles.Txt, { fontSize: 14 }]}>Cleaning service * 1</Text>
                        <Text style={[styles.Txt, { fontSize: 14, fontWeight: '500' }]}>₹ 219</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.Txt}>Subtotal</Text>
                        <Text style={styles.Txt}>₹ 219</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.Txt}>Service charge</Text>
                        <Text style={styles.Txt}>₹ 47.84</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.Txt}>Visiting charges</Text>
                        <Text style={styles.Txt}>₹ 50</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.TxtBold}>Order Total</Text>
                        <Text style={styles.TxtBold}>₹ 316.84</Text>
                    </View>
                </View>
                <View style={[styles.cardCont, { borderColor: Colors.THEMECOLOR, }]}>
                    <View style={styles.flexRow}>
                        <View style={styles.promoIcomView}>
                            <Image source={AppIcons.PROMO} style={styles.promoIcon} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter coupon code"
                            placeholderTextColor={'gray'}
                            keyboardType='default'
                            maxLength={39}
                        />
                        <TouchableOpacity style={styles.NextBtn}>
                            <Text style={styles.NextBtnTxt}>{"Apply"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <BottomDetails
                btnLabel={"NEXT"}
                amount={'219'}
                onNext={() => navigation.navigate("PaymentMethod")}
            />

        </SafeAreaView>
    );
}
export default AmountDtlsScreen;