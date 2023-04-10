import styles from "./Contact.module.css";
import { motion as m } from "framer-motion";
import { textUp } from "../../../utils/variants";
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
              <span>Twitter</span>
              <a
                className="fas fa-external-link-alt"
                href="https://twitter.com/soskue_aizen"
                target="_blank"
              ></a>
            </li>
            <li>
              <span>Github</span>
              <a
                className="fas fa-external-link-alt"
                href="https://github.com/Shinji13"
                target="_blank"
              ></a>
            </li>
            <li>
              <span>Linkedin</span>
              <a
                className="fas fa-external-link-alt"
                href="https://www.linkedin.com/in/aymen-keskas-750b96260/"
                target="_blank"
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </m.div>
  );
}
