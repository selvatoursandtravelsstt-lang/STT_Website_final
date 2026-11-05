const localVehicle = (
  id,
  type,
  category,
  packageFare,
  extraHourCharge,
  extraKilometreCharge,
  referenceNote = "",
  image = "",
) => ({
  id,
  type,
  category,
  packageFare,
  extraHourCharge,
  extraKilometreCharge,
  referenceNote,
  image,
});

export const tariffTerms = [
  "One day equals one calendar day, from midnight to midnight.",
  "Parking, toll and interstate permit charges are extra.",
  "Driver allowance is extra if the driver drives between 10:00 PM and 6:00 AM.",
  "Total kilometre and time calculation is from office to office.",
  "AC will not work in uphill hill areas or while the vehicle is stopped/parked.",
  "For outstation day-basis trips averaging more than 300 km per day, tariff shifts to the KM-basis tariff.",
  "For hill-station trips, night-halt and hill-station charges may apply.",
];

const localPackage = (hours, vehicles) => ({
  id: `local-${hours}-hours`,
  hours,
  includedHours: hours,
  freeKms: 80,
  name: `${hours}-Hour Package`,
  vehicles: vehicles.map((vehicle) => ({
    ...vehicle,
    includedHours: hours,
    freeKms: 80,
  })),
});

const vehicleImageDetails = (id, type = "") => {
  const name = `${id} ${type}`.toLowerCase();

  if (name.includes("indigo") || name.includes("zest"))
    return {
      image: "/images/cars/indigo-zest.png",
      imageAlt: "White Indigo / Zest A/C vehicle",
    };
  if (name.includes("tavera"))
    return {
      image: "/images/cars/tavera.png",
      imageAlt: "White Tavera A/C vehicle",
    };
  if (name.includes("xylo"))
    return {
      image: "/images/cars/mahindra-xylo.png",
      imageAlt: "White Mahindra Xylo A/C vehicle",
    };
  if (name.includes("crysta"))
    return {
      image: "/images/cars/innova-crysta.png",
      imageAlt: "White Innova Crysta A/C vehicle",
    };
  if (name.includes("innova") && !name.includes("crysta"))
    return {
      image: "/images/cars/innova.png",
      imageAlt: "White Innova A/C vehicle",
    };
  if (name.includes("traveller") && name.includes("non a/c"))
    return {
      image: "/images/cars/traveller-non-ac.png",
      imageAlt: "White non-A/C Traveller vehicle",
    };
  if (name.includes("traveller") || name.includes("traveller a/c"))
    return {
      image: "/images/cars/traveller-ac.png",
      imageAlt: "White A/C Traveller vehicle",
    };
  if (name.includes("logan"))
    return {
      image: "/images/cars/logan-verito.png",
      imageAlt: "White Logan / Verito A/C vehicle",
    };
  if (name.includes("swift"))
    return {
      image: "/images/cars/swift-dzire.png",
      imageAlt: "White Swift Dzire A/C vehicle",
    };
  if (name.includes("etios"))
    return {
      image: "/images/cars/toyota-etios.png",
      imageAlt: "White Toyota Etios A/C vehicle",
    };
  if (name.includes("coach") || name.includes("coach-20"))
    return {
      image: "/images/cars/coach-20.png",
      imageAlt: "White 20-seater A/C coach",
    };

  return {};
};

const localSedans = (fare) => [
  {
    ...localVehicle("logan", "LOGAN / VERITO A/c", "Sedan", fare, 250, 13),
    image: "/images/cars/logan-verito.png",
    imageAlt: "White Logan / Verito A/c vehicle",
  },
  {
    ...localVehicle("swift-dzire", "SWIFT DZIRE A/C", "Sedan", fare, 250, 13),
    image: "/images/cars/swift-dzire.png",
    imageAlt: "White Swift Dzire A/C vehicle",
  },
  {
    ...localVehicle("etios", "TOYOTA Etios A/C", "Sedan", fare, 250, 13),
    image: "/images/cars/toyota-etios.png",
    imageAlt: "White Toyota Etios A/C vehicle",
  },
];

