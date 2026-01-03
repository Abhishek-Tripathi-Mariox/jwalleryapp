import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes/Colors';

export default function OrderTrackModal({ visible, onClose, onCancelOrder, navigation }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <AntDesign name="close" size={22} color="#999999" />
          </TouchableOpacity>
          <Text style={styles.title}>Order Status</Text>
          <View style={styles.divider} />

          {/* Status Steps */}
          <View style={styles.statusContainer}>
            <View style={styles.statusStep}>
              <View style={styles.statusCircleActive} />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabelActive}>Packing</Text>
                <Text style={styles.statusDesc}>Suite 756 031 Ines Riverway, Rhiannonchester</Text>
              </View>
            </View>
            <View style={styles.statusLine} />
            <View style={styles.statusStep}>
              <View style={styles.statusCircle} />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>Picked</Text>
                <Text style={styles.statusDesc}>3 / 621 Juvenal Ridge, Port Vestachester</Text>
              </View>
            </View>
            <View style={styles.statusLine} />
            <View style={styles.statusStep}>
              <View style={styles.statusCircle} />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>In Transit</Text>
                <Text style={styles.statusDesc}>0 / 77 Purdy Crescent, West Arthur</Text>
              </View>
            </View>
            <View style={styles.statusLine} />
            <View style={styles.statusStep}>
              <View style={styles.statusCircle} />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>Delivered</Text>
                <Text style={styles.statusDesc}>Level 5 05 Favian Parkway, East Macie</Text>
              </View>
            </View>
          </View>

          {/* Delivery Guy */}
          <View style={styles.deliveryGuyContainer}>
            <Image
              source={require('../../assets/images/profile.jpeg')}
              style={styles.deliveryGuyImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.deliveryGuyName}>Jacob Jones</Text>
              <Text style={styles.deliveryGuyRole}>Delivery Guy</Text>
            </View>
            <TouchableOpacity style={styles.phoneBtn}>
              <AntDesign name="phone" size={24} color="#868686" />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.chatBtn}
              onPress={() => navigation && navigation.navigate('CustomerServiceChat')}
            >
              <Text style={styles.chatBtnText}>Chat with us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancelOrder}>
              <Text style={styles.cancelBtnText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 22,
    height: 510,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 10,
    zIndex: 2,
    borderRadius: 20,
    padding: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,
    color: '#0F0F0F',
    letterSpacing: 1,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#000000',
    width: 110,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 2,
    borderRadius: 2,
  },
  statusContainer: {
    marginBottom: 10,
    marginTop: 8,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  statusCircleActive: {
    width: 20,
    height: 20,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#0E8345',
    backgroundColor: '#fff',
    marginRight: 12,
    marginTop: 2,
  },
  statusCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#868080ff',
    backgroundColor: '#fff',
    marginRight: 14,
    marginTop: 4,
  },
  statusTextContainer: {
    flex: 1,
    marginBottom: 8,
  },
  statusLabelActive: {
    fontWeight: '700',
    color: '#323135',
    fontSize: 16,
    marginBottom: 2,
  },
  statusLabel: {
    fontWeight: 'bold',
    color: '#323135',
    fontSize: 16,
    marginBottom: 2,
  },
  statusDesc: {
    color: '#68656E',
    fontSize: 13,
    marginBottom: 2,
    fontWeight: 400
  },
  statusLine: {
    width: 1,
    height: 25,
    borderLeftWidth: 2,
    borderLeftColor: '#C4C4C4',
    borderStyle: 'dashed',
    marginLeft: 9,
    alignSelf: 'flex-start',
  },

  deliveryGuyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deliveryGuyImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  deliveryGuyName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  deliveryGuyRole: {
    color: '#868686',
    fontSize: 13,
  },
  phoneBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'

  },
  chatBtn: {
    // flex: 1,
    width: '40%',
    borderWidth: 1,
    borderColor: '#2947DF',
    borderRadius: 8,
    paddingVertical: 6,
    marginRight: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatBtnText: {
    color: '#2947DF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelBtn: {
    width: '40%',
    borderWidth: 1,
    borderColor: Colors.theme1,
    borderRadius: 8,
    paddingVertical: 6,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: Colors.theme1,
    fontWeight: 'bold',
    fontSize: 14,
  },
});