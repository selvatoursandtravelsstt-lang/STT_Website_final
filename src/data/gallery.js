import galleryPaths from "virtual:gallery-images";

const gallerySizes = [
  "wide",
  "tall",
  undefined,
  undefined,
  "wide",
  undefined,
  "tall",
  undefined,
  undefined,
  "wide",
  undefined,
  undefined,
];

const galleryAltByFilename = {
  "2026-10-26.webp": "Gothic-style white church and spires at sunset",
  "Blue Gallery Wall.png": "Travel photo collage featuring a temple statue, green mountain, and coastal scene",
  "unnamed.webp": "Ornate Indian palace hall with carved columns and decorative arches",
  "unnamed (1).webp": "Hillside town surrounded by wooded slopes",
  "unnamed (2).webp": "Tea plantation covering rolling green hills",
  "unnamed (3).webp": "Waterfall flowing over a rocky cliff surrounded by forest",
  "unnamed (4).webp": "Misty valley among green hills and trees",
  "unnamed (5).webp": "Deer grazing on a lawn beside a garden path",
  "unnamed (6).webp": "Large Adiyogi Shiva statue beneath a clear sky",
  "unnamed (7).webp": "Golden statue of Hanuman beside a forested hillside",
  "unnamed (8).webp": "Visitors standing beneath a decorated palace mural",
  "unnamed (9).webp": "Large dark bovine grazing in a landscaped garden",
  "unnamed (10).webp": "Family standing beside a white sedan on a city street",
};

export const galleryImages = galleryPaths.map((src, index) => {
  const filename = src.split("/").pop();
  return {
    id: src,
    category: "Travel Gallery",
    title: "",
    alt: galleryAltByFilename[filename] || `Travel photograph ${index + 1}`,
    src,
    size: gallerySizes[index % gallerySizes.length],
  };
});
