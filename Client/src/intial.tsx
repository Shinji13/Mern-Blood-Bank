import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sessionInfo } from "./utils/valtioStore";
import { Navigate } from "react-router-dom";
import Loading from "./Pages/Redirect/Loading";

export default function Intial() {
  const [isError, SetError] = useState(false);
  const [isLoading, SetLoading] = useState(true);
  const location = useLocation();
  const intialFetch = async () => {
    try {
      const res = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });
      sessionInfo.accessToken = res.headers["authentication"];
      sessionInfo.userType = res.data.userType;
    } catch (error) {
      return SetError(true);
    }
    SetLoading(false);
  };

  useEffect(() => {
    let check = location.state;
    if (check) SetError(true);
    else intialFetch();
  }, []);

  if (isError) return <Navigate to={"/home"} />;
  if (isLoading) return <Loading />;
  else {
    if (sessionInfo.userType === "manager") return <Navigate to={"/manager"} />;
    if (sessionInfo.userType === "doctor") return <Navigate to={"/doctor"} />;
    else return <Navigate to={"/donor"} />;
  }
}
