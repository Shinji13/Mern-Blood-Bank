import axios from "axios";
import { sessionInfo } from "./valtioStore";
import { donorSignUpInfo } from "./types";
export const LoginHandler = async (email: string, password: string) => {
  let status = 201;
  try {
    let res = await axios.post("/api/auth/login", { email, password });
    sessionInfo.userId = res.data.userId;
    sessionInfo.userType = res.data.userType;
    sessionInfo.accessToken = res.headers["authentication"];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response?.status) status = 405;
      if (error.response?.status === 503) status = 503;
      if (error.response?.status === 404) status = 404;
      if (error.response?.status === 401) status = 401;
    } else status = 503;
  } finally {
    return status;
  }
};

export const SignHandler = async (newDonor: donorSignUpInfo) => {
  let status = 201;
  try {
    let res = await axios.post("/api/auth/register", newDonor);
    sessionInfo.userId = res.data.userId;
    sessionInfo.userType = res.data.userType;
    sessionInfo.accessToken = res.headers["authentication"];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response?.status) status = 405;
      if (error.response?.status === 503) status = 503;
      if (error.response?.status === 404) status = 404;
      if (error.response?.status === 401) status = 401;
    } else status = 503;
  } finally {
    return status;
  }
};
