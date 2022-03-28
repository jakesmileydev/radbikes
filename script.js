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
    btn.addEventListener("click", function (e) {
      const width = document.body.clientWidth;
      console.log(width);
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
  document.querySelector("main").innerHTML = "";
  document.querySelector(".footer-image").style.backgroundColor = "#f1f1f1";
  document.querySelector("body").style.backgroundColor = "#f1f1f1";

  const sidebarHTML = `
  <section class="section--shop">
  <div class="shop">
    
    <div class="breadcrumbs">
      <p class="breadcrumbs-links"><a href="#Shop"  >SHOP</a></p>
    </div>

    <form class="search-bar">
      <input class="search-input" type="text">
      <button class="search-btn">Search</button>
    </form>
    
    
    <sidebar>
    
      <div class="filters">
        <h4>COLLECTIONS</h4>
        <ul class="filters--collections">
          <li><a href="#Shop/Bikes">All Bikes</a></li>
          <li>
            <a href="#Shop/Bikes/FullSuspension">Full Suspension</a>
          </li>
          <li><a href="#Shop/Bikes/Hardtail">Hardtail</a></li>
          <li><a href="#Shop/Bikes/Electric">Electric</a></li>
          <li><a href="#Shop/Gear">Gear</a></li>
          <li><a href="#Shop/Components">Components</a></li>
        </ul>
        <h4>PRICE</h4>
        <ul>
          <li><button data-sort="HIGH" class="sort-btn">High to Low</button></li>
          <li><button data-sort="LOW" class="sort-btn">Low to High</button></li>
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
const searchProducts = function (e) {
  e.preventDefault();
  const searchTerm = document.querySelector(".search-input").value;
};
const renderProducts = function (arr) {
  document.querySelector(".products").innerHTML = "";

  let productHTML = "";
  arr.forEach((product) => {
    productHTML += `
    <div class="product">
      <a href="#${product.id}" class="product-image-wrapper">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
        />
      </a>
  
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-tag">${
          product.tags.includes("FULLSUS")
            ? "Full Suspension"
            : product.tags.includes("ELECTRIC")
            ? "Electric"
            : product.tags.includes("HARDTAIL")
            ? "Hardtail"
            : product.tags.includes("GEAR")
            ? "Gear"
            : product.tags.includes("COMPONENT")
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
// CRP = Current Rendered Products
const getRenderedProducts = function () {
  return productData._getCurrentFilter()
    ? productData
        ._getData()
        .filter((product) =>
          product.tags.includes(productData._getCurrentFilter())
        )
    : productData._getData();
};

const sortShop = function (e) {
  if (!e.target.classList.contains("sort-btn")) return;
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

const displayBreadcrumbs = function (crumb) {
  document
    .querySelector(".breadcrumbs-links")
    .insertAdjacentHTML("beforeend", crumb);
};

const navigate = function () {
  const location = window.location.hash.slice(1);
  if (!location) return;

  if (!location.includes("Shop")) return;
  setUpShop();
  scroll(0, 0);

  const crumb = location.slice(5);
  if (!crumb) {
    renderProducts(productData._getData());
    productData._setCurrentFilter("");
  }

  if (crumb === "Bikes") {
    const bikes = productData
      ._getData()
      .filter((product) => product.tags.includes("MTB"));
    productData._setCurrentFilter("MTB");
    renderProducts(bikes);
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a>`);
  }
  if (crumb === "Bikes/FullSuspension") {
    const fullSuspension = productData
      ._getData()
      .filter((product) => product.tags.includes("FULLSUS"));
    productData._setCurrentFilter("FULLSUS");
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a> / FULL SUSPENSION`);
    renderProducts(fullSuspension);
  }
  if (crumb === "Bikes/Hardtail") {
    const hardtail = productData
      ._getData()
      .filter((product) => product.tags.includes("HARDTAIL"));
    productData._setCurrentFilter("HARDTAIL");
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a> / HARDTAIL`);
    renderProducts(hardtail);
  }
  if (crumb === "Bikes/Electric") {
    const electric = productData
      ._getData()
      .filter((product) => product.tags.includes("ELECTRIC"));
    productData._setCurrentFilter("ELECTRIC");
    displayBreadcrumbs(` / <a href="#Shop/Bikes">BIKES</a> / ELECTRIC`);
    renderProducts(electric);
  }
  if (crumb === "Gear") {
    const gear = productData
      ._getData()
      .filter((product) => product.tags.includes("GEAR"));
    productData._setCurrentFilter("GEAR");
    displayBreadcrumbs(" / GEAR");
    renderProducts(gear);
  }
  if (crumb === "Components") {
    const components = productData
      ._getData()
      .filter((product) => product.tags.includes("COMPONENTS"));
    productData._setCurrentFilter("COMPONENTS");
    displayBreadcrumbs(" / COMPONENTS");
    renderProducts(components);
  }
};

const initialize = function () {
  slider();
  mobileFooterNav();
  mobileNav();
  ctaSubmit();

  document.querySelector("main").addEventListener("click", sortShop);
  window.addEventListener("hashchange", navigate);
  window.addEventListener("load", navigate);
};
initialize();
