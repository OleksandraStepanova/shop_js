import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { ITEMS_PER_PAGE } from './constants';
import { clearProductsList, hideLoadMoreButton, hideLoadMoreButtonLoading, hideNotFound, renderProducts, showNotFound, updateCartSummary } from './render-function';
import { getCartItems, getWishlistItems } from './storage';
import { getProductsByIds } from './products-api';
import { refs } from './refs';

export function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeout: 5000,
  };

  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;
    default:
      iziToast.error({
        message: 'Invalid type of toast',
        position: 'topRight',
        timeout: 5000,
      });
      break;
  }
}
export function toggleActiveClass(elements, activeElement, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });

  activeElement.classList.add(activeClass);
}

export function isValidSearchQuery(query) {
  return query.trim().length > 0;
}
export function checkVisibilityLoadMoreButton(total, currentPage) {
  if (Math.ceil(total / ITEMS_PER_PAGE) === currentPage) {
    hideLoadMoreButton();
    showToast('No more products to load', 'info');
  } else {
    hideLoadMoreButtonLoading();
  }
}

export function isInCart(id) {
  const cartItems = getCartItems();
  return cartItems.includes(id);
}

export async function loadCartProducts() {
  const cartItems = getCartItems();
  clearProductsList();
  if (cartItems.length === 0) {
    showNotFound();
    updateCartSummary([]); //?????
    return;
  }

  hideNotFound();

  try {
    const products = await getProductsByIds(cartItems);
    renderProducts(products);
    updateCartSummary(products);
  } catch (error) {
    console.error('Error loading cart products:', error);
    showToast('Failed to load cart products', 'error');
    showNotFound();
  }
}

export async function loadWishlistProducts() {
  const wishlistItems = getWishlistItems();
  clearProductsList();
  if (wishlistItems.length === 0) {
    refs.productsList.innerHTML = '';
    refs.notFound.classList.add('not-found--visible');
    return;
  }
  refs.notFound.classList.remove('not-found--visible');

  try {
    const products = await getProductsByIds(wishlistItems);
    renderProducts(products);
  } catch (error) {
    console.error('Error loading wishlist products:', error);
    showToast('Failed to load wishlist products', 'error');
    refs.notFound.classList.add('not-found--visible');
  }
}
export function toggleTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  document.body.dataset.theme = theme;
  refs.themeToggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
}