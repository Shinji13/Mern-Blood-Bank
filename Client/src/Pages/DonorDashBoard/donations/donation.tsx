import { useNavigate } from "react-router-dom";
import styles from "./donation.module.css";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";
import { fetchInteractions } from "../../../utils/apiFunctions";
import { interaction } from "../../../utils/types";
import { donorInfo } from "../../../utils/valtioStore";
import { LineChart } from "../../ReUseComponents/Charts";
import Loading from "../../ReUseComponents/Loading/Loading";
import { Interactions } from "../../ReUseComponents/showInteractions/showInteractions";

export const Donations = () => {
  const user = useSnapshot(donorInfo);
  const navigate = useNavigate();
  const { isError, isLoading, data } = useQuery(
    ["interactions"],
    () => {
      return fetchInteractions(navigate, "donor", user.user.interactions);
    },
    {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      cacheTime: Infinity,
    }
  );
  const chartData = {
    labels: data?.data.interactions.map((int: interaction) =>
      int.date.substring(0, 15)
    ),
    datasets: [
      {
        label: "Donation rate",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "#d52816",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: data?.data.interactions.map((int: interaction) => int.Quantity),
      },
    ],
  };
  if (isLoading) return <Loading />;
  else if (isError) return <h1>sorry error occured</h1>;
  else
    return (
      <div className={styles.interactions}>
        <div className={styles.intro}>
          <div>
            <h1>Donations</h1>
            <h1>History</h1>
          </div>
          <div>
            <LineChart data={chartData} />
          </div>
        </div>

        <Interactions data={data?.data.interactions} isService={true} />
      </div>
    );
};
