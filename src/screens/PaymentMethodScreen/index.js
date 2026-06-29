import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../components/Header/BackHeader';
import { Colors } from '../../themes/Colors';
import { AppImages } from '../../constants/app.image';

const PaymentMethodScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
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
          rightIconName="notifications-outline"
          onRightPress={() => navigation.navigate('Notification')}
        />

        <ScrollView style={{ flex: 1 }}>
          {/* Payment Methods */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Payment Methods</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
              <Text style={styles.addCardText}>Add New Card</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#999', fontSize: 15 }}>No saved payment methods</Text>
            <Text style={{ color: '#999', fontSize: 13, marginTop: 4 }}>Add a card to get started</Text>
          </View>
        </ScrollView>
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