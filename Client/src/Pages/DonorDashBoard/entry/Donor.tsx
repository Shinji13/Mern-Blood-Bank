import styles from "./donor.module.css";
import { Outlet, Link } from "react-router-dom";
import { motion as m } from "framer-motion";

export default function Donor() {
  return (
    <div className={styles.entry}>
      <div className={styles.nav}>
        <div>
          <m.span
            initial={{ y: "100%" }}
            animate={{ y: "0" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            Donor
          </m.span>
          <m.span
            initial={{ y: "100%" }}
            animate={{ y: "0" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            DashBoard
          </m.span>
        </div>
        <div className={styles.activities}>
          <Link to={"/donor"}>
            <span>Profile</span>
          </Link>
          <Link to={"/donor/donations"}>
            <span>Donations History</span>
          </Link>
          <Link to={"/donor/posts"}>
            <span>Services Posts</span>
          </Link>
          <Link to={"/donor/appointements"}>
            <span>Appointements</span>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
