// @ts-nocheck
import axios from "axios";
import { CustomAxios } from "./axios";
import { sessionInfo, donorInfo } from "./valtioStore";
import {
  appointement,
  donorSignUpInfo,
  interaction,
  updatedDonor,
  user,
} from "./types";
import { StuffInfo } from "./valtioStore";
export const LoginHandler = async (email: string, password: string) => {
  let data = { status: 201, userType: "default" };
  try {
    let res = await axios.post("/api/auth/login", { email, password });
    sessionInfo.userType = res.data.userType;
    data.userType = res.data.userType;
    sessionInfo.accessToken = res.headers["authentication"];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response?.status) data.status = 405;
      if (error.response?.status === 503) data.status = 503;
      if (error.response?.status === 404) data.status = 404;
      if (error.response?.status === 401) data.status = 401;
    } else data.status = 503;
  } finally {
    return data;
  }
};

export const SignHandler = async (newDonor: donorSignUpInfo) => {
  let data = { status: 201, userType: "default" };
  try {
    let res = await axios.post("/api/auth/register", newDonor);
    sessionInfo.userType = res.data.userType;
    data.userType = res.data.userType;
    sessionInfo.accessToken = res.headers["authentication"];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response?.status) data.status = 405;
      if (error.response?.status === 503) data.status = 503;
      if (error.response?.status === 401) data.status = 401;
    } else data.status = 503;
  } finally {
    return data;
  }
};

export const getDonorInfo = async (navigate: any) => {
  try {
    const response = await CustomAxios.get("/api/donator", {
      navigate: navigate,
    });
    donorInfo.user = response.data;
  } catch (error) {
    navigate("/", { state: true });
  }
};

export const fetchInteractions = async (
  navigate: any,
  userType: string,
  interactions?: readonly string[],
  serviceName?: string,
  doctorId?: string
) => {
  return CustomAxios.post(
    "/api/userInteraction",
    { serviceName, doctorId, interactions, userType },
    {
      navigate: navigate,
    }
  );
};
export const fetchPosts = async (navigate: any) => {
  return CustomAxios.get("/api/donator/posts", {
    navigate: navigate,
  });
};
export const fetchServices = (navigate: any) => {
  return CustomAxios.get("/api/services", {
    navigate: navigate,
  });
};
export const fetchAppointements = (navigate: any, nationalId: string) => {
  return CustomAxios.get(`/api/donator/appointment/${nationalId}`, {
    navigate: navigate,
  });
};
export const addAppointement = async (
  navigate: any,
  appointment: appointement
) => {
  return CustomAxios.post(
    `/api/donator/appointment`,
    { appointment },
    {
      navigate: navigate,
    }
  );
};

export const updateDonor = (
  Img: File | null,
  navigate: any,
  update: updatedDonor
) => {
  const fd = new FormData();
  if (Img) fd.append("image", Img, update.profileImgPath);
  fd.append("update", JSON.stringify(update));
  return CustomAxios.put("/api/donator", fd, {
    navigate: navigate,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(() => {
    donorInfo.user.address = update.address;
    donorInfo.user.fullName = update.fullName;
    donorInfo.user.lastDonation = update.lastDonation;
    donorInfo.user.tel = update.tel;
    donorInfo.user.profileImgPath = update.profileImgPath;
  });
};

export const getStuffInfo = async (navigate: any, stuffType: boolean) => {
  try {
    const response = await CustomAxios.get(
      `/api/${stuffType ? "manager" : "doctor"}`,
      {
        navigate: navigate,
      }
    );
    StuffInfo.user = response.data;
  } catch (error) {
    navigate("/", { state: true });
  }
};

export const getServiceInteractions = (navigate: any, serviceName: string) => {
  return CustomAxios.get(`/api/doctor/interactions/${serviceName}`, {
    navigate: navigate,
  });
};

export const addInteraction = (navigate: any, interaction: interaction) => {
  return CustomAxios.post(
    "/api/doctor/interactions",
    { interaction },
    {
      navigate: navigate,
    }
  ).then(() => navigate("/doctor"));
};

export const getDonors = (navigate: any) => {
  return CustomAxios.get("/api/donators/all", {
    navigate: navigate,
  });
};

export const getPatients = (navigate: any, serviceName: string) => {
  return CustomAxios.get(`/api/doctor/patient/${serviceName}`, {
    navigate: navigate,
  });
};

export const addUser = (
  navigate: any,
  user: user,
  userType: 0 | 1,
  serviceName: string
) => {
  if (userType == 0) {
    return CustomAxios.post(
      "/api/doctor/donor",
      { user },
      {
        navigate: navigate,
      }
    ).then(() => navigate("/doctor"));
  } else {
    return CustomAxios.post(
      `/api/doctor/patient/${serviceName}`,
      { user },
      {
        navigate: navigate,
      }
    ).then(() => navigate("/doctor"));
  }
};
