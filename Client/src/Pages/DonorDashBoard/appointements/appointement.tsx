import styles from "./appointement.module.css";
import { useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { useSnapshot } from "valtio";
import { fetchAppointements, fetchServices } from "../../../utils/apiFunctions";
import { donorInfo } from "../../../utils/valtioStore";
import Loading from "../../ReUseComponents/Loading/Loading";
import Form from "./form";
import { useState } from "react";

export default function Appointement() {
  const navigate = useNavigate();
  const [errorMessage, SetErrorMessage] = useState<string>("");
  const user = useSnapshot(donorInfo);
  const [
    { isError: ServiceError, isLoading: LoadingServices, data: ServicesData },
    {
      isError: AppointementError,
      isLoading: LoadingAppointements,
      data: AppointementsData,
    },
  ] = useQueries({
    queries: [
      {
        queryFn: () => fetchServices(navigate),
        queryKey: ["services"],
        refetchIntervalInBackground: false,
        cacheTime: Infinity,
        refetchOnWindowFocus: true,
      },
      {
        queryFn: () => fetchAppointements(navigate, user.user.nationalId),
        queryKey: ["appointments"],
        refetchIntervalInBackground: true,
        cacheTime: Infinity,
        refetchOnWindowFocus: true,
      },
    ],
  });
  if (AppointementError || ServiceError) return <div>Sorry Error occured</div>;
  else if (LoadingAppointements || LoadingServices) return <Loading />;
  else
    return (
      <div className={styles.appointements}>
        <div className={styles.firstLayer}>
          <div>
            <h1>Appointements</h1>
            <h1>with services</h1>
          </div>
          <Form
            ServicesData={ServicesData?.data.services}
            styles={styles}
            ErrorHandler={SetErrorMessage}
          />
        </div>
        {errorMessage != "" ? (
          <div className={styles.errorLayer}>
            <i className="fas fa-exclamation-triangle"></i>
            <span>{errorMessage}</span>
          </div>
        ) : (
          ""
        )}
        <div className={styles.secondLayer}>
          <h1>Appointements History</h1>
          {AppointementsData?.data.appointments.map(
            (appointement: any, index: number) => (
              <div key={appointement._id}>
                <span>{index}</span>
                <div>
                  <span>Service name</span>
                  <span>{appointement.Service}</span>
                </div>
                <div>
                  <span>Donation Type</span>
                  <span>{appointement.appointmentType}</span>
                </div>
                <div>
                  <span>Status</span>
                  <span>
                    {appointement.status == 0
                      ? "Pending"
                      : appointement.status == 1
                      ? "Rejected"
                      : "Accepted"}
                  </span>
                </div>
                <div>
                  <span>Date</span>
                  <span>{appointement.date.substring(0, 24)}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
}
