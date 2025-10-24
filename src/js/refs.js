export const refs = {
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),
  notFound: document.querySelector('.not-found'),

  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form__input'),
  searchClearBtn: document.querySelector('.search-form__btn-clear'),

  modal: document.querySelector('.modal'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  modalProduct: document.querySelector('.modal-product'),
  modalProductActions: document.querySelector('.modal-product__actions'),
  addToWishlistBtn: document.querySelector('.modal-product__btn--wishlist'),
  addToCartBtn: document.querySelector('.modal-product__btn--cart'),
  modalProductByeBtn: document.querySelector('.modal-product__buy-btn'),

  cartCount: document.querySelector('[data-cart-count]'),
  wishlistCount: document.querySelector('[data-wishlist-count]'),

  cartItemsCount: document.querySelector('[data-count]'),
  cartTotalPrice: document.querySelector('[data-price]'),
  buyProductsBtn: document.querySelector('.cart-summary__btn'),

  loadMoreBtn: document.querySelector('.load-more-btn'),
  scrollToTopButton: document.querySelector('.scroll-top-btn'),
  themeToggleBtn: document.querySelector('.theme-toggle-btn'),
};
