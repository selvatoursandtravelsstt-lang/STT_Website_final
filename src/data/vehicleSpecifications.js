// Set these fleet values only after confirming the actual vehicle; the researched fields describe public model variants.
export const vehicleSpecifications = {
  "LOGAN / VERITO A/C": {
    aliases: ["LOGAN", "VERITO"],
    fuelType: null,
    passengerCapacity: 4,
    researchedFuelTypes: ["Petrol", "Diesel"],
    researchedPassengerCapacities: [4],
    sources: [
      "https://www.cardekho.com/mahindra/verito/specs",
    ],
  },
  "SWIFT DZIRE A/C": {
    aliases: ["SWIFT DZIRE", "DZIRE"],
    fuelType: null,
    passengerCapacity: 4,
    researchedFuelTypes: ["Petrol", "Diesel", "CNG"],
    researchedPassengerCapacities: [4],
    sources: [
      "https://www.cardekho.com/maruti/dzire-2017-2020/specs",
      "https://www.cardekho.com/maruti/dzire/specs",
    ],
  },
  "TOYOTA Etios A/C": {
    aliases: ["ETIOS"],
    fuelType: null,
    passengerCapacity: 4,
    researchedFuelTypes: ["Petrol", "Diesel"],
    researchedPassengerCapacities: [4],
    sources: [
      "https://www.cardekho.com/toyota/toyota-etios-specifications.htm",
    ],
  },
  "TAVERA A/C": {
    aliases: ["TAVERA"],
    fuelType: null,
    passengerCapacity: null,
    researchedFuelTypes: ["Petrol", "Diesel"],
    researchedPassengerCapacities: [6, 7, 8, 9],
    sources: [
      "https://www.cartrade.com/chevrolet-cars/tavera/",
      "https://www.cartrade.com/chevrolet-cars/tavera/faqs/what-is-the-seating-capacity-of-chevrolet-tavera/",
      "https://www.cardekho.com/chevrolet/chevrolet-tavera-specifications.htm",
    ],
  },
  "MAHINDRA XYLO A/C": {
    aliases: ["XYLO"],
    fuelType: "Diesel",
    passengerCapacity: null,
    researchedFuelTypes: ["Diesel"],
    researchedPassengerCapacities: [6, 7],
    sources: [
      "https://www.cartrade.com/mahindra-cars/xylo/",
      "https://www.cartrade.com/mahindra-cars/xylo/faqs/what-is-the-seating-capacity-of-mahindra-xylo/",
    ],
  },
  "INNOVA A/C": {
    aliases: ["INNOVA"],
    excludes: ["CRYSTA", "HYCROSS"],
    fuelType: null,
    passengerCapacity: null,
    researchedFuelTypes: ["Petrol", "Diesel", "CNG", "Petrol hybrid"],
    researchedPassengerCapacities: [6, 7],
    sources: [
      "https://www.cardekho.com/toyota/toyota-innova-2009-2012-specifications.htm",
      "https://www.toyotabharat.com/showroom/innova-crysta/",
      "https://www.toyotabharat.com/showroom/innova/",
    ],
  },
  "Traveller Non A/C": {
    aliases: ["TRAVELLER NON A/C"],
    fuelType: "Diesel",
    passengerCapacity: 14,
    researchedFuelTypes: ["Diesel"],
    researchedPassengerCapacities: [9, 12, 13, 14, 17, 19, 20],
    sources: [
      "https://buses.cardekho.com/buses/force/traveller/specifications",
      "https://www.forcemotors.com/vehicles-category/traveller/",
    ],
  },
  "Traveller A/C": {
    aliases: ["TRAVELLER A/C", "TRAVELLER AC"],
    fuelType: "Diesel",
    passengerCapacity: 14,
    researchedFuelTypes: ["Diesel"],
    researchedPassengerCapacities: [13, 14, 17],
    sources: [
      "https://buses.cardekho.com/buses/force/traveller-3350/14-seater3350",
      "https://buses.cardekho.com/buses/force/traveller/13-seater3050",
      "https://buses.cardekho.com/buses/force/traveller-3700/17-seater3700",
    ],
  },
}

export function findVehicleSpecification(vehicle) {
  const description = `${vehicle.name || vehicle.type || ""} ${vehicle.model || ""}`.toUpperCase()

  return Object.values(vehicleSpecifications).find(({ aliases, excludes = [] }) =>
    aliases.some((alias) => description.includes(alias)) &&
    !excludes.some((term) => description.includes(term)),
  )
}
