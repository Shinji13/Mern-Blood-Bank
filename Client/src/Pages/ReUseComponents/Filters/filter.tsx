import { useRef, useState } from "react";
import { ServicePosts, interaction, user } from "../../../utils/types";
import axios from "axios";
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

export function InteractionFilter({
  isService,
  data,
  stateHandler,
  styles,
}: {
  isService: boolean;
  styles: CSSModuleClasses;
  data: interaction[];
  stateHandler: React.Dispatch<React.SetStateAction<interaction[]>>;
}) {
  const contextFilterRef = useRef<HTMLInputElement>(null);
  const dateFilterRef = useRef<HTMLInputElement>(null);
  const filter = () => {
    if (
      contextFilterRef.current?.value.length === 0 &&
      dateFilterRef.current?.value.length === 0
    )
      stateHandler(data);
    else {
      const filteredInteractions = data.filter(
        (int: interaction) =>
          (isService
            ? int.serviceName.includes(
                contextFilterRef.current?.value as string,
                0
              )
            : int.EndNationalId.name.includes(
                contextFilterRef.current?.value as string,
                0
              )) && int.date.includes(dateFilterRef.current?.value as string, 0)
      );
      stateHandler(filteredInteractions);
    }
  };
  return (
    <div className={styles.filter}>
      <div>
        <span>Search wih {isService ? " service name" : "user name"}</span>
        <input ref={contextFilterRef} type="text" onChange={filter} />
      </div>
      <div>
        <span>Search wih Date</span>
        <input ref={dateFilterRef} type="text" onChange={filter} />
      </div>
    </div>
  );
}

export function UserFilter({
  data,
  stateHandler,
  styles,
}: {
  styles: CSSModuleClasses;
  data: user[];
  stateHandler: React.Dispatch<React.SetStateAction<user[]>>;
}) {
  const [advanceSearch, showAdvanceSearch] = useState<boolean>(false);
  const [address, changeAddress] = useState<string>("");
  const [AddressOptions, SetOptions] = useState<string[]>([]);
  const filterRef = useRef<{
    bloodType: string;
    address: string;
    name: string;
    nationalId: string;
    age: number;
  }>({
    nationalId: "",
    bloodType: "",
    address: "",
    name: "",
    age: -1,
  });

  const filter = () => {
    const filtredUsers = data.filter((user) => {
      if (
        filterRef.current.nationalId != "" &&
        !user.nationalId.includes(filterRef.current.nationalId, 0)
      )
        return false;
      if (
        filterRef.current.name !== "" &&
        !user.fullName.includes(filterRef.current.name, 0)
      )
        return false;
      if (
        filterRef.current.address !== "" &&
        !user.address.includes(filterRef.current.address, 0)
      )
        return false;
      if (
        filterRef.current.bloodType !== "" &&
        user.bloodtype !== filterRef.current.bloodType
      )
        return false;
      if (filterRef.current.age !== -1 && user.age !== filterRef.current.age)
        return false;
      return true;
    });
    stateHandler(filtredUsers);
  };
  return (
    <div className={styles.filter}>
      <input
        type="text"
        placeholder="Search By name"
        onChange={(evt) => {
          filterRef.current.name = evt.target.value;
          filter();
        }}
      />
      <div>
        <i
          className="fa-solid fa-filter"
          onClick={() => showAdvanceSearch(true)}
        ></i>
        <i className="fas fa-undo" onClick={() => stateHandler(data)}></i>
      </div>
      {advanceSearch ? (
        <div className={styles.advanceSearch}>
          <i
            className="fas fa-times-circle"
            onClick={() => showAdvanceSearch(false)}
          ></i>
          <div>
            <span>National identifier</span>
            <input
              type="number"
              onChange={(evt) => {
                filterRef.current.nationalId = evt.target.value;
                filter();
              }}
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
                      filterRef.current.address =
                        evt.currentTarget.textContent || "";
                      changeAddress(evt.currentTarget.textContent || "");
                      filter();
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
          <div>
            <span>Blood type</span>
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
                  label: string;
                  value: string;
                };
                filterRef.current.bloodType = opt.value;
                filter();
              }}
            />
          </div>
          <div>
            <span>Age</span>
            <input
              type="number"
              onChange={(evt) => {
                filterRef.current.age =
                  evt.target.value == "" ? -1 : +evt.target.value;
                filter();
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export function PostFilter({
  data,
  stateHandler,
  styles,
}: {
  styles: CSSModuleClasses;
  data: ServicePosts[];
  stateHandler: React.Dispatch<React.SetStateAction<ServicePosts[]>>;
}) {
  const serviceFilterRef = useRef<HTMLInputElement>(null);
  const filterByServiceName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "" && addressFilterRef.current?.value === "")
      stateHandler(data);
    else {
      const filteredPosts = data.filter(
        (service: ServicePosts) =>
          service.name.includes(evt.target.value, 0) &&
          service.address.includes(addressFilterRef.current?.value as string, 0)
      );
      stateHandler(filteredPosts);
    }
  };
  const addressFilterRef = useRef<HTMLInputElement>(null);
  const filterByAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "" && serviceFilterRef.current?.value === "")
      stateHandler(data);
    else {
      const filteredPosts = data.filter(
        (service: ServicePosts) =>
          service.address.includes(evt.target.value, 0) &&
          service.name.includes(serviceFilterRef.current?.value as string, 0)
      );
      stateHandler(filteredPosts);
    }
  };

  return (
    <div className={styles.filter}>
      <div>
        <span>Search wih service name</span>
        <input
          ref={serviceFilterRef}
          type="text"
          onChange={filterByServiceName}
        />
      </div>
      <div>
        <span>Search wih address</span>
        <input ref={addressFilterRef} type="text" onChange={filterByAddress} />
      </div>
    </div>
  );
}
