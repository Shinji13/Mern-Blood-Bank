import { motion as m } from "framer-motion";
import { appear } from "../../../functions/variants";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.about} id="About_Us">
      <m.div
        initial={"hidden"}
        whileInView={"visible"}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ staggerChildren: 0.35 }}
        className={styles.aboutHeader}
      >
        <div>
          <m.span variants={appear}>Big Impact</m.span>
          <m.span variants={appear}>
            <span>nee</span>ds Fast
          </m.span>
          <m.span variants={appear}>
            <span>Act</span>ions
          </m.span>
          <m.i
            variants={appear}
            className="fa-sharp fa-solid fa-quote-right"
          ></m.i>
        </div>
        <m.div variants={appear}>
          <div className={styles.circle1}></div>
        </m.div>
      </m.div>
      <m.div
        initial={"hidden"}
        whileInView={"visible"}
        viewport={{ once: false, amount: 0.2 }}
        className={styles.aboutParg}
        transition={{ staggerChildren: 0.35 }}
      >
        <m.p variants={appear}>
          <span>We are freelancing company</span> that help the sociaty by
          building high efficient web apps using modern web technologie while
          taking in consideration client perferences .
        </m.p>
        <m.p variants={appear}>
          <span>Bloodify</span> is web application constructed for the purpose
          of helping hospitals managing there blood banks and recording blood
          donations in much more easier way than typical paper work.
        </m.p>
        <m.p variants={appear}>
          For regular user living nearby hospitals using bloodify we allow
          <span> fluent communicatations</span> with blood services remotely.
        </m.p>
        <m.p variants={appear}>
          Bloodify only support hospitals of <span>setif algeria</span> for now.
        </m.p>
      </m.div>
    </div>
  );
}
