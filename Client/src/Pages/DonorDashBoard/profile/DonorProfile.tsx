import styles from "./DonorProfile.module.css";
import { m } from "framer-motion";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { fetchInteractions } from "../../../utils/apiFunctions";
import { interaction } from "../../../utils/types";
import { donorInfo } from "../../../utils/valtioStore";

export default function DonorProfile() {
  return <div className={styles.profile}></div>;
}
