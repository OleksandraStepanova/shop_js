import { refs } from "./refs";
import { isInCart, isInWishlist } from "./storage";

export function renderCategories(categories) {
  const categoriesWithAll = ['All', ...categories];

  const markup = categoriesWithAll
    .map(category => {
      return `
      <li class="categories__item">
        <button class="categories__btn" type="button" data-category="${category}">${category}</button>
      </li>
    `;
    })
    .join('');

  refs.categoriesList.innerHTML = markup;

  const firstCategoryBtn =
    refs.categoriesList.querySelector('.categories__btn');
  if (firstCategoryBtn) {
    firstCategoryBtn.classList.add('categories__btn--active');
  }
}

export function renderProducts(products) {
  const markup = products
    .map(({ id, thumbnail, title, brand, category, price }) => {
      return `
      <li class="products__item" data-id="${id}">
        <img class="products__image" src="${thumbnail}" alt="${title}"/>
        <p class="products__title">${title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
        <p class="products__category">Category: ${category}</p>
        <p class="products__price">Price: $${price}</p>
      </li>
    `;
    })
    .join('');

  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function clearProductsList() {
  refs.productsList.innerHTML = '';
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}
export function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}
export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loadMoreBtn.classList.remove('is-loading');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
export function renderProductInModal({
  tags,
  title,
  thumbnail,
  description,
  price,
  id,
}) {
  const tagsMarkup = tags
    ? `<ul class="modal-product__tags">${tags
        .map(tag => `<li class="modal-product__tag">${tag}</li>`)
        .join('')}</ul>`
    : '';

  const markup = `
    <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>
      ${tagsMarkup}
      <p class="modal-product__description">${description}</p>
      <p class="modal-product__shipping-information">Shipping: Free Shipping</p>
      <p class="modal-product__return-policy">Return Policy: 30 Day Return Policy</p>
      <p class="modal-product__price">Price: $${price}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;

  refs.modalProduct.innerHTML = markup;

  updateModalButtons(id);
}


export function updateModalButtons(productId) {
  if (isInWishlist(productId)) {
    refs.addToWishlistBtn.textContent = 'Remove from Wishlist';
  } else {
    refs.addToWishlistBtn.textContent = 'Add to Wishlist';
  }

  if (isInCart(productId)) {
    refs.addToCartBtn.textContent = 'Remove from Cart';
  } else {
    refs.addToCartBtn.textContent = 'Add to Cart';
  }
}


export function showLoadMoreButtonLoading() {
  refs.loadMoreBtn.classList.add('is-loading');
}

export function hideLoadMoreButtonLoading() {
  refs.loadMoreBtn.classList.remove('is-loading');
}
export function updateCounters(cartItems, wishlistItems) {
  refs.cartCount.textContent = cartItems.length;
  refs.wishlistCount.textContent = wishlistItems.length;
}

export function updateCartSummary(products) {
  const totalItems = products ? products.length : 0;
  const totalPrice = products
    ? products.reduce((sum, product) => sum + product.price, 0)
    : 0;
  refs.cartItemsCount.textContent = totalItems;
  refs.cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}