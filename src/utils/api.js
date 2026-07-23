import { API_BASE_URL } from '../constants/api';
import { getTokenStorage } from './tokenStorage';

/**
 * Generic authenticated API helper for the RN app.
 * Returns parsed JSON `{ code, message, data }` from the backend.
 *
 * Supports two calling conventions:
 *   request('/user/cart')                         – simple GET
 *   request('/user/cart', { method, body })        – with options
 *   request('GET', '/user/profile')                – method-first shorthand
 *   request('POST', '/user/orders', bodyObj)       – method-first with body
 */
export const request = async (pathOrMethod, pathOrOpts, bodyArg) => {
  let path, method = 'GET', body, headers = {};

  // Detect method-first shorthand: request('GET', '/path') or request('POST', '/path', body)
  if (typeof pathOrMethod === 'string' && typeof pathOrOpts === 'string') {
    method = pathOrMethod;
    path = pathOrOpts;
    body = bodyArg;
  } else {
    path = pathOrMethod;
    const opts = pathOrOpts || {};
    method = opts.method || 'GET';
    body = opts.body;
    headers = opts.headers || {};
  }

  const token = await getTokenStorage();
  const fetchOpts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };
  if (body) fetchOpts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE_URL}${path}`, fetchOpts);
  return res.json();
};

// ── Home ──────────────────────────────────────────────
export const fetchHomeScreen = () => request('/user/homeScreen');
export const fetchGoldPrices = () => request('/user/gold-prices');
export const fetchBanners = () => request('/user/banners');
export const fetchHomeCategories = () => request('/user/home-categories');
export const fetchSpecialOffers = () => request('/user/special-offers');
export const globalSearch = (q) =>
  request(`/user/search?q=${encodeURIComponent(q)}`);

// Camera search — uploads a photo (multipart), so it bypasses the JSON-only
// `request()` helper and builds its own fetch call.
export const imageSearch = async (asset) => {
  const token = await getTokenStorage();
  const formData = new FormData();
  formData.append('image', {
    uri: asset.uri,
    type: asset.type || 'image/jpeg',
    name: asset.fileName || 'search.jpg',
  });
  const res = await fetch(`${API_BASE_URL}/user/products/image-search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return res.json();
};

// ── Categories ────────────────────────────────────────
export const fetchCategories = () => request('/user/categories');
export const fetchCategoryById = (id) => request(`/user/categories/${id}`);
export const fetchProductsByCategory = (catId) =>
  request(`/user/categories/${catId}/products`);

// ── Products ──────────────────────────────────────────
export const searchProducts = (q) =>
  request(`/user/products/search?q=${encodeURIComponent(q)}`);
export const fetchNewArrivals = () => request('/user/products/new-arrivals');
export const browseProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/user/products/browse${qs ? `?${qs}` : ''}`);
};
export const fetchFeaturedProducts = () => request('/user/products/featured');
export const fetchProductDetails = (id) => request(`/user/products/${id}`);
export const fetchProductReviews = (id) => request(`/user/products/${id}/reviews`);

// ── Wishlist ──────────────────────────────────────────
export const fetchWishlist = () => request('/user/wishlist');
export const toggleWishlist = (productId) =>
  request('/user/wishlist/toggle', { method: 'POST', body: { productId } });
export const removeFromWishlist = (productId) =>
  request(`/user/wishlist/${productId}`, { method: 'DELETE' });
export const getWishlistCount = () => request('/user/wishlist/count');

// ── Cart ──────────────────────────────────────────────
export const fetchCart = () => request('/user/cart');
export const addToCart = (productId, quantity = 1, size, color) =>
  request('/user/cart', { method: 'POST', body: { productId, quantity, size, color } });
export const updateCartItem = (itemId, quantity) =>
  request(`/user/cart/${itemId}`, { method: 'PUT', body: { quantity } });
export const removeFromCart = (itemId) =>
  request(`/user/cart/${itemId}`, { method: 'DELETE' });
export const clearCart = () =>
  request('/user/cart', { method: 'DELETE' });
export const getCartCount = () => request('/user/cart/count');

// ── Coupons ───────────────────────────────────────────
export const fetchCoupons = () => request('/user/coupons');
export const applyCoupon = (couponCode) =>
  request('/user/cart/apply-coupon', { method: 'POST', body: { couponCode } });
export const removeCoupon = () =>
  request('/user/cart/remove-coupon', { method: 'DELETE' });

// ── Orders ────────────────────────────────────────────
export const placeOrder = (orderData) =>
  request('/user/orders', { method: 'POST', body: orderData });
export const fetchOrders = (status) => {
  const qs = status ? `?status=${status}` : '';
  return request(`/user/orders${qs}`);
};
export const fetchOrderDetails = (id) => request(`/user/orders/${id}`);
export const trackOrder = (id) => request(`/user/orders/${id}/track`);
export const cancelOrder = (id, reason) =>
  request(`/user/orders/${id}/cancel`, { method: 'POST', body: { reason } });
export const reorder = (id) =>
  request(`/user/orders/${id}/reorder`, { method: 'POST' });

// ── Payment ───────────────────────────────────────────
export const verifyPayment = (paymentData) =>
  request('/user/payment/verify', { method: 'POST', body: paymentData });

// ── Address ───────────────────────────────────────────
export const fetchAddresses = () => request('/user/address');
export const addAddress = (data) =>
  request('/user/address', { method: 'POST', body: data });
export const deleteAddress = (id) =>
  request(`/user/address/${id}`, { method: 'DELETE' });
export const fetchAddressDetail = (id) => request(`/user/address/${id}`);
export const reverseGeocode = (latitude, longitude) =>
  request('POST', '/user/geocode/reverse', { latitude, longitude });

// ── Profile ───────────────────────────────────────────
export const fetchProfile = () => request('/user/profile');
export const deleteAccount = () => request('DELETE', '/user/account');

// ── Support/Contact Info ──────────────────────────────
export const fetchSupportInfo = () => request('/user/support-info');
export const fetchStores = () => request('/user/stores');

// ── Contact / Feedback submission ─────────────────────
export const submitContact = (data) =>
  request('/user/contact', { method: 'POST', body: data });

// ── App Config (API keys from backend) ───────────────
export const fetchAppConfig = () => request('/user/app-config');

// ── Reviews ───────────────────────────────────────────
export const submitReview = (reviewData) =>
  request('/user/reviews', { method: 'POST', body: reviewData });
export const fetchUserReviews = () => request('/user/reviews');
export const canReview = (productId) =>
  request(`/user/reviews/can-review/${productId}`);
