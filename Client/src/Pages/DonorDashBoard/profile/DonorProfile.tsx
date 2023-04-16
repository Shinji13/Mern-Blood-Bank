import styles from "./DonorProfile.module.css";
import { motion as m } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { updateDonor } from "../../../utils/apiFunctions";
import { updatedDonor } from "../../../utils/types";
import { donorInfo } from "../../../utils/valtioStore";
import { UUID } from "uuidjs";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";

export default function DonorProfile() {
  const [isModify, ChangeTemplate] = useState<boolean>(false);
  return (
    <div className={styles.profile}>
      {!isModify ? (
        <StaticTemplate templateHandler={ChangeTemplate} />
      ) : (
        <ModifyTemplate templateHandler={ChangeTemplate} />
      )}
    </div>
  );
}

const StaticTemplate = ({
  templateHandler,
}: {
  templateHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useSnapshot(donorInfo);
  return (
    <div className={styles.static}>
      <div className={styles.leftSide}>
        <div>
          <h1>
            <span>1</span> Personal Details
          </h1>
          <div className={styles.details}>
            <div>
              <span>Full name</span>
              <span>{user.user.fullName}</span>
            </div>
            <div>
              <span>Age</span>
              <span>{user.user.age}</span>
            </div>
            <div>
              <span>Address</span>
              <span>{user.user.address}</span>
            </div>
          </div>
        </div>
        <div>
          <h1>
            <span>2</span> Medical Details
          </h1>
          <div className={styles.details}>
            <div>
              <span>Blood type</span>
              <span>{user.user.bloodtype}</span>
            </div>
            <div>
              <span>Last time you donate</span>
              <span>{user.user.lastDonation}</span>
            </div>
          </div>
        </div>
        <div>
          <h1>
            <span>3</span> Contact Details
          </h1>
          <div className={styles.details}>
            <div>
              <span>Telephone</span>
              <span>{user.user.tel}</span>
            </div>
            <div>
              <span>Email</span>
              <span>{user.user.email}</span>
            </div>
          </div>
        </div>
        <button onClick={() => templateHandler(true)}>Modify</button>
      </div>
      <div className={styles.rightSide}>
        <m.img
          initial={{ width: "0%" }}
          animate={{ width: "90%" }}
          transition={{ duration: 1.4, ease: "linear" }}
          src={`/api/static/images/${
            user.user.profileImgPath
          }?${new Date().getTime()}`}
        />
      </div>
    </div>
  );
};
const ModifyTemplate = ({
  templateHandler,
}: {
  templateHandler: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const user = useSnapshot(donorInfo);
  const [AddressOptions, SetOptions] = useState<string[]>([]);
  const [address, changeAddress] = useState<string>(user.user.address);
  const [Img, changeImg] = useState<File | null>(null);
  const [ImgSrc, changeSrc] = useState<string>(
    `/api/static/images/${user.user.profileImgPath}?${new Date().getTime()}`
  );
  const UpdateRef = useRef<updatedDonor>({
    fullName: user.user.fullName,
    tel: user.user.tel,
    address: user.user.address,
    lastDonation: user.user.lastDonation,
    profileImgPath: user.user.profileImgPath,
  });
  const { mutate } = useMutation({
    mutationFn: () => updateDonor(Img!, navigate, UpdateRef.current),
  });
  return (
    <div className={styles.modify}>
      <div className={styles.leftSide}>
        <div>
          <span>Full Name</span>
          <input
            defaultValue={user.user.fullName}
            type="text"
            onChange={(evt) => (UpdateRef.current.fullName = evt.target.value)}
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
                    UpdateRef.current.address =
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
            defaultValue={user.user.tel}
            type="number"
            onChange={(evt) => (UpdateRef.current.tel = evt.target.value)}
          />
        </div>
        <div>
          <span>Last time you donate</span>
          <input
            type="date"
            max={`${new Date().getFullYear().toString()}/${new Date()
              .getMonth()
              .toString()}/${new Date().getDay().toString()}`}
            onChange={(evt) =>
              (UpdateRef.current.lastDonation = evt.target.value)
            }
          />
        </div>
        <div>
          <button onClick={() => templateHandler(false)}>Cancel</button>
          <button
            onClick={() => {
              if (Img && UpdateRef.current.profileImgPath === "default.jpg")
                UpdateRef.current.profileImgPath =
                  UUID.genV4().toString() + "." + Img?.name.split(".")[1];
              mutate();
              templateHandler(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      <div className={styles.rightSide}>
        <m.img
          initial={{ width: "0%" }}
          animate={{ width: "90%" }}
          transition={{ duration: 1.4, ease: "linear" }}
          src={ImgSrc}
        />
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
    </div>
  );
};
