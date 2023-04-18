import { useState } from "react";
import styles from "./users.module.css";
import { user } from "../../../../utils/types";
import { useNavigate } from "react-router";

export default function Users({
  userType,
  data,
}: {
  userType: 0 | 1;
  data: user[];
}) {
  const navigate = useNavigate();
  const [users, setUser] = useState<user[]>(data);
  return (
    <div className={styles.search}>
      <div className={styles.filter}></div>
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
                <span>{el.fullName}</span>
                <span>#{el.nationalId}</span>
                <span>{el.bloodtype}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
