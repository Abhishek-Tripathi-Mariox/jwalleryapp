import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../style';
import { Vector } from '../../assets/vector/vector.icon';

const PolicyView = (props) => {
    return (
        <View style={styles.policyView}>
            <View style={{ rowGap: 10 }}>
                <View style={[styles.flexRow]}>
                    {Vector.CHECK_ICON}
                    <Text style={styles.Txt}>100% Certified Jewellery</Text>
                </View>
                <View style={styles.flexRow}>
                    <View style={[styles.flexRow, { paddingRight: 10 }]} >
                        {Vector.CHECK_ICON}
                        <Text style={styles.Txt}>Easy Returns</Text>
                    </View>
                    <View style={styles.flexRow}>
                        {Vector.CHECK_ICON}
                        <Text style={styles.Txt}>Secure Payments</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PolicyView;