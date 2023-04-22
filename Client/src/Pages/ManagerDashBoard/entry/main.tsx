import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getServiceInteractions,
  updateBank,
} from "../../../utils/apiFunctions";
import {
  getQuantity,
  serviceInteractionChart,
} from "../../../utils/utilFunctions";
import { StuffInfo, ServiceInfo } from "../../../utils/valtioStore";
import { LineChart } from "../../ReUseComponents/Charts";
import { interaction, Quantity } from "../../../utils/types";
import styles from "./main.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../ReUseComponents/Loading/Loading";
import { useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
const storageTypes: ["Full Blood", "Red Cells", "Plasma", "Platelets"] = [
  "Full Blood",
  "Red Cells",
  "Plasma",
  "Platelets",
];

export default function Main() {
  const [popUp, showPopUp] = useState<
    "none" | "Full Blood" | "Red Cells" | "Plasma" | "Platelets"
  >("none");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    ["interactions"],
    () => getServiceInteractions(navigate, StuffInfo.user.serviceName),
    {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      cacheTime: Infinity,
    }
  );
  if (isLoading) return <Loading />;
  return (
    <div className={styles.main}>
      <h1>Profile</h1>
      <div className={styles.firstLayer}>
        <div>
          <h1>
            <span>1 </span>Service name
          </h1>
          <span>{ServiceInfo.service.name}</span>
          <h1>
            <span>2</span> Service address
          </h1>
          <span>{ServiceInfo.service.address}</span>
          <h1>
            <span>3</span> Manager name
          </h1>
          <span>{StuffInfo.user.fullName}</span>
          <h1>
            <span>4</span> Manager national identifier
          </h1>
          <span>{StuffInfo.user.nationalId}</span>
        </div>
        <div>
          <LineChart
            data={serviceInteractionChart(data?.data.interactions, "#d52816")}
          />
        </div>
      </div>
      <h1>Blood Bank Management</h1>
      <div className={styles.secondLayer}>
        {popUp != "none" ? <PopUp type={popUp} closer={showPopUp} /> : ""}
        {storageTypes.map(
          (
            storageType: "Full Blood" | "Red Cells" | "Plasma" | "Platelets"
          ) => (
            <div
              key={storageType}
              className={styles.type}
              onClick={() => showPopUp(storageType)}
            >
              <div>{storageType}</div>
            </div>
          )
        )}
      </div>
      <h1>Activities</h1>
    </div>
  );
}

const PopUp = ({
  type,
  closer,
}: {
  closer: React.Dispatch<
    React.SetStateAction<
      "Full Blood" | "Red Cells" | "Plasma" | "Platelets" | "none"
    >
  >;
  type: "Full Blood" | "Red Cells" | "Plasma" | "Platelets";
}) => {
  const [bloodType, changeType] = useState<
    "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"
  >("A+");
  const navigate = useNavigate();
  const [Quantity, setQuantity] = useState<Quantity>(
    getQuantity(type, bloodType)
  );
  const { mutate } = useMutation({
    mutationFn: () =>
      updateBank(navigate, ServiceInfo.service.name, bloodType, type, Quantity),
  });
  return (
    <div className={styles.popUp}>
      <div>
        <i className="fas fa-edit"></i>
        <h1>Modify Quantity</h1>
      </div>
      <div>
        <div className={styles.chart}>
          <h3>
            Blood exchanges that affected {type}{" "}
            {type !== "Plasma" && type !== "Platelets" ? bloodType : ""}
          </h3>
          <FilteredCharts exchangeType={type} bloodType={bloodType} />
        </div>
        <div className={styles.fields}>
          {type == "Full Blood" || type == "Red Cells" ? (
            <div>
              <h3>Blood Type</h3>
              <Select
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
                    label:
                      | "A+"
                      | "A-"
                      | "B+"
                      | "B-"
                      | "O+"
                      | "O-"
                      | "AB+"
                      | "AB-";
                    value:
                      | "A+"
                      | "A-"
                      | "B+"
                      | "B-"
                      | "O+"
                      | "O-"
                      | "AB+"
                      | "AB-";
                  };
                  changeType(opt.value);
                  setQuantity(getQuantity(type, opt.value));
                }}
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <h3>Current Quantity</h3>
            <input
              type="number"
              onChange={(evt) =>
                setQuantity((prev) => ({
                  currentQunatity: +evt.target.value,
                  miniumQuantity: prev.miniumQuantity,
                }))
              }
              value={+Quantity.currentQunatity}
            />
          </div>
          <div>
            <h3>Minimum Quantity</h3>
            <input
              type="number"
              onChange={(evt) =>
                setQuantity((prev) => ({
                  currentQunatity: prev.currentQunatity,
                  miniumQuantity: +evt.target.value,
                }))
              }
              value={+Quantity.miniumQuantity}
            />
          </div>
          <button
            onClick={() => {
              mutate();
              closer("none");
            }}
          >
            Modify
          </button>
        </div>
      </div>
      <i
        className="fa-solid fa-circle-xmark"
        id={styles.close}
        onClick={() => closer("none")}
      ></i>
    </div>
  );
};

const FilteredCharts = ({
  exchangeType,
  bloodType,
}: {
  exchangeType: "Full Blood" | "Red Cells" | "Plasma" | "Platelets";
  bloodType?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
}) => {
  const Client = useQueryClient();
  const interactions = Client.getQueryData<{
    data: { interactions: interaction[] };
  }>(["interactions"])?.data.interactions.filter((int: interaction) => {
    if (exchangeType == "Full Blood" || exchangeType == "Red Cells")
      return (
        int.bloodtype === exchangeType &&
        int.EndNationalId.bloodtype === bloodType
      );
    else return int.bloodtype === exchangeType;
  });

  return <LineChart data={serviceInteractionChart(interactions!, "#d52816")} />;
};
