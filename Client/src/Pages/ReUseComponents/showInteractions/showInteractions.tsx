import { useState } from "react";
import { useNavigate } from "react-router";
import { interaction } from "../../../utils/types";
import styles from "./showInteractions.module.css";
import { sessionInfo } from "../../../utils/valtioStore";
import { InteractionFilter } from "../Filters/filter";

export const Interactions = ({
  data,
  isService,
}: {
  isService: boolean;
  data: interaction[];
}) => {
  const [interactions, changeInteractions] = useState<interaction[]>(data);
  const navigate = useNavigate();
  return (
    <div className={styles.secondLayer}>
      <InteractionFilter
        isService={isService}
        data={data}
        stateHandler={changeInteractions}
        styles={styles}
      />
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
                <span>
                  {sessionInfo.userType == "doctor"
                    ? "User name"
                    : "Service Name"}
                </span>
                <span>
                  {sessionInfo.userType == "doctor"
                    ? el.EndNationalId.name
                    : el.serviceName.substring(0, 16)}
                </span>
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
                <span>{el.date.substring(0, 16)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
