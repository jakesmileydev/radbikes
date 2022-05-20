const mobileFooterNav = function () {
  const footerMobileBtns = document.querySelectorAll(".footer-mobile-btn");
  const array = Array.from(footerMobileBtns);

  array.forEach((btn) => {
    btn.addEventListener("click", function () {
      const width = document.body.clientWidth;

      if (width > 768) return;

      const thisColumn = btn
        .closest(".column-wrapper")
        .querySelector(".column");

      thisColumn.classList.toggle("column--open");
      btn
        .querySelector(".mobile-btn-icon")
        .classList.toggle("mobile-btn-icon--open");
    });
  });
};

const toggleMobileNav = function () {
  document
    .querySelector(".mobile-nav-btn")
    .classList.toggle("mobile-nav-btn--open");
  document.querySelector(".main-nav").classList.toggle("main-nav-mobile-open");
};

const ctaSubmit = function () {
  const form = document.querySelector(".cta-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.innerHTML = "";
    const HTML = `
    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
      <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>
    
    <p class="cta-confirm--text">Thanks, we'll be in touch</p>
    `;
    form.insertAdjacentHTML("afterbegin", HTML);
  });
};
const changeCartQuantity = function (e) {
  const thisProduct = productData
    ._getData()
    .find((product) => product.id === e.target.dataset.id);

  if (e.target.closest(".cart-item-subtract")) {
    thisProduct.quantityInCart > 1 ? thisProduct.quantityInCart-- : "";
  }
  if (e.target.closest(".cart-item-add")) {
    thisProduct.quantityInCart++;
  }
  e.target
    .closest(".cart-item-quantity-container")
    .querySelector(".cart-item-quantity").textContent =
    thisProduct.quantityInCart;
  e.target
    .closest(".cart-row")
    .querySelector(".cart-item-total").textContent = `$ ${(
    thisProduct.quantityInCart * thisProduct.price
  ).toLocaleString()}`;
  updateCartSummary();
  updateCartTotals();
};
const removeCartRow = function (product) {
  const array = Array.from(document.querySelectorAll(".cart-row"));
  array.forEach((row) => {
    if (row.dataset.id === product.id) row.remove();
  });
};
const removeItemFromShoppingCart = function (e) {
  const thisProduct = productData
    ._getData()
    .find((product) => product.id === e.target.dataset.id);

  thisProduct.quantityInCart = 0;
  productData._removeFromShoppingCart(thisProduct);
  updateCartSummary();
  updateCartTotals();
  removeCartRow(thisProduct);
};
const handleMainClick = function (e) {
  // Close the cart summary if main is clicked
  closeCartSummary();

  // Sort buttons in shop
  if (e.target.classList.contains("sort-btn")) return sortShop(e);
  // Add to cart button on product page
  if (e.target.classList.contains("product-page-add")) return addToCart(e);
  // + and - buttons on shopping cart page
  if (
    e.target.closest(".cart-item-add") ||
    e.target.closest(".cart-item-subtract")
  )
    return changeCartQuantity(e);
  // Add to cart button in featured section on home page
  if (e.target.classList.contains("featured-product-button"))
    return addToCart(e);

  //
  if (e.target.closest(".cart-item-remove"))
    return removeItemFromShoppingCart(e);
};

const handleHeaderClick = function (e) {
  if (e.target.closest(".cart-summary-delete"))
    return removeItemFromShoppingCart(e);

  // View cart btn in cart summary
  if (e.target.classList.contains("view-cart-btn")) {
    return (window.location.hash = "#ShoppingCart");
  }
  if (e.target.closest(".mobile-nav-btn-wrapper")) {
    toggleMobileNav();
  }
};

const clearMain = function (backgroundColor = "#fff") {
  document.querySelector("main").innerHTML = "";
  document.querySelector(".footer-image").style.backgroundColor =
    backgroundColor;
  document.querySelector("body").style.backgroundColor = backgroundColor;
  scrollTo(0, 0);
};

const navigate = function () {
  // Remove the hash
  const location = window.location.hash.slice(1);
  if (!location) return navigateHome();
  // If the mobile nav menu is open, close it
  document.querySelector(".main-nav").classList.remove("main-nav-mobile-open");
  document
    .querySelector(".mobile-nav-btn")
    .classList.remove("mobile-nav-btn--open");
  // If navigating to a product, leave function and render product instead
  if (location.slice(0, 7) === "Product") {
    return renderProductPage(location.slice(8));
  }
  // If navigating to shopping cart, leave function and render shopping cart
  if (location.slice(0, 12) === "ShoppingCart") {
    return openShoppingCart();
  }
  if (location === "Contact") {
    return openContactPage();
  }
  if (!location.includes("Shop")) return;
  // If navigating to shop, render search bar, breadcrumbs, and filters
  setUpShop();
  scroll(0, 0);
  // Clear existing sort indicators for collections filters in shop
  clearCollectionSortDisplay();

  const crumb = location.slice(5);

  if (!crumb) {
    renderProducts(productData._getData());
    productData._setCurrentFilter("");
  }

  // CLEAN THIS SECTION UP LATER, DRY PRINCIPLE, create an analyzeCrumb() function or something
  if (crumb === "Bikes") {
    const bikes = productData
      ._getData()
      .filter((product) => product.tags.includes("MTB"));
    productData._setCurrentFilter("MTB");
    renderProducts(bikes);
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a>`);
    displaySelectedFilter(".filter--bikes");
  }
  if (crumb === "Bikes/FullSuspension") {
    const fullSuspension = productData
      ._getData()
      .filter((product) => product.tags.includes("FULLSUS"));
    productData._setCurrentFilter("FULLSUS");
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a> / FULL SUSPENSION`);
    renderProducts(fullSuspension);
    displaySelectedFilter(".filter--fullsus");
  }
  if (crumb === "Bikes/Hardtail") {
    const hardtail = productData
      ._getData()
      .filter((product) => product.tags.includes("HARDTAIL"));
    productData._setCurrentFilter("HARDTAIL");
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a> / HARDTAIL`);
    renderProducts(hardtail);
    displaySelectedFilter(".filter--hardtail");
  }
  if (crumb === "Bikes/Electric") {
    const electric = productData
      ._getData()
      .filter((product) => product.tags.includes("ELECTRIC"));
    productData._setCurrentFilter("ELECTRIC");
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a> / ELECTRIC`);
    renderProducts(electric);
    displaySelectedFilter(".filter--electric");
  }
  if (crumb === "Gear") {
    const gear = productData
      ._getData()
      .filter((product) => product.tags.includes("GEAR"));
    productData._setCurrentFilter("GEAR");
    displayBreadcrumbs(" / GEAR");
    renderProducts(gear);
    displaySelectedFilter(".filter--gear");
  }
  if (crumb === "Components") {
    const components = productData
      ._getData()
      .filter((product) => product.tags.includes("COMPONENTS"));
    productData._setCurrentFilter("COMPONENTS");
    displayBreadcrumbs(" / COMPONENTS");
    renderProducts(components);
    displaySelectedFilter(".filter--components");
  }
};

const initialize = function () {
  slider();
  mobileFooterNav();
  ctaSubmit();
  cartSummaryEvents();
  document.querySelector("main").addEventListener("click", handleMainClick);
  document.querySelector("header").addEventListener("click", handleHeaderClick);
  window.addEventListener("hashchange", navigate);
  window.addEventListener("load", navigate);
};
initialize();
