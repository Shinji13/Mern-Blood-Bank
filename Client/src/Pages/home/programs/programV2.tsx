import { useState } from "react";
import styles from "./program.module.css";
import img from "../../../assets/images/image_7.jpg";
import img3 from "../../../assets/images/image_1.jpg";
import img2 from "../../../assets/images/image_2.jpg";
import { motion as m } from "framer-motion";
import { appear, textUp } from "../../../functions/variants";

type program = {
  title: string;
  intialContent: string;
  extendedContent: string;
  image: string;
};

const programs: program[] = [
  {
    title: "Blood Bank Management",
    intialContent: `Blood bank management can be done either by adding new bloodexchanges or manuplating the bank storage directly`,
    extendedContent: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
porro fuga dicta perspiciatis exercitationem aspernatur
laudantium sit, unde obcaecati quia! Saepe itaque nisi iusto
incidunt ab obcaecati nostrum, corrupti doloremque.`,
    image: img,
  },
  {
    title: "Browsing users informations",
    intialContent: `Regular users can check their profie while hospital can browse users information `,
    extendedContent: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
porro fuga dicta perspiciatis exercitationem aspernatur
laudantium sit, unde obcaecati quia! Saepe itaque nisi iusto
incidunt ab obcaecati nostrum, corrupti doloremque.`,
    image: img3,
  },
  {
    title: "Making Blood Requests",
    intialContent: `Blood bank management can be done either by adding new bloodexchanges or manuplating the bank storage directly`,
    extendedContent: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
porro fuga dicta perspiciatis exercitationem aspernatur
laudantium sit, unde obcaecati quia! Saepe itaque nisi iusto
incidunt ab obcaecati nostrum, corrupti doloremque.`,
    image: img2,
  },
];

export default function ProgramV2() {
  const [ProgramReadMore, toggle] = useState<number[]>([0, 0, 0]);
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
          <div className={styles.Program}>
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
              {ProgramReadMore[index] === 0 ? (
                <div>
                  <m.p
                    variants={appear}
                    initial={"hidden"}
                    whileInView={"visible"}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    {program.intialContent}
                  </m.p>
                  <m.button
                    variants={appear}
                    initial={"hidden"}
                    whileInView={"visible"}
                    viewport={{ once: false, amount: 0.3 }}
                    onClick={() =>
                      toggle((prev) => {
                        let arr = prev;
                        arr[index] = 1;
                        return [...arr];
                      })
                    }
                    className={styles.readMore}
                  >
                    Read More
                  </m.button>
                </div>
              ) : (
                <div>
                  <div>
                    <m.p
                      variants={appear}
                      initial={"hidden"}
                      whileInView={"visible"}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      {program.intialContent}
                    </m.p>
                    <m.p
                      variants={appear}
                      initial={"hidden"}
                      whileInView={"visible"}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      {program.extendedContent}
                    </m.p>
                  </div>
                  <m.button
                    variants={appear}
                    initial={"hidden"}
                    whileInView={"visible"}
                    viewport={{ once: false, amount: 0.3 }}
                    className={styles.close}
                    onClick={() =>
                      toggle((prev) => {
                        let arr = prev;
                        arr[index] = 0;
                        return [...arr];
                      })
                    }
                  >
                    X
                  </m.button>
                </div>
              )}
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
