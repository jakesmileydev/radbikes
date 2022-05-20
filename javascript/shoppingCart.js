const updateCartSummary = function () {
  // Update total in cart quanity (seen in circle next to shopping cart)

  const totalInCart = productData._getShoppingCart().reduce((prev, curr) => {
    return prev + curr.quantityInCart;
  }, 0);

  document.querySelector(".cart-qty").textContent = totalInCart;
  // if there is anything in the cart, make the background red
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
        }" class="ph-x cart-summary-delete" title="Remove Item" data-id="${
      item.id
    }"></i>
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
  document.querySelector(
    ".subtotal-amount"
  ).textContent = `$ ${subtotal.toLocaleString()}.00`;
};

//////////////////////////////////////////////////////////////////////////////////////////////

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

  thisProduct.quantityInCart++;
  updateCartSummary();
};

//////////////////////////////////////////////////////////////////////////////////////////////

const openShoppingCart = function () {
  closeCartSummary();
  clearMain();
  const cartHTML = `
    <section class="section--shopping-cart">
    <h2>Shopping Cart</h2>
  
    <div class="cart-main">
      <div class="cart-details">
        <div class="cart-row" data-id="x">
          <p class="cart-details-header">DETAILS</p>
          <p class="cart-details-header">PRICE</p>
          <p class="cart-details-header">QTY</p>
          <p class="cart-details-header">TOTAL</p>
        </div>
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

//////////////////////////////////////////////////////////////////////////////////////////////

const renderCartItems = function () {
  if (productData._getShoppingCart().length === 0) {
    return document
      .querySelector(".cart-details")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="empty-cart-message">Nothing to see here. Visit the <a href="#Shop"><strong>shop</strong></a> to add items to your cart!</div>`
      );
  }
  let HTML = "";
  productData._getShoppingCart().forEach((item) => {
    HTML += `
      <div class="cart-row" data-id="${item.id}">
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
            <i data-id="${item.id}" class="ph-minus cart-item-subtract"></i>
            <p class="cart-item-quantity">${item.quantityInCart}</p>
            <i data-id="${item.id}" class="ph-plus cart-item-add"></i>
          </div>
          <div class="cart-item-remove" data-id="${item.id}">REMOVE</div>
        </div>
        <div class="cart-item-total">$ ${(
          item.price * item.quantityInCart
        ).toLocaleString()}
        </div>
      </div>
      `;
  });
  document.querySelector(".cart-details").insertAdjacentHTML("beforeend", HTML);
};

//////////////////////////////////////////////////////////////////////////////////////////////

const updateCartTotals = function () {
  if (!document.querySelector(".section--shopping-cart")) return;
  const subtotal = productData._getShoppingCart().reduce((prev, curr) => {
    return prev + curr.quantityInCart * curr.price;
  }, 0);
  document.querySelector(
    ".cart-total-sub"
  ).textContent = `$ ${subtotal.toLocaleString()}.00`;
  // for any items that are bikes, add $99.99 for shipping
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

//////////////////////////////////////////////////////////////////////////////////////////////

const closeCartSummary = function () {
  document
    .querySelector(".cart-summary")
    .classList.remove("cart-summary--open");
  document.querySelector(".shopping-cart i").style.color = "#000";
};

const cartSummaryEvents = function () {
  document
    .querySelector(".shopping-cart")
    .addEventListener("click", function () {
      document
        .querySelector(".cart-summary")
        .classList.toggle("cart-summary--open");
      if (
        document
          .querySelector(".cart-summary")
          .classList.contains("cart-summary--open")
      ) {
        document.querySelector(".shopping-cart i").style.color = "red";
      } else {
        document.querySelector(".shopping-cart i").style.color = "#000";
      }
    });
};
