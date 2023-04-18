import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getPatients } from "../../../../utils/apiFunctions";
import Loading from "../../Loading/Loading";
import Users from "../usersSearch/Users";
import { StuffInfo } from "../../../../utils/valtioStore";
import styles from "./showPatients.module.css";
export default function ShowPatients() {
  const navigate = useNavigate();
  const { isError, isLoading, data } = useQuery(
    ["patients"],
    () => getPatients(navigate, StuffInfo.user.serviceName),
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
      <div className={styles.patients}>
        <div className={styles.middleLayer}>
          <h1>Blood Patients</h1>
        </div>
        <Users userType={1} data={data.data.patients} />
      </div>
    );
}
