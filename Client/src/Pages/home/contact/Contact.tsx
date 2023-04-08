import styles from "./Contact.module.css";
import { motion as m } from "framer-motion";
import { textUp } from "../../../functions/variants";
import eye from "../../../assets/images/eye2.png";

export default function Contact() {
  return (
    <m.div
      initial={"hidden"}
      whileInView={"visible"}
      viewport={{ once: false, amount: 0.1 }}
      className={styles.contact}
      id="Contact_Us"
    >
      <div className={styles.header}>
        <div>
          <m.h1 variants={textUp}>Get In</m.h1>
        </div>
        <div>
          <img src={eye} alt="cant load the img" />
          <div>
            <m.h1 variants={textUp}>Touch</m.h1>
          </div>
        </div>
        <h3>keskasaymen08@gmail.com</h3>
      </div>
      <div className={styles.leftside}>
        <div>
          <div>
            <m.h2 variants={textUp}>Tel-Phone number</m.h2>
          </div>
          <span>+23 775210076 </span>
        </div>
        <div>
          <div>
            <m.h2 variants={textUp}>Location</m.h2>
          </div>
          <span>Algeria-Setif-19107</span>
        </div>
        <div className={styles.social}>
          <div>
            <m.h2 variants={textUp}>Follow Us</m.h2>
          </div>
          <ul>
            <li>
              <span>Facebook</span>
              <i className="fas fa-external-link-alt"></i>
            </li>
            <li>
              <span>Github</span>
              <i className="fas fa-external-link-alt"></i>
            </li>
            <li>
              <span>Twitter</span>
              <i className="fas fa-external-link-alt"></i>
            </li>
          </ul>
        </div>
      </div>
    </m.div>
  );
}
