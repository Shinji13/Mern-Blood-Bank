import { proxy } from "valtio";
import jwtDecode from "jwt-decode";
import { sessionIF, donor, stuffUser, service } from "./types";

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
    profileImgPath: "",
    serviceName: "",
    stuffType: 0,
  },
});

export const ServiceInfo = proxy<{ service: service }>({
  service: {
    name: "",
    address: "",
    manageNationalId: "",
    doctors: [],
    "Red Cells": {
      "A+": { currentQunatity: 0, miniumQuantity: 0 },
      "A-": { currentQunatity: 0, miniumQuantity: 0 },
      "B+": { currentQunatity: 0, miniumQuantity: 0 },
      "B-": { currentQunatity: 0, miniumQuantity: 0 },
      "O+": { currentQunatity: 0, miniumQuantity: 0 },
      "O-": { currentQunatity: 0, miniumQuantity: 0 },
      "AB+": { currentQunatity: 0, miniumQuantity: 0 },
      "AB-": { currentQunatity: 0, miniumQuantity: 0 },
    },
    "Full Blood": {
      "A+": { currentQunatity: 0, miniumQuantity: 0 },
      "A-": { currentQunatity: 0, miniumQuantity: 0 },
      "B+": { currentQunatity: 0, miniumQuantity: 0 },
      "B-": { currentQunatity: 0, miniumQuantity: 0 },
      "O+": { currentQunatity: 0, miniumQuantity: 0 },
      "O-": { currentQunatity: 0, miniumQuantity: 0 },
      "AB+": { currentQunatity: 0, miniumQuantity: 0 },
      "AB-": { currentQunatity: 0, miniumQuantity: 0 },
    },
    Plasma: { currentQunatity: 0, miniumQuantity: 0 },
    Platelets: { currentQunatity: 0, miniumQuantity: 0 },
    posts: [],
    requests: [],
    interactions: [],
    appointments: [],
    _id: "",
  },
});
