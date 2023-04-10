import { useRef } from "react";
import styles from "./login.module.css";
import { LoginHandler } from "../../../utils/apiFunctions";
export default function Login() {
  const loginFields = useRef<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  return (
    <div className={styles.login}>
      <div className={styles.rightSide}>
        <div>
          <h1>Bloodify</h1>
          <h3>Let continue our journey on helping people</h3>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            defaultValue={loginFields.current.email}
            onChange={(evt) => (loginFields.current.email = evt.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            defaultValue={loginFields.current.password}
            onChange={(evt) =>
              (loginFields.current.password = evt.target.value)
            }
          />
          <button
            onClick={() =>
              LoginHandler(
                loginFields.current.email,
                loginFields.current.password
              )
            }
          >
            Login
          </button>
        </div>
      </div>
      <div className={styles.leftSide}>
        <div className={styles.img}></div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
