import styles from "./ServiceInteraction.module.css";
import { useSnapshot } from "valtio";
import { StuffInfo } from "../../../utils/valtioStore";
import { LineChart } from "../../ReUseComponents/Charts";
import { getServiceInteractions } from "../../../utils/apiFunctions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Loading from "../../ReUseComponents/Loading/Loading";
import { useRef, useState } from "react";
import { interaction } from "../../../utils/types";
import { serviceInteractionChart } from "../../../utils/utilFunctions";

export default function ServiceInteractions() {
  const navigate = useNavigate();
  const user = useSnapshot(StuffInfo);
  const { data, isError, isLoading } = useQuery(
    ["interactions"],
    () => getServiceInteractions(navigate, user.user.serviceName),
    {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      cacheTime: Infinity,
    }
  );

  if (isLoading) return <Loading />;
  else if (isError) return <h1>sorry error occured</h1>;
  else
    return (
      <div className={styles.SVI}>
        <div>
          <div>
            <h1>{user.user.serviceName}</h1>
            <h1>Interactions</h1>
          </div>
          <div>
            <LineChart data={serviceInteractionChart(data)} />
          </div>
        </div>
        <Interactions data={data.data.interactions as interaction[]} />
        <i className="fa-solid fa-circle-plus" id={styles.add}></i>
      </div>
    );
}

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
    </div>
  );
};
