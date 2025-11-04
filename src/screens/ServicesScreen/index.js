import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal
} from 'react-native';
import { AppIcons } from '../../constants/app.icon';
import { Colors } from '../../themes/Colors';
import Search from '../../components/Header/Search';
import { styles } from './styles';
import BackHeader from '../../components/Header/BackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

const ServicesScreen = (props) => {
  const navigation = props.navigation
  const [modalVisible, setModalVisible] = useState(false);

  const ServiceCard = ({ label, icon, size }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ServiceItemScreen')}
        style={styles.serviceCard}>
        <Image
          source={icon}
          style={[styles.brandIcon, { width: size, height: size }]}
        />
        <Text style={styles.Cardlabel}>{label}</Text>
      </TouchableOpacity>
    )
  }
  const SubServiceCard = ({ label, icon, size }) => {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.subServiceCard}>
        <Text style={styles.Cardlabel}>{label}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <BackHeader name={"back"} size={20} color={Colors.BLACK} label={"Services"} {...props} />
      <ScrollView>
        <Search />
        <View style={styles.section}>
          <View style={styles.wrapCard}>
            <ServiceCard label={'House Maid'} icon={AppIcons.CLEANING} size={33} />
            <ServiceCard label={'Laundry Maid'} icon={AppIcons.MOPPING} size={33} />
            <ServiceCard label={'Kitchen Maid'} icon={AppIcons.COOKING} size={33} />
            <ServiceCard label={'Scullery Maid'} icon={AppIcons.VACUUMING} size={33} />
            <ServiceCard label={'Scullery Maid'} icon={AppIcons.COOKING} size={33} />
            <ServiceCard label={'Baby Caretaker'} icon={AppIcons.CLEANING} size={33} />
            <ServiceCard label={'Nurse Maid'} icon={AppIcons.MOPPING} size={33} />
            <ServiceCard label={'Nursery Maid'} icon={AppIcons.VACUUMING} size={33} />
            <ServiceCard label={'Still Room Maid'} icon={AppIcons.COOKING} size={33} />
            <ServiceCard label={'House Maid'} icon={AppIcons.CLEANING} size={33} />
            <ServiceCard label={'Laundry Maid'} icon={AppIcons.MOPPING} size={33} />
            <ServiceCard label={'Kitchen Maid'} icon={AppIcons.COOKING} size={33} />
            <ServiceCard label={'Scullery Maid'} icon={AppIcons.VACUUMING} size={33} />
            <ServiceCard label={'Scullery Maid'} icon={AppIcons.COOKING} size={33} />
            <ServiceCard label={'Baby Caretaker'} icon={AppIcons.CLEANING} size={33} />
            <ServiceCard label={'Nurse Maid'} icon={AppIcons.MOPPING} size={33} />
            <ServiceCard label={'Nursery Maid'} icon={AppIcons.VACUUMING} size={33} />
            <ServiceCard label={'Still Room Maid'} icon={AppIcons.COOKING} size={33} />
            <ServiceCard label={'Nursery Maid'} icon={AppIcons.VACUUMING} size={33} />
            <ServiceCard label={'Still Room Maid'} icon={AppIcons.COOKING} size={33} />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, { fontSize: 22 }]}>Please select Sub Services</Text>
            <View style={[styles.wrapCard, { marginTop: 10 }]}>
              <SubServiceCard label={'House cleaning'} icon={"home"} />
              <SubServiceCard label={'Kitchen cleaning'} icon={"home"} />
              <SubServiceCard label={'cleaning'} icon={"home"} />
              <SubServiceCard label={'Cleaning and dusting'} icon={"home"} />
              <SubServiceCard label={'test'} icon={"home"} />
              <SubServiceCard label={'House'} icon={"home"} />
              <SubServiceCard label={'Mopping and cleaning'} icon={"home"} />
              <SubServiceCard label={'Chopping and cooking'} icon={"home"} />
              <SubServiceCard label={'House'} icon={"home"} />
              <SubServiceCard label={'Kitchen cleaning'} icon={"home"} />
              <SubServiceCard label={'cleaning'} icon={"home"} />
              <SubServiceCard label={'Cleaning and dusting'} icon={"home"} />
              <SubServiceCard label={'test'} icon={"home"} />
              <SubServiceCard label={'House'} icon={"home"} />
              <SubServiceCard label={'Mopping and cleaning'} icon={"home"} />
              <SubServiceCard label={'Chopping and cooking'} icon={"home"} />
              <SubServiceCard label={'House'} icon={"home"} />
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ elevation: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.THEMECOLOR, width: '46%', borderRadius: 25, paddingVertical: 16, marginTop: height * 0.02 }}>
              <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '500', alignSelf: 'center', paddingLeft: width * 0.02 }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
export default ServicesScreen;