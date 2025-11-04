import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './style';
import SearchBar from "react-native-dynamic-search-bar";
import { Vector } from '../../assets/vector/vector.icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { AppImages } from '../../constants/app.image';


const Search = (props) => {
    return (
        <SafeAreaView>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 8,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                paddingHorizontal: 16,
                paddingVertical: 9,
                marginVertical: 10,
                marginHorizontal: 15
            }}>
                <AntDesign name="search1" size={22} color="#B0B0B0" />
                <Text style={{ flex: 1, marginLeft: 10, color: '#B0B0B0', fontSize: 16 }}>
                    Search
                </Text>
                <AntDesign name="audio" size={22} color="#B0B0B0" />
            </View>
        </SafeAreaView>
    );
}
export default Search;