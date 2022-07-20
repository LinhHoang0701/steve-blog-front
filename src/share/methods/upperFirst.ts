export const upperFirstLetter = (title: string): string => {
  if (!title) {
    return title;
  }
  return title[0].toUpperCase() + title.slice(1);
};
