import { getDestinationImage } from "./destinationImages.js";

const withDestinationImage = (destination) => ({
  ...destination,
  ...getDestinationImage(destination.name),
});

export const featuredDestinations = [
  {
    name: "Ooty",
    description:
      "A hill-station destination known for tea country and mountain scenery.",
  },
  {
    name: "Kodaikanal",
    description:
      "A highland getaway with forest landscapes and a cool climate.",
  },
  {
    name: "Munnar",
    description:
      "A scenic hill region with expansive tea plantations and winding roads.",
  },
  {
    name: "Valparai",
    description:
      "A Western Ghats destination of green slopes, forests, and tea estates.",
  },
].map(withDestinationImage);

export const suggestedDestinations = [
  ...featuredDestinations,
  {
    name: "Athirappalli Waterfalls",
    description:
      "A scenic waterfall destination set within Kerala’s Western Ghats.",
  },
  {
    name: "Mysore",
    description: "A cultural city to consider for a heritage-focused trip.",
  },
  {
    name: "Yercaud",
    description: "A hill-station getaway among the Shevaroy Hills.",
  },
  {
    name: "Rameswaram",
    description:
      "An island destination with coastal scenery and spiritual significance.",
  },
  {
    name: "Guruvayur",
    description: "A temple-town destination for a pilgrimage trip.",
  },
  {
    name: "Cochin",
    description: "A coastal city known for its harbour, heritage, and culture.",
  },
  {
    name: "Wayanad",
    description: "A Western Ghats destination of forest and hill scenery.",
  },
  {
    name: "Sabarimalai",
    description: "A pilgrimage destination in the forested Western Ghats.",
  },
].map(withDestinationImage);

export const tourDurations = Array.from({ length: 8 }, (_, index) => ({
  days: index + 1,
  label: index === 0 ? "One Day" : `${index + 1} Days`,
}));
