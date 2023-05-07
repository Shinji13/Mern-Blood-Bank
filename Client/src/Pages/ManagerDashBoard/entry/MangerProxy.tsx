import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "../../DoctorDashBoard/entry/doctor.module.css";
import { StuffInfo } from "../../../utils/valtioStore";
import { useEffect, useState } from "react";
import Loading from "../../ReUseComponents/Loading/Loading";
import { getManagerInfo } from "../../../utils/apiFunctions";

export default function MangerProxy() {
  const [Menu, setMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, SetLoading] = useState(true);
  const [navView, showFullNav] = useState(false);
  const intialFetch = async () => {
    await getManagerInfo(navigate);
    SetLoading(false);
  };

  useEffect(() => {
    intialFetch();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className={styles.entry}>
      <div>
        <div>
          <span>Manager</span>
          <span>Dashboard</span>
        </div>
        <span>{StuffInfo.user.fullName}</span>
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
            <span onClick={() => navigate("/addPost")}>Create new post</span>
            <span onClick={() => navigate("/addRequest")}>
              Create new request
            </span>
            <span onClick={() => navigate("/addDoctor")}>Add new doctor</span>
            <i
              className="fas fa-times-circle"
              onClick={() => setMenu(false)}
            ></i>
          </div>
        )}
      </div>
      <div
        className={styles.nav}
        onMouseEnter={() => showFullNav(true)}
        onMouseLeave={() => showFullNav(false)}
      >
        <Link to={"/manager"} className={styles.link}>
          <i className="fa-solid fa-hand-holding-medical"></i>
          <span style={{ display: navView ? "inline-block" : "none" }}>
            Main
          </span>
        </Link>
        <Link to={"/manager/donors"} className={styles.link}>
          <i className="fa-solid fa-handshake-angle"></i>
          <span style={{ display: navView ? "inline-block" : "none" }}>
            Donors
          </span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
