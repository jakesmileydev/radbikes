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
          <p class="product-tag">${product.tags.includes("ELECTRIC") && product.tags.includes("FULLSUS")
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
            <button data-id="${thisProduct.id
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