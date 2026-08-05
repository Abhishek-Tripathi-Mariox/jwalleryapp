// Gold-priced products carry a live-computed `computedPrice` (see backend
// util/goldPricing.js decorateWithLiveRate) that the cart snapshots at
// add-time (CartService.addToCart). Pre-cart displays (product cards, PDP)
// must prefer it over the admin-set discountPrice/price, otherwise the price
// shown before adding to cart can diverge from what actually gets charged.
export const getEffectivePrice = (item = {}) =>
  item.computedPrice ?? item.discountPrice ?? item.price ?? 0;

export const getOriginalPrice = (item = {}) => item.price ?? 0;
