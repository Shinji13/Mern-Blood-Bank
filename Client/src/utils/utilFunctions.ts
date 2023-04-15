export const compareDates = (date: string) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  return currentDate.getDate() - postDate.getDate() > 12;
};
