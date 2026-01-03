
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './style';

const BackHeader = (props) => {
    const {
        navigation,
        title = '',
        showBack = true,
        onBack,
        rightIcon,
        rightIconStyle,
        onRightPress,
        rightComponent,
        containerStyle,
        titleStyle,
    } = props;

    return (
        <View style={[styles.headerRow, containerStyle]}>
            {/* Back Button */}
            {showBack ? (
                <TouchableOpacity
                    onPress={onBack ? onBack : () => navigation && navigation.goBack && navigation.goBack()}
                    style={styles.headerBackBtn}
                >
                    <AntDesign
                        name={'arrowleft'}
                        size={22}
                        color={"#000"}
                    />
                </TouchableOpacity>
            ) : (
                <View style={styles.headerBackBtn} />
            )}

            {/* Title */}
            <Text style={[styles.headerTitle, titleStyle]} numberOfLines={1}>{title}</Text>

            {/* Right Icon/Button/Component */}
            {rightComponent ? (
                rightComponent
            ) : rightIcon ? (
                <TouchableOpacity onPress={onRightPress} style={styles.headerRightBtn}>
                    <Image source={rightIcon} style={[styles.headerRightIcon, rightIconStyle]} />
                </TouchableOpacity>
            ) : (
                <View style={styles.headerRightBtn} />
            )}
        </View>
    );
};

export default BackHeader;