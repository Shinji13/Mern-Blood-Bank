export const appear = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, mode: "spring" } },
};

export const imgGrow = {
  hidden: { width: "0" },
  visible: { width: "36%", transition: { duration: 1, mode: "spring" } },
};

export const textUp = {
  hidden: { y: "80%" },
  visible: { y: "0", transition: { duration: 1, mode: "spring" } },
};
