import { useRef, useState } from "react";
import Select from "react-select";
import { appointement } from "../../../utils/types";
import { useSnapshot } from "valtio";
import { donorInfo } from "../../../utils/valtioStore";
import makeAnimated from "react-select/animated";
import { addAppointement } from "../../../utils/apiFunctions";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isGoodToDonate } from "../../../utils/utilFunctions";

export default function Form({
  ServicesData,
  styles,
  ErrorHandler,
}: {
  ServicesData: { name: string; address: string }[];
  styles: CSSModuleClasses;
  ErrorHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();
  const [selectedService, changeSelectedService] = useState("");
  const user = useSnapshot(donorInfo);
  const [options, SetOptions] = useState<string[]>([]);
  const time = useRef<{ day: string; hour: string }>({ day: "", hour: "" });
  const newAppointement = useRef<appointement>({
    appointmentType: "not Set",
    date: "",
    donor: user.user.nationalId,
    Service: "",
    status: 0,
  });
  const { mutate } = useMutation({
    mutationFn: () => addAppointement(navigate, newAppointement.current),
  });

  const createHandler = () => {
    if (newAppointement.current.Service === "") {
      ErrorHandler("Please insert the Service Name for this appointement");
      return;
    } else if (newAppointement.current.appointmentType == "not Set") {
      ErrorHandler("Please insert the appointement type");
      return;
    } else if (time.current.day === "") {
      ErrorHandler("Please insert the day of appointement");
      return;
    } else if (time.current.hour === "") {
      ErrorHandler("Please insert the hour of appointement");
      return;
    } else if (+time.current.day <= new Date().getDay()) {
      ErrorHandler("You must insert a day thats after the current day");
      return;
    }
    let today = new Date();
    let myToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      +time.current.day,
      +time.current.hour,
      0,
      0
    );
    newAppointement.current.date = myToday.toString();
    const donationAbility = isGoodToDonate(
      myToday,
      new Date(user.user.lastDonation),
      newAppointement.current.appointmentType
    );
    if (donationAbility.isable) {
      mutate();
      ErrorHandler("");
    } else
      ErrorHandler(
        `You last donated ${user.user.lastDonation.substring(0, 16)} and ${
          newAppointement.current.appointmentType
        } needs ${donationAbility.nextDonationDate} days to do donate again`
      );
  };
  return (
    <div className={styles.form}>
      <div className={styles.service}>
        <span>Select Service</span>
        <input
          onFocus={() => ErrorHandler("")}
          value={selectedService}
          onChange={(evt) => {
            const options =
              evt.target.value === ""
                ? []
                : ServicesData.filter(
                    (service: { name: string; address: string }) => {
                      return service.name.includes(evt.target.value, 0);
                    }
                  ).map(
                    (service: { name: string; address: string }) => service.name
                  );
            SetOptions(options);
          }}
        />
        <ul>
          {options.map((el) => (
            <li
              onClick={(evt) => {
                newAppointement.current.Service =
                  evt.currentTarget.textContent || "";
                changeSelectedService(evt.currentTarget.textContent || "");
                SetOptions([]);
              }}
              key={el}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.donationType}>
        <span>Donation Type</span>
        <Select
          onFocus={() => ErrorHandler("")}
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
            newAppointement.current.appointmentType = val.value as
              | "Plasma"
              | "Full Blood"
              | "Platelets"
              | "Red Cells";
          }}
        />
      </div>
      <div className={styles.time}>
        <div>
          <span>Day</span>
          <Select
            onFocus={() => ErrorHandler("")}
            options={(() => {
              const options: { label: string; value: string }[] = [];
              for (let i = new Date().getDay(); i <= 30; i++) {
                options.push({ label: `${i}`, value: `${i}` });
              }
              return options;
            })()}
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
                width: "100%",
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
              const val = optionSelected as {
                label: string;
                value: string;
              };
              time.current.day = val.value;
            }}
          />
        </div>
        <div>
          <span>Hour</span>
          <Select
            onFocus={() => ErrorHandler("")}
            options={(() => {
              const options: { label: string; value: string }[] = [];
              for (let i = 9; i <= 16; i++) {
                options.push({ label: `${i}`, value: `${i}` });
              }
              return options;
            })()}
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
                width: "100%",
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
              const val = optionSelected as {
                label: string;
                value: string;
              };
              time.current.hour = val.value;
            }}
          />
        </div>
      </div>
      <button onClick={createHandler}>Create</button>
    </div>
  );
}
