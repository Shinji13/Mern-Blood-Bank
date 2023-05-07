import { interaction } from "./types";
import { ServiceInfo } from "./valtioStore";

export const getQuantity = (
  type: "Full Blood" | "Red Cells" | "Plasma" | "Platelets",
  bloodtype: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"
) => {
  if (type == "Plasma" || type == "Platelets") return ServiceInfo.service[type];
  else return ServiceInfo.service[type][bloodtype];
};

export const compareDates = (date: string) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  return currentDate.getDay() - postDate.getDay() > 12;
};

export const isGoodToDonate = (
  wantedDate: Date,
  lastDonationDate: Date,
  donationType: "Plasma" | "Full Blood" | "Platelets" | "Red Cells"
) => {
  if (Number.isNaN(lastDonationDate.getDay()))
    return { isable: true, nextDonationDate: 0 };
  const donationTypeMap = new Map<string, number>([
    ["Full Blood", 56],
    ["Plasma", 28],
    ["Platelets", 7],
    ["Red Cells", 112],
  ]);
  return {
    isable:
      (wantedDate.getTime() - lastDonationDate.getTime()) * 1000 * 3600 * 24 >=
      donationTypeMap.get(donationType)!,
    nextDonationDate: donationTypeMap.get(donationType) || 0,
  };
};

export const serviceInteractionChart = (
  interactions: interaction[],
  color: string
) => {
  let dupl: string = "";
  let map = new Map<string, number>();
  interactions
    .sort((a: interaction, b: interaction) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    })
    .forEach((int: interaction) => {
      const dupl: number = map.get(int.date.substring(0, 15)) || 0;
      map.set(int.date.substring(0, 15), dupl + 1);
    });
  return {
    labels: interactions
      .sort((a: interaction, b: interaction) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      })
      .filter((int: interaction) => {
        if (int.date.substring(0, 15) !== dupl) {
          dupl = int.date.substring(0, 15);
          return true;
        } else return false;
      })
      .map((int: interaction) => int.date.substring(0, 15)),
    datasets: [
      {
        label: "Number of interactions relative to date",
        fill: true,
        lineTension: 0.5,
        backgroundColor: `${color}`,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [...map.values()],
      },
    ],
  };
};
