import styles from "./Home.module.css";
import { motion as m } from "framer-motion";
import { Link as ScrollLink, animateScroll } from "react-scroll";
import {
  Link as RouteLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import img4 from "../../assets/images/Image_4.jpg";
import About from "./about/about";
import Program from "./programs/programV2";
import Contact from "./contact/Contact";
import { useEffect } from "react";

export default function Home() {
  const navegate = useNavigate();
  const [searchParams, SetSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      +searchParams.get("scrollY")! !== 0 &&
      searchParams.get("scrollY") != null
    ) {
      animateScroll.scrollTo(+searchParams.get("scrollY")!, {
        duration: 0,
        smooth: true,
      });
      SetSearchParams({ scrollY: "0" });
    }
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <span></span>
            <h4>Bloodify</h4>
          </div>
          <div className={styles.sections}>
            <span>
              <ScrollLink spy={true} smooth={true} to="main">
                Home
              </ScrollLink>
            </span>
            <span>
              <ScrollLink spy={true} smooth={true} to="About_Us">
                About us
              </ScrollLink>
            </span>
            <span>
              <ScrollLink spy={true} smooth={true} to="Our_Program">
                Our Programs
              </ScrollLink>
            </span>
            <span>
              <ScrollLink spy={true} smooth={true} to="Contact_Us">
                Contact
              </ScrollLink>
            </span>
            <RouteLink to={"/login"}>
              <span>Login</span>
            </RouteLink>
          </div>
        </div>
        <div className={styles.Body}>
          <div className={styles.leftPart}>
            <div>
              <div>
                <m.h3
                  initial={{ y: "100%" }}
                  animate={{ y: "0" }}
                  transition={{ duration: 1.4, ease: "linear" }}
                >
                  Small Steps to make
                </m.h3>
              </div>
              <div>
                <m.h1
                  className={styles.header}
                  initial={{ y: "80%" }}
                  animate={{ y: "0" }}
                  transition={{ duration: 1.4, ease: "linear" }}
                >
                  <span>Big </span>
                  <span>Impa</span>
                  <span>ct</span>
                </m.h1>
              </div>
            </div>
            <div>
              <p>
                We provide blood bank management system for blood services and
                flawless way to keep track of blood exchanges.
              </p>
              <button onClick={() => navegate("/sign")}>Sign In</button>
            </div>
          </div>
          <div className={styles.rightPart}>
            <m.img
              initial={{ width: "0%" }}
              animate={{ width: "90%" }}
              transition={{ duration: 1.4, ease: "linear" }}
              src={img4}
            />
          </div>
        </div>
      </div>
      <About />
      <Program />
      <Contact />
    </div>
  );
}
