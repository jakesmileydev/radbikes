"use strict";

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    const width = document.body.clientWidth;
    if (curSlide === 0) {
      btnLeft.classList.add("slider__btn--usable");
    }
    if (curSlide === maxSlide - (width > 976 ? 4 : 2)) {
      btnRight.classList.remove("slider__btn--usable");
    }
    if (curSlide === maxSlide - (width > 976 ? 3 : 1)) {
      return;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 1) {
      btnLeft.classList.remove("slider__btn--usable");
    }
    if (curSlide === maxSlide - 3) {
      btnRight.classList.add("slider__btn--usable");
    }
    if (curSlide === 0) {
      return;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  goToSlide(0);

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
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
const mobileNav = function () {
  document
    .querySelector(".mobile-nav-btn-wrapper")
    .addEventListener("click", function () {
      document
        .querySelector(".mobile-nav-btn")
        .classList.toggle("mobile-nav-btn--open");
      document
        .querySelector(".main-nav")
        .classList.toggle("main-nav-mobile-open");
    });
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
const setUpShop = function () {
  clearMain("#f1f1f1");

  const sidebarHTML = `
  <section class="section--shop">
  <div class="shop">
    
    <div class="breadcrumbs">
      <p class="breadcrumbs-links"><a href="#Shop"  >SHOP</a></p>
    </div>

    <form class="search-bar">
      <input class="search-input" type="text" placeholder="Search products...">
      <button class="search-btn">Search</button>
    </form>
    
    
    <sidebar>
    
      <div class="filters">
        <h4>COLLECTIONS</h4>
        <ul class="filters--collections">
          <li class="filter--bikes">
            <a href="#Shop/Bikes">All Bikes</a>
            <i class="ph-check filter-check"></i>
          </li>
          <li class="filter--fullsus">
            <a href="#Shop/Bikes/FullSuspension">Full Suspension</a>
            <i class="ph-check filter-check"></i>
          </li>
          <li class="filter--hardtail">
            <a href="#Shop/Bikes/Hardtail">Hardtail</a>
            <i class="ph-check filter-check"></i>
          </li>
          <li class="filter--electric">
            <a href="#Shop/Bikes/Electric">Electric</a>
            <i class="ph-check filter-check"></i>
          </li>
          <li class="filter--gear">
            <a href="#Shop/Gear">Gear</a>
            <i class="ph-check filter-check"></i>
          </li>
          <li class="filter--components">
            <a href="#Shop/Components">Components</a>
            <i class="ph-check filter-check"></i>
          </li>
        </ul>
        <h4>PRICE</h4>
        <ul>
          <li>
            <button data-sort="HIGH" class="sort-btn">High to Low</button>
            <i class="ph-check sort-filter-check"></i>
          </li>
          <li>
            <button data-sort="LOW" class="sort-btn">Low to High</button>
            <i class="ph-check sort-filter-check"></i>
          </li>
        </ul>
      
    </div>
    </sidebar>
    <div class="products">
      
    </div>
  </div>
  `;
  document.querySelector("main").insertAdjacentHTML("afterbegin", sidebarHTML);
  document
    .querySelector(".search-bar")
    .addEventListener("submit", searchProducts);
};
const resetShop = function () {
  document.querySelector(".breadcrumbs-links").innerHTML =
    '<a href="#Shop">SHOP</a>';
  productData._setCurrentFilter("");
};
const searchProducts = function (e) {
  e.preventDefault();
  // Clear all existing filter displays
  clearCollectionSortDisplay();
  clearPriceSortDisplay();
  // Reset breadcrumbs display and #currentFilter in data
  resetShop();
  // Find searched items in productData and create new array
  let searchArr = [];
  const searchTerm = document.querySelector(".search-input").value;
  window.location.hash = `#search=${searchTerm}`;
  productData._getData().forEach((product) => {
    let searchableString = "";
    searchableString +=
      product.name + product.tags + product.features + product.brand;
    searchableString = searchableString.toUpperCase();
    if (searchableString.includes(searchTerm.toUpperCase())) {
      searchArr.push(product);
    }
  });
  // Clear products section
  document.querySelector(".products").innerHTML = "";
  // If there are no search results, display error message and leave function
  if (searchArr.length === 0) {
    document
      .querySelector(".products")
      .insertAdjacentHTML(
        "afterbegin",
        `Sorry, no results found for '${searchTerm}', Please try again.`
      );
    return;
  }
  // Render search results
  productData._setCurrentSearch(searchArr);
  renderProducts(searchArr);
};
const renderProducts = function (arr) {
  document.querySelector(".products").innerHTML = "";

  let productHTML = "";
  arr.forEach((product) => {
    productHTML += `
    <div class="product">
      <a href="#Product/${product.id}" class="product-image-wrapper">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
        />
      </a>
  
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-tag">${
          product.tags.includes("ELECTRIC") && product.tags.includes("FULLSUS")
            ? "Electric | Full Suspension"
            : product.tags.includes("ELECTRIC") &&
              product.tags.includes("HARDTAIL")
            ? "Electric | Hardtail"
            : product.tags.includes("ELECTRIC")
            ? "Electric"
            : product.tags.includes("FULLSUS")
            ? "Full Suspension"
            : product.tags.includes("HARDTAIL")
            ? "Hardtail"
            : product.tags.includes("GEAR")
            ? "Gear"
            : product.tags.includes("COMPONENTS")
            ? "Components"
            : ""
        }</p>
        <p class="product-price">$ ${product.price.toLocaleString()}</p>
      </div>
    </div>
    `;
  });
  document
    .querySelector(".products")
    .insertAdjacentHTML("afterbegin", productHTML);
};
const getRenderedProducts = function () {
  return productData._getCurrentFilter()
    ? productData
        ._getData()
        .filter((product) =>
          product.tags.includes(productData._getCurrentFilter())
        )
    : productData._getCurrentSearch() ?? productData._getData();
};
const clearPriceSortDisplay = function () {
  const sortBtns = Array.from(document.querySelectorAll(".sort-btn"));
  sortBtns.forEach((btn) => btn.classList.remove("filter--selected"));
  const sortBtnChecks = Array.from(
    document.querySelectorAll(".sort-filter-check")
  );
  sortBtnChecks.forEach((check) =>
    check.classList.remove("filter-check--selected")
  );
};
const clearCollectionSortDisplay = function () {
  const selectedFilters = Array.from(
    document.querySelectorAll(".filter--selected")
  );
  selectedFilters.forEach((filter) =>
    filter.classList.remove("filter--selected")
  );
  const filterChecks = Array.from(document.querySelectorAll(".filter-check"));
  filterChecks.forEach((check) =>
    check.classList.remove("filter-check--selected")
  );
};
const sortShop = function (e) {
  if (!e.target.classList.contains("sort-btn")) return;
  if (!document.querySelector(".product")) return;
  // Clear existing sort indicators
  clearPriceSortDisplay(e);
  // Add new sort indicators
  e.target
    .closest("li")
    .querySelector(".sort-filter-check")
    .classList.add("filter-check--selected");
  e.target.classList.add("filter--selected");
  // Get currently displayed products, sort them, and re-render
  if (e.target.dataset.sort === "LOW") {
    const sortedLow = getRenderedProducts();
    sortedLow.sort((x, y) => x.price - y.price);
    renderProducts(sortedLow);
  }
  if (e.target.dataset.sort === "HIGH") {
    const sortedHigh = getRenderedProducts();
    sortedHigh.sort((x, y) => y.price - x.price);
    renderProducts(sortedHigh);
  }
};
const handleMainClick = function (e) {
  // Sort buttons in shop
  if (e.target.classList.contains("sort-btn")) return sortShop(e);
  // Add to cart button on product page
  if (e.target.classList.contains("product-page-add")) return addToCart(e);
};
const handleHeaderClick = function (e) {
  // View cart btn in cart summary
  if (e.target.classList.contains("view-cart-btn")) {
    window.location.hash = "#ShoppingCart";
    return openShoppingCart();
  }
};

const addToCart = function (e) {
  // Return if the animation is still occurring
  if (e.target.classList.contains("adding-to-cart")) return;

  //  Checkmark animation
  const checkSVG = `
  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
      <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>
  `;
  e.target.textContent = "";
  e.target.classList.add("adding-to-cart");
  e.target.insertAdjacentHTML("afterbegin", checkSVG);
  setTimeout(() => {
    e.target.style.transition = "none";
    e.target.innerHTML = "ADD TO CART";
    e.target.classList.remove("adding-to-cart");
  }, 2000);
  setTimeout(() => {
    e.target.style.removeProperty("transition");
  }, 2100);
  // If the item is not already in the cart, push to shopping cart
  const thisProduct = productData
    ._getData()
    .find((product) => product.id === e.target.dataset.id);
  if (
    !productData
      ._getShoppingCart()
      .find((product) => product.id === thisProduct.id)
  ) {
    productData._addToShoppingCart(thisProduct);
  }

  // Update cart quanity
  thisProduct.quantityInCart++;
  const totalInCart = productData._getShoppingCart().reduce((prev, curr) => {
    return prev + curr.quantityInCart;
  }, 0);
  console.log(totalInCart);
  document.querySelector(".cart-qty").textContent = totalInCart;
  if (productData._getShoppingCart().length > 0) {
    document.querySelector(".cart-qty").style.backgroundColor = "red";
  }
  // Update cart summary html
  document.querySelector(".summary-items").innerHTML = "";
  let summaryHTML = "";
  productData._getShoppingCart().forEach((item) => {
    summaryHTML += `
    <div class="summary-item">
    <img
      class="summary-image"
      src="${item.image}"
      alt=""
    />
    <div class="summary-item-info">
      <p class="summary-item-name">${item.name}</p>
      <p class="summary-item-price">$ ${item.price.toLocaleString()}</p>
      <p class="summary-item-qty">QTY: ${item.quantityInCart}</p>
    </div>
    <i data-id="${
      item.id
    }" class="ph-x cart-summary-delete" title="Remove Item"></i>
  </div>
    `;
  });
  document
    .querySelector(".summary-items")
    .insertAdjacentHTML("afterbegin", summaryHTML);
  // Update Subtotal
  const subtotal = productData._getShoppingCart().reduce((prev, curr) => {
    return prev + curr.quantityInCart * curr.price;
  }, 0);
  console.log(subtotal);
  document.querySelector(
    ".subtotal-amount"
  ).textContent = `$ ${subtotal.toLocaleString()}.00`;
};
const displayBreadcrumbs = function (crumb) {
  document
    .querySelector(".breadcrumbs-links")
    .insertAdjacentHTML("beforeend", crumb);
};
const displaySelectedFilter = function (filter) {
  document
    .querySelector(filter)
    .querySelector("a")
    .classList.add("filter--selected");
  document
    .querySelector(filter)
    .querySelector("i")
    .classList.add("filter-check--selected");
};
const clearMain = function (backgroundColor = "#fff") {
  document.querySelector("main").innerHTML = "";
  document.querySelector(".footer-image").style.backgroundColor =
    backgroundColor;
  document.querySelector("body").style.backgroundColor = backgroundColor;
  scrollTo(0, 0);
};
const renderProductPage = function (id) {
  clearMain();

  const thisProduct = productData
    ._getData()
    .find((product) => product.id === id);

  const productPageHTML = `
    <section class="section--product-page">
        <img
          class="product-page-image"
          src="${thisProduct.image}"
          alt="${thisProduct.name}"
        />

        <div class="product-page-info">
          <h3 class="product-page-name">${thisProduct.name}</h3>
          <p class="product-page-price">$ ${thisProduct.price.toLocaleString()}</p>
          <p class="product-page-phrase">
            ${thisProduct.phrase}
          </p>
          <button data-id="${
            thisProduct.id
          }"class="product-page-add">ADD TO CART</button>
          <ul class="product-page-features">
            <li>${thisProduct.features[0]}</li>
            <li>${thisProduct.features[1]}</li>
            <li>${thisProduct.features[2]}</li>
            <li>${thisProduct.features[3]}</li>
          </ul>
          
        </div>

        <div class="product-page-icons">
          <div class="product-page-icons-container">
            <i class="ph-shield-check"></i>
            <p>SECURE CHECKOUT</p>
          </div>
          <div class="product-page-icons-container">
            <i class="ph-rocket-launch"></i>
            <p>FAST SHIPPING</p>
          </div>
          <div class="product-page-icons-container">
            <i class="ph-medal"></i>
            <p>SATISFACTION GUARANTEED</p>
          </div>
          
        </div>
      </section>
  `;
  document
    .querySelector("main")
    .insertAdjacentHTML("afterbegin", productPageHTML);
};

const openShoppingCart = function () {
  closeCartSummary();
  clearMain();
  const cartHTML = `
  <section class="section--shopping-cart">
  <h2>Shopping Cart</h2>

  <div class="cart-main">
    <div class="cart-details">
      <p class="cart-details-header">DETAILS</p>
      <p class="cart-details-header">PRICE</p>
      <p class="cart-details-header">QTY</p>
      <p class="cart-details-header">TOTAL</p>
      
    </div>
    <div class="cart-money">
      <div class="cart-totals">
        <div class="cart-subtotal">
          <p>SUBTOTAL</p>
          <p class="cart-total-amounts cart-total-sub">$ 9,550</p>
        </div>
        <div class="cart-shipping">
          <p>SHIPPING*</p>
          <p class="cart-total-amounts cart-total-ship">$ 100.00</p>
          </div>
          <p class="cart-shipping-disclaimer">*Gear and components ship free. Bikes ship for $99.99</p>
        <div class="cart-total">
          <p>ORDER TOTAL</p>
          <p class="cart-total-amounts cart-total-total">$ 9,650.00</p>
        </div>
      </div>
      <button class="cart-checkout">CHECKOUT</button>
    </div>
  </div>
</section>
  `;
  document.querySelector("main").insertAdjacentHTML("afterbegin", cartHTML);
  renderCartItems();
  updateCartTotals();
};
const renderCartItems = function () {
  if (productData._getShoppingCart().length === 0) {
    return document
      .querySelector(".cart-details")
      .insertAdjacentHTML(
        "beforeend",
        `<div>Nothing to see here. Visit the <a href="#Shop"><strong>shop</strong></a> to add items to your cart!</div>`
      );
  }
  let HTML = "";
  productData._getShoppingCart().forEach((item) => {
    HTML += `
    <div class="cart-item-details">
      <img src="${item.image}" alt="" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-phrase">
          ${item.phrase}
        </p>
      </div>
    </div>
    <div class="cart-item-price">$ ${item.price.toLocaleString()}.00</div>
    <div class="cart-quantity">
      <div class="cart-item-quantity-container">
        <i class="ph-minus cart-item-subtract"></i>
        <p class="cart-item-quantity">${item.quantityInCart}</p>
        <i class="ph-plus cart-item-add"></i>
      </div>
      <div class="cart-item-remove">REMOVE</div>
    </div>
    <div class="cart-item-total">$ ${(
      item.price * item.quantityInCart
    ).toLocaleString()}</div>
    `;
  });
  document.querySelector(".cart-details").insertAdjacentHTML("beforeend", HTML);
};
const updateCartTotals = function () {
  const subtotal = productData._getShoppingCart().reduce((prev, curr) => {
    return prev + curr.quantityInCart * curr.price;
  }, 0);
  document.querySelector(
    ".cart-total-sub"
  ).textContent = `$ ${subtotal.toLocaleString()}.00`;
  const shippingAmount =
    productData
      ._getShoppingCart()
      .filter((product) => product.tags.includes("MTB"))
      .reduce((prev, curr) => {
        return prev + curr.quantityInCart;
      }, 0) * 99.99;
  document.querySelector(
    ".cart-total-ship"
  ).textContent = `$ ${shippingAmount.toFixed(2)}`;
  document.querySelector(".cart-total-total").textContent = `$ ${(
    Math.round((subtotal + shippingAmount + Number.EPSILON) * 100) / 100
  ).toLocaleString()}`;
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
  if (!location.includes("Shop"))
    // If navigating to shop, render search bar, breadcrumbs, and filters
    return;
  setUpShop();
  scroll(0, 0);
  // Clear existing sort indicators for collections filters in shop
  clearCollectionSortDisplay();

  const crumb = location.slice(5);

  if (!crumb) {
    renderProducts(productData._getData());
    productData._setCurrentFilter("");
  }

  // CLEAN THIS SECTION UP LATER, DRY PRINCIPLE, analyzeCrumb() function
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
const openCartSummary = function () {
  document.querySelector(".cart-summary").classList.add("cart-summary--open");
  document.querySelector(".shopping-cart i").style.color = "red";
};
const closeCartSummary = function () {
  document
    .querySelector(".cart-summary")
    .classList.remove("cart-summary--open");
  document.querySelector(".shopping-cart i").style.color = "#000";
};
const cartSummaryEvents = function () {
  document
    .querySelector(".shopping-cart")
    .addEventListener("mouseenter", openCartSummary);
  document
    .querySelector(".shopping-cart")
    .addEventListener("mouseleave", function (e) {
      if (e.relatedTarget === document.querySelector(".cart-summary")) return;
      closeCartSummary();
    });
  document
    .querySelector(".cart-summary")
    .addEventListener("mouseleave", function (e) {
      if (e.target === document.querySelector(".shopping-cart")) return;
      closeCartSummary();
    });
  document
    .querySelector(".shopping-cart")
    .addEventListener("click", function () {
      document
        .querySelector(".cart-summary")
        .classList.toggle("cart-summary--open");
    });
};

const initialize = function () {
  slider();
  mobileFooterNav();
  mobileNav();
  ctaSubmit();
  cartSummaryEvents();
  document.querySelector("main").addEventListener("click", handleMainClick);
  document.querySelector("header").addEventListener("click", handleHeaderClick);
  window.addEventListener("hashchange", navigate);
  window.addEventListener("load", navigate);
};
initialize();
