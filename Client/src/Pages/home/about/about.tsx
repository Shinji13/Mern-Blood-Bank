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
          of helping blood services managing there blood banks and recording
          blood donations in much more easier way than typical paper work.
        </m.p>
        <m.p variants={appear}>
          Bloodify also let donors sign in to check their medical records and
          see blood demand posts and have many more features check
          <span> our programs section</span>.
        </m.p>
        <m.p variants={appear}>
          Bloodify only support blood services of setif algeria for now,try{" "}
          <span>contact us</span> to get your services started with bloodify.
        </m.p>
      </m.div>
    </div>
  );
}
