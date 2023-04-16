export const compareDates = (date: string) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  return currentDate.getDate() - postDate.getDate() > 12;
};

export const isGoodToDonate = (
  wantedDate: Date,
  lastDonationDate: Date,
  donationType: "Plasma" | "Full Blood" | "Platelets" | "Red Cells"
): boolean => {
  const donationTypeMap = new Map<string, number>([
    ["Full Blood", 56],
    ["Plasma", 28],
    ["Platelets", 7],
    ["Red Cells", 112],
  ]);
  return (
    wantedDate.getDay() - lastDonationDate.getDay() >=
    donationTypeMap.get(donationType)!
  );
};
