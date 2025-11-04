import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import { Colors } from '../../themes/Colors';
import { styles } from './styles';
import { Vector } from '../../assets/vector/vector.icon';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const data = [
    {
        id: 1,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB ACCEPTED",
    },
    {
        id: 2,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB CANCELLED",
    },
    {
        id: 3,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB ACCEPTED",
    },
    {
        id: 4,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB CANCELLED",
    },
    {
        id: 5,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB CANCELLED",
    },
    {
        id: 6,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB ACCEPTED",
    },
    {
        id: 7,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB CANCELLED",
    },
    {
        id: 8,
        title: "Cooking",
        amount: "226.84",
        time: "Mon, Dec 02, 2024 at 10:45 AM",
        job_status: "JOB CANCELLED",
    },
]

const MyBookingScreen = (props) => {
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.cardCont}>
                <View style={{ gap: 10, borderBottomColor: Colors.GRAY2, borderBottomWidth: 1.5, paddingBottom: height * 0.02 }}>
                    {
                        item.job_status == "JOB CANCELLED" ?
                            <Text style={[styles.cardTxt, { color: 'red' }]}>{item.job_status}</Text>
                            :
                            <Text style={[styles.cardTxt, { color: 'green' }]}>{item.job_status}</Text>
                    }
                    <Text style={styles.cardTxt}>{item.title}</Text>
                    <Text style={[styles.cardTxt, { color: Colors.GRAY4 }]}>{item.time}</Text>
                </View>
                <View style={[styles.flexRow, { width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }]}>
                    <View style={styles.flexRow}>
                        {Vector.CHECK_ICON}
                        <Text style={styles.Txt}>Amount paid ₹ {item.amount}</Text>
                    </View>
                    <TouchableOpacity style={styles.borderBtn}>
                        <Text style={styles.borderBtnTxt}>View details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <BackHeader name={"back"} size={20} color={Colors.BLACK} label={"My Booking"} {...props} />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}
export default MyBookingScreen;