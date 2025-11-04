import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList, Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import { Colors } from '../../themes/Colors';
import { styles } from './styles';
import { Vector } from '../../assets/vector/vector.icon';
import PolicyView from '../../components/PolicyContainer/PolicyView';
import { AppImages } from '../../constants/app.image';
import BottomDetails from '../../components/Bottom/BottomDetails';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const data = [
    {
        id: 1,
        title: "Cleaning 1 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
    {
        id: 2,
        title: "Cleaning 1 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
    {
        id: 3,
        title: "Cleaning 2 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
    {
        id: 4,
        title: "Cleaning 3 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
    {
        id: 5,
        title: "Cleaning 3 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
    {
        id: 6,
        title: "Cleaning 4 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
    {
        id: 7,
        title: "Cleaning 4 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
    {
        id: 8,
        title: "Cleaning 4 BHK",
        amount: "226.84",
        time: "₹ 119 | 45 mins | 5.0(256)",
        job_status: "Our Professional Cleaning",
    },
]

const ServiceItemScreen = (props) => {
    const navigation = props.navigation
    const [dataList, setDataList] = useState(data);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardCont}>

                <View style={styles.widthAuto}>
                    <Image
                        source={AppImages.CLEAN3}
                        style={styles.image}
                    />
                    {item.count > 0 ?
                        <View style={styles.AddCartBtn}>
                            <TouchableWithoutFeedback onPress={() => RemoveCart(item.id)}>
                                {Vector.MINUS_ICON}
                            </TouchableWithoutFeedback>
                            <Text style={styles.TxtWhite}>{item.count}</Text>
                            <TouchableWithoutFeedback onPress={() => AddCart(item.id)}>
                                {Vector.PLUS_ICON}
                            </TouchableWithoutFeedback>
                        </View>
                        :
                        <TouchableOpacity
                            onPress={() => AddCart(item.id)}
                            style={styles.AddBtn}>
                            <Text style={styles.AddBtnTxt}>Add</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.width55, { gap: 7, marginLeft: height * 0.015 }]}>
                    <Text style={styles.cardTxt}>{item.title}</Text>
                    <Text style={styles.TxtSmlGray}>{item.time}</Text>
                    <Text style={styles.cardTxt}>{item.job_status}</Text>
                    <TouchableOpacity style={styles.borderBtn}>
                        <Text style={styles.borderBtnTxt}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    const AddCart = (id) => {
        setDataList((prevData) =>
            prevData.map((item) =>
                item.id === id
                    ? { ...item, count: (item.count || 0) + 1 }
                    : item
            )
        );
    };

    const RemoveCart = (id) => {
        setDataList((prevData) =>
            prevData.map((item) =>
                item.id === id && (item.count || 0) > 0
                    ? { ...item, count: item.count - 1 }
                    : item
            )
        );
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{ paddingHorizontal: '3%' }}>
                <BackHeader name={"back"} size={20} color={Colors.BLACK} label={"Back"} {...props} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              
                <View style={{ marginVertical: 0, paddingHorizontal: '5%', gap: 7, paddingTop: height * 0.02 }}>
                    <Text style={[styles.cardTxt, { fontSize: 15 }]}>Dusting and Cleaning</Text>
                    <View style={styles.flexRow}>
                        {Vector.STAR_ICON}
                        <Text style={[styles.Txt]}>5</Text>
                    </View>
                </View>
                <PolicyView />
                <FlatList
                    data={dataList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>
            {dataList.some((item) => item.count > 0) && (
                <BottomDetails
                    btnLabel={"NEXT"}
                    amount={'119'}
                    onNext={()=> navigation.navigate("AmountDtlsScreen")}
                />
            )}
        </SafeAreaView>
    );
}
export default ServiceItemScreen;