import { type } from "os";

export type donorSignUpInfo = {
  fullName: string;
  nationalId: string;
  email: string;
  address: string;
  password: string;
  tel: string;
  bloodtype: string;
  age: Number;
};

export type update = {
  tel: string;
  address: string;
  profileImgPath: string;
  lastDonation?: string;
  healthStatus?: string;
};

export interface donor {
  fullName: string;
  email: string;
  nationalId: string;
  age: number;
  bloodtype: string;
  address: string;
  interactions: string[];
  profileImgPath: string;
  appointments?: string[];
  tel: string;
  lastDonation: string;
}

export interface sessionIF {
  userType: "doctor" | "manager" | "donor" | "undefined";
  accessToken: string;
  hasExpired: (token: string) => boolean;
}

export type interaction = {
  date: string;
  serviceName: string;
  EndNationalId: {
    name: string;
    nationalId: string;
    bloodtype: string;
  };
  doctor: {
    name: string;
    nationalId: string;
  };
  Quantity: number;
  bloodtype: string;
  exchangeType: number;
  interactionNotice: string;
  _id?: string;
};

export type ServicePosts = {
  posts: post[];
  name: string;
  address: string;
};

export type post = { message: string; date: string; id: string };

export type appointement = {
  Service: string;
  donor: string;
  date: string;
  status: number;
  appointmentType:
    | "Plasma"
    | "Full Blood"
    | "Platelets"
    | "Red Cells"
    | "not Set";
};

export type stuffUser = {
  fullName: string;
  nationalId: string;
  email: string;
  profileImgPath: string;
  serviceName: string;
  stuffType: 0 | 1;
};

export type user = {
  fullName: string;
  nationalId: string;
  age: number;
  bloodtype: string;
  address: string;
  interactions?: string[];
  profileImgPath?: string;
  tel: string;
  lastDonation?: string;
  healthStatus?: string;
};

export type Quantity = {
  currentQunatity: Number;
  miniumQuantity: Number;
};
export type bloodTypesQunatity = {
  "A+": Quantity;
  "A-": Quantity;
  "B+": Quantity;
  "B-": Quantity;
  "AB+": Quantity;
  "AB-": Quantity;
  "O+": Quantity;
  "O-": Quantity;
};

export type service = {
  name: string;
  address: string;
  manageNationalId: string;
  doctors: string[];
  "Red Cells": bloodTypesQunatity;
  "Full Blood": bloodTypesQunatity;
  Plasma: Quantity;
  Platelets: Quantity;
  posts: post[];
  requests: string[];
  interactions: string[];
  appointments: string[];
  _id: string;
};
