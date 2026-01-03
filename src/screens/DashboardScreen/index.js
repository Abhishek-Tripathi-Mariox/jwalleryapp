import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { styles } from './styles';
import { AppImages } from '../../constants/app.image';
import { AppIcons } from '../../constants/app.icon';
import { Colors } from '../../themes/Colors';
import Search from '../../components/Header/Search';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const goldPrice = '₹ 7431 per gram (22K)';

const categories = [
  {
    name: 'Earrings',
    icon: AppImages.jwel1,
  },
  {
    name: 'Necklace',
    icon: AppImages.jwel5,
  },
  {
    name: 'Rings',
    icon: AppImages.jring,
  },
  {
    name: 'Bracelets',
    icon: AppImages.jbrace,
  },
  {
    name: 'Chains',
    icon: AppImages.jwel4,
  },
  {
    name: 'Mangalsutra',
    icon: AppImages.jmangalsutra,
  },
];


// Accept navigation prop directly for React Navigation compatibility
const Dashboard = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar backgroundColor={Colors.THEMECOLOR} barStyle="light-content" />
      <View style={styles.topBarRow}>
        <TouchableOpacity>
          <Image source={AppImages.jmenu} style={styles.iconButton} />
        </TouchableOpacity>
        <Image source={AppImages.jlogo} style={styles.logo} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Image source={AppImages.jnotification} style={styles.notificationIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={AppImages.jbag} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>

      </View>


      <ScrollView>
        <LinearGradient
          colors={['#FFF6C9', '#FFFFFF']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}>
          <View>

            <Search />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}>

            <View style={styles.goldPriceRow}>

              {/* Pill 1 */}
              <View style={styles.goldPricePill}>
                <View
                  style={styles.gradientBox}
                >
                  <Text style={styles.goldPriceText}>
                    Live Gold Price: {goldPrice}
                  </Text>
                </View>
              </View>

              {/* Pill 2 */}
              <View style={styles.goldPricePill}>
                <View
                  style={styles.gradientBox}
                >
                  <Text style={styles.goldPriceText}>
                    Live Gold Price: {goldPrice}
                  </Text>
                </View>
              </View>

            </View>
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((cat, idx) => (
              <TouchableOpacity onPress={() => navigation.navigate('NecklaceList', { categoryLabel: 'Items' })} key={cat.name} style={styles.categoryItem}>
                <View style={styles.categoryIconWrapper}>
                  <Image source={cat.icon} style={styles.categoryIcon} />
                  <Text style={styles.categoryLabel}>{cat.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.specialOffersContainer}>
            <Text style={styles.specialOffersTitle}>
              Special Offers
            </Text>
            <View style={styles.specialOffersImageWrapper}>
              <Image
                source={AppImages.jpinkear}
                style={styles.specialOffersImage}
              />
            </View>
          </View>
          {/* <View style={styles.shopByCategorySection}>
            <View style={styles.shopByCategoryHeader}>
              <Text style={styles.shopByCategoryTitle}>
                Shop By Category
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((cat, idx) => (
                <View key={cat.name} style={styles.categoryItem}>
                  <LinearGradient
                    colors={idx % 2 === 0
                      ? ['#EE0589', '#2D7AFB']
                      : ['#D9D9D900', '#EE0589']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBorder}
                  >
                    <View style={styles.categoryIconWrapper}>
                      <Image source={cat.icon} style={styles.categoryIcon} />
                    </View>
                  </LinearGradient>

                  <Text style={styles.categoryLabel}>{cat.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View> */}
        </LinearGradient>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Dashboard;
