import { getDestinationImage } from "./destinationImages.js";

const withDestinationImage = (packageItem) => {
  const destinationImage = getDestinationImage(packageItem.destination);
  return destinationImage
    ? { ...packageItem, ...destinationImage }
    : packageItem;
};

const tourPackageData = [
  {
    name: "Western Ghats Escape",
    destination: "Ooty & Coonoor",
    duration: "3 days · illustrative itinerary",
    description:
      "A relaxed hill-country route through tea landscapes, viewpoints, and cool mountain air.",
    attractions: ["Ooty town", "Coonoor tea country", "Scenic viewpoints"],
    inclusions:
      "Itinerary and vehicle arrangement can be discussed for your group.",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1000&q=85",
    alt: "Green hills and tea-country scenery in the Western Ghats",
  },
  {
    name: "Heritage by the Coast",
    destination: "Madurai & Rameswaram",
    duration: "4 days · illustrative itinerary",
    description:
      "A sample cultural journey pairing historic Madurai with the island town of Rameswaram.",
    attractions: ["Madurai city", "Rameswaram", "Coastal landscapes"],
    inclusions: "Route and travel arrangements are subject to confirmation.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=85",
    alt: "Historic South Indian temple architecture",
  },
  {
    name: "Waterfalls & Green Valleys",
    destination: "Valparai",
    duration: "2 days · illustrative itinerary",
    description:
      "A sample road trip through forested slopes, tea estates, and the scenic hill roads of Valparai.",
    attractions: ["Valparai town", "Tea estates", "Scenic ghat roads"],
    inclusions:
      "A suitable route can be planned after confirming your travel dates.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85",
    alt: "Lush green forest landscape",
  },
];

export const tourPackages = tourPackageData.map(withDestinationImage);

const templePackageData = [
  {
    name: "Madurai Temple Visit",
    destination: "Madurai",
    duration: "Day trip · sample route",
    description:
      "A sample visit centred on Madurai, with timing and stops planned to suit your group.",
    temples: ["Meenakshi Amman Temple"],
    image:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=85",
    alt: "Carved gopuram at a South Indian temple",
  },
  {
    name: "Rameswaram Pilgrimage",
    destination: "Rameswaram",
    duration: "2 days · sample route",
    description:
      "An illustrative pilgrimage itinerary to Rameswaram from the Coimbatore region.",
    temples: ["Ramanathaswamy Temple"],
    image:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=85",
    alt: "South Indian temple complex with traditional architecture",
  },
  {
    name: "Palani Hillside Visit",
    destination: "Palani",
    duration: "Day trip · sample route",
    description:
      "A sample day visit to Palani, with travel timing to be confirmed before departure.",
    temples: ["Arulmigu Dhandayuthapani Swamy Temple"],
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=85",
    alt: "Traditional temple tower in Tamil Nadu",
  },
];

export const templePackages = templePackageData.map(withDestinationImage);
