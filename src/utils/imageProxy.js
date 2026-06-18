// Routes large remote images through the wsrv.nl resizing CDN so the app
// downloads a small optimized thumbnail instead of the full-size S3 original
// (banners ~2MB, category icons ~1MB). Only remote http(s) images are proxied;
// local require()'d assets and non-http strings are returned untouched.
//
// NOTE: image URLs from the API are already URL-encoded, so we pass them
// through as-is (re-encoding would double-encode %20 etc. and break them).
export const resizedImage = (url, width = 600, quality = 70) => {
  if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
    return url;
  }
  const isHttps = /^https:\/\//i.test(url);
  const origin = url.replace(/^https?:\/\//i, '');
  const prefix = isHttps ? 'ssl:' : '';
  return `https://wsrv.nl/?url=${prefix}${origin}&w=${width}&q=${quality}&output=webp`;
};
