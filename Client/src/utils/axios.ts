// @ts-nocheck
import axios from "axios";
import { sessionInfo } from "./valtioStore";

export const CustomAxios = axios.create();
CustomAxios.interceptors.request.use(async (req) => {
  const token = await refreshToken(req.navigate);
  if (null) {
    throw new axios.Cancel("back to intail load");
  }
  req.headers["authentication"] = `bear ${token}`;
  return req;
});

CustomAxios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const refreshToken = async (navigate) => {
  let newtoken: string = sessionInfo.accessToken;
  if (sessionInfo.hasExpired(sessionInfo.accessToken)) {
    try {
      const res = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });
      newtoken = res.headers["authentication"];
      sessionInfo.accessToken = newtoken;
    } catch (error) {
      navigate("/", { state: true });
      return null;
    }
  }
  return newtoken;
};
