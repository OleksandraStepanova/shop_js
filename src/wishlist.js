import { handleAddToCartClick, handleAddToWishlistClick, handleProductClick, handleThemeToggleBtnClick, initWishlistPage } from "./js/handlers";
import { loadWishlistProducts } from "./js/helpers";
import { closeModal } from "./js/modal";
import { refs } from "./js/refs";

//Логіка сторінки Wishlist
document.addEventListener('DOMContentLoaded', initWishlistPage);
refs.productsList.addEventListener('click', handleProductClick);
refs.modalCloseBtn.addEventListener('click', closeModal);
refs.addToCartBtn.addEventListener('click', handleAddToCartClick);
refs.addToWishlistBtn.addEventListener('click', async event => {
  handleAddToWishlistClick(event);
  await loadWishlistProducts();
});
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

