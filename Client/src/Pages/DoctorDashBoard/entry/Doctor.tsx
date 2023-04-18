import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./doctor.module.css";
import { useState } from "react";
import { StuffInfo } from "../../../utils/valtioStore";

export default function Doctor() {
  const navigate = useNavigate();
  const [Menu, setMenu] = useState<boolean>(false);
  const [navView, showFullNav] = useState(false);
  return (
    <div className={styles.entry}>
      <div>
        <div>
          <span>Doctor</span>
          <span>Dashboard</span>
        </div>
        <span>{StuffInfo.user.fullName}</span>
      </div>
      <div
        className={styles.nav}
        onMouseEnter={() => showFullNav(true)}
        onMouseLeave={() => showFullNav(false)}
      >
        <Link to={"/doctor"} className={styles.link}>
          <i className="fa-solid fa-hand-holding-medical"></i>
          <span style={{ display: navView ? "inline-block" : "none" }}>
            Interactions
          </span>
        </Link>
        <Link to={"/doctor/patients"} className={styles.link}>
          <i className="fa-solid fa-hospital-user"></i>
          <span style={{ display: navView ? "inline-block" : "none" }}>
            Patients
          </span>
        </Link>
        <Link to={"/doctor/donors"} className={styles.link}>
          <i className="fa-solid fa-handshake-angle"></i>
          <span style={{ display: navView ? "inline-block" : "none" }}>
            Donors
          </span>
        </Link>
      </div>
      <div>
        {!Menu ? (
          <i
            className="fa-solid fa-circle-plus"
            id={styles.add}
            onClick={() => setMenu(true)}
          ></i>
        ) : (
          <div className={styles.menu}>
            <span onClick={() => navigate("/addDonor")}>add Donor User</span>
            <span onClick={() => navigate("/addPatient")}>
              add Patient User
            </span>
            <span onClick={() => navigate("/addInteraction")}>
              add Interaction
            </span>
            <i
              className="fas fa-times-circle"
              onClick={() => setMenu(false)}
            ></i>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
