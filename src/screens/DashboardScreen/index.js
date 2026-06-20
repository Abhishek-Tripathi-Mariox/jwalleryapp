import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity, StatusBar,
  ActivityIndicator, TextInput, Animated, Dimensions, Alert, RefreshControl, Modal, Linking,
  PermissionsAndroid, Platform,
} from 'react-native';
import Video from 'react-native-video';
import { styles } from './styles';
import { AppImages } from '../../constants/app.image';
import { Colors } from '../../themes/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fetchGoldPrices, fetchHomeCategories, fetchNewArrivals,
  fetchFeaturedProducts, globalSearch, fetchBanners,
  fetchProductsByCategory, fetchSupportInfo,
} from '../../utils/api';
import { useLogo } from '../../utils/LogoContext';
import { resizedImage } from '../../utils/imageProxy';
import { useTranslation } from 'react-i18next';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const fallbackIcons = {
  earrings: AppImages.jearing,
  necklace: AppImages.jwel5,
  necklaces: AppImages.jwel5,
  rings: AppImages.jring,
  bracelets: AppImages.jbrace,
  chains: AppImages.jchain,
  mangalsutra: AppImages.jmangalsutra,
  bangles: AppImages.jbrace,
  pearl: AppImages.jwel2,
};

const isVideoUrl = (url) => /\.(mp4|mov|webm|ogg|avi)(\?|$)/i.test(url || '');

const EmptySection = ({ message }) => (
  <View style={styles.emptySection}>
    <Text style={styles.emptySectionText}>{message}</Text>
  </View>
);

