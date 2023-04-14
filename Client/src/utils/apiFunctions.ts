// @ts-nocheck
import axios from "axios";
import { CustomAxios } from "./axios";
import { sessionInfo, donorInfo } from "./valtioStore";
import { donorSignUpInfo } from "./types";
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
  interactions?: readonly string[],
  serviceName?: string,
  doctorId?: string
) => {
  return CustomAxios.post(
    "/api/userInteraction",
    { serviceName, doctorId, interactions },
    {
      navigate: navigate,
    }
  );
};
