import makeAnimated from "react-select/animated";
import styles from "./sign.module.css";
import Select from "react-select";
import { SignHandler } from "../../../utils/apiFunctions";
import { useSignUp } from "../../../utils/hooks";
import { useState } from "react";
import axios from "axios";
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
  const [AddressOptions, SetOptions] = useState<string[]>([]);
  const [address, changeAddress] = useState<string>("");
  const onCreate = async () => {
    const data = await SignHandler(current);
    data.status === 201
      ? navegate(`/${data.userType}`)
      : data.status === 401
      ? setError(401)
      : data.status === 404
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
          styles={{
            indicatorSeparator: (base, props) => ({
              ...base,
              display: "none",
            }),
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
              width: "100%",
            }),
            container: (baseStyles, state) => ({
              ...baseStyles,
              width: "100%",
              zIndex: 3,
            }),
          }}
          options={bloodTypes}
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
          type="password"
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
        <div className={styles.address}>
          <input
            value={address}
            onChange={(evt) => {
              changeAddress(evt.target.value);
              axios
                .get(
                  `https://api.geoapify.com/v1/geocode/autocomplete?text=${
                    evt.target.value
                  }&apiKey=${
                    import.meta.env.VITE_ADDRESS_AUTO_COMPLETE_API_KEY
                  }`
                )
                .then((res) => {
                  const options = [];

                  for (let i = 0; i < 4; i++) {
                    if (res.data.features.length <= i) break;
                    options.push(res.data.features[i]?.properties.formatted);
                  }
                  SetOptions(options);
                })
                .catch((err) => SetOptions([]));
            }}
          />
          <ul>
            {AddressOptions.map((el) => (
              <li
                onClick={(evt) => {
                  current.address = evt.currentTarget.textContent || "";
                  changeAddress(evt.currentTarget.textContent || "");
                  SetOptions([]);
                }}
                key={el}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
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
        {error == 401 && <div>user already exist</div>}
      </div>
      <div className={styles.leftSide}>
        <div className={styles.img}></div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
