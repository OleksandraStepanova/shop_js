import { handleAddToCartClick, handleAddToWishlistClick, handleBuyProductsClick, handleProductClick, handleThemeToggleBtnClick, initCartPage } from "./js/handlers";
import { loadCartProducts } from "./js/helpers";
import { closeModal } from "./js/modal";
import { refs } from "./js/refs";

//Логіка сторінки Cart
document.addEventListener('DOMContentLoaded', initCartPage);
refs.productsList.addEventListener('click', handleProductClick);
refs.modalCloseBtn.addEventListener('click', closeModal);
refs.addToWishlistBtn.addEventListener('click', handleAddToWishlistClick);
refs.addToCartBtn.addEventListener('click', async event => {
  handleAddToCartClick(event);
  await loadCartProducts();
});
refs.buyProductsBtn.addEventListener('click', handleBuyProductsClick);
refs.themeToggleBtn.addEventListener('click', handleThemeToggleBtnClick);
refs.scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    refs.scrollToTopButton.classList.add('scroll-top-btn--visible');
  } else {
    refs.scrollToTopButton.classList.remove('scroll-top-btn--visible');
  }
});

