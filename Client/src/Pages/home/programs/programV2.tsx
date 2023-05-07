import styles from "./program.module.css";
import img from "../../../assets/images/managerImg.jpg";
import img2 from "../../../assets/images/doctorImg.jpg";
import img3 from "../../../assets/images/donorImg.jpg";
import { motion as m } from "framer-motion";
import { textUp } from "../../../utils/variants";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

type program = {
  title: string;
  intialContent: string;
  image: string;
};

const programs: program[] = [
  {
    title: "Service Manager program",
    intialContent: `Managers control their service blood-bank from managing quantities to managing posts and requests from other services furthermore they manage doctors accounts of his service and responding to donors appointments.`,
    image: img,
  },
  {
    title: "Doctors program",
    intialContent: ` Doctors has responsibility to manage blood exchange in the service and have the possibility to add either a donor or patient.`,
    image: img2,
  },
  {
    title: "Donors program",
    intialContent: `Donors has ability to use see blood services posts and check their history of donations in addition sending appointments to services.`,
    image: img3,
  },
];

export default function ProgramV2() {
  const navigate = useNavigate();
  const [, SetSearchParams] = useSearchParams();
  const extendProgram = (index: number) => {
    SetSearchParams({ scrollY: window.pageYOffset.toString() });
    const to = index == 0 ? "manager" : index == 1 ? "doctor" : "donor";
    navigate("/home/" + to);
  };

  return (
    <div className={styles.programV2} id="Our_Program">
      <div className={styles.header}>
        <div>
          <m.h3
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ once: false, amount: 0.1 }}
            variants={textUp}
          >
            Our Programs
          </m.h3>
        </div>
        <div>
          <m.h1
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ once: false, amount: 0.1 }}
            variants={textUp}
          >
            Working to Advance Hospital Remote Services
          </m.h1>
        </div>
      </div>
      {programs.map((program, index) => {
        return (
          <div className={styles.Program} key={program.title}>
            <div className={styles.title}>
              <div>
                <m.h1
                  initial={"hidden"}
                  whileInView={"visible"}
                  viewport={{ once: false, amount: 0.1 }}
                  variants={textUp}
                >
                  {program.title}
                </m.h1>
              </div>
              <h1>{"0" + (index + 1)}</h1>
            </div>
            <m.div className={styles.content}>
              <div>
                <p>{program.intialContent}</p>
                <m.button
                  onClick={() => extendProgram(index)}
                  className={styles.readMore}
                >
                  Read More
                </m.button>
              </div>
            </m.div>
            <div>
              <img src={program.image} alt="cant be loaded" />
            </div>
            {index !== 2 ? <div className={styles.margin}></div> : ""}
          </div>
        );
      })}
    </div>
  );
}
