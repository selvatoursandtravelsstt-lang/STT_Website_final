import { getDestinationImage } from "./destinationImages.js";

const destinationImages = {
  hills: {
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=85",
    alt: "Illustrative green landscape associated with a hill-country tour",
  },
  heritage: {
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    alt: "Illustrative heritage destination for a South Indian tour",
  },
  nature: {
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
    alt: "Illustrative forest landscape for a nature tour",
  },
  water: {
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=85",
    alt: "Illustrative waterfall surrounded by green forest",
  },
  city: {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    alt: "Illustrative scenic destination landscape",
  },
};

const makeTariffs = (rows) =>
  rows.map(([name, category, amount], index) => ({
    id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
    name,
    category,
    amount,
  }));

const sedanVehicles = [
  ["Verito AC", "Sedan"],
  ["Indigo Zest AC", "Sedan"],
  ["Swift Dzire AC", "Sedan"],
  ["Toyota Etios AC", "Sedan"],
];

const suvVehicles = [
  ["Innova AC", "SUV"],
  ["Tavera AC", "SUV"],
  ["Mahindra Xylo AC", "SUV"],
];

function standardTariffs(
  sedanAmount,
  suvAmount,
  crystaAmount,
  travellerAmount,
  options = {},
) {
  const sedans = options.sedans ?? sedanVehicles;
  const suvs = options.suvs ?? suvVehicles;
  return makeTariffs([
    ...sedans.map(([name, category]) => [name, category, sedanAmount]),
    ...suvs.map(([name, category]) => [name, category, suvAmount]),
    [options.crystaName ?? "Innova Crysta", "Innova Crysta", crystaAmount],
    ["Traveller AC 14-seater", "Mini Van", travellerAmount],
  ]);
}

function makePackage({
  id,
  title,
  route,
  destination,
  image,
  itinerary,
  mkt,
  inclusions,
  vehicleTariffs,
  referenceNotes = [],
}) {
  const destinationImage =
    getDestinationImage(destination) ?? destinationImages[image];
  return {
    id,
    title,
    route,
    destination,
    duration: "One Day",
    image: destinationImage.image,
    alt: destinationImage.alt,
    itinerary,
    itineraryNote: itinerary.length
      ? ""
      : "The reference page does not list a sightseeing itinerary for this route.",
    inclusions,
    mkt,
    vehicleTariffs,
    referenceNotes,
    pricingStatus: "Reference rates pending STT owner approval",
    referenceUrl:
      "https://coimbatoretaximk.com/one-day-tour-packages/index.html",
  };
}

const commonInclusions = [
  "Vehicle cost",
  "Parking",
  "Toll",
  "Driver allowance",
];
const interstateInclusions = [...commonInclusions, "Interstate permit charges"];

