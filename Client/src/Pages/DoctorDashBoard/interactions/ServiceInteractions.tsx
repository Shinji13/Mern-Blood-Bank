import styles from "./ServiceInteraction.module.css";
import { useSnapshot } from "valtio";
import { StuffInfo } from "../../../utils/valtioStore";
import { LineChart } from "../../ReUseComponents/Charts";
import { getServiceInteractions } from "../../../utils/apiFunctions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Loading from "../../ReUseComponents/Loading/Loading";
import { interaction } from "../../../utils/types";
import { serviceInteractionChart } from "../../../utils/utilFunctions";
import { Interactions } from "../../ReUseComponents/showInteractions/showInteractions";

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
      </div>
    );
}
