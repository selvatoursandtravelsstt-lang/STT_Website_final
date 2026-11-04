const destinationImages = [
  {
    pattern: /ooty/i,
    image: "/images/destinations/ooty.webp",
    alt: "Ooty hill-country landscape",
  },
  {
    pattern: /kodaikanal/i,
    image: "/images/destinations/kodaikanal.webp",
    alt: "Kodaikanal mountain landscape",
  },
  {
    pattern: /munnar/i,
    image: "/images/destinations/munnar.webp",
    alt: "Munnar tea-country landscape",
  },
  {
    pattern: /valparai/i,
    image: "/images/destinations/valparai.webp",
    alt: "Valparai forest and hills",
  },
  {
    pattern: /athirappalli|athirapalli/i,
    image: "/images/destinations/athirapalli.webp",
    alt: "Athirappalli waterfalls",
  },
  {
    pattern: /mysore|mysuru/i,
    image: "/images/destinations/mysore.webp",
    alt: "Mysore heritage architecture",
  },
  {
    pattern: /yercaud/i,
    image: "/images/destinations/yercaud.webp",
    alt: "Yercaud hill landscape",
  },
  {
    pattern: /rameshwaram|rameswaram/i,
    image: "/images/destinations/rameshwaram.webp",
    alt: "Rameshwaram coastal landscape",
  },
  {
    pattern: /guruvayur/i,
    image: "/images/destinations/guruvayur.webp",
    alt: "Guruvayur temple",
  },
  {
    pattern: /cochin|kochi/i,
    image: "/images/destinations/kochi.webp",
    alt: "Cochin city and harbour",
  },
  {
    pattern: /wayanad/i,
    image: "/images/destinations/wayanad.webp",
    alt: "Wayanad forest landscape",
  },
  {
    pattern: /sabarimalai|sabarimala/i,
    image: "/images/destinations/sabarimala.webp",
    alt: "Sabarimalai pilgrimage destination",
  },
  {
    pattern: /palani/i,
    image: "/images/destinations/palani.webp",
    alt: "Palani hill and temple destination",
    secondary: true,
  },
  {
    pattern: /black\s*thunder/i,
    image: "/images/destinations/blackthunder.webp",
    alt: "Black Thunder water park destination",
    secondary: true,
  },
  {
    pattern: /topslip/i,
    image: "/images/destinations/topslip.webp",
    alt: "Topslip forest destination",
    secondary: true,
  },
  {
    pattern: /hogenakkal|hogenekkal/i,
    image: "/images/destinations/hogenekkal.webp",
    alt: "Hogenakkal waterfall destination",
    secondary: true,
  },
  {
    pattern: /thiruchendur/i,
    image: "/images/destinations/thiruchendur.webp",
    alt: "Thiruchendur coastal temple destination",
    secondary: true,
  },
  {
    pattern: /thiruvannamalai/i,
    image: "/images/destinations/thiruvannamalai.webp",
    alt: "Thiruvannamalai temple destination",
    secondary: true,
  },
];

export function getDestinationImage(destination) {
  const label = String(destination ?? "");
  const findMatch = (entries) =>
    entries
      .map((entry) => ({ ...entry, index: label.search(entry.pattern) }))
      .filter(({ index }) => index >= 0)
      .sort((first, second) => second.index - first.index)[0];
  const establishedEntries = destinationImages.filter(
    ({ secondary }) => !secondary,
  );
  const additionalEntries = destinationImages.filter(
    ({ secondary }) => secondary,
  );
  const match = findMatch(establishedEntries) ?? findMatch(additionalEntries);

  return match ? { image: match.image, alt: match.alt } : null;
}