export const oneDayPackages = [
  makePackage({
    id: "coimbatore-ooty",
    title: "Coimbatore – Ooty – Coimbatore",
    route: "Coimbatore – Ooty – Coimbatore",
    destination: "Ooty",
    image: "hills",
    itinerary: [
      "Doddabetta Peak",
      "Tea Museum",
      "Botanical Garden",
      "Rose Garden",
      "Ooty Lake",
      "Coonoor Sims Park",
    ],
    mkt: ["1D (MKT = 310)"],
    inclusions: commonInclusions,
    vehicleTariffs: makeTariffs([
      ["Swift Dzire A/C", "Sedan", 5900],
      ["Toyota Etios A/C", "Sedan", 5900],
      ["Indigo Zest AC", "Sedan", 5900],
      ["Verito AC", "Sedan", 5900],
      ["Mahindra Xylo A/C", "SUV", 8170],
      ["Innova A/C", "SUV", 8170],
      ["Innova Crysta A/C", "Innova Crysta", 10300],
      ["Traveller A/C 14-seater", "Mini Van", 11930],
    ]),
  }),
  makePackage({
    id: "coimbatore-kodaikanal",
    title: "Coimbatore – Kodaikanal – Coimbatore",
    route: "Coimbatore – Kodaikanal – Coimbatore",
    destination: "Kodaikanal",
    image: "hills",
    itinerary: [
      "Silver Cascade Falls",
      "Kodai Lake",
      "Bryant Park",
      "Coaker’s Walk",
      "Pine Forest",
      "Guna Caves",
      "Pillar Rocks",
      "Green Valley View",
    ],
    mkt: ["MKT = 510"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(8300, 10100, 11950, 15350),
  }),
  makePackage({
    id: "coimbatore-valparai",
    title: "Coimbatore – Valparai – Coimbatore",
    route: "Coimbatore – Valparai – Coimbatore",
    destination: "Valparai",
    image: "nature",
    itinerary: [
      "Balaji Temple",
      "Solayar Dam",
      "Coolangallu River",
      "Tea Gardens",
      "Aaliyar Dam",
      "Monkey Falls",
      "Road views",
    ],
    mkt: ["1D (MKT = 360)", "3D (MKT = 410)"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(6850, 8750, 11250, 13300),
  }),
  makePackage({
    id: "coimbatore-palani",
    title: "Coimbatore – Palani – Coimbatore",
    route: "Coimbatore – Palani – Coimbatore",
    destination: "Palani",
    image: "heritage",
    itinerary: [
      "One-day trip from Coimbatore to Palani and back to Coimbatore",
    ],
    mkt: ["MKT = 250"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(4700, 6550, 8250, 9200),
  }),
  makePackage({
    id: "coimbatore-black-thunder",
    title: "Coimbatore – Black Thunder – Coimbatore",
    route: "Coimbatore – Black Thunder – Coimbatore",
    destination: "Black Thunder",
    image: "nature",
    itinerary: [
      "One-day trip from Coimbatore to Black Thunder and back to Coimbatore",
    ],
    mkt: ["MKT = 135"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(3300, 4650, 6150, 6750),
    referenceNotes: ["Reference timing: 8:00 AM to 7:00 PM."],
  }),
  makePackage({
    id: "coimbatore-munnar",
    title: "Coimbatore – Munnar – Coimbatore",
    route: "Coimbatore – Munnar – Coimbatore",
    destination: "Munnar",
    image: "hills",
    itinerary: [
      "Lakkam Waterfall",
      "Mattupetty Dam",
      "Rose Garden",
      "Echo Point",
      "Tea plantation",
      "Spice plantation",
    ],
    mkt: ["MKT = 510"],
    inclusions: interstateInclusions,
    vehicleTariffs: standardTariffs(8750, 10450, 12200, 15950),
  }),
  makePackage({
    id: "coimbatore-guruvayur",
    title: "Coimbatore – Guruvayur – Coimbatore",
    route: "Coimbatore – Guruvayur – Coimbatore",
    destination: "Guruvayur",
    image: "heritage",
    itinerary: [
      "Guruvayur Krishna Temple",
      "Mammiyur Temple",
      "Elephant Camp (depending on timings)",
      "Return to Coimbatore",
    ],
    mkt: ["MKT = 385"],
    inclusions: interstateInclusions,
    vehicleTariffs: standardTariffs(7050, 8800, 11550, 12750),
  }),
  makePackage({
    id: "coimbatore-mysore",
    title: "Coimbatore – Mysore – Coimbatore",
    route: "Coimbatore – Mysore – Coimbatore",
    destination: "Mysore",
    image: "heritage",
    itinerary: [
      "Chamundi Temple",
      "Mysore Zoo",
      "Mysore Palace",
      "St. Philomena’s Church",
      "Rail Museum",
      "Brindavan Gardens (if time permits)",
      "Return to Coimbatore",
    ],
    mkt: ["MKT = 560"],
    inclusions: interstateInclusions,
    vehicleTariffs: standardTariffs(9200, 12250, 13950, 18500),
  }),
  makePackage({
    id: "coimbatore-yercaud",
    title: "Coimbatore – Yercaud – Coimbatore",
    route: "Coimbatore – Yercaud – Coimbatore",
    destination: "Yercaud",
    image: "hills",
    itinerary: [
      "Yercaud Lake",
      "Botanical Garden",
      "Pagoda Point",
      "Ladies Seat",
      "Rose Garden",
      "Killiyur Falls",
      "Anna Park",
    ],
    mkt: ["MKT = 460"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(7950, 9550, 11275, 14000),
  }),
  makePackage({
    id: "coimbatore-madurai-palani",
    title: "Coimbatore – Madurai – Palani – Coimbatore",
    route: "Coimbatore – Madurai – Palani – Coimbatore",
    destination: "Madurai & Palani",
    image: "heritage",
    itinerary: [
      "Sree Meenakshi Amman Temple",
      "Thirumalai Nayakar Palace",
      "Palani Temple",
      "Return to Coimbatore",
    ],
    mkt: ["MKT = 510"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(8350, 10150, 11950, 15200),
  }),
  makePackage({
    id: "coimbatore-athirapalli-malampuzha",
    title: "Coimbatore – Athirapalli – Malampuzha – Coimbatore",
    route: "Coimbatore – Athirapalli – Malampuzha – Coimbatore",
    destination: "Athirapalli & Malampuzha",
    image: "water",
    itinerary: [
      "Athirappilly Waterfalls",
      "Malampuzha Dam",
      "Return to Coimbatore",
    ],
    mkt: ["MKT = 410"],
    inclusions: interstateInclusions,
    vehicleTariffs: standardTariffs(7200, 8630, 10200, 13080),
    referenceNotes: [
      "The reference describes this as a one-day Coimbatore–Malampuzha Dam and Athirappilly tour.",
    ],
  }),
  makePackage({
    id: "coimbatore-parambikulam-topslip",
    title: "Coimbatore – Parambikulam – Topslip – Coimbatore",
    route: "Coimbatore – Parambikulam – Topslip – Coimbatore",
    destination: "Parambikulam & Topslip",
    image: "nature",
    itinerary: [
      "Parambikulam Dam",
      "Lake",
      "Teak Tree",
      "Trekking",
      "Topslip Wildlife: Elephant Safari",
      "Masani Amman Temple (en route)",
      "Return to Coimbatore",
    ],
    mkt: ["MKT = 310"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(5550, 7200, 9650, 10250),
  }),
  makePackage({
    id: "coimbatore-hogenakkal-falls",
    title: "Coimbatore – Hogenakkal Falls – Coimbatore",
    route: "Coimbatore – Hogenakkal Falls – Coimbatore",
    destination: "Hogenakkal Falls",
    image: "water",
    itinerary: [],
    mkt: ["MKT = 490"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(7870, 10250, 11950, 14000, {
      suvs: [
        ["Mahindra Xylo A/C", "SUV"],
        ["Innova A/C", "SUV"],
      ],
      crystaName: "Innova Crysta A/C",
    }),
  }),
  makePackage({
    id: "madurai-rameshwaram",
    title: "Madurai – Rameshwaram – Madurai",
    route: "Madurai – Rameshwaram – Madurai",
    destination: "Rameshwaram",
    image: "heritage",
    itinerary: [],
    mkt: ["MKT = 430"],
    inclusions: commonInclusions,
    vehicleTariffs: makeTariffs([
      ["Swift Dzire A/C", "Sedan", 7100],
      ["Toyota Etios A/C", "Sedan", 7100],
      ["Indigo Zest AC", "Sedan", 7100],
      ["Verito AC", "Sedan", 9500],
      ["Mahindra Xylo A/C", "SUV", 9500],
      ["Innova A/C", "SUV", 9500],
      ["Innova Crysta A/C", "Innova Crysta", 10950],
      ["Traveller A/C 14-seater", "Mini Van", 12850],
    ]),
  }),
  makePackage({
    id: "madurai-thiruchendur",
    title: "Madurai – Thiruchendur – Madurai",
    route: "Madurai – Thiruchendur – Madurai",
    destination: "Thiruchendur",
    image: "heritage",
    itinerary: [],
    mkt: ["MKT = 420"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(7100, 9100, 10950, 12100, {
      sedans: [
        ["Swift Dzire A/C", "Sedan"],
        ["Toyota Etios A/C", "Sedan"],
        ["Indigo Zest AC", "Sedan"],
        ["Verito AC", "Sedan"],
      ],
      suvs: [
        ["Mahindra Xylo A/C", "SUV"],
        ["Innova A/C", "SUV"],
      ],
      crystaName: "Innova Crysta A/C",
    }),
  }),
  makePackage({
    id: "tirupur-madurai-palani",
    title: "Tirupur – Madurai – Palani – Tirupur",
    route: "Tirupur – Madurai – Palani – Tirupur",
    destination: "Madurai & Palani",
    image: "heritage",
    itinerary: [],
    mkt: ["MKT = 560"],
    inclusions: commonInclusions,
    vehicleTariffs: standardTariffs(8700, 10900, 12950, 14800, {
      sedans: [
        ["Swift Dzire A/C", "Sedan"],
        ["Toyota Etios A/C", "Sedan"],
        ["Indigo Zest AC", "Sedan"],
        ["Verito AC", "Sedan"],
      ],
      suvs: [
        ["Mahindra Xylo A/C", "SUV"],
        ["Innova A/C", "SUV"],
      ],
      crystaName: "Innova Crysta A/C",
    }),
  }),
];
