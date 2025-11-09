import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppImages } from '../../constants/app.image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';

const wallets = [
  {
    name: 'Paytm Wallet & UPI',
  },
  {
    name: 'PhonePe',
  },
  {
    name: 'Amazon Pay',
  },
  {
    name: 'Freecharge',
  },
];

const cards = [
  {
    id: 1,
    type: 'HDFC Debit Card ****9232',
    holder: 'Pawan Kumar Prakash',
    expiry: '12/2023',
  },
  {
    id: 2,
    type: 'HDFC Debit Card ****9232',
    holder: 'Pawan Kumar Prakash',
    expiry: '12/2023',
  },
  {
    id: 3,
    type: 'HDFC Debit Card ****9232',
    holder: 'Pawan Kumar Prakash',
    expiry: '12/2023',
  },
];

export default function PaymentMethodScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Select Payment Method</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Bill Total */}
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Bill Total</Text>
          <Text style={styles.billValue}>₹2265.40</Text>
        </View>

        {/* Pay on Delivery */}
        <Text style={styles.sectionTitle}>Pay on Delivery</Text>
        <View style={styles.codBox}>
          {/* <Ionicons name="cash-outline" size={42} color="#6cbb47" style={styles.codIcon} /> */}
          <Image source={AppImages.cod} style={styles.codIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.codTitle}>Cash on Delivery (COD)</Text>
            <Text style={styles.codDesc}>
              Online payment recommended to reduce contact between you and delivery partner
            </Text>
          </View>
        </View>

        {/* Wallets */}
        <Text style={styles.sectionTitle}>Wallet</Text>
        {wallets.map((wallet, idx) => (
          <View key={wallet.name} style={styles.walletBox}>
            <Ionicons name="wallet-outline" size={32} color={Colors.theme1} style={styles.walletLogo} />
            <Text style={styles.walletName}>{wallet.name}</Text>
          </View>
        ))}

        {/* Credit/Debit Cards */}
        <View style={styles.cardsHeaderRow}>
          <Text style={styles.sectionTitle}>Credit / Debit Cards</Text>
          <TouchableOpacity>
            <Text style={styles.addCard}>+ Add Card</Text>
          </TouchableOpacity>
        </View>
        {cards.map(card => (
          <View key={card.id} style={styles.cardBox}>
            <Ionicons name="card-outline" size={34} color={Colors.theme1} style={styles.cardLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardType}>{card.type}</Text>
              <Text style={styles.cardHolder}>{card.holder}</Text>
              <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
            </View>
            <TouchableOpacity>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={AppImages.edit} />
                <Text style={styles.editCard}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => navigation.navigate('OrderConfirmedScreen')}
      >
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}