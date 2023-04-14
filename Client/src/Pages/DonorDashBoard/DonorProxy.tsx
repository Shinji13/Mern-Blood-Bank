import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../Redirect/Loading";
import Donor from "./Donor";
import { getDonorInfo } from "../../utils/apiFunctions";

export default function DonorProxy() {
  const navigate = useNavigate();
  const [isLoading, SetLoading] = useState(true);
  const intialFetch = async () => {
    await getDonorInfo(navigate);
    SetLoading(false);
  };

  useEffect(() => {
    intialFetch();
  }, []);

  if (isLoading) return <Loading />;
  return <Donor />;
}
