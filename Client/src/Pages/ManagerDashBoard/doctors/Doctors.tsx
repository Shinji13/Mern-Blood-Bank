import { useNavigate } from "react-router";
import { getDoctors } from "../../../utils/apiFunctions";
import styles from "./doctor.module.css";
import { useQuery } from "@tanstack/react-query";
import { stuffUser } from "../../../utils/types";
import Loading from "../../ReUseComponents/Loading/Loading";

export default function Doctors() {
  const navigate = useNavigate();
  const { isError, isLoading, data } = useQuery<{
    data: { doctors: stuffUser[] };
  }>(["doctors"], () => getDoctors(navigate));
  if (isError) return <h1>error occured</h1>;
  else if (isLoading) return <Loading />;
  return (
    <div className={styles.doctors}>
      {data.data.doctors.map((el: stuffUser, index: number) => {
        return (
          <div
            key={el.nationalId}
            onClick={() => navigate(`/doctors/${el.nationalId}/${el.fullName}`)}
          >
            <span>{index}</span>
            <div>
              <span>Full name</span>
              <span>{el.fullName}</span>
            </div>
            <div>
              <span>National identifier</span>
              <span>{el.nationalId}</span>
            </div>
            <div>
              <span>Email</span>
              <span>{el.email}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
