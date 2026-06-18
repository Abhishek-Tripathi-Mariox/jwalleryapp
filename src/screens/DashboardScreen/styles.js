import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors } from '../../themes/Colors';

export const styles = StyleSheet.create({
  // ── Loading ─────────────────────────────────────────
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },

  // ── Top Bar ─────────────────────────────────────────
  topBarRow: {
    backgroundColor: '#930e6e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    position: 'relative',
  },
  logo: {
    height: 45,
    width: 150,
    resizeMode: 'contain',
  },
  iconButton: {
    width: 24,
    height: 24,
    tintColor: Colors.WHITE,
    resizeMode: 'contain',
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.WHITE,
    resizeMode: 'contain',
  },
  topBarRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconWrapper: {
    marginLeft: 12,
    padding: 8,
  },

  // ── Search Bar ──────────────────────────────────────
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#929292',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    height: 47,
    paddingHorizontal: 15,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#930e6e',
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    paddingVertical: 0,
  },
  searchActionBtn: {
    padding: 6,
    marginLeft: 4,
  },
  voiceIcon: {
    width: 22,
    height: 22,
    tintColor: '#930e6e',
    resizeMode: 'contain',
  },
  cameraIcon: {
    width: 22,
    height: 22,
    tintColor: '#930e6e',
    resizeMode: 'contain',
  },

  // ── Search Results ──────────────────────────────────
  searchResultsContainer: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    maxHeight: 320,
    zIndex: 100,
  },
  searchSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#930e6e',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY1,
    marginBottom: 4,
  },
  searchResultItem: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GRAY9,
  },
  searchResultText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontWeight: '500',
  },
  searchResultPrice: {
    fontSize: 12,
    color: '#930e6e',
    fontWeight: '600',
    marginTop: 2,
  },
  searchProductRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchProductThumb: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: Colors.GRAY9,
  },
  noResultsText: {
    textAlign: 'center',
    color: Colors.GRAY2,
    paddingVertical: 16,
    fontSize: 14,
  },

  // ── Gold Price Ticker ───────────────────────────────
  tickerContainer: {
    height: 36,
    overflow: 'hidden',
    marginVertical: 8,
  },
  tickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
  },
  goldPill: {
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginHorizontal: 4,
    backgroundColor: '#930e6e',
  },
  goldPillText: {
    color: '#FFFBE5',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
  },
  silverPill: {
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginHorizontal: 4,
    backgroundColor: '#EDEDED',
  },
  silverPillText: {
    color: '#930e6e',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
  },

  // ── Category Round Scroller ─────────────────────────
  categoryScroll: {
    paddingLeft: 16,
    paddingVertical: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  categoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  categoryCircleImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    resizeMode: 'cover',
  },
  categoryCircleLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.BLACK,
    textTransform: 'capitalize',
    marginTop: 6,
    textAlign: 'center',
  },

  // ── Section Header ──────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  sectionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: -4,
    marginLeft: 16,
    marginBottom: 12,
  },
  seeAllText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#930e6e',
  },

  // ── Banner Scroller (Special Offers) ────────────────
  bannerScroll: {
    paddingLeft: 16,
    paddingVertical: 8,
  },
  bannerCard: {
    width: width - 48,
    height: 180,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerVideo: {
    width: '100%',
    height: '100%',
  },

  // ── New Arrivals / Horizontal Products ──────────────
  horizontalScroll: {
    paddingLeft: 16,
    paddingVertical: 8,
  },
  productHCard: {
    width: 155,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  productHImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F7F7F7',
    resizeMode: 'cover',
  },
  productHInfo: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  productHName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#424242',
  },
  productHPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: '#DD8560',
    marginTop: 2,
  },
  productHDiscount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#930e6e',
    marginTop: 1,
  },

  // ── Product Grid (2-column) ─────────────────────────
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  tabItemActive: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#930e6e',
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.BLACK,
    opacity: 0.7,
  },
  tabTextActive: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#930e6e',
    opacity: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  productGridCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productGridImageWrap: {
    width: '100%',
    height: 200,
    backgroundColor: '#F7F7F7',
    position: 'relative',
  },
  productGridImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  wishlistBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DD8560',
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistHeart: {
    fontSize: 15,
    color: '#DD8560',
  },
  productGridBrand: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.BLACK,
    marginTop: 6,
    paddingHorizontal: 8,
  },
  productGridName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#555555',
    paddingHorizontal: 8,
    marginTop: 2,
  },
  productGridPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#DD8560',
    paddingHorizontal: 8,
    marginTop: 4,
    marginBottom: 8,
  },

  // ── Featured Collections Grid ───────────────────────
  collectionsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  collectionsGrid: {
    flexDirection: 'row',
    height: 240,
    gap: 10,
  },
  collectionLarge: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  collectionLargeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  collectionSmallColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  collectionSmall: {
    flex: 0.48,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  collectionSmallImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  collectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  collectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: '600',
  },
  collectionTitleSmall: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.WHITE,
    fontWeight: '500',
  },

  // ── Shop By Category (circular with gradient) ───────
  shopByCatScroll: {
    paddingLeft: 16,
    paddingVertical: 10,
  },
  shopByCatItem: {
    alignItems: 'center',
    marginRight: 14,
    width: 76,
  },
  shopByCatCircleOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopByCatCircleInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  shopByCatIcon: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    borderRadius: 24,
  },
  shopByCatLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.BLACK,
    marginTop: 6,
    textAlign: 'center',
  },

  // ── View All Button ────────────────────────────────
  viewAllButton: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  // ── Assurance Section ──────────────────────────────
  assuranceSection: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  assuranceTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BLACK,
    textAlign: 'center',
  },
  assuranceSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 16,
  },
  assuranceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  assuranceItem: {
    alignItems: 'center',
    flex: 1,
  },
  assuranceIcon: {
    width: 44,
    height: 44,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  assuranceIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#930e6e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  assuranceLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },

  // ── Empty Section ──────────────────────────────────
  emptySection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  emptySectionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },

  // ── Misc ───────────────────────────────────────────
  mainScroll: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  sectionDivider: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 4,
  },

  // ── Video Modal ────────────────────────────────────
  videoTouchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  videoModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoModalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  videoModalPlayer: {
    width: '100%',
    height: '70%',
  },
  videoMuteButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    padding: 12,
  },
});
