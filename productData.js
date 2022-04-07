"use strict";
class Product {
  constructor(id, name, phrase, image, features, price, tags, brand) {
    this.id = id;
    this.name = name;
    this.phrase = phrase;
    this.image = image;
    this.features = features;
    this.price = price;
    this.tags = tags;
    this.brand = brand;
  }
}
class Data {
  #data;
  #currentFilter;
  #currentSearch;
  #shoppingCart = [];

  _getData() {
    return this.#data;
  }
  _setData(productArray) {
    this.#data = productArray;
  }
  _getCurrentFilter() {
    return this.#currentFilter;
  }
  _setCurrentFilter(filter) {
    this.#currentFilter = filter;
  }
  _getCurrentSearch() {
    return this.#currentSearch;
  }
  _setCurrentSearch(searchArray) {
    this.#currentSearch = searchArray;
  }
  _getShoppingCart() {
    return this.#shoppingCart;
  }
  _addToShoppingCart(product) {
    this.#shoppingCart.push(product);
  }
}

const products = [
  new Product(
    "StumpjumperCompAlloy",
    "Stumpjumper Comp Alloy",
    "Metal fans rejoice! The Stumpjumper Comp Alloy rocks on, with one of the most advanced alloy frames ever developed.",
    "/images/product/sjca.jpg",
    [
      "Alloy chassis and rear-end",
      "FOX FLOAT suspension",
      "SRAM NX Eagle drivetrain",
      "X-Fusion Manic seatpost",
    ],
    3600,
    ["MTB", "FULLSUS", "BIKES"],
    "SPECIALIZED"
  ),

  new Product(
    "TurboLevoAlloy",
    "Turbo Levo Alloy",
    "The all-new Levo delivers the unbelievable power to ride more trails through an unequaled combination of ride quality, usable power, and ride anywhere range.",
    "/images/product/tla.jpg",
    [
      "Specialized Turbo Full Power System 2.2 Motor",
      "3-LED Ride Mode display",
      "Specialized M3-500 integrated battery - 500Wh",
      "RockShox Deluxe Select R",
    ],
    5500,
    ["MTB", "ELECTRIC", "FULLSUS", "BIKES"],
    "SPECIALIZED"
  ),

  new Product(
    "Rockhopper",
    "Rockhopper",
    "Better performance. Better value.",
    "/images/product/rh.jpg",
    [
      "Radius CX-7 disc brakes",
      "SunRace 8-speed cassette",
      "Specialized A1 premium butted alloy",
      "KMC X8 EPT chain with anti-rust coating",
    ],
    700,
    ["MTB", "HARDTAIL", "BIKES"],
    "SPECIALIZED"
  ),

  new Product(
    "StumpjumperEvoExpert",
    "Stumpjumper Evo Expert",
    "Total control, unparalleled bump-eating suspension, and a fine-tunable geometry.",
    "/images/product/sjee.jpg",
    [
      "FACT 11m carbon chassis and rear-end",
      "FOX FLOAT X Performance Elite suspension",
      "SRAM Code RS hydraulic disc brakes",
      "Sram X01 Eagle 12-speed derailleur",
    ],
    6300,
    ["MTB", "FULLSUS", "BIKES"],
    "SPECIALIZED"
  ),

  new Product(
    "FuseComp29",
    "Fuse Comp 29",
    "The Fuse Comp 29 punches way above its weight class thanks to a light-yet-burly M4 aluminum chassis.",
    "/images/product/fc29.jpg",

    [
      "RockShox Recon RL fork with 130mm of plush suspension",
      "SRAM Level TRL disc brakes",
      "TranzX dropper Post",
      "SRAM NX Eagles drivetrain",
    ],
    2300,
    ["MTB", "HARDTAIL", "BIKES"],
    "SPECIALIZED"
  ),

  new Product(
    "Powerfly4",
    "Powerfly 4",
    "Trek's most affordable electric mountain bike.",
    "/images/product/pf4.jpg",
    [
      "Bosch Performance CX (250W, 75Nm) motor",
      "Removable Integrated Battery (RIB) system looks great and is super user-friendly",
      "Purion controller has Walk Assist and an intelligent eMTB mode",
      "Shimano Deore M4100 10 speed shifter",
    ],
    3850,
    ["MTB", "ELECTRIC", "HARDTAIL", "BIKES"],
    "TREK"
  ),

  new Product(
    "Roscoe6",
    "Roscoe 6",
    "Roscoe 6 is the ideal gateway to mountain biking for new riders looking to have a fun time on the trail.",
    "/images/product/ro6.jpg",
    [
      "TranzX JD-YSP18 seatpost is adjustable on the fly",
      "Shimano Deore M4100 10 speed shifter",
      "SR Suntour XCM 32 fork",
      "Shimano MT200 hydraulic disc brakes",
    ],
    1180,
    ["MTB", "HARDTAIL", "BIKES"],
    "TREK"
  ),

  new Product(
    "FuelEX",
    "Fuel EX 9.9 XTR",
    "Fuel EX 9.9 makes no compromises. Top-shelf suspension, carbon everything, and a super-smooth Shimano XTR drivetrain.",
    "/images/product/fex99.jpg",
    [
      "OCLV Mountain Carbon frame with internal storage",
      "Bontrager Line Pro 30 wheels",
      "A Shimano XT 1x12 drivetrain for super-smooth shifting",
      "Fox Factory Float EVOL shocks with Thru Shaft 3-position damper",
    ],
    9550,
    ["MTB", "FULLSUS", "BIKES"],
    "TREK"
  ),

  new Product(
    "Farley7",
    "Farley 7",
    "If you thought that fat bikes were sluggish, this one will change your mind.",
    "/images/product/far7.jpg",
    [
      "Horizontal sliding dropouts lets you fine-tune your geometry",
      "Bontrager Gnarwhal TLR tires",
      "SUNringlé Mulefüt wheels paired with a 108T Rapid Drive hub",
      "SRAM NX/GX Eagle 1x12 drivetrain",
    ],
    2850,
    ["MTB", "HARDTAIL", "BIKES"],
    "TREK"
  ),

  new Product(
    "ECaliber",
    "E-Caliber 9.6",
    "E-Caliber 9.6 is a carbon electric mountain bike that rides and looks like a traditional cross country bike.",
    "/images/product/ecal96.jpg",
    [
      "Compact Fazua drive system with removeable drivepack",
      "IsoStrut rear suspension with 60mm of integrated rear travel",
      "RockShox 35 Gold RL fork",
      "	Shimano Deore M6100 12 speed shifter",
    ],
    6650,
    ["MTB", "ELECTRIC", "FULLSUS", "BIKES"],
    "TREK"
  ),

  new Product(
    "DefendThermoHoodie",
    "Defend Thermo Hoodie",
    "Insulated, sweat-wicking hoodie for cold rides.",
    "/images/product/dth.webp",
    [
      "Form-fitting hood fits easily under your helmet",
      "Breathable Polartec® insulation thatwicks sweat while keeping you warm",
      "Abrasion-resistant, wind-blocking fabric",
      "Convenient and secure stash pocket at the hip",
    ],
    160,
    ["GEAR"],
    "FOX"
  ),
  new Product(
    "SpeedframeProFade",
    "Speedframe Pro Fade Helmet",
    "Performance focused open-face MTB helmet.",
    "/images/product/sfpro.webp",
    [
      "MIPS™ reduces rotational motion and redirects forces to protect your dome",
      "Dual-density Varizorb™ EPS spread impact force",
      "360-degree fit system and Fidlock® SNAP helmet buckle",
      "XT2® liner is antimicrobial and manages odor while wicking moisture",
    ],
    170,
    ["GEAR"],
    "FOX"
  ),

  new Product(
    "RampageProCarbon",
    "Rampage Pro Carbon Mips Helmet",
    "The MTB helmet trusted by UCI world cup champions.",
    "/images/product/rampro.webp",
    [
      "Designed with direct input from our elite downhill and freeride athletes",
      "MIPS™ reduces rotational motion and redirects forces to protect your dome",
      "Dual-density, injection-molded Varizorb™ EPS liner",
      "Breakaway visor screws that are designed specifically to sheer off on impact",
    ],
    500,
    ["GEAR"],
    "FOX"
  ),
  new Product(
    "VueStray",
    "Vue Stray Goggles",
    "See more with pro-level Vue goggles.",
    "/images/product/vsgog.webp",
    [
      "Widest field of view possible and reduces distractions from the side",
      "Turn-to-release tabs allow you to change lenses in seconds",
      "Pre-curved, injection-molded polycarbonate lens for distortion-free optical clarity and increased impact resistance",
      "TruLock lens swapping and removal system",
    ],
    120,
    ["GEAR"],
    "FOX"
  ),
  new Product(
    "DefendFire",
    "Defend Fire Gloves",
    "Water resistant cold weather MTB gloves with D30® armor.",
    "/images/product/dfg.webp",
    [
      "Brushed Cordura® top-hand material offers superior durability with a warm, comfortable, and water-resistant build",
      "Ax Suede™ slim fleece palm for warmth without sacrificing bar feel",
      "TPU lined material in the gussets (the place between the fingers)",
      "Durable water-repellant finish seals out the elements",
    ],
    60,
    ["GEAR"],
    "FOX"
  ),
  new Product(
    "RovalTerra",
    "Roval Terra Seatpost",
    "The Roval Terra seatpost is the best choice for riding mixed terrain, gravel, or rough roads because it smooths the ride by allowing significant vertical compliance.",
    "images/product/rovtersp.jpg",
    [
      "18mm Vertical Compliance (20mm offset / Full Extension)",
      "Proven clamp design ensures ease of adjustment and slip-free performance",
      "No-Fault crash replacement policy. Lifetime warranty",
      "Lightweight - 194 grams (27.2 x 330mm x 0)",
    ],
    250,
    ["COMPONENTS"],
    "SPECIALIZED"
  ),
  new Product(
    "Supacaz",
    "Supacaz ePedal - CNC Alloy",
    "Compact cartridge bushings paired with a sealed bearing system keep things running smoothly for miles and miles…",
    "/images/product/supaep.jpg",

    [
      "CNC-machined 6061 Aluminum",
      "Weight: 170 grams (each)",
      "Ultralight compact bushings + sealed bearings",
      "Dimensions: 11 x 20 x 7 cm",
    ],
    165,
    ["COMPONENTS"],
    "SPECIALIZED"
  ),
  new Product(
    "DHX",
    "2022 FOX DHX",
    "DHX brings coil-sprung, magic-carpet, trail smoothing performance in a wide range of configurations to the trails and beyond.",
    "/images/product/dhx.jpg",
    [
      "ALL-NEW chassis and damper",
      "LSC (Low Speed Compression) adjuster",
      "Reduced damper noise",
      "Full diameter spring retainer with wire ring (like DHX2)",
    ],
    560,
    ["COMPONENTS"],
    "FOX"
  ),
  new Product(
    "TopFuelC",
    "Top Fuel C Frameset",
    "Top Fuel C is a carbon full suspension frameset made for a super-fast and fun down-county build.",
    "/images/product/tfc.webp",
    [
      "OCLV Mountain Carbon frame with Mino Link adjustable geometry",
      "Knock Block 2.0 headset",
      "120mm Fox Factory Float shock with 2-position DPS damper",
      "Bontrager Elite 35mm stem,",
    ],
    3720,
    ["COMPONENTS"],
    "TREK"
  ),
  new Product(
    "SRAMBrakeLever",
    "SRAM Code RSC HYD Brake Lever/Caliper",
    "SRAM added 15% extra piston power and 30% more volume in the lever reservoir to the Code RSC, ensuring peak performance for the full run.",
    "/images/product/scrsc.webp",
    [
      "2-piece caliper construction with 4 phenolic plastic pistons",
      "Forged aluminum lever with bearing pivot and contact adjust",
      "SwingLink and Lever Pivot Bearing technologies",
      "Incredible heat management for massive power and predictable modulation",
    ],

    250,
    ["COMPONENTS"],
    "TREK"
  ),
];

const productData = new Data();
productData._setData(products);
// console.log(data._getData());