const Dashboard = ({ navigation }) => {
  const { t } = useTranslation();
  const primaryLogoUrl = useLogo('primary');
  const [categories, setCategories] = useState([]);
  const [goldPrice24K, setGoldPrice24K] = useState(null);
  const [goldPrice22K, setGoldPrice22K] = useState(null);
  const [goldPrice18K, setGoldPrice18K] = useState(null);
  const [goldUpdatedAt, setGoldUpdatedAt] = useState(null);
  const [silverPrice, setSilverPrice] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Tab products
  const [activeTab, setActiveTab] = useState('All');
  const [tabProducts, setTabProducts] = useState({});

  // Search
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({ categories: [], products: [] });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchTimer = useRef(null);

  // Hero banner auto-slide carousel
  const bannerScrollRef = useRef(null);
  const bannerIndexRef = useRef(0);
  const BANNER_STEP = SCREEN_WIDTH - 36;

  // Gold ticker
  const tickerAnim = useRef(new Animated.Value(0)).current;

  // Video modal state
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  // Voice search state
  const [voiceListening, setVoiceListening] = useState(false);

  useEffect(() => { loadData(); }, []);

  // Auto-slide the hero banners whenever there are 2 or more.
  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      const next = (bannerIndexRef.current + 1) % banners.length;
      bannerIndexRef.current = next;
      bannerScrollRef.current?.scrollTo({ x: next * BANNER_STEP, animated: true });
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (goldPrice22K || goldPrice24K || silverPrice) startTickerAnimation();
  }, [goldPrice22K, goldPrice24K, silverPrice]);

  // Load tab products when categories change
  useEffect(() => {
    if (categories.length > 0) {
      loadTabProducts();
    }
  }, [categories]);

  const startTickerAnimation = () => {
    const singleSetWidth = 960;
    const animate = () => {
      tickerAnim.setValue(0);
      Animated.timing(tickerAnim, {
        toValue: -singleSetWidth,
        duration: 20000,
        useNativeDriver: true,
      }).start(({ finished }) => { if (finished) animate(); });
    };
    animate();
  };

  const loadData = async () => {
    try {
      const [catRes, goldRes, arrivalsRes, featuredRes, bannersRes] = await Promise.all([
        fetchHomeCategories().catch(() => null),
        fetchGoldPrices().catch(() => null),
        fetchNewArrivals().catch(() => null),
        fetchFeaturedProducts().catch(() => null),
        fetchBanners().catch(() => null),
      ]);

      if (catRes?.code === 1 && catRes.data) {
        const cats = (catRes.data.categories || catRes.data || []).map(c => ({
          _id: c._id,
          name: c.categoryName,
          icon: c.image ? { uri: resizedImage(c.image, 200) } : null,
        }));
        setCategories(cats);
      }

      if (goldRes?.code === 1 && goldRes.data) {
        const prices = goldRes.data.prices || goldRes.data;
        if (Array.isArray(prices)) {
          const p24 = prices.find(p => p.purity === '24K');
          const p22 = prices.find(p => p.purity === '22K');
          const p18 = prices.find(p => p.purity === '18K');
          const pSilver = prices.find(p => p.type === 'silver' || p.purity === 'Silver');
          if (p24) setGoldPrice24K(p24.rate);
          if (p22) setGoldPrice22K(p22.rate);
          if (p18) setGoldPrice18K(p18.rate);
          if (pSilver) setSilverPrice(pSilver.rate);
          const upd = p24?.lastUpdated || p22?.lastUpdated || p18?.lastUpdated;
          if (upd) setGoldUpdatedAt(upd);
        } else {
          if (prices['24K']) setGoldPrice24K(prices['24K']);
          if (prices['22K']) setGoldPrice22K(prices['22K']);
          if (prices['silver'] || prices['Silver']) setSilverPrice(prices['silver'] || prices['Silver']);
        }
      }

      if (arrivalsRes?.code === 1 && arrivalsRes.data) {
        const arr = arrivalsRes.data.products || arrivalsRes.data || [];
        setNewArrivals(Array.isArray(arr) ? arr.slice(0, 10) : []);
      }

      if (featuredRes?.code === 1 && featuredRes.data) {
        const products = featuredRes.data.products || featuredRes.data || [];
        setFeaturedProducts(Array.isArray(products) ? products : []);
      }

      if (bannersRes?.code === 1 && bannersRes.data) {
        const allBanners = bannersRes.data.banners || bannersRes.data || [];
        setBanners(Array.isArray(allBanners) ? allBanners : []);
      }
    } catch (e) {
      console.log('Dashboard load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const loadTabProducts = async () => {
    // Load products for first 4 categories
    const tabCats = categories.slice(0, 4);
    const results = {};
    await Promise.all(
      tabCats.map(async (cat) => {
        try {
          const res = await fetchProductsByCategory(cat._id);
          if (res?.code === 1 && res.data) {
            const list = res.data.products || res.data || [];
            results[cat._id] = Array.isArray(list) ? list.slice(0, 4) : [];
          }
        } catch (e) {
          results[cat._id] = [];
        }
      })
    );
    setTabProducts(results);
  };

  // ── Search ───────────────────────────────────────────
  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!text || text.trim().length < 2) {
      setShowSearchResults(false);
      setSearchResults({ categories: [], products: [] });
      return;
    }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await globalSearch(text.trim());
        if (res?.code === 1 && res.data) {
          setSearchResults({
            categories: res.data.categories || [],
            products: res.data.products || [],
          });
          setShowSearchResults(true);
        }
      } catch (e) { console.log('Search error:', e); }
      finally { setSearching(false); }
    }, 400);
  }, []);

  const handleCategoryPress = (cat) => {
    setShowSearchResults(false);
    setSearchText('');
    navigation.navigate('NecklaceList', { categoryId: cat._id, categoryLabel: cat.name });
  };

  const handleVoiceSearch = () => {
    Alert.alert('Voice Search', 'Voice search will be available soon.');
  };

  // Banner tap: play video, else open the banner's link / target product.
  const handleBannerPress = (banner, mediaUrl) => {
    if (isVideoUrl(mediaUrl)) {
      setActiveVideoUrl(mediaUrl);
      setVideoModalVisible(true);
      return;
    }
    if (banner?.productId) {
      navigation.navigate('ProductDetail', { productId: banner.productId });
    } else if (banner?.categoryId) {
      navigation.navigate('NecklaceList', { categoryId: banner.categoryId, categoryLabel: banner.title || 'Collection' });
    } else if (banner?.link) {
      Linking.openURL(banner.link).catch(() => {});
    }
  };

  // Call support — pulls the support number from the backend (support-info).
  const handleCallSupport = async () => {
    try {
      const res = await fetchSupportInfo();
      const phone = res?.data?.phone;
      if (phone) {
        Linking.openURL(`tel:${phone}`);
      } else {
        Alert.alert('Customer Support', 'Support number is not available right now.');
      }
    } catch (e) {
      Alert.alert('Customer Support', 'Could not start the call. Please try again.');
    }
  };

  const handleProductPress = (product) => {
    setShowSearchResults(false);
    setSearchText('');
    navigation.navigate('ProductDetail', { productId: product._id });
  };

  const formatPrice = (price) => {
    if (!price) return '...';
    return Number(price).toLocaleString('en-IN');
  };

  // ════════════════════════════════════════════════════════
  // SECTION 1: Categories (6 round, no header)
  // ════════════════════════════════════════════════════════
  const renderCategories = () => {
    if (categories.length === 0) return <EmptySection message="No categories available" />;
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {categories.slice(0, 6).map((cat) => (
          <TouchableOpacity key={cat._id} style={styles.categoryItem} onPress={() => handleCategoryPress(cat)} activeOpacity={0.8}>
            {cat.icon ? (
              <View style={styles.categoryCircle}>
                <Image source={cat.icon} style={styles.categoryCircleImage} />
              </View>
            ) : null}
            <Text style={styles.categoryCircleLabel} numberOfLines={1}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // ════════════════════════════════════════════════════════
  // SECTION 2: Special Offers (Banners scroller - image/gif/video)
  // ════════════════════════════════════════════════════════
  const renderSpecialOffers = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{t('home.specialOffers')}</Text>
      </View>
      {banners.length > 0 ? (
        <ScrollView
          ref={bannerScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerScroll}
          pagingEnabled={false}
          decelerationRate="fast"
          snapToInterval={BANNER_STEP}
          onScrollBeginDrag={(e) => { bannerIndexRef.current = Math.round(e.nativeEvent.contentOffset.x / BANNER_STEP); }}
        >
          {banners.map((banner) => {
            const mediaUrl = banner.mobileView || banner.desktopView || banner.ipadView;
            if (!mediaUrl) return null;
            return (
              <TouchableOpacity
                key={banner._id}
                style={styles.bannerCard}
                activeOpacity={0.9}
                onPress={() => handleBannerPress(banner, mediaUrl)}
              >
                {isVideoUrl(mediaUrl) ? (
                  <View style={{ flex: 1 }} pointerEvents="none">
                    <Video
                      source={{ uri: mediaUrl }}
                      style={styles.bannerVideo}
                      resizeMode="cover"
                      repeat
                      paused={false}
                      muted={true}
                      ignoreSilentSwitch="ignore"
                      playWhenInactive={false}
                      playInBackground={false}
                      controls={false}
                    />
                  </View>
                ) : (
                  <Image source={{ uri: resizedImage(mediaUrl, 800) }} style={styles.bannerImage} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <EmptySection message="No special offers right now" />
      )}
    </View>
  );

  // ════════════════════════════════════════════════════════
  // SECTION 3: Shop By Category (10 round with gradient + See All)
  // ════════════════════════════════════════════════════════
  const renderShopByCategory = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{t('home.shopByCategory')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      {categories.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shopByCatScroll}>
          {categories.slice(0, 10).map((cat) => (
            <TouchableOpacity key={cat._id} style={styles.shopByCatItem} onPress={() => handleCategoryPress(cat)} activeOpacity={0.8}>
              <LinearGradient colors={['#EE0589', '#2D7AFB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.shopByCatCircleOuter}>
                <View style={styles.shopByCatCircleInner}>
                  {cat.icon ? <Image source={cat.icon} style={styles.shopByCatIcon} /> : null}
                </View>
              </LinearGradient>
              <Text style={styles.shopByCatLabel} numberOfLines={1}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <EmptySection message="No categories available" />
      )}
    </View>
  );

  // ════════════════════════════════════════════════════════
  // SECTION 4: New Arrivals (10 products + See All)
  // ════════════════════════════════════════════════════════
  const renderNewArrivals = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{t('home.bestForGifting')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      {newArrivals.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {newArrivals.map((item) => {
            const img = item.productImages?.[0]?.url || item.productImage;
            return (
              <TouchableOpacity key={item._id} style={styles.productHCard} onPress={() => handleProductPress(item)} activeOpacity={0.85}>
                {img ? (
                  <Image source={{ uri: resizedImage(img, 400) }} style={styles.productHImage} />
                ) : (
                  <View style={[styles.productHImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: '#999', fontSize: 12 }}>No Image</Text>
                  </View>
                )}
                <View style={styles.productHInfo}>
                  <Text style={styles.productHName} numberOfLines={1}>{item.productName}</Text>
                  <Text style={styles.productHPrice}>₹{formatPrice(item.discountPrice || item.price)}</Text>
                  {item.discountPercent > 0 && (
                    <Text style={styles.productHDiscount}>{item.discountPercent}% off</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <EmptySection message="No new arrivals right now" />
      )}
    </View>
  );

  // ════════════════════════════════════════════════════════
  // SECTION 5: Banners 1 (single banner)
  // ════════════════════════════════════════════════════════
  const renderBanner1 = () => {
    if (banners.length < 2) return null;
    const banner = banners[1]; // second banner
    const mediaUrl = banner.mobileView || banner.desktopView;
    if (!mediaUrl) return null;

    return (
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <TouchableOpacity 
          style={{ borderRadius: 12, overflow: 'hidden', height: 180 }}
          activeOpacity={0.9}
          onPress={() => {
            if (isVideoUrl(mediaUrl)) {
              setActiveVideoUrl(mediaUrl);
              setVideoModalVisible(true);
            }
          }}
        >
          {isVideoUrl(mediaUrl) ? (
            <View style={{ flex: 1 }} pointerEvents="none">
              <Video source={{ uri: mediaUrl }} style={styles.bannerVideo} resizeMode="cover" repeat paused={false} muted={true} ignoreSilentSwitch="ignore" playWhenInactive={false} playInBackground={false} controls={false} />
            </View>
          ) : (
            <Image source={{ uri: resizedImage(mediaUrl, 800) }} style={styles.bannerImage} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // ════════════════════════════════════════════════════════
  // SECTION 6: Category Tabs + Product Grid (4 products per tab)
  // ════════════════════════════════════════════════════════
  const renderCategoryTabsGrid = () => {
    const tabCats = categories.slice(0, 4);
    if (tabCats.length === 0 && featuredProducts.length === 0) return null;

    const tabs = ['All', ...tabCats.map(c => c.name)];

    let gridProducts = [];
    if (activeTab === 'All') {
      gridProducts = featuredProducts.slice(0, 4);
    } else {
      const cat = tabCats.find(c => c.name === activeTab);
      if (cat && tabProducts[cat._id]) {
        gridProducts = tabProducts[cat._id];
      }
    }

    return (
      <View>
        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} style={activeTab === tab ? styles.tabItemActive : styles.tabItem} onPress={() => setActiveTab(tab)}>
              <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grid */}
        {gridProducts.length > 0 ? (
          <View>
            <View style={styles.productGrid}>
              {gridProducts.map((item) => {
                const img = item.productImages?.[0]?.url || item.productImage;
                return (
                  <TouchableOpacity key={item._id} style={styles.productGridCard} onPress={() => handleProductPress(item)} activeOpacity={0.85}>
                    <View style={styles.productGridImageWrap}>
                      {img ? (
                        <Image source={{ uri: resizedImage(img, 400) }} style={styles.productGridImage} />
                      ) : (
                        <View style={[styles.productGridImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                          <Text style={{ color: '#999', fontSize: 12 }}>No Image</Text>
                        </View>
                      )}
                      <TouchableOpacity style={styles.wishlistBtn} activeOpacity={0.7}>
                        <Text style={styles.wishlistHeart}>{'\u2661'}</Text>
                      </TouchableOpacity>
                    </View>
                    {item.brand && <Text style={styles.productGridBrand} numberOfLines={1}>{item.brand}</Text>}
                    <Text style={styles.productGridName} numberOfLines={1}>{item.productName}</Text>
                    <Text style={styles.productGridPrice}>₹{formatPrice(item.discountPrice || item.price)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity style={styles.viewAllButton} onPress={() => {
              const cat = tabCats.find(c => c.name === activeTab);
              if (cat) {
                navigation.navigate('EarringsList', { categoryId: cat._id, categoryLabel: cat.name });
              } else {
                navigation.navigate('Category');
              }
            }} activeOpacity={0.8}>
              <Text style={styles.viewAllButtonText}>View all</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <EmptySection message="No products found" />
        )}
      </View>
    );
  };

  // ════════════════════════════════════════════════════════
  // SECTION 7: Sardar Keel Collections (banner grid)
  // ════════════════════════════════════════════════════════
  const renderSardarKeelCollections = () => {
    if (banners.length < 3) return null;
    const collectionBanners = banners.slice(0, 3);

    return (
      <View style={styles.collectionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>{t('home.swarnazCollection')}</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Explore Our Newly Launched Collection</Text>
        <View style={styles.collectionsGrid}>
          <TouchableOpacity style={styles.collectionLarge} onPress={() => navigation.navigate('Category')} activeOpacity={0.85}>
            <Image source={{ uri: resizedImage(collectionBanners[0].mobileView || collectionBanners[0].desktopView, 800) }} style={styles.collectionLargeImage} />
            <View style={styles.collectionOverlay}>
              <Text style={styles.collectionTitle}>{collectionBanners[0].title || 'Collection'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.collectionSmallColumn}>
            {collectionBanners.slice(1, 3).map((col) => (
              <TouchableOpacity key={col._id} style={styles.collectionSmall} onPress={() => navigation.navigate('Category')} activeOpacity={0.85}>
                <Image source={{ uri: resizedImage(col.mobileView || col.desktopView, 500) }} style={styles.collectionSmallImage} />
                <View style={styles.collectionOverlay}>
                  <Text style={styles.collectionTitleSmall}>{col.title || 'Collection'}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  // ════════════════════════════════════════════════════════
  // SECTION 8: Find Your Perfect Match
  // ════════════════════════════════════════════════════════
  const renderFindYourMatch = () => (
    <View>
      <View style={styles.sectionDivider}>
        <Text style={styles.sectionHeaderTitle}>{t('home.lightWeight')}</Text>
      </View>
      {categories.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shopByCatScroll}>
          {categories.slice(0, 10).map((cat) => (
            <TouchableOpacity key={cat._id} style={styles.shopByCatItem} onPress={() => handleCategoryPress(cat)} activeOpacity={0.8}>
              <LinearGradient colors={['#930e6e', '#DD8560']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.shopByCatCircleOuter}>
                <View style={styles.shopByCatCircleInner}>
                  {cat.icon ? <Image source={cat.icon} style={styles.shopByCatIcon} /> : null}
                </View>
              </LinearGradient>
              <Text style={styles.shopByCatLabel} numberOfLines={1}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <EmptySection message="No categories available" />
      )}
    </View>
  );

  // ════════════════════════════════════════════════════════
  // SECTION 9: Trending Now
  // ════════════════════════════════════════════════════════
  const renderTrendingNow = () => {
    const trending = featuredProducts.slice(0, 10);
    return (
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>{t('home.trendingNow')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {trending.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {trending.map((item) => {
              const img = item.productImages?.[0]?.url || item.productImage;
              return (
                <TouchableOpacity key={item._id} style={styles.productHCard} onPress={() => handleProductPress(item)} activeOpacity={0.85}>
                  {img ? (
                    <Image source={{ uri: resizedImage(img, 400) }} style={styles.productHImage} />
                  ) : (
                    <View style={[styles.productHImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                      <Text style={{ color: '#999', fontSize: 12 }}>No Image</Text>
                    </View>
                  )}
                  <View style={styles.productHInfo}>
                    <Text style={styles.productHName} numberOfLines={1}>{item.productName}</Text>
                    <Text style={styles.productHPrice}>₹{formatPrice(item.discountPrice || item.price)}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <EmptySection message="No trending products right now" />
        )}
      </View>
    );
  };

  // ════════════════════════════════════════════════════════
  // SECTION 10: Assurance
  // ════════════════════════════════════════════════════════
  const renderAssurance = () => (
    <View style={styles.assuranceSection}>
      <Text style={styles.assuranceTitle}>{t('home.assurance')}</Text>
      <Text style={styles.assuranceSubtitle}>{t('home.assuranceSubtitle')}</Text>
      <View style={styles.assuranceRow}>
        <View style={styles.assuranceItem}>
          <View style={styles.assuranceIconCircle}>
            <FontAwesome name="diamond" size={22} color="#fff" />
          </View>
          <Text style={styles.assuranceLabel}>10% purity{'\n'}of 24k Gold</Text>
        </View>
        <View style={styles.assuranceItem}>
          <View style={styles.assuranceIconCircle}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.assuranceLabel}>2 years{'\n'}warranty</Text>
        </View>
        <View style={styles.assuranceItem}>
          <View style={styles.assuranceIconCircle}>
            <Ionicons name="infinite" size={24} color="#fff" />
          </View>
          <Text style={styles.assuranceLabel}>Premiere{'\n'}Design</Text>
        </View>
        <View style={styles.assuranceItem}>
          <View style={styles.assuranceIconCircle}>
            <Ionicons name="arrow-undo-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.assuranceLabel}>easy 3-5{'\n'}Days return</Text>
        </View>
      </View>
    </View>
  );

  // ── Search Results ───────────────────────────────────
  const renderSearchResults = () => {
    if (!showSearchResults) return null;
    return (
      <View style={styles.searchResultsContainer}>
        {searching && <ActivityIndicator size="small" color="#930e6e" style={{ marginVertical: 8 }} />}
        {searchResults.categories.length > 0 && (
          <View>
            <Text style={styles.searchSectionTitle}>Categories</Text>
            {searchResults.categories.map(cat => (
              <TouchableOpacity key={cat._id} style={styles.searchResultItem} onPress={() => handleCategoryPress({ _id: cat._id, name: cat.categoryName })}>
                <Text style={styles.searchResultText}>{cat.categoryName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {searchResults.products.length > 0 && (
          <View>
            <Text style={styles.searchSectionTitle}>Products</Text>
            {searchResults.products.map(prod => (
              <TouchableOpacity key={prod._id} style={styles.searchResultItem} onPress={() => handleProductPress(prod)}>
                <View style={styles.searchProductRow}>
                  {prod.productImages?.[0]?.url && <Image source={{ uri: resizedImage(prod.productImages[0].url, 200) }} style={styles.searchProductThumb} />}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.searchResultText} numberOfLines={1}>{prod.productName}</Text>
                    <Text style={styles.searchResultPrice}>₹{formatPrice(prod.discountPrice || prod.price)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {!searching && searchResults.categories.length === 0 && searchResults.products.length === 0 && (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </View>
    );
  };

  // ── Live Gold Rate card (Today's Gold Rate — 24K / 22K / 18K) ──
  const goldTimeAgo = () => {
    if (!goldUpdatedAt) return '';
    const diffMs = Date.now() - new Date(goldUpdatedAt).getTime();
    const mins = Math.max(0, Math.floor(diffMs / 60000));
    if (mins < 1) return 'Updated just now';
    if (mins < 60) return `Updated ${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Updated ${hrs} hr ago`;
    return `Updated ${Math.floor(hrs / 24)} day ago`;
  };

  const renderGoldTicker = () => {
    const rates = [
      { label: '24K', value: goldPrice24K },
      { label: '22K', value: goldPrice22K },
      { label: '18K', value: goldPrice18K },
    ].filter(r => r.value);
    if (rates.length === 0) return null;

    return (
      <View style={styles.goldCard}>
        <View style={styles.goldCardHeader}>
          <View style={styles.goldTitleWrap}>
            <Text style={styles.goldCardTitle}>{t('home.todaysGoldRate')}</Text>
            <AntDesign name="caretup" size={12} color="#1DA851" style={{ marginLeft: 6 }} />
            <AntDesign name="caretdown" size={12} color="#E23B3B" style={{ marginLeft: 2 }} />
          </View>
          {goldUpdatedAt ? (
            <View style={styles.goldUpdatedWrap}>
              <Ionicons name="time-outline" size={13} color="#A98B3A" />
              <Text style={styles.goldCardUpdated}> {goldTimeAgo()}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.goldCardBody}>
          <View style={styles.goldRatesRow}>
            {rates.map((r, i) => (
              <React.Fragment key={r.label}>
                {i > 0 && <View style={styles.goldDivider} />}
                <View style={styles.goldRateItem}>
                  <Text style={styles.goldRatePurity}>{r.label}</Text>
                  <Text style={styles.goldRateValue}>{formatPrice(r.value)}/gm</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
          <MaterialCommunityIcons name="gold" size={42} color="#E0A100" style={{ marginLeft: 8 }} />
        </View>
      </View>
    );
  };

  // ── Loading ──────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#930e6e" />
      </SafeAreaView>
    );
  }

  // ════════════════════════════════════════════════════════
  // MAIN RENDER
  // ════════════════════════════════════════════════════════
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#930e6e' }}>
      <StatusBar backgroundColor="#930e6e" barStyle="light-content" />

      {/* Top Bar — logo top-left, clear icons + call on right */}
      <View style={styles.topBarRow}>
        <Image source={primaryLogoUrl ? { uri: primaryLogoUrl } : AppImages.jlogo} style={styles.logo} />
        <View style={styles.topBarRightIcons}>
          <TouchableOpacity
            onPress={handleCallSupport}
            style={styles.headerIconWrapper}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Wishlist')}
            style={styles.headerIconWrapper}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.headerIconWrapper}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Ionicons name="cart-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.mainScroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#930e6e']} tintColor="#930e6e" />}
      >
        {/* Magenta top section: search + gold rate + categories */}
        <View style={styles.topMagentaSection}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBarInner}>
            <Image source={AppImages.jsearch} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('home.searchPlaceholder')}
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={handleSearchChange}
              returnKeyType="search"
              onSubmitEditing={() => searchText.trim().length >= 2 && handleSearchChange(searchText)}
            />
            <TouchableOpacity onPress={handleVoiceSearch} style={styles.searchActionBtn}>
              <Image source={AppImages.jmic} style={[styles.voiceIcon, voiceListening && { tintColor: '#930e6e' }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Image search will be available soon.')} style={styles.searchActionBtn}>
              <Image source={AppImages.jcamera} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {renderSearchResults()}

        {/* 1. Gold/Silver Ticker */}
        {renderGoldTicker()}
        </View>

        {/* 2. Categories (6 round) — straddle the magenta bottom edge */}
        <View style={styles.categoriesOverlap}>
          {renderCategories()}
        </View>

        {/* 3. Special Offers (Banners scroller) */}
        {renderSpecialOffers()}

        {/* 4. Shop By Category (10 round + See All) */}
        {renderShopByCategory()}

        {/* 5. Banner 1 (moved below Shop By Category) */}
        {renderBanner1()}

        {/* 6. Best for Gifting (10 products + See All) */}
        {renderNewArrivals()}

        {/* 7. Swarnaz Collection */}
        {renderSardarKeelCollections()}

        {/* 8. Find Your Perfect Match */}
        {renderFindYourMatch()}

        {/* 9. Trending Now */}
        {renderTrendingNow()}

        {/* 10. Category Tabs + Product Grid (moved to bottom) */}
        {renderCategoryTabsGrid()}

        {/* 11. Assurance */}
        {renderAssurance()}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Video Fullscreen Modal */}
      <Modal
        visible={videoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setVideoModalVisible(false);
          setActiveVideoUrl(null);
        }}
      >
        <View style={styles.videoModalContainer}>
          <TouchableOpacity 
            style={styles.videoModalClose}
            onPress={() => {
              setVideoModalVisible(false);
              setActiveVideoUrl(null);
            }}
          >
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
          
          {activeVideoUrl && (
            <Video
              source={{ uri: activeVideoUrl }}
              style={styles.videoModalPlayer}
              resizeMode="contain"
              repeat
              muted={isMuted}
              paused={false}
            />
          )}
          
          <TouchableOpacity 
            style={styles.videoMuteButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Ionicons 
              name={isMuted ? "volume-mute" : "volume-high"} 
              size={24} 
              color="#FFF" 
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;
