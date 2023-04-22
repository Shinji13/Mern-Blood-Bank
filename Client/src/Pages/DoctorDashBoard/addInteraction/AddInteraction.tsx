import styles from "./add.module.css";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { animateScroll } from "react-scroll";
import makeAnimated from "react-select/animated";
import { interaction } from "../../../utils/types";
import { addInteraction } from "../../../utils/apiFunctions";
import { useMutation } from "@tanstack/react-query";
import { StuffInfo } from "../../../utils/valtioStore";
import Select from "react-select";
import { useSnapshot } from "valtio";

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

export default function AddInteraction() {
  const [errorMessage, setError] = useState<string>("");
  const user = useSnapshot(StuffInfo);
  const newInteraction = useRef<interaction>({
    date: "",
    serviceName: user.user.serviceName,
    EndNationalId: {
      name: "default",
      nationalId: "",
      bloodtype: "a+",
    },
    doctor: {
      name: "",
      nationalId: "",
    },
    Quantity: -1,
    bloodtype: "",
    exchangeType: 3,
    interactionNotice: "",
  });
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => addInteraction(navigate, newInteraction.current),
    onError: (error, variables, context) => {
      setError("You have to create user first.");
    },
  });

  const createHandler = () => {
    //error handling
    if (newInteraction.current.EndNationalId.nationalId == "") {
      setError("Please enter user national identifier");
      return;
    }
    if (
      newInteraction.current.doctor.name == "" ||
      newInteraction.current.doctor.nationalId == ""
    ) {
      setError("Please enter doctor information");
      return;
    }
    if (
      newInteraction.current.Quantity == -1 ||
      newInteraction.current.bloodtype == "" ||
      newInteraction.current.date == ""
    ) {
      setError("Please enter interaction information");
      return;
    }
    if (newInteraction.current.exchangeType == 3) {
      setError("Please enter type of operation");
      return;
    }
    if (newInteraction.current.interactionNotice.length < 20) {
      setError("Please enter a note with at least 20 characters");
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
      transition={{ duration: 1.2, ease: "linear" }}
      className={styles.add}
    >
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.fields}>
        <div className={styles.user}>
          <h3>
            <span>1</span> User information
          </h3>
          <div>
            <div>
              <span>National identificateur</span>
              <input
                onFocus={() => setError("")}
                type="text"
                onChange={(evt) =>
                  (newInteraction.current.EndNationalId.nationalId =
                    evt.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h3>
            <span>2</span>Interaction information
          </h3>
          <div>
            <div>
              <span>Quantity transformed in Liters</span>
              <input
                onFocus={() => setError("")}
                type="text"
                onChange={(evt) =>
                  (newInteraction.current.Quantity = +evt.target.value)
                }
              />
            </div>
            <div>
              <span>Date of transform</span>
              <input
                onFocus={() => setError("")}
                type="date"
                onChange={(evt) =>
                  (newInteraction.current.date = new Date(
                    evt.target.value
                  ).toString())
                }
              />
            </div>
            <div>
              <span>Type of transformed</span>
              <Select
                onFocus={() => setError("")}
                options={[
                  { label: "Red Cells", value: "Red Cells" },
                  { label: "Plasma", value: "Plasma" },
                  { label: "Full Blood", value: "Full Blood" },
                  { label: "Platelets", value: "Platelets" },
                ]}
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
                  }),
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "100%",
                    zIndex: 4,
                  }),
                }}
                components={makeAnimated()}
                onChange={(optionSelected) => {
                  const val = optionSelected as {
                    label: string;
                    value: string;
                  };
                  newInteraction.current.bloodtype = val.value;
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.doctor}>
          <h3>
            <span>3</span> Doctor information
          </h3>
          <div>
            <div>
              <span>Name</span>
              <input
                onFocus={() => setError("")}
                type="text"
                onChange={(evt) =>
                  (newInteraction.current.doctor.name = evt.target.value)
                }
              />
            </div>
            <div>
              <span>National identificateur</span>
              <input
                onFocus={() => setError("")}
                type="text"
                onChange={(evt) =>
                  (newInteraction.current.doctor.nationalId = evt.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div>
          <h3>
            <span>4</span> Type of operation{" "}
          </h3>
          <Select
            onFocus={() => setError("")}
            options={[
              { label: "donation", value: "donation" },
              { label: "planting", value: "planting" },
            ]}
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
              }),
              container: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                zIndex: 4,
              }),
            }}
            components={makeAnimated()}
            onChange={(optionSelected) => {
              const val = optionSelected as {
                label: string;
                value: string;
              };
              newInteraction.current.exchangeType =
                val.value === "donation" ? 0 : 1;
            }}
          />
        </div>
        <div>
          <h3>
            <span>5</span> Interaction note
          </h3>
          <textarea
            onFocus={() => setError("")}
            onChange={(evt) =>
              (newInteraction.current.interactionNotice = evt.target.value)
            }
          ></textarea>
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
