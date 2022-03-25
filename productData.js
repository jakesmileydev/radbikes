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
const products = [
  new Product(
    "SJCA",
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
    ["MTB", "FULLSUS"],
    "SPECIALIZED"
  ),

  new Product(
    "TLA",
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
    ["MTB", "EBIKE", "FULLSUS"],
    "SPECIALIZED"
  ),

  new Product(
    "RH",
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
    ["MTB", "HARDTAIL"],
    "SPECIALIZED"
  ),

  new Product(
    "SJEE",
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
    ["MTB", "FULLSUS"],
    "SPECIALIZED"
  ),

  new Product(
    "FC29",
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
    ["MTB", "HARDTAIL"],
    "SPECIALIZED"
  ),

  new Product(
    "PF4",
    "Powerfly 4",
    "Trek's most affordable electric mountain bike",
    "/images/product/pf4.jpg",
    [
      "Bosch Performance CX (250W, 75Nm) motor",
      "Removable Integrated Battery (RIB) system looks great and is super user-friendly",
      "Purion controller has Walk Assist and an intelligent eMTB mode",
      "Shimano Deore M4100 10 speed shifter",
    ],
    3850,
    ["MTB", "EBIKE", "HARDTAIL"],
    "TREK"
  ),

  new Product(
    "RO6",
    "Roscoe 6",
    "Roscoe 6 is the ideal gateway to mountain biking for new riders looking to have a fun time on the trail.",
    "/images/product/ro6",
    [
      "TranzX JD-YSP18 seatpost is adjustable on the fly",
      "Shimano Deore M4100 10 speed shifter",
      "SR Suntour XCM 32 fork",
      "Shimano MT200 hydraulic disc brakes",
    ],
    1180,
    ["MTB", "HARDTAIL"],
    "TREK"
  ),

  new Product(
    "FEX99",
    "Fuel EX 9.9 XTR",
    "Fuel EX 9.9 makes no compromises. Top-shelf suspension, carbon everything, and a super-smooth Shimano XTR drivetrain",
    "/images/product/fex99.jpg",
    [
      "OCLV Mountain Carbon frame with internal storage",
      "Bontrager Line Pro 30 wheels",
      "A Shimano XT 1x12 drivetrain for super-smooth shifting",
      "Fox Factory Float EVOL shocks with Thru Shaft 3-position damper",
    ],
    9550,
    ["MTB", "FULLSUS"],
    "TREK"
  ),

  new Product(
    "FAR7",
    "Farley 7",
    "If you thought that fat bikes were sluggish, this one will change your mind",
    "/images/product/far7",
    [
      "Horizontal sliding dropouts lets you fine-tune your geometry",
      "Bontrager Gnarwhal TLR tires",
      "SUNringlé Mulefüt wheels paired with a 108T Rapid Drive hub",
      "SRAM NX/GX Eagle 1x12 drivetrain",
    ],
    2850,
    ["MTB", "HARDTAIL"],
    "TREK"
  ),

  new Product(
    "ECAL96",
    "E-Caliber 9.6",
    "E-Caliber 9.6 is a carbon electric mountain bike that rides and looks like a traditional cross country bike",
    "/images/product/ecal96.jpg",
    [
      "Compact Fazua drive system with removeable drivepack",
      "IsoStrut rear suspension with 60mm of integrated rear travel",
      "RockShox 35 Gold RL fork",
      "	Shimano Deore M6100 12 speed shifter",
    ],
    6650,
    ["MTB", "FULLSUS", "EBIKE"],
    "TREK"
  ),

  new Product(
    "DTH",
    "Defend Thermo Hoodie",
    "Insulated, sweat-wicking hoodie for cold rides",
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
    "SFPRO",
    "Speedframe Pro Fade Helmet",
    "Performance focused open-face MTB helmet",
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
    "RAMPRO",
    "Rampage Pro Carbon Mips Helmet",
    "The MTB helmet trusted by UCI world cup champions",
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
    "VSGOG",
    "Vue Stray Goggles",
    "See more with pro-level Vue goggle",
    "/images/product/vsgog.webp",
    [
      "Widest field of view possible and reduces distractions from the side",
      "Turn-to-release tabs allow you to change lenses in seconds",
      "Pre-curved, injection-molded polycarbonate lens for distortion-free optical clarity and increased impact resistance.",
      "TruLock lens swapping and removal system",
    ],
    120,
    ["GEAR"],
    "FOX"
  ),
  new Product(
    "DFG",
    "Defend Fire Gloves",
    "Water resistant cold weather MTB gloves with D30® armor",
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
];
console.log(products);
