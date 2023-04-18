import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { animateScroll } from "react-scroll";
import { addUser } from "../../../utils/apiFunctions";
import { user } from "../../../utils/types";
import { StuffInfo } from "../../../utils/valtioStore";
import styles from "./addUser.module.css";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { motion as m } from "framer-motion";
import makeAnimated from "react-select/animated";
import Select from "react-select";
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

export default function AddUser({ userType }: { userType: 0 | 1 }) {
  const [errorMessage, setError] = useState<string>("");
  const newUser = useRef<user>({
    fullName: "",
    nationalId: "",
    age: -1,
    bloodtype: "",
    address: "",
    tel: "",
  });
  const navigate = useNavigate();
  const [address, changeAddress] = useState<string>("");
  const [AddressOptions, SetOptions] = useState<string[]>([]);
  const { mutate } = useMutation({
    mutationFn: () =>
      addUser(navigate, newUser.current, userType, StuffInfo.user.serviceName),
    onError: (error, variables, context) => {
      setError("Your Fields are invalid for a user ");
    },
  });

  const createHandler = () => {
    //error handling
    if (newUser.current.fullName == "" || newUser.current.nationalId == "") {
      setError("Please enter identity information");
      return;
    }
    if (
      newUser.current.address == "" ||
      newUser.current.bloodtype == "" ||
      newUser.current.age == -1
    ) {
      setError("Please enter personal information");
      return;
    }
    mutate();
  };

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
      transition={{ duration: 1, ease: "linear" }}
      className={styles.add}
    >
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <h1>Creating new {userType == 0 ? "donor" : "patient"}</h1>
      <div className={styles.fields}>
        <div className={styles.identity}>
          <h3>
            <span>1</span> Indentity information
          </h3>
          <div>
            <div>
              <span>Full Name</span>
              <input
                onFocus={() => setError("")}
                type="text"
                onChange={(evt) =>
                  (newUser.current.fullName = evt.target.value)
                }
              />
            </div>
            <div>
              <span>National identificateur</span>
              <input
                onFocus={() => setError("")}
                type="text"
                onChange={(evt) =>
                  (newUser.current.nationalId = evt.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.personal}>
          <h3>
            <span>2</span>Personal information
          </h3>
          <div>
            <div>
              <span>Blood type</span>
              <Select
                onFocus={() => setError("")}
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
                    zIndex: 5,
                  }),
                }}
                options={bloodTypes}
                components={makeAnimated()}
                onChange={(optionSelected) => {
                  const opt = optionSelected as {
                    label: string;
                    value: string;
                  };
                  newUser.current.bloodtype = opt.value;
                }}
              />
            </div>
            <div>
              <span>Age</span>
              <input
                onFocus={() => setError("")}
                type="number"
                onChange={(evt) => (newUser.current.age = +evt.target.value)}
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
                          options.push(
                            res.data.features[i]?.properties.formatted
                          );
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
                        newUser.current.address =
                          evt.currentTarget.textContent || "";
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
          </div>
        </div>
        <div className={styles.contact}>
          <h3>
            <span>3</span>Contact
          </h3>
          <div>
            <div>
              <span>
                Telephone <span>(optional)</span>
              </span>
              <input
                type="number"
                onChange={(evt) => {
                  newUser.current.tel = evt.target.value;
                }}
              />
            </div>
          </div>
        </div>
        <button onClick={createHandler}>Create</button>
      </div>
      {errorMessage != "" ? (
        <div className={styles.errorLayer}>
          <i className="fas fa-exclamation-triangle"></i>
          <span>{errorMessage}</span>
        </div>
      ) : (
        ""
      )}
    </m.div>
  );
}