const localSuvs = (fare, xyloAndInnovaExtraHour) => [
  {
    ...localVehicle("tavera", "TAVERA A/C", "SUV", fare, 250, 15),
    ...vehicleImageDetails("tavera", "TAVERA A/C"),
  },
  {
    ...localVehicle(
      "xylo",
      "MAHINDRA XYLO A/C",
      "SUV",
      fare,
      xyloAndInnovaExtraHour,
      15,
    ),
    ...vehicleImageDetails("xylo", "MAHINDRA XYLO A/C"),
  },
  {
    ...localVehicle(
      "innova",
      "INNOVA A/C",
      "SUV",
      fare,
      xyloAndInnovaExtraHour,
      15,
    ),
    ...vehicleImageDetails("innova", "INNOVA A/C"),
  },
];

const localTraveller = (id, type, fare, extraKilometreCharge) => ({
  ...localVehicle(
    id,
    type,
    "Mini van · 14-seater",
    fare,
    500,
    extraKilometreCharge,
  ),
  ...vehicleImageDetails(id, type),
});

const localTariff = {
  path: "/tariff/local-hours",
  title: "Local Tariff — Hour Basis",
  breadcrumb: "Local Tariff — Hour Basis",
  showVehicleImages: true,

  tableHeading: "Coimbatore Local Tariff",

  enquiryType: "Local Taxi",
  introduction:
    "Review reference hourly rates for local Coimbatore taxi trips. Confirm current fares, vehicle availability, and additional charges with Selva Tours and Travels before travel.",

  columns: [
    ["includedHours", "Included Hours"],
    ["freeKms", "Free Kilometres"],
    ["packageFare", "Package Fare"],
    ["extraHourCharge", "Extra-Hour Fare"],
    ["extraKilometreCharge", "Extra-KM Fare"],
  ],
  packages: [
    localPackage(8, [
      ...localSedans(2500),
      ...localSuvs(3500, 300),
      localTraveller("traveller-8-non-ac", "Traveller Non A/C", 4500, 18),
      {
        ...localVehicle(
          "traveller-8-duplicate-label",
          "Traveller Non A/C",
          "Mini van · 14-seater",
          4800,
          500,
          19,
        ),
        ...vehicleImageDetails(
          "traveller-8-duplicate-label",
          "Traveller Non A/C",
        ),
      },
    ]),
    localPackage(10, [
      ...localSedans(2700),
      ...localSuvs(3600, 400),
      localTraveller("traveller-10-non-ac", "Traveller Non A/C", 5000, 18),
      localTraveller("traveller-10-ac", "Traveller A/C", 5200, 19),
    ]),
  ],
  termsApprovalRequired: true,

  terms: tariffTerms,
};

const dayVehicles = [
  ["indigo-zest", "INDIGO / ZEST A/c", "Sedan", 2500, 100, 11, 400, 2850],
  ["logan-verito", "LOGAN / VERITO A/c", "Sedan", 2500, 100, 11, 400, 2850],
  ["swift-dzire", "SWIFT DZIRE A/c", "Sedan", 2500, 100, 11, 400, 2850],
  ["toyota-etios", "TOYOTA ETIOS A/c", "Sedan", 2500, 100, 11, 400, 2850],
  ["tavera", "TAVERA A/c", "SUV", 3500, 100, 15, 400, 3900],
  ["mahindra-xylo", "MAHINDRA XYLO A/c", "SUV", 3500, 100, 15, 400, 3900],
  ["innova", "INNOVA A/c", "SUV", 3500, 100, 15, 400, 3900],
  ["innova-crysta", "INNOVA CRYSTA A/c", "SUV", 4800, 100, 16, 400, 5200],
  [
    "traveller-14",
    "TRAVELLER A/c",
    "Mini Van · 14-seater",
    5000,
    100,
    19,
    500,
    5500,
  ],
  ["coach-25", "COACH", "Mini Van · 25-seater", 5500, 100, 20, 500, 6000],
].map(
  ([
    id,
    type,
    category,
    rentPerDay,
    freeKmPerDay,
    ratePerKm,
    driverPerDay,
    packageAmount,
  ]) => ({
    id,
    type,
    category,
    rentPerDay,
    freeKmPerDay,
    ratePerKm,
    driverPerDay,
    packageAmount,
    ...vehicleImageDetails(id, type),
    ...(id === "logan-verito"
      ? {
          image: "/images/cars/logan-verito.png",
          imageAlt: "White Logan / Verito A/c vehicle",
        }
      : {}),
    ...(id === "swift-dzire"
      ? {
          image: "/images/cars/swift-dzire.png",
          imageAlt: "White Swift Dzire A/c vehicle",
        }
      : {}),
    ...(id === "toyota-etios"
      ? {
          image: "/images/cars/toyota-etios.png",
          imageAlt: "White Toyota Etios A/c vehicle",
        }
      : {}),
  }),
);

