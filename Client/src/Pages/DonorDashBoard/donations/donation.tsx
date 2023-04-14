import { useNavigate } from "react-router-dom";
import styles from "./donation.module.css";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { fetchInteractions } from "../../../utils/apiFunctions";
import { interaction } from "../../../utils/types";
import { donorInfo } from "../../../utils/valtioStore";

export const Donations = () => {
  const user = useSnapshot(donorInfo);
  const navigate = useNavigate();
  const [interactions, changeInteractions] = useState<interaction[]>([]);
  const { isError, isLoading, data } = useQuery(
    ["interactions"],
    () => {
      return fetchInteractions(navigate, user.user.interactions);
    },
    {
      onSuccess: (data) => {
        changeInteractions(data.data.interactions);
      },
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      cacheTime: Infinity,
    }
  );

  const serviceFilterRef = useRef<HTMLInputElement>(null);
  const dateFilterRef = useRef<HTMLInputElement>(null);
  const filterByServiceName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      evt.target.value.length === 0 &&
      dateFilterRef.current?.value.length === 0
    )
      changeInteractions(data?.data.interactions);
    else {
      const filteredInteractions = data?.data.interactions.filter(
        (int: interaction) =>
          int.serviceName.includes(evt.target.value, 0) &&
          int.date.includes(dateFilterRef.current?.value as string, 0)
      );
      changeInteractions(filteredInteractions);
    }
  };
  const filterByDate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "" && serviceFilterRef.current?.value === "")
      changeInteractions(data?.data.interactions);
    else {
      const filteredInteractions = data?.data.interactions.filter(
        (int: interaction) =>
          int.date.includes(evt.target.value, 0) &&
          int.date.includes(serviceFilterRef.current?.value as string, 0)
      );
      changeInteractions(filteredInteractions);
    }
  };
  return (
    <div className={styles.interactions}>
      <div className={styles.middleLayer}>
        <h1>Donations</h1>
      </div>
      <div className={styles.filter}>
        <div>
          <span>Search wih service name</span>
          <input
            ref={serviceFilterRef}
            type="text"
            onChange={filterByServiceName}
          />
        </div>
        <div>
          <span>Search wih Date</span>
          <input ref={dateFilterRef} type="text" onChange={filterByDate} />
        </div>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Please reload Error occured</h1>
      ) : (
        <div className={styles.list}>
          {interactions.map((el: interaction, index: number) => {
            return (
              <div
                key={el._id}
                data-id={el._id}
                onClick={() => navigate(`/interactions/${el._id}`)}
              >
                <span>{index}</span>
                <div>
                  <span>Service Name</span>
                  <span>{el.serviceName}</span>
                </div>
                <div>
                  <span>Doctor Name</span>
                  <span>{el.doctor.name}</span>
                </div>
                <div>
                  <span>Donation Type</span>
                  <span>{el.bloodtype}</span>
                </div>
                <div>
                  <span>Date of Exchange</span>
                  <span>{el.date.substring(0, 24)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
