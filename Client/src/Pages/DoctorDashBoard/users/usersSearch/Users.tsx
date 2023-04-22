import { useState } from "react";
import styles from "./users.module.css";
import { user } from "../../../../utils/types";
import { useNavigate } from "react-router";
import { UserFilter } from "../../../ReUseComponents/Filters/filter";

export default function Users({
  userType,
  data,
}: {
  userType: 0 | 1;
  data: user[];
}) {
  const navigate = useNavigate();
  const [users, setUsers] = useState<user[]>(data);

  return (
    <div className={styles.search}>
      <UserFilter data={data} stateHandler={setUsers} styles={styles} />
      <div className={styles.users}>
        {users.map((el) => {
          return (
            <div
              className={styles.user}
              key={el.nationalId}
              onClick={() =>
                navigate(
                  `/${userType == 0 ? "donors" : "patients"}/${el.nationalId}`
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
