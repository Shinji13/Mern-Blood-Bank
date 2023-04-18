import { useEffect, useRef, useState } from "react";
import styles from "./users.module.css";
import { user } from "../../../../utils/types";
import { useNavigate } from "react-router";
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

export default function Users({
  userType,
  data,
}: {
  userType: 0 | 1;
  data: user[];
}) {
  const [advanceSearch, showAdvanceSearch] = useState<boolean>(false);
  const navigate = useNavigate();
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
  const [users, setUsers] = useState<user[]>(data);

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
    setUsers(filtredUsers);
  };

  console.log(users, filterRef.current);
  return (
    <div className={styles.search}>
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
          <i className="fas fa-undo" onClick={() => setUsers(data)}></i>
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
      <div className={styles.users}>
        {users.map((el) => {
          return (
            <div
              className={styles.user}
              key={el.nationalId}
              onClick={() =>
                navigate(
                  `/${userType == 0 ? "donor" : "patient"}/${el.nationalId}`
                )
              }
            >
              <img src={`/api/static/images/${el.profileImgPath}`} />
              <div>
                <span>Full name</span>
                <span>{el.fullName.substring(0, 16)}</span>
              </div>
              <div>
                <span>National identifier</span>
                <span>{el.nationalId.substring(0, 16)}</span>
              </div>
              <div>
                <span>Blood type</span>
                <span>{el.bloodtype}</span>
              </div>
              <div>
                <span>Address</span>
                <span>{el.address.substring(0, 16)}</span>
              </div>
              <div>
                <span>Age</span>
                <span>{el.age}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
