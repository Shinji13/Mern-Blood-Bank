import { donorInfo } from "../../utils/valtioStore";
import { useSnapshot } from "valtio";
import styles from "./donor.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { fetchInteractions } from "../../utils/apiFunctions";
import { useQuery } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { interaction } from "../../utils/types";
export default function Donor() {
  const user = useSnapshot(donorInfo);
  const [activity, changeActivity] = useState<number>(0);
  const navegate = useNavigate();
  return (
    <div className={styles.donor}>
      <div className={styles.sideBar}>
        <div className={styles.logo}>
          <img
            src={`/api/static/images/${user.user.profileImgPath}`}
            alt="could't load"
          />
          <h5>Welcome</h5>
          <h5>{user.user.fullName}</h5>
        </div>
        <div className={styles.activities}>
          <div onClick={() => changeActivity(0)}>
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </div>
          <div onClick={() => changeActivity(1)}>
            <i className="fa-solid fa-hand-holding-dollar"></i>
            <span>Blood Donations</span>
          </div>
          <div onClick={() => changeActivity(2)}>
            <i className="fa-solid fa-calendar-check"></i>
            <span>Appointments</span>
          </div>
          <div onClick={() => changeActivity(3)}>
            <i className="fa-solid fa-blog"></i>
            <span>Services Posts</span>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span onClick={() => navegate("/home")}>Logout</span>
        </div>
      </div>

      {activity == 0 ? (
        <Profile styles={styles} />
      ) : activity == 1 ? (
        <Interactions styles={styles} />
      ) : activity == 2 ? (
        <Appointment styles={styles} />
      ) : (
        <Posts styles={styles} />
      )}
    </div>
  );
}

const Profile = ({ styles }: { styles: CSSModuleClasses }) => {
  const fieldNames = [
    "Full Name",
    "Email",
    "National Identification",
    "Age",
    "Blood Type",
    "Address",
    "Telephone",
  ];
  const user = useSnapshot(donorInfo);
  const refFields = useRef({
    fullName: "",
    age: 18,
    address: "",
    profileImgPath: "",
    tel: "",
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const [img, setImg] = useState<File>();
  return (
    <div className={styles.profile}>
      <div>
        <img
          ref={imgRef}
          src={`/api/static/images/${user.user.profileImgPath}`}
          alt="could't load"
        />
        <input
          id="image"
          accept="image/*"
          onChange={(e) => {
            imgRef.current!.src = URL.createObjectURL(e.target.files![0]);
            setImg(e.target.files![0]);
          }}
          type={"file"}
        />
        <label htmlFor={"image"}>Edit</label>
      </div>
      <div className={styles.fields}>
        <h1>Profile</h1>
        <div>
          <span>Full Name</span>
          <input
            defaultValue={user.user.fullName}
            onChange={(evt) => (refFields.current.fullName = evt.target.value)}
          />
        </div>
        <div>
          <span>Address</span>
          <input
            defaultValue={user.user.address}
            onChange={(evt) => (refFields.current.address = evt.target.value)}
          />
        </div>
        <div>
          <span>Age</span>
          <input
            defaultValue={user.user.age}
            onChange={(evt) => (refFields.current.age = +evt.target.value)}
          />
        </div>
        <div>
          <span>Telephone</span>
          <input
            defaultValue={user.user.tel}
            onChange={(evt) => (refFields.current.tel = evt.target.value)}
          />
        </div>
        <button>Save Changes</button>
      </div>
    </div>
  );
};

const Appointment = ({ styles }: { styles: CSSModuleClasses }) => {
  const user = useSnapshot(donorInfo);
  return <div>appointments</div>;
};

const Interactions = ({ styles }: { styles: CSSModuleClasses }) => {
  const user = useSnapshot(donorInfo);
  const navigate = useNavigate();
  const [interactions, changeInteractions] = useState<interaction[]>([]);
  const { isError, isLoading, data } = useQuery(
    ["interaction"],
    () => {
      return fetchInteractions(navigate, user.user.interactions);
    },
    {
      onSuccess: (data) => {
        changeInteractions(data.data.interactions);
      },
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
    }
  );

  const filterByServiceName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length === 0 && interactions.length === 0)
      changeInteractions(data?.data.interactions);
    else {
      const filteredInteractions = data?.data.interactions.filter(
        (int: interaction) => int.serviceName.includes(evt.target.value, 0)
      );
      changeInteractions(filteredInteractions);
    }
  };
  const filterByDate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length === 0 && interactions.length === 0)
      changeInteractions(data?.data.interactions);
    else {
      const filteredInteractions = data?.data.interactions.filter(
        (int: interaction) => int.date.includes(evt.target.value, 0)
      );
      changeInteractions(filteredInteractions);
    }
  };
  return (
    <div className={styles.interactions}>
      <div className={styles.header}>
        <m.h1
          initial={{ y: "100%" }}
          animate={{ y: "0" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {user.user.fullName}
        </m.h1>
        <m.h1
          initial={{ y: "100%" }}
          animate={{ y: "0" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          All of your Donations
        </m.h1>
      </div>
      <div className={styles.filter}>
        <div>
          <span>Search wih service name</span>
          <input type="text" onChange={filterByServiceName} />
        </div>
        <div>
          <span>Search wih Date</span>
          <input type="text" onChange={filterByDate} />
        </div>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Please reload Error occured</h1>
      ) : (
        <div className={styles.list}>
          {interactions.map((el: interaction, index: number) => {
            return (
              <div key={el._id}>
                <span>{index}</span>
                <div>
                  <span>Service Name</span>
                  <span>{el.serviceName}</span>
                </div>
                <div>
                  <span>Doctor Name</span>
                  <span>{el.doctor.name}</span>
                </div>
                <div>
                  <span>Donation Type</span>
                  <span>{el.bloodtype}</span>
                </div>
                <div>
                  <span>Date of Exchange</span>
                  <span>{el.date.substring(0, 24)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Posts = ({ styles }: { styles: CSSModuleClasses }) => {
  const user = useSnapshot(donorInfo);
  return <div>posts</div>;
};