const outstationDayTariff = {
  path: "/tariff/outstation-day",
  title: "Outstation Duty — Day Basis",
  breadcrumb: "Outstation Tariff — Day Basis",
  showVehicleImages: true,

  tableHeading: "Outstation Round Trip — Day Basis",

  enquiryType: "Outstation Taxi",
  introduction:
    "Compare day-basis reference tariffs for outstation taxi trips and travels from Coimbatore. Confirm the route, current rates, included kilometres, and applicable charges before travel.",
  columns: [
    ["rentPerDay", "Rent per Day"],
    ["freeKmPerDay", "Free Kilometres per Day"],
    ["ratePerKm", "Extra-Kilometre Rate"],
    ["driverPerDay", "Driver Allowance per Day"],
    ["packageAmount", "Reference Package Amount"],
  ],
  vehicles: dayVehicles,
  termsApprovalRequired: true,

  terms: tariffTerms,
};

const kmVehicles = [
  ["indigo-zest", "INDIGO / ZEST A/c", "Sedan", 300, 13, 400, 4600],
  ["logan-verito", "LOGAN / VERITO A/c", "Sedan", 300, 13, 400, 4600],
  ["swift-dzire", "SWIFT DZIRE A/c", "Sedan", 300, 13, 400, 4600],
  ["toyota-etios", "TOYOTA ETIOS A/c", "Sedan", 300, 13, 400, 4600],
  ["tavera", "TAVERA A/c", "SUV", 350, 18, 400, 6850],
  ["mahindra-xylo", "MAHINDRA XYLO A/c", "SUV", 350, 18, 400, 6850],
  ["innova", "INNOVA A/c", "SUV", 350, 18, 300, 6850],
  ["innova-crysta", "INNOVA CRYSTA A/c", "SUV", 400, 21, 400, 9040],
  [
    "traveller-14",
    "TRAVELLER A/c",
    "Mini Van · 14-seater",
    400,
    25,
    500,
    10850,
  ],
  [
    "coach-20",
    "20 SEATER A/c COACH",
    "Mini Van · 20-seater",
    400,
    37,
    500,
    15850,
  ],
].map(
  ([
    id,
    type,
    category,
    minimumKmPerDay,
    ratePerKm,
    driverPerDay,
    packageAmount,
  ]) => ({
    id,
    type,
    category,
    minimumKmPerDay,
    ratePerKm,
    driverPerDay,
    packageAmount,
    ...vehicleImageDetails(id, type),
    ...(id === "logan-verito"
      ? {
          image: "/images/cars/logan-verito.png",
          imageAlt: "White Logan / Verito A/c vehicle",
        }
      : {}),
    ...(id === "swift-dzire"
      ? {
          image: "/images/cars/swift-dzire.png",
          imageAlt: "White Swift Dzire A/c vehicle",
        }
      : {}),
    ...(id === "toyota-etios"
      ? {
          image: "/images/cars/toyota-etios.png",
          imageAlt: "White Toyota Etios A/c vehicle",
        }
      : {}),
  }),
);

const outstationKmTariff = {
  path: "/tariff/outstation-km",
  title: "Outstation Duty — KM Basis",
  breadcrumb: "Outstation Tariff — KM Basis",
  showVehicleImages: true,

  enquiryType: "Outstation Taxi",
  introduction:
    "Review kilometre-basis reference tariffs for outstation travel from Coimbatore. Confirm the route, current rates, included charges, and vehicle availability with Selva Tours and Travels.",

  columns: [
    ["minimumKmPerDay", "Minimum Kilometres per Day"],
    ["ratePerKm", "Rate per Kilometre"],
    ["driverPerDay", "Driver Allowance per Day"],
    ["packageAmount", "Reference Package Amount"],
  ],
  vehicles: kmVehicles,
  termsApprovalRequired: true,

  terms: tariffTerms,
};

const corporateTariff = {
  path: "/tariff/corporate",
  title: "Corporate Cab Bookings",
  breadcrumb: "Corporate Cab Bookings",
  introduction:
    "Discuss your organisation’s cab requirements with Selva Tours and Travels. Share the type of travel, passenger numbers, locations, and preferred schedule to request a customized quotation.",
};

export const tariffPages = [
  localTariff,
  outstationDayTariff,
  outstationKmTariff,
  corporateTariff,
];
