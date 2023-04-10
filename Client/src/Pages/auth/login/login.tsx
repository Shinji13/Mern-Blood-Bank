import { useRef, useState } from "react";
import styles from "./login.module.css";
import { LoginHandler } from "../../../utils/apiFunctions";
import { useNavigate } from "react-router";
export default function Login() {
  const [error, setError] = useState<401 | 404 | 201>(201);
  const navegate = useNavigate();
  const loginFields = useRef<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const onLoginHandler = async () => {
    const status = await LoginHandler(
      loginFields.current.email,
      loginFields.current.password
    );
    status === 401
      ? setError(401)
      : status === 404
      ? setError(404)
      : navegate("/home");
  };
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
          <button onClick={onLoginHandler}>Login</button>
        </div>
        {error == 401 ? (
          <div>Password incorrect</div>
        ) : error == 404 ? (
          <div>user not found</div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.leftSide}>
        <div className={styles.img}></div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
