import { useQueryClient } from "@tanstack/react-query";
import styles from "./interaction.module.css";
import backArrow from "../../assets/images/arrow-left-solid.svg";
import { interaction } from "../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import { useEffect } from "react";
import { animateScroll } from "react-scroll";

export default function Interaction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const Client = useQueryClient();
  const interaction = Client.getQueryData<{
    data: { interactions: interaction[] };
  }>(["interactions"])?.data.interactions.filter(
    (int) => int._id == (id as string)
  )[0];

  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
      smooth: true,
    });
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "linear" }}
      className={styles.interaction}
    >
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.middleLayer}>
        <h1>Donations</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.doctor}>
          <div>
            <span>1</span>
            <h3>Doctor that mangaged the donation</h3>
          </div>
          <div>
            <div>
              <span>Name</span>
              <span>{interaction?.doctor.name}</span>
            </div>
            <div>
              <span>National Identificateur</span>
              <span>{interaction?.doctor.nationalId}</span>
            </div>
            <div>
              <span>Service</span>
              <span>{interaction?.serviceName}</span>
            </div>
          </div>
        </div>
        <div className={styles.endUser}>
          <div>
            <span>2</span>
            <h3>
              {interaction?.exchangeType == 0
                ? "Donor that give the blood"
                : "Patient that took the blood"}
            </h3>
          </div>
          <div>
            <div>
              <span>Name</span>
              <span>{interaction?.EndNationalId.name}</span>
            </div>
            <div>
              <span>National Identificateur</span>
              <span>{interaction?.EndNationalId.nationalId}</span>
            </div>
            <div>
              <span>Blood Type</span>
              <span>{interaction?.EndNationalId.bloodType}</span>
            </div>
          </div>
        </div>
        <div className={styles.extra}>
          <div>
            <span>3</span>
            <h3>Blood exchange information</h3>
          </div>
          <div>
            <div>
              <span>Type</span>
              <span>{interaction?.bloodtype}</span>
            </div>
            <div>
              <span>Quantity</span>
              <span>{interaction?.Quantity}</span>
            </div>
          </div>
        </div>
        <div className={styles.note}>
          <div>
            <span>4</span>
            <h3>Blood exchange note</h3>
          </div>
          <p>{interaction?.interactionNotice}</p>
        </div>
      </div>
    </m.div>
  );
}
