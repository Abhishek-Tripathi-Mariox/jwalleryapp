import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OrderSummaryModal from '../OrderPaymentScreen/OrderSummaryModal';
import BackHeader from '../../components/Header/BackHeader';


const PaymentMethodScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState('HDFC');
  const [summaryVisible, setSummaryVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#fffbe6', '#ffffff']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <BackHeader
          navigation={navigation}
          title="MANAGE PAYMENT"
          rightIcon={require('../../assets/images/jnot.png')}
          onRightPress={() => navigation.navigate('Notification')}
        />

        <ScrollView style={{ flex: 1 }}>
          {/* Payment Methods */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Frequent Methods</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
              <Text style={styles.addCardText}>Add New Card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardRow}>
            <TouchableOpacity style={styles.cardOption} onPress={() => setSelectedCard('HDFC')}>
              <View style={selectedCard === 'HDFC' ? styles.radioSelected : styles.radioUnselected} />
              <View>
                <Text style={styles.cardText}>HDFC Bank</Text>
                <Text style={styles.cardNumber}>•••• •••• •••• 8743</Text>
              </View>
              <View>
                <Image source={require('../../assets/images/visalogo.png')} style={styles.cardLogo} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardOption} onPress={() => setSelectedCard('ICICI')}>
              <View style={selectedCard === 'ICICI' ? styles.radioSelected : styles.radioUnselected} />
              <View>
                <Text style={styles.cardText}>ICICI Bank</Text>
                <Text style={styles.cardNumber}>•••• •••• •••• 4553</Text>
              </View>
              <View>
                <Image source={require('../../assets/images/icici.png')} style={styles.cardLogo} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <OrderSummaryModal visible={summaryVisible} onClose={() => setSummaryVisible(false)} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#212529',
    fontWeight: 'bold',
    flex: 1,
  },
  addCardText: {
    color: '#6574FF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardRow: {
    marginHorizontal: 12,
    marginBottom: 12,
    gap: 10
  },
  cardOption: {
    backgroundColor: '#f8f8f1ff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 0,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#fff',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  radioSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#1dbf3a',
    backgroundColor: '#1dbf3a',
    marginRight: 8,
  },
  radioUnselected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#212529',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cardNumber: {
    fontSize: 15,
    color: '#615D5D',
    marginLeft: 5,
  },
  cardLogo: {
    width: 45,
    height: 45,
    left: 110,
    marginBottom: 5
  },
});

export default PaymentMethodScreen;