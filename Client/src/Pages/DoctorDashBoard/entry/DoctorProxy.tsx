import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../ReUseComponents/Loading/Loading";
import Doctor from "./Doctor";
import { getDoctorInfo } from "../../../utils/apiFunctions";

export default function DoctorProxy() {
  const navigate = useNavigate();
  const [isLoading, SetLoading] = useState(true);
  const intialFetch = async () => {
    await getDoctorInfo(navigate);
    SetLoading(false);
  };

  useEffect(() => {
    intialFetch();
  }, []);

  if (isLoading) return <Loading />;
  return <Doctor />;
}
