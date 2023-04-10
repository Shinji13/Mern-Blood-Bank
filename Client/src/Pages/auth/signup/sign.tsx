import { useState, useRef } from "react";
import makeAnimated from "react-select/animated";
import styles from "./sign.module.css";
import Select from "react-select";
import { SignHandler } from "../../../utils/apiFunctions";
import { useSignUp } from "../../../utils/hooks";
const bloodTypes = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B-", label: "B-" },
  { value: "B+", label: "B+" },
  { value: "AB-", label: "AB-" },
  { value: "AB+", label: "AB+" },
  { value: "O-", label: "O-" },
  { value: "O+", label: "O+" },
];

export default function Sign() {
  const [phase, changePhase, current, error, setError, navegate] = useSignUp();
  const onCreate = async () => {
    const status = await SignHandler(current);
    status === 401
      ? setError(401)
      : status === 404
      ? setError(404)
      : navegate("/home");
  };

  const phasesUi = [
    <div className={styles.phase} key={0}>
      <div>
        <span>Full Name</span>
        <input
          defaultValue={current.fullName}
          type="text"
          onChange={(evt) => (current.fullName = evt.target.value)}
        />
      </div>
      <div>
        <span>Blood Type</span>
        <Select
          defaultValue={{
            value: current.bloodtype,
            label: current.bloodtype,
          }}
          options={bloodTypes}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "22px",
              height: "45px",
              border: "2px solid #121212",
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "12px",
              backgroundColor: "#ebaca4",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              height: "fit-content",
              borderRight: "12px",
            }),
            container: (baseStyles, state) => ({
              ...baseStyles,
              width: "100%",
              zIndex: 3,
            }),
          }}
          components={makeAnimated()}
          onChange={(optionSelected) => {
            const val = optionSelected as { label: string; value: string };
            current.bloodtype = val.value;
          }}
        />
      </div>
      <div>
        <span>Age</span>
        <input
          defaultValue={current.age.toString()}
          type="number"
          min={18}
          onChange={(evt) => (current.age = +evt.target.value)}
        />
      </div>
      <button onClick={() => changePhase((phase + 1) as 0 | 1 | 2)}>
        Next
      </button>
    </div>,
    <div className={styles.phase} key={1}>
      <div>
        <span>National Id</span>
        <input
          type="text"
          defaultValue={current.nationalId}
          onChange={(evt) => (current.nationalId = evt.target.value)}
        />
      </div>
      <div>
        <span>Email</span>
        <input
          type="email"
          defaultValue={current.email}
          onChange={(evt) => (current.email = evt.target.value)}
        />
      </div>
      <div>
        <span>Password</span>
        <input
          type="text"
          defaultValue={current.password}
          onChange={(evt) => (current.password = evt.target.value)}
        />
      </div>
      <div className={styles.middleMan}>
        <button onClick={() => changePhase((phase - 1) as 0 | 1 | 2)}>
          Back
        </button>
        <button onClick={() => changePhase((phase + 1) as 0 | 1 | 2)}>
          Next
        </button>
      </div>
    </div>,
    <div className={styles.phase} key={2}>
      <div>
        <span>Telephone number</span>
        <input
          type="text"
          defaultValue={current.tel}
          onChange={(evt) => (current.tel = evt.target.value)}
        />
      </div>
      <div>
        <span>Address</span>
        <textarea
          defaultValue={current.address}
          onChange={(evt) => (current.address = evt.target.value)}
        />
      </div>
      <div className={styles.middleMan}>
        <button onClick={() => changePhase((phase - 1) as 0 | 1 | 2)}>
          Back
        </button>
        <button onClick={onCreate}>Create Account</button>
      </div>
    </div>,
  ];
  return (
    <div className={styles.sign}>
      <div className={styles.rightSide}>
        <div>
          <h1>Bloodify</h1>
          <h3>Your journey to help people start here</h3>
        </div>
        {phasesUi[phase]}
        {error == 401 ? (
          <div>Password incorrect</div>
        ) : error == 404 ? (
          <div>user not found</div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.leftSide}>
        <div className={styles.img}></div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
