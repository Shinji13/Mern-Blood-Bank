import styles from "./showDonors.module.css";
import { getDonors } from "../../../../utils/apiFunctions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Loading from "../../Loading/Loading";
import Users from "../usersSearch/Users";

export default function ShowDonors() {
  const navigate = useNavigate();
  const { isError, isLoading, data } = useQuery(
    ["donors"],
    () => getDonors(navigate),
    {
      cacheTime: Infinity,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) return <Loading />;
  else if (isError) return <h1>sorry error occured</h1>;
  else
    return (
      <div className={styles.donors}>
        <div className={styles.middleLayer}>
          <h1>Blood Donors</h1>
        </div>
        <Users userType={0} data={data.data.donors} />
      </div>
    );
}
