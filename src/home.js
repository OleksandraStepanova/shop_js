import { handleAddToCartClick, handleAddToWishlistClick, handleCategoryClick, handleLoadMoreBtnClick, handleProductClick, handleSearchClear, handleSearchSubmit, handleThemeToggleBtnClick, initHomePage } from "./js/handlers";
import { closeModal } from "./js/modal";
import { refs } from "./js/refs";

//Логіка сторінки Home
document.addEventListener('DOMContentLoaded', initHomePage);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductClick);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

refs.modalCloseBtn.addEventListener('click', closeModal);
refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.searchClearBtn.addEventListener('click', handleSearchClear);
refs.addToCartBtn.addEventListener('click', handleAddToCartClick);
refs.addToWishlistBtn.addEventListener('click', handleAddToWishlistClick);
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


