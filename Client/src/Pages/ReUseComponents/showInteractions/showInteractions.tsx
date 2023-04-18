import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { interaction } from "../../../utils/types";
import styles from "./showInteractions.module.css";

export const Interactions = ({ data }: { data: interaction[] }) => {
  const [interactions, changeInteractions] = useState<interaction[]>(data);
  const serviceFilterRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dateFilterRef = useRef<HTMLInputElement>(null);
  const filterByServiceName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      evt.target.value.length === 0 &&
      dateFilterRef.current?.value.length === 0
    )
      changeInteractions(data);
    else {
      const filteredInteractions = data.filter(
        (int: interaction) =>
          int.serviceName.includes(evt.target.value, 0) &&
          int.date.includes(dateFilterRef.current?.value as string, 0)
      );
      changeInteractions(filteredInteractions);
    }
  };
  const filterByDate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "" && serviceFilterRef.current?.value === "")
      changeInteractions(data);
    else {
      const filteredInteractions = data.filter(
        (int: interaction) =>
          int.date.includes(evt.target.value, 0) &&
          int.date.includes(serviceFilterRef.current?.value as string, 0)
      );
      changeInteractions(filteredInteractions);
    }
  };

  return (
    <div className={styles.secondLayer}>
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
      <div className={styles.list}>
        {interactions.map((el: interaction, index: number) => {
          return (
            <div
              key={el._id}
              data-id={el._id}
              onClick={() => navigate(`/interactions/${el._id}`)}
            >
              <span>{index + 1}</span>
              <div>
                <span>Service Name</span>
                <span>{el.serviceName.substring(0, 16)}</span>
              </div>
              <div>
                <span>Doctor Name</span>
                <span>{el.doctor.name.substring(0, 16)}</span>
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
    </div>
  );
};
