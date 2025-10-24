import { STORAGE_KEYS } from './constants.js';

export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting data from localStorage: ${error.message}`);
    return null;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage: ${error.message}`);
  }
}

export function getCartItems() {
  return getFromStorage(STORAGE_KEYS.CART) || [];
}

export function addToCart(id) {
  const cartItems = getCartItems();
  if (!cartItems.includes(id)) {
    cartItems.push(id);
    saveToStorage(STORAGE_KEYS.CART, cartItems);
  }
}

export function removeFromCart(id) {
  const cartItems = getCartItems();
  const updatedCart = cartItems.filter(itemId => itemId !== id);
  saveToStorage(STORAGE_KEYS.CART, updatedCart);
}

export function getWishlistItems() {
  return getFromStorage(STORAGE_KEYS.WISHLIST) || [];
}

export function addToWishlist(id) {
  const wishlistItems = getWishlistItems();
  if (!wishlistItems.includes(id)) {
    wishlistItems.push(id);
    saveToStorage(STORAGE_KEYS.WISHLIST, wishlistItems);
  }
}

export function removeFromWishlist(id) {
  const wishlistItems = getWishlistItems();
  const updatedWishlist = wishlistItems.filter(itemId => itemId !== id);
  saveToStorage(STORAGE_KEYS.WISHLIST, updatedWishlist);
}

export function isInCart(id) {
  const cartItems = getCartItems();
  return cartItems.includes(id);
}

export function isInWishlist(id) {
  const wishlistItems = getWishlistItems();
  return wishlistItems.includes(id);
}

export function saveTheme(theme) {
  saveToStorage(STORAGE_KEYS.THEME, theme);
}

export function getTheme() {
  return getFromStorage(STORAGE_KEYS.THEME) || 'light';
}
