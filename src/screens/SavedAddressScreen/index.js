import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddAddressScreen from '../AddAddressScreen/index';

const { width } = Dimensions.get('window');
const THEME_COLOR = '#FF6F61';

const addresses = [
  {
    id: '1',
    label: 'Delivery at (Home)',
    address: '555, FG, La Plaza, Abhay Khand, Indra Puram, Ghaziabad, U.P. 201310.',
    phone: '+91 8766 346 545',
    selected: true,
    change: true,
  },
  {
    id: '2',
    label: 'Mlthu (Home)',
    address: '555, FG, La Plaza, Abhay Khand, Ghaziabad, U.P. 201310.',
    phone: '+91 8178496252',
    selected: false,
  },
  {
    id: '3',
    label: 'Mlthu (Office)',
    address: '555, FG, La Plaza, Abhay Khand, Ghaziabad, U.P. 201310.',
    phone: '+91 8178496252',
    selected: false,
    radioColor: THEME_COLOR,
  },
  {
    id: '4',
    label: 'Mlthu (Other)',
    address: '555, FG, La Plaza, Abhay Khand, Ghaziabad, U.P. 201310.',
    phone: '+91 8178496252',
    selected: false,
    radioColor: '#bbb',
  },
];

const SavedAddressScreen = ({ navigation }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Address</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="hearto" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {addresses.map((item, idx) => (
          <View
            key={item.id}
            style={[
              styles.addressCard,
              item.selected && styles.selectedCard,
              idx === 0 && { borderColor: THEME_COLOR, borderWidth: 1.5 },
            ]}
          >
            <View style={styles.addressRow}>
              <View style={styles.radioCol}>
                <AntDesign
                  name={item.selected ? 'checkcircle' : 'circledowno'}
                  size={22}
                  color={item.selected ? THEME_COLOR : '#bbb'}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.addressLabel, item.selected && styles.selectedLabel]}>
                  {item.label}
                </Text>
                <Text style={styles.addressText}>{item.address}</Text>
                <Text style={styles.addressText}>{item.phone}</Text>
              </View>
              {item.selected && (
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              )}
              {!item.selected && (
                <View style={styles.actionIcons}>
                  <TouchableOpacity style={styles.iconBtn}>
                    <Feather name="edit" size={20} color={THEME_COLOR} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn}>
                    <MaterialIcons name="delete-outline" size={22} color={THEME_COLOR} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>
      <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddAddress(true)}>
        <Text style={styles.addBtnText}>Add New Address</Text>
      </TouchableOpacity>
      <AddAddressScreen visible={showAddAddress} onClose={() => setShowAddAddress(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 90,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderColor: '#eee',
    borderWidth: 1,
  },
  selectedCard: {
    borderColor: THEME_COLOR,
    borderWidth: 1.5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioCol: {
    marginRight: 12,
    marginTop: 2,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  selectedLabel: {
    color: THEME_COLOR,
  },
  addressText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  changeText: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 12,
    marginTop: 2,
  },
  actionIcons: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 2,
  },
  iconBtn: {
    marginLeft: 8,
  },
  addBtn: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default SavedAddressScreen;
