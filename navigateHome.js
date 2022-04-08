"use strict";
const navigateHome = function () {
  clearMain();
  document.querySelector("main").insertAdjacentHTML(
    "afterbegin",
    `<section class="section--hero">
      <img
        src="/images/home/hero3.jpg"
        class="hero-img"
        alt="man on mountain bike trail, leaning hard into a turn"
      />
      <div class="hero-text">
        <h1 class="hero-header">MAKE ALL TRAILS YOUR PLAYGROUND</h1>
        <a href="#Shop" class="hero-btn">SHOP NOW</a>
      </div>
    </section>
    <section class="section--collections">
      <h2 class="collections-header">Shop Collections</h2>
      <div class="collections">
        <div>
          <h3 class="collection-title">GEAR</h3>
          <a
            href="#Shop/Gear"
            class="collection"
            name="HELMETS, GLOVES, GOGGLES, APPAREL"
          >
            <img
              src="/images/home/gearsnowedit.jpg"
              alt=""
              class="collection--gear"
            />
          </a>
        </div>
        <div>
          <h3 class="collection-title">FULL SUSPENSION</h3>
          <a
            href="#Shop/Bikes/FullSuspension"
            class="collection"
            name="FULL SUSPENSION BIKES"
          >
            <img
              src="/images/home/splashfull.jpg"
              alt=""
              class="collection--fullsus"
            />
          </a>
        </div>
        <div>
          <h3 class="collection-title">COMPONENTS</h3>
          <a
            href="#Shop/Components"
            class="collection"
            name="SHOCKS, SEATPOSTS, BRAKES, FRAMES"
          >
            <img src="/images/home/shockcomponent.jpg" alt="" " />
          </a>
        </div>
        <div>
          <h3 class="collection-title">HARDTAIL</h3>
          <a
            href="#Shop/Bikes/Hardtail"
            class="collection"
            name="HARDTAIL BIKES"
          >
            <img
              src="/images/home/hardtailsunset.jpg"
              alt=""
              class="collection--hardtail"
            />
          </a>
        </div>
      </div>
    </section>
    <section class="section--brands">
      <div class="brands">
        <img class="trek" src="/images/brands/trek.png" alt="" />
        <img
          class="specialized"
          src="/images/brands/specialized.png"
          alt=""
        />
        <img class="fox" src="/images/brands/fox.png" alt="" />
        <img class="giant" src="/images/brands/giant.png" alt="" />
        <img class="kona" src="/images/brands/kona.png" alt="" />
      </div>
    </section>
    <section class="section--featured">
      <h2 class="featured-header">Best Sellers</h2>
      <div class="slider">
        <div class="slide">
          <div class="featured-product">
            <img
              src="/images/featured/sjcompalloy.webp"
              alt="Stumpjumper Comp Alloy mountain bike"
            />
            <p class="featured-product-name">Stumpjumper Comp Alloy</p>
            <p class="featured-product-price">$ 3,600</p>
            <button>ADD TO CART</button>
            <a href="" class="featured-product-link">Learn More</a>
          </div>
        </div>
        <div class="slide">
          <div class="featured-product">
            <img
              src="/images/featured/turbolevoalloy.webp"
              alt="Turbo Levo Alloy mountain bike"
            />
            <p class="featured-product-name">Turbo Levo Alloy</p>
            <p class="featured-product-price">$ 5,500</p>
            <button>ADD TO CART</button>
            <a href="" class="featured-product-link">Learn More</a>
          </div>
        </div>
        <div class="slide">
          <div class="featured-product">
            <img
              src="/images/featured/rockhopper275.webp"
              alt="Rockhopper 27.5 mountain bike"
            />
            <p class="featured-product-name">Rockhopper 27.5</p>
            <p class="featured-product-price">$ 700</p>
            <button>ADD TO CART</button>
            <a href="" class="featured-product-link">Learn More</a>
          </div>
        </div>
        <div class="slide">
          <div class="featured-product">
            <img
              src="/images/featured/sjevoexpert.webp"
              alt="Stumpjumper Evo Expert mountain bike"
            />
            <p class="featured-product-name">Stumpjumper Evo Expert</p>
            <p class="featured-product-price">$ 6,300</p>
            <button>ADD TO CART</button>
            <a href="" class="featured-product-link">Learn More</a>
          </div>
        </div>
        <div class="slide">
          <div class="featured-product">
            <img
              src="/images/featured/fusecomp29.webp"
              alt=" mountain bike"
            />
            <p class="featured-product-name">Fuse Comp 29</p>
            <p class="featured-product-price">$ 1,400</p>
            <button>ADD TO CART</button>
            <a href="" class="featured-product-link">Learn More</a>
          </div>
        </div>
      </div>
      <i class="ph-caret-left slider__btn slider__btn--left"></i>
      <i
        class="ph-caret-right slider__btn slider__btn--right slider__btn--usable"
      ></i>
    </section>
    <section class="section--cta">
      <div class="cta">
        <div class="cta-images">
          <img class="cta-image" src="/images/home/cta.png" alt="" />
        </div>
        <form name="signup" class="cta-form" method="post">
          <h4 class="cta-subheader">STAY IN TOUCH</h4>
          <h3 class="cta-header">NEVER MISS AN ADVENTURE</h3>
          <p class="cta-text">
            Get updates on sales, new inventory, events, MTB news, trail
            recommendations, and more.
          </p>
          <input
            name="email"
            class="cta-input--email"
            type="email"
            placeholder="Enter Your Email"
          />
          <button>Sign Me Up</button>
        </form>
      </div>
    </section>`
  );
  initialize();
};
