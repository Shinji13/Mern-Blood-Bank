import { ServiceInfo } from "../../../utils/valtioStore";
import { useMutation } from "@tanstack/react-query";
import { addDoctor } from "../../../utils/apiFunctions";
import styles from "./addDoctor.module.css";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { stuffUser } from "../../../utils/types";

export default function AddDoctor() {
  const [errorMessage, setError] = useState<string>("");
  const navigate = useNavigate();
  const newDoctorRef = useRef<stuffUser>({
    email: "",
    fullName: "",
    nationalId: "",
    password: "",
    stuffType: 1,
    serviceName: ServiceInfo.service.name,
  });
  const { mutate } = useMutation({
    mutationFn: () => addDoctor(navigate, newDoctorRef.current),
  });
  const createDoctor = () => {
    if (
      !/([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~])+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/.test(
        newDoctorRef.current.email
      )
    ) {
      setError("please enter valid email");
      return;
    }
    if (newDoctorRef.current.fullName.length < 6) {
      setError("please enter full name");
      return;
    }
    if (newDoctorRef.current.nationalId.length < 6) {
      setError("please enter national identifier");
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newDoctorRef.current.password!
      )
    ) {
      setError("please enter strong password");
      return;
    }
    setError("");
    mutate();
  };
  return (
    <div className={styles.add}>
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <h1>new Doctor</h1>
      <div className={styles.field}>
        <h3>
          <span>1</span> Doctor name
        </h3>
        <input
          type="text"
          onChange={(evt) => (newDoctorRef.current.fullName = evt.target.value)}
        />
      </div>
      <div className={styles.field}>
        <h3>
          <span>2</span> Doctor national identifier
        </h3>
        <input
          type="text"
          onChange={(evt) =>
            (newDoctorRef.current.nationalId = evt.target.value)
          }
        />
      </div>
      <div className={styles.field}>
        <h3>
          <span>3</span> Doctor email
        </h3>
        <input
          type="email"
          onChange={(evt) => (newDoctorRef.current.email = evt.target.value)}
        />
      </div>
      <div className={styles.field}>
        <h3>
          <span>4 </span>Doctor password
        </h3>
        <input
          type="password"
          onChange={(evt) => (newDoctorRef.current.password = evt.target.value)}
        />
      </div>
      <button onClick={createDoctor}>Create</button>
      {errorMessage != "" ? (
        <div className={styles.errorLayer}>
          <i className="fas fa-exclamation-triangle"></i>
          <span>{errorMessage}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
