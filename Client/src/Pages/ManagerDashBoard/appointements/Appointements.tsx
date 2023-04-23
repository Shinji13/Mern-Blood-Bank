import styles from "./serviceApt.module.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAppointments,
  updateAppointementStatus,
} from "../../../utils/apiFunctions";
import { useNavigate } from "react-router";
import Loading from "../../ReUseComponents/Loading/Loading";
import { appointement } from "../../../utils/types";

export default function Appointements() {
  const navigate = useNavigate;
  const { isLoading, isError, data } = useQuery<{
    data: { appointments: appointement[] };
  }>(["appointements"], () => getAppointments(navigate));
  const { mutate } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 1 | 2 }) =>
      updateAppointementStatus(navigate, id, status),
  });
  if (isError) return <h1>error occured</h1>;
  else if (isLoading) return <Loading />;
  return (
    <div className={styles.serviceApt}>
      {data.data.appointments.map((el: appointement, index: number) => {
        return (
          <div key={el._id} data-id={el._id}>
            <span>{index}</span>
            <div>
              <span>Service name</span>
              <span>{el.Service}</span>
            </div>
            <div>
              <span>Donation Type</span>
              <span>{el.appointmentType}</span>
            </div>
            <div>
              <span>Date</span>
              <span>{el.date.substring(0, 16)}</span>
            </div>
            <div>
              <span>Status</span>
              <span>
                {el.status == 0
                  ? "Pending"
                  : el.status == 1
                  ? "Rejected"
                  : "Accepted"}
              </span>
            </div>
            {el.status == 0 && (
              <div>
                <i
                  onClick={(evt) => {
                    mutate({
                      id: evt.currentTarget.parentElement?.parentElement
                        ?.dataset.id as string,
                      status: 1,
                    });
                  }}
                  className="fa-solid fa-circle-check"
                ></i>
                <i
                  onClick={(evt) => {
                    mutate({
                      id: evt.currentTarget.parentElement?.parentElement
                        ?.dataset.id as string,
                      status: 2,
                    });
                  }}
                  className="fa-solid fa-circle-xmark"
                ></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
