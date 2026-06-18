import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './style';
import SearchBar from "react-native-dynamic-search-bar";
import { Vector } from '../../assets/vector/vector.icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';


const Search = (props) => {
    return (

        // value={searchText}
        // onChangeText={setSearchText}
        // placeholder="Search for Gold Jewellery, Diamond more..."
        // iconMic={AppImages.mic}
        // iconCamera={AppImages.jcam}
        // iconSearch={AppImages.jsearch}
        <SafeAreaView>
            <View style={{ marginVertical: 5, marginHorizontal: 15 }}>
                <SearchBar
                    placeholder="Search for Gold Jewellery, Diamond more..."
                    onChangeText={props.onChangeText}
                    onSearchPress={props.onSearchPress}
                    value={props.value}
                    style={{
                        borderRadius: 30,
                        paddingHorizontal: 0,
                        height:47,
                        width: '100%',
                        borderWidth: 1,
                        borderColor:'#929292',
                        fontSize: 6, 
                        color: '#66a919ff', 
                        marginTop:10,

                    }}
                    iconColor={Colors.theme1}
                    clearIconColor={Colors.theme1}
                    searchIconComponent={<AntDesign name="search1" size={20} color={Colors.theme1} />}
                    clearIconComponent={<AntDesign name="close" size={20} color={Colors.theme1} />}
                />

            </View>
        </SafeAreaView>
    );
}
export default Search;