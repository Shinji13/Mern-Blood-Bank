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

export interface sessionIF {
  userType: "doctor" | "manager" | "donor" | "undefined";
  accessToken: string;
  hasExpired: (token: string) => boolean;
}

export interface donor {
  fullName: string;
  email: string;
  nationalId: string;
  age: number;
  bloodtype: string;
  address: string;
  profileImgPath: string;
  interactions: string[];
  appointments: string[];
  tel: string;
}

export type interaction = {
  date: string;
  serviceName: string;
  EndNationalId: {
    name: string;
    nationalId: string;
    bloodType: string;
  };
  doctor: {
    name: string;
    nationalId: string;
  };
  Quantity: number;
  bloodtype: string;
  exchangeType: number;
  interactionNotice: string;
  _id: string;
};
