import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { update, user } from "../../../utils/types";
import styles from "./updatePatient.module.css";
import { useNavigate } from "react-router-dom";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { updatePatient } from "../../../utils/apiFunctions";
import { useRef, useState } from "react";
import { UUID } from "uuidjs";
import axios from "axios";
import { StuffInfo } from "../../../utils/valtioStore";

export default function UpdatePatient() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { id } = useParams();
  const user = client
    .getQueryData<{ data: { patients: user[] } }>(["patients"])
    ?.data.patients.filter((patient) => patient.nationalId == id)[0]!;
  const [errorMessage, setError] = useState<string>("");
  const [ImgSrc, changeSrc] = useState<string>(
    `/api/static/images/${user.profileImgPath}?${new Date().getTime()}`
  );
  const [AddressOptions, SetOptions] = useState<string[]>([]);
  const [address, changeAddress] = useState<string>(user.address);
  const [Img, changeImg] = useState<File | null>(null);
  const updateRef = useRef<update>({
    address: user.address,
    profileImgPath: user.profileImgPath as string,
    tel: user.tel,
    healthStatus: user.healthStatus as string,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      updatePatient(
        navigate,
        Img,
        updateRef.current,
        StuffInfo.user.serviceName,
        user.nationalId
      ),
  });
  return (
    <div className={styles.health}>
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.secondLayer}>
        <div className={styles.dynamic}>
          <div>
            <img src={ImgSrc} />
            <label htmlFor="image">
              <div>
                <i className="fas fa-file-upload"></i>
                <span>Upload An Image</span>
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={(evt) => {
                changeSrc(URL.createObjectURL(evt.target.files![0]));
                changeImg(evt.target.files![0]);
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
                      updateRef.current.address =
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
          <div>
            <span>Telephone</span>
            <input
              defaultValue={user.tel}
              type="number"
              onChange={(evt) => (updateRef.current.tel = evt.target.value)}
            />
          </div>
          <textarea
            defaultValue={user.healthStatus}
            onChange={(evt) =>
              (updateRef.current.healthStatus = evt.target.value)
            }
          />
          <button
            onClick={() => {
              let path = user.profileImgPath as string;
              if (path == "default.jpg" && Img)
                path = UUID.genV4().toString() + "." + Img?.name.split(".")[1];
              updateRef.current.profileImgPath = path;
              mutate();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
