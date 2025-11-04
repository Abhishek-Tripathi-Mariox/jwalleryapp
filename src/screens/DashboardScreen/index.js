import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  ImageBackground
} from 'react-native';
import MainHeader from '../../components/Header/MainHeader';
import HeadingDiv from '../../components/OptHeading/Heading';
import { AppIcons } from '../../constants/app.icon';
import { Colors } from '../../themes/Colors';
import { styles } from './styles';
import { AppVideos } from '../../constants/app.video';
import { AppImages } from '../../constants/app.image';
import Search from '../../components/Header/Search';
import PolicyView from '../../components/PolicyContainer/PolicyView';
import HeadingView from '../../components/OptHeading/HeadingView';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

const Dashboard = (props) => {
  const navigation = props.navigation
  const [modalVisible, setModalVisible] = useState(false);


  const DailyServiceCard = (props) => {
    return (
      <View style={styles.SplCard}>
        <TouchableOpacity style={styles.roundView} onPress={() => setModalVisible(true)}>
          <View>
            <Image
              source={props.icon}
              style={[styles.brandIcon, { width: props.width, height: props.height }]}
            />
            <Text style={styles.DSlabel}>{props.label}</Text>
          </View>
        </TouchableOpacity>
      </View>)
  }

  const ServiceCard = ({ label, icon, size }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ServiceItemScreen')}
        style={styles.serviceCard}>
        <Image
          source={icon}
          style={[styles.brandIcon, { width: size, height: size, elevation: 10 }]}
        />
        <Text style={styles.Cardlabel}>{label}</Text>
      </TouchableOpacity>
    )
  }

  const DashboardVideo = (props) => {
    return (
      <View style={styles.videoCard}>
        <View style={styles.imageBackground} />
        <Image
          source={props.IMG}
          style={styles.images}
        />
      </View>
    );
  };

  const BannerCard = (props) => {
    return (
      <View>
        <Image
          source={props.IMG}
          style={styles.bannerImg}
        />
      </View>

    );
  };

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
      <ScrollView>

        <View>
          <ImageBackground
            source={AppImages.background}
            style={{ height: 340, width: '100%' }} >
            <Image
              style={{ width: '100%', height: 25 }}
              source={AppImages.background1} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 9,
              // backgroundColor: Colors.THEMECOLOR,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              marginBottom: 2,
              // width: '90%'
            }}>
              <View>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Delivery in</Text>
                <Text style={{ color: '#fff', fontSize: 27, fontWeight: 'bold', marginTop: -2 }}>20 minutes</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <Image source={AppIcons.LOCATION || AppImages.cloth} style={{ width: 16, height: 16, tintColor: '#fff' }} />
                  <Text style={{ color: '#fff', marginLeft: 4, fontSize: 13 }}>HOME - Sultan Bhag, Erragadda</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  marginRight: 10,
                  height: 40,
                  width: 75
                }}>
                  <Image source={AppIcons.WALLET || AppImages.gift} style={{ width: 23, height: 23, marginRight: 4 }} />
                  <Text style={{ color: Colors.THEMECOLOR, fontWeight: 'bold' }}>₹ 50</Text>
                </View>
                <TouchableOpacity>
                  <View style={{ height: 40, width: 40, borderRadius: 50, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={AppImages.Vector1} style={{ width: 40, height: 40, tintColor: Colors.PINK }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Search />
            <View
              style={{
                height: 150,
                marginTop: 10,
                marginBottom: 10,
                position: 'relative',
                justifyContent: 'center',
                overflow: 'visible',
              }}
            >
              <Image
                source={AppImages.girl}
                style={{
                  position: 'absolute',
                  left: 10,
                  bottom: -7.5,
                  height: 180,
                  width: 125,
                  resizeMode: 'contain',
                  zIndex: 2,
                }}
              />
              <View
                style={{
                  flex: 1,
                  marginLeft: 110,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'rgba(252, 215, 147, 1)', // text color
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginBottom: 2,
                    textAlign: 'center',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    fontFamily: 'Rozha One',

                    // Border (stroke effect simulation)
                    textShadowColor: 'rgba(227, 150, 5, 1)',
                    textShadowOffset: { width: 0.3, height: 0.3 },
                    textShadowRadius: 0.5,

                    // Outer (drop) shadow
                    shadowColor: 'rgba(0, 0, 0, 0.25)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.25,
                    shadowRadius: 1,

                    // For Android shadow
                    elevation: 2,
                  }}
                >
                  FESTIVE FASHION SPECIALS
                </Text>

                <Text
                  style={{
                    color: Colors.YELLOW,
                    fontSize: 14,
                    marginBottom: 7,
                    textAlign: 'center',
                    fontFamily: 'System',
                  }}
                >
                  Big Styles, Big Savings!
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderColor: Colors.RED,
                    alignSelf: 'center',
                    marginTop: 0,
                    marginBottom: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.08,
                    shadowRadius: 2,
                    elevation: 2,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.RED,
                      fontWeight: 'bold',
                      fontSize: 12,
                      textAlign: 'center',
                      fontFamily: 'System',
                    }}
                  >
                    Shop Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={{ padding: 8, paddingTop: 3 }}>
          {/* Shop Type Buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
              gap: 12,
            }}>

            {/* Clothes Shop Button */}
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#F36B56', // red-orange background
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#F36B56',
                height: 70,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                source={AppImages.cloth}
                style={{ height: 45, width: 45, marginRight: 8 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Clothes Shop
              </Text>
            </TouchableOpacity>

            {/* Grocery Shop Button */}
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E2E2E2',
                height: 70,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2, // for Android shadow
              }}>
              <Image
                source={AppImages.grocery}
                style={{ height: 45, width: 45, marginRight: 8 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Grocery Shop
              </Text>
            </TouchableOpacity>
          </View>


          {/* Shops Near You Section */}
          <View style={{ marginTop: 18, marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, paddingHorizontal: 2 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Shops Near You</Text>
              <TouchableOpacity>
                <Text style={{ color: '#FF6F00', fontWeight: 'bold', fontSize: 14 }}>View All</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ color: '#888', fontSize: 13, marginBottom: 8, paddingHorizontal: 2 }}>
              Verified local sellers delivering in under 30 mins
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Example shop card */}
              <View
                style={{
                  width: 290,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  marginRight: 14,
                  elevation: 4,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  flexDirection: 'row',
                  padding: 12,
                  alignItems: 'flex-start',
                }}>

                {/* Left Image */}
                <Image
                  source={AppImages.shop}
                  style={{
                    width: '30%',
                    height: 130,
                    borderRadius: 12,
                    marginRight: 10,
                  }}
                  resizeMode="cover"
                />

                {/* Right Content */}
                <View style={{ flex: 1, width: '70%' }}>
                  {/* Shop name + verified */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.BLACK2 }}>Gupta Garments</Text>
                    <Text style={{ color: '#2ecc71', fontSize: 16, marginLeft: 4 }}>✔</Text>
                  </View>

                  {/* Distance + Rating */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={{ color: '#6E6E6E', fontSize: 12 }}>📍 12 km</Text>
                    <Text style={{ color: '#6E6E6E', fontSize: 12, marginLeft: 8 }}>⭐ 4.5 (By 200+)</Text>
                  </View>

                  {/* Offer */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#E8FFF0',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={AppImages.dicount}
                        style={{ height: 14, width: 14, marginRight: 4 }} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#27AE60',
                        }}>
                        Flat ₹150 off above ₹150
                      </Text>
                    </View>
                  </View>

                  {/* Bottom Row */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        // backgroundColor: '#FFF3F0',
                        paddingHorizontal: 0,
                        paddingVertical: 2,
                        borderRadius: 15,
                        marginRight: 4,
                        borderWidth: 1,
                        borderColor: '#F36B56',
                        width: '30%',
                        height: 32
                      }}>
                      <Text
                        style={{
                          fontSize: 8,
                          color: Colors.BLACK,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                        Added New
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.BLACK,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                        14 items
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#fff',
                        borderColor: '#FF6F00',
                        borderWidth: 1.5,
                        borderRadius: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                      }}>
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}>
                        View Products
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Add more shop cards as needed */}
              <View
                style={{
                  width: 290,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  marginRight: 14,
                  elevation: 4,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  flexDirection: 'row',
                  padding: 12,
                  alignItems: 'flex-start',
                }}>

                {/* Left Image */}
                <Image
                  source={AppImages.shop}
                  style={{
                    width: '30%',
                    height: 130,
                    borderRadius: 12,
                    marginRight: 10,
                  }}
                  resizeMode="cover"
                />

                {/* Right Content */}
                <View style={{ flex: 1, width: '70%' }}>
                  {/* Shop name + verified */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.BLACK2 }}>Gupta Garments</Text>
                    <Text style={{ color: '#2ecc71', fontSize: 16, marginLeft: 4 }}>✔</Text>
                  </View>

                  {/* Distance + Rating */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={{ color: '#6E6E6E', fontSize: 12 }}>📍 12 km</Text>
                    <Text style={{ color: '#6E6E6E', fontSize: 12, marginLeft: 8 }}>⭐ 4.5 (By 200+)</Text>
                  </View>

                  {/* Offer */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#E8FFF0',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={AppImages.dicount}
                        style={{ height: 14, width: 14, marginRight: 4 }} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#27AE60',
                        }}>
                        Flat ₹150 off above ₹150
                      </Text>
                    </View>
                  </View>

                  {/* Bottom Row */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        // backgroundColor: '#FFF3F0',
                        paddingHorizontal: 0,
                        paddingVertical: 2,
                        borderRadius: 15,
                        marginRight: 4,
                        borderWidth: 1,
                        borderColor: '#F36B56',
                        width: '30%',
                        height: 32
                      }}>
                      <Text
                        style={{
                          fontSize: 8,
                          color: Colors.BLACK,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                        Added New
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.BLACK,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                        14 items
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#fff',
                        borderColor: '#FF6F00',
                        borderWidth: 1.5,
                        borderRadius: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                      }}>
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}>
                        View Products
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>


            </ScrollView>
          </View>
          {/* End Shops Near You Section */}
          {/* Discount Section */}
          <View style={{ marginTop: 18, marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Save up to 50% + Extra Discount</Text>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 18,
                padding: 4,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 0,
              }}
            >
              {/* T-shart */}
              <View
                style={{
                  width: '48%',
                  height: 110,
                  backgroundColor: '#FFE082',
                  borderRadius: 16,
                  marginBottom: 12,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FF6F00', marginBottom: 2 }}>T-shart</Text>
                  <Text style={{ color: '#333', fontSize: 13, marginBottom: 2 }}>offer starting{'\n'}at ₹ 150</Text>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text style={{ color: '#FF6F00', fontWeight: 'bold', fontSize: 16 }}>↗</Text>
                  </View>
                </View>
                <Image
                  source={AppImages.blackT}
                  style={{ width: 60, height: 60, borderRadius: 12, marginLeft: 8 }}
                  resizeMode="contain"
                />
              </View>
              {/* Buy Shirts */}
              <View
                style={{
                  width: '48%',
                  height: 110,
                  backgroundColor: '#B3E5FC',
                  borderRadius: 16,
                  marginBottom: 12,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#0288D1', marginBottom: 2 }}>Buy Shirts</Text>
                  <Text style={{ color: '#333', fontSize: 13, marginBottom: 2 }}>offer starting{'\n'}at ₹ 150</Text>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text style={{ color: '#0288D1', fontWeight: 'bold', fontSize: 16 }}>↗</Text>
                  </View>
                </View>
                <Image
                  source={AppImages.shirt}
                  style={{ width: 60, height: 60, borderRadius: 12, marginLeft: 8 }}
                  resizeMode="contain"
                />
              </View>
              {/* Jeans (women) */}
              <View
                style={{
                  width: '48%',
                  height: 110,
                  backgroundColor: '#F0F4C3',
                  borderRadius: 16,
                  marginBottom: 12,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#689F38', marginBottom: 2 }}>Jeans</Text>
                  <Text style={{ color: '#333', fontSize: 13, marginBottom: 2 }}>offer starting{'\n'}at ₹ 150</Text>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text style={{ color: '#689F38', fontWeight: 'bold', fontSize: 16 }}>↗</Text>
                  </View>
                </View>
                <Image
                  source={AppImages.suit}
                  style={{ width: 60, height: 60, borderRadius: 12, marginLeft: 8 }}
                  resizeMode="contain"
                />
              </View>
              {/* Jeans (stack) */}
              <View
                style={{
                  width: '48%',
                  height: 110,
                  backgroundColor: '#FFCDD2',
                  borderRadius: 16,
                  marginBottom: 12,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#E53935', marginBottom: 2 }}>Jeans</Text>
                  <Text style={{ color: '#333', fontSize: 13, marginBottom: 2 }}>offer starting{'\n'}at ₹ 150</Text>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text style={{ color: '#E53935', fontWeight: 'bold', fontSize: 16 }}>↗</Text>
                  </View>
                </View>
                <Image
                  source={AppImages.jeans}
                  style={{ width: 60, height: 60, borderRadius: 12, marginLeft: 8 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          {/* End Discount Section */}

          {/* hfgh */}
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Popular Brand</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

              <View style={styles.brandB}>
                <Image
                  source={AppImages.gucci}
                  style={styles.brand} />
                <Text style={{ backgroundColor: Colors.BLACK1, padding: 1, paddingHorizontal: 5, borderRadius: 5, color: Colors.WHITE1, fontWeight: 'bold', fontSize: 10 }} >30% off</Text>

              </View>
              <View style={styles.brandB}>
                <Image
                  source={AppImages.peter}
                  style={styles.brand} />
                <Text style={{ backgroundColor: Colors.RED, padding: 1, paddingHorizontal: 5, borderRadius: 5, color: Colors.WHITE1, fontWeight: 'bold', fontSize: 10 }} >30% off</Text>
              </View >
              <View style={styles.brandB}>
                <Image
                  source={AppImages.raymond}
                  style={styles.brand} />
                <Text style={{ backgroundColor: Colors.RED, padding: 1, paddingHorizontal: 5, borderRadius: 5, color: Colors.WHITE1, fontWeight: 'bold', fontSize: 10 }} >30% off</Text>

              </View>
              <View style={styles.brandB}>
                <Image
                  source={AppImages.levis}
                  style={styles.brand} />
                <Text style={{ backgroundColor: Colors.RED, padding: 1, paddingHorizontal: 5, borderRadius: 5, color: Colors.WHITE1, fontWeight: 'bold', fontSize: 10 }} >30% off</Text>

              </View>

            </ScrollView>
          </View>
          {/* bhbhf */}





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
export default Dashboard;