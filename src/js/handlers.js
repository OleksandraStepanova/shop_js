import { checkVisibilityLoadMoreButton, isValidSearchQuery, loadCartProducts, loadWishlistProducts, showToast, toggleActiveClass, toggleTheme } from "./helpers";
import { openModal } from "./modal";
import { getCategories, getProductById, getProducts, getProductsByCategory, searchProducts } from "./products-api";
import { refs } from "./refs";
import { clearProductsList, hideLoadMoreButton, hideNotFound, renderCategories, renderProductInModal, renderProducts, showLoadMoreButton, showLoadMoreButtonLoading, showNotFound, updateCartSummary, updateCounters } from "./render-function";
import { addToCart, addToWishlist, getCartItems, getTheme, getWishlistItems, isInCart, isInWishlist, removeFromCart, removeFromWishlist, saveTheme } from "./storage";

let currentPage = 1;
let currentProductId = null;
let query = "";

export async function initHomePage() { 
    const savedTheme = getTheme();
    toggleTheme(savedTheme);
    const cartItems = getCartItems();
    const wishListItems = getWishlistItems();  
    updateCounters(cartItems, wishListItems);
    try {
        const categories = await getCategories();
        renderCategories(categories);
      const { products, total } = await getProducts(currentPage);
      checkVisibilityLoadMoreButton(total, currentPage);
      showLoadMoreButton();

        renderProducts(products);
        if (products.length === 0) {
            showToast('No products found', 'info');
            showNotFound();
            return;
        }
    
    }catch (error) {
    console.error('Error initializing home page:', error);
    showToast('Failed to initialize page', 'error');
  }
}

export async function handleCategoryClick(event) {
  const categoryBtn = event.target.closest('.categories__btn');
  if (!categoryBtn) return;
  hideLoadMoreButton();
  clearProductsList();
  try {
    //   const category = categoryBtn.dataset.category;
    const category = categoryBtn.textContent;
    const allCategoryBtns = document.querySelectorAll('.categories__btn');

    toggleActiveClass(allCategoryBtns, categoryBtn, 'categories__btn--active');

    let productsData;

    if (category === 'All') {
      productsData = await getProducts();
      checkVisibilityLoadMoreButton(productsData.total, currentPage);
      showLoadMoreButton();
    } else {
      productsData = await getProductsByCategory(category);
      checkVisibilityLoadMoreButton(productsData.total, currentPage);
      showLoadMoreButton();
    }
      if (productsData.products.length > 0) {
      renderProducts(productsData.products);
      hideNotFound();
    } else {
      showNotFound();
    }
  } catch (error) {
    console.error('Error fetching products by category:', error);
    showToast('Failed to load products', 'error');
    showNotFound();
  }
}


export async function handleProductClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) return;

  try {
    const productId = Number(productItem.dataset.id);
    currentProductId = productId;

    const product = await getProductById(productId);
    renderProductInModal(product);
    openModal();
  } catch (error) {
    console.error('Error fetching product details:', error);
    showToast('Failed to load product details', 'error');
  }
}

export async function handleLoadMoreBtnClick() {
  currentPage += 1;
  showLoadMoreButtonLoading();
  try {
    const { products, total } = await searchProducts(query, currentPage);
    renderProducts(products);
    checkVisibilityLoadMoreButton(total, currentPage);
  } catch (error) {
    console.error('Error loadMore click:', error);
    showToast('Failed to loadMore click', 'error');
  }
}

export async function handleSearchSubmit(event) {
  event.preventDefault();
  currentPage = 1;

  query = refs.searchInput.value;

  if (!isValidSearchQuery(query)) {
    showToast('Please enter a valid search query', 'warning');
    return;
  }
  clearProductsList();
  hideLoadMoreButton();
  try {
    const { products } = await searchProducts(query, currentPage);

    if (products.length > 0) {
      renderProducts(products);
        hideNotFound();
        showLoadMoreButton();
    } else {
      showNotFound();
    }
  } catch (error) {
    console.error('Error searching products:', error);
    showToast('Failed to search products', 'error');
    showNotFound();
    hideLoadMoreButton();
  }
}
export async function handleSearchClear() {
  refs.searchInput.value = '';
  currentPage = 1;
  clearProductsList();
  try {
    const { products, total } = await getProducts(currentPage);

    if (products.length > 0) {
      renderProducts(products);
      hideNotFound();
      showLoadMoreButton();
      checkVisibilityLoadMoreButton(total, currentPage);
    } else {
      showNotFound();
      hideLoadMoreButton();
      console.log('ELSE');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    showToast('Failed to load products', 'error');
    showNotFound();
    hideLoadMoreButton();
  }
}


export function handleAddToCartClick() {
  if (!currentProductId) return;

  try {
    if (isInCart(currentProductId)) {
      removeFromCart(currentProductId);
      refs.addToCartBtn.textContent = 'Add to Cart';
      showToast('Product removed from cart', 'info');
    } else {
      addToCart(currentProductId);
      refs.addToCartBtn.textContent = 'Remove from Cart';
      showToast('Product added to cart', 'success');
    }
    updateCounters(getCartItems(), getWishlistItems());
  } catch (error) {
    console.error('Error updating cart:', error);
    showToast('Failed to update cart', 'error');
  }
}

export function handleAddToWishlistClick() {
  if (!currentProductId) return;

  try {
    if (isInWishlist(currentProductId)) {
      removeFromWishlist(currentProductId);
      refs.addToWishlistBtn.textContent = 'Add to Wishlist';
      showToast('Product removed from wishlist', 'info');
    } else {
      addToWishlist(currentProductId);
      refs.addToWishlistBtn.textContent = 'Remove from Wishlist';
      showToast('Product added to wishlist', 'success');
    }

    updateCounters(getCartItems(), getWishlistItems());
  } catch (error) {
    console.error('Error updating wishlist:', error);
    showToast('Failed to update wishlist', 'error');
  }
}
export async function handleBuyProductClick() {
  if (!currentProductId) return;
  
  showToast('Product was bought successfully', 'success');
  
}

export async function initCartPage() {
  const savedTheme = getTheme();
  toggleTheme(savedTheme);

  updateCounters(getCartItems(), getWishlistItems());

  await loadCartProducts();
}

export function handleBuyProductsClick() {
  const cartItems = getCartItems();

  if (cartItems.length === 0) {
    showToast('Your cart is empty', 'warning');
    return;
  }

  showToast('Thank you for your purchase!', 'success');
  localStorage.removeItem('cart');

  updateCounters([], getWishlistItems());
  updateCartSummary([]);
  window.location.reload();
}

export async function initWishlistPage() {
  const savedTheme = getTheme();
  toggleTheme(savedTheme);

  updateCounters(getCartItems(), getWishlistItems());

  await loadWishlistProducts();
}

export function handleThemeToggleBtnClick() {
  const currentTheme = document.body.getAttribute('data-theme') || 'light';
  console.log(currentTheme);
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  toggleTheme(newTheme);
  saveTheme(newTheme);

  refs.themeToggleBtn.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
}
