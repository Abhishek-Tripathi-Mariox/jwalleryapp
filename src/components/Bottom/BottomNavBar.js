import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const THEME = '#930e6e';
const INACTIVE = '#9aa0a6';

const tabs = [
  { name: 'Home', label: 'Home' },
  { name: 'Categories', label: 'Categories' },
  { name: 'Gifts', label: 'Gift <1999' },
  { name: 'Stores', label: 'Store' },
  { name: 'Profile', label: 'Profile' },
];

const getIcon = (name, color, size) => {
  switch (name) {
    case 'Home':
      return <AntDesign name="home" size={size} color={color} />;
    case 'Categories':
      return <MaterialIcons name="grid-view" size={size} color={color} />;
    case 'Gifts':
      return <Ionicons name="gift-outline" size={size} color={color} />;
    case 'Stores':
      return <Ionicons name="location-outline" size={size} color={color} />;
    case 'Profile':
      return <Ionicons name="person-outline" size={size} color={color} />;
    default:
      return null;
  }
};

const BottomNavBar = ({ activeTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    navigation.navigate('MainTabs', { screen: tabName });
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name || activeTab === tab.label;
        const iconColor = isActive ? '#fff' : INACTIVE;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <View style={isActive ? styles.activeIconBox : styles.iconBox}>
              {getIcon(tab.name, iconColor, 22)}
            </View>
            <Text style={[styles.label, { color: isActive ? THEME : INACTIVE }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    height: Platform.OS === 'ios' ? 85 : 70,
    paddingBottom: Platform.OS === 'ios' ? 22 : 8,
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 46,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconBox: {
    width: 46,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME,
  },
  label: {
    fontSize: 10.5,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default BottomNavBar;
