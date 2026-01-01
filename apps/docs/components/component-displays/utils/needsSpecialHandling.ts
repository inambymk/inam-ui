export const needsSpecialHandling = (slug: string): boolean => {
  return [
    "modal",
    "tooltip",
    "dropdown",
    "accordion",
    "skeleton",
    "card",
    "textarea",
    "select",
  ].includes(slug);
};
