// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';

// const user = {
//   name: 'Sunie Pham',
//   email: 'sunieux@gmail.com',
//   avatar: require('../../assets/images/profile.jpeg'), // Replace with your avatar asset
// };

// const menu = [
//   { key: 'homepage', label: 'Homepage', icon: <AntDesign name="home" size={22} />, active: true },
//   { key: 'discover', label: 'Discover', icon: <Feather name="search" size={22} /> },
//   { key: 'myorder', label: 'My Order', icon: <AntDesign name="shoppingcart" size={22} /> },
//   { key: 'myprofile', label: 'My profile', icon: <AntDesign name="user" size={22} /> },
// ];

// const otherMenu = [
//   { key: 'setting', label: 'Setting', icon: <Feather name="settings" size={20} /> },
//   { key: 'support', label: 'Support', icon: <Feather name="mail" size={20} /> },
//   { key: 'about', label: 'About us', icon: <AntDesign name="infocirlceo" size={20} /> },
// ];

// const CustomDrawer = ({ onProfilePress }) => (
//   <View style={styles.container}>
//     {/* User Info */}
//     <View style={styles.userSection}>
//       <Image source={user.avatar} style={styles.avatar} />
//       <View>
//         <Text style={styles.userName}>{user.name}</Text>
//         <Text style={styles.userEmail}>{user.email}</Text>
//       </View>
//     </View>
//     {/* Menu */}
//     <View style={styles.menuSection}>
//       {menu.map(item => (
//         <TouchableOpacity
//           key={item.key}
//           style={[styles.menuItem, item.active && styles.menuItemActive]}
//           onPress={item.key === 'myprofile' ? onProfilePress : undefined}
//           activeOpacity={item.active ? 1 : 0.7}
//         >
//           <View style={styles.menuIcon}>{item.icon}</View>
//           <Text style={[styles.menuLabel, item.active && styles.menuLabelActive]}>
//             {item.label}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//     {/* Other */}
//     <Text style={styles.otherTitle}>OTHER</Text>
//     <View style={styles.menuSection}>
//       {otherMenu.map(item => (
//         <TouchableOpacity key={item.key} style={styles.menuItem}>
//           <View style={styles.menuIcon}>{item.icon}</View>
//           <Text style={styles.menuLabel}>{item.label}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopRightRadius: 40,
//     borderBottomRightRadius: 40,
//     paddingTop: 48,
//     paddingHorizontal: 18,
//     paddingBottom: 18,
//     minWidth: 320,
//     maxWidth: 370,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.10,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   userSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 16,
//     backgroundColor: '#F7F7F7',
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 2,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: '#888',
//   },
//   menuSection: {
//     marginBottom: 12,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 12,
//     borderRadius: 14,
//     marginBottom: 4,
//   },
//   menuItemActive: {
//     backgroundColor: '#F7F7F7',
//   },
//   menuIcon: {
//     marginRight: 18,
//     width: 28,
//     alignItems: 'center',
//   },
//   menuLabel: {
//     fontSize: 16,
//     color: '#888',
//     fontWeight: '500',
//   },
//   menuLabelActive: {
//     color: '#222',
//     fontWeight: 'bold',
//   },
//   otherTitle: {
//     marginTop: 18,
//     marginBottom: 2,
//     marginLeft: 8,
//     fontSize: 13,
//     color: '#888',
//     fontWeight: 'bold',
//     letterSpacing: 0.5,
//   },
// });

// export default CustomDrawer;