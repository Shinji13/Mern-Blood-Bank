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

export type updatedDonor = {
  fullName: string;
  tel: string;
  address: string;
  lastDonation: string;
  profileImgPath: string;
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

export type post = { message: string; date: string; _id: string };

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
