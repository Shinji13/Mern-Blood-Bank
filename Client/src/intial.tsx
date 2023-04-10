import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Pages/home/Home";
import { sessionInfo } from "./utils/valtioStore";
import Loading from "./Pages/Redirect/Loading";
import Doctor from "./Pages/DoctorDashBoard/Doctor";
import Donor from "./Pages/DonorDashBoard/Donor";
import Manager from "./Pages/ManagerDashBoard/Manager";
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
      sessionInfo.userId = res.data.userId;
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

  if (isError) return <Home />;
  if (isLoading) return <Loading />;
  else {
    if (sessionInfo.userType === "manager") return <Manager />;
    if (sessionInfo.userType === "doctor") return <Doctor />;
    else return <Donor />;
  }
}
