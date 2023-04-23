import { useNavigate, useParams } from "react-router";
import styles from "./uniqueDoctor.module.css";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInteractions } from "../../../utils/apiFunctions";
import { ServiceInfo } from "../../../utils/valtioStore";
import { interaction } from "../../../utils/types";
import Loading from "../../ReUseComponents/Loading/Loading";
import { Interactions } from "../../ReUseComponents/showInteractions/showInteractions";

export default function UniqueDoctor() {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [updateMode, changeMode] = useState<boolean>(false);
  const newPassRef = useRef<HTMLInputElement>(null);
  const { isLoading, isError, data } = useQuery<{
    data: { interactions: interaction[] };
  }>(["interactions", id], () =>
    fetchInteractions(
      navigate,
      "stuff",
      undefined,
      ServiceInfo.service.name,
      id
    )
  );
  return (
    <div className={styles.doctor}>
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.update}>
        <h1>{name}</h1>
        {!updateMode ? (
          <div className={styles.mode1}>
            <button onClick={() => changeMode(true)}>Reset Password</button>
            <button>Delete</button>
          </div>
        ) : (
          <div className={styles.mode2}>
            <input
              type="password"
              ref={newPassRef}
              placeholder="Reset password"
            />
            <button onClick={() => changeMode(false)}>Cancel</button>
            <button>Confirm</button>
          </div>
        )}
      </div>
      <h1>Doctor interactions</h1>
      {isError ? (
        <h1>error happed</h1>
      ) : isLoading ? (
        <Loading />
      ) : (
        <Interactions isService={false} data={data.data.interactions} />
      )}
    </div>
  );
}
