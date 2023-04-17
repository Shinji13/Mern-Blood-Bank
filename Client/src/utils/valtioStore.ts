import { proxy } from "valtio";
import jwtDecode from "jwt-decode";
import { sessionIF, donor, stuffUser } from "./types";

export const sessionInfo = proxy<sessionIF>({
  userType: "undefined",
  accessToken: "",
  hasExpired: () => {
    const decodedToken: { exp: number } = jwtDecode(sessionInfo.accessToken);
    return Math.floor(new Date().getTime() / 1000) >= decodedToken.exp;
  },
});

export const donorInfo = proxy<{ user: donor }>({
  user: {
    fullName: "",
    email: "",
    nationalId: "",
    age: 18,
    bloodtype: "",
    address: "",
    profileImgPath: "",
    interactions: [],
    appointments: [],
    lastDonation: "",
    tel: "",
  },
});

export const StuffInfo = proxy<{ user: stuffUser }>({
  user: {
    fullName: "",
    nationalId: "",
    email: "",
    password: "",
    profileImgPath: "",
    serviceName: "",
    stuffType: 0,
  },
});
