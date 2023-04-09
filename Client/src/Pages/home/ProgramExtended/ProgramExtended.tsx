import { useNavigate } from "react-router-dom";
import styles from "./ProgramExtended.module.css";
import { motion as m } from "framer-motion";
import img from "../../../assets/images/image_7.jpg";
import img3 from "../../../assets/images/image_1.jpg";
import img2 from "../../../assets/images/image_2.jpg";
import backArrow from "../../../assets/images/arrow-left-solid.svg";
import { useEffect } from "react";
import { animateScroll } from "react-scroll";

type program = {
  title: string;
  useCases: { title: string; description: string }[];
  img: string;
};

const programs: program[] = [
  {
    title: "Service Managers program",
    img: img3,
    useCases: [
      {
        title: "Managing service doctors",
        description:
          "Service managers will be responsible for adding new doctor from their service to manage blood exchanges ,also they reset the password in case of forgoting it or delete the doctor.They can browse doctors and check the blood exchanges that they controlled.",
      },
      {
        title: "Browse donors",
        description:
          "Also they can browse donors that exist in the system and check someone profile information like tel , gmail ,address ,full name and most notably their old blood exchanges that helps him get picture about the donor and try communicate with gmail or telephone number also the search can be filtered by national ids or address or name or age and blood type.",
      },
      {
        title: "Creating Posts",
        description:
          "Service managers can add blood demand posts for donors and that help them give message about their blood need.",
      },
      {
        title: "Request management",
        description:
          "Service can ask others for blood by sending request listing their need of  plasma ,red cells ,platelets ,full blood and they bind message to the request that helps explaining their situation.On other hand recieving service can either accept or reject and bind respond message with that also the same service can mark this request as fulfilled making the blood bank update automatically ",
      },
      {
        title: "Managing Blood bank",
        description:
          "The manager can update the quantities of the blood bank manually for plasma ,red cells ,platelets ,full blood and also they can set minimal quantity for each and that will alert them to make post to donors or requests to other services.",
      },
    ],
  },
  {
    title: "Doctors program",
    img: img2,
    useCases: [
      {
        title: "Manage Service blood exchange",
        description:
          "The doctor is responsible for managing his service blood exchange ,he can browse the history and filter by national id or date , he can also add new blood exchange that will contain the responsible doctor national id ,donor or patient national id depending on type of exchange donating or receiving,date of exchange ,qunatity and most importantly a note that summerize the resualts of this blood exchange and worth to mention that the end user of this exchange will be added automatically if he doesnt exist (end user can be a patient or donor) also blood exchanges update service blood bank quantities.",
      },
      {
        title: "Browse donors",
        description:
          "Doctor can browse donors that exist in the system and check someone profile information like tel , gmail ,address ,full name and most notably their old blood exchanges that helps him get picture about the donor without condacting tests also the search can be filtered by national ids or address or name or age and blood type.",
      },
      {
        title: "Patient Management",
        description:
          "Doctors are also responsible for managing their service patients.They can browse and filter patients like donors and they can add new patient specifying his national id ,name ,age ,address,tel,blood type and they can modify their health status futhermore downloading pdf file that resume this patient information and his blood recieving that been tracked by the system.",
      },
    ],
  },
  {
    title: "Donors program",
    img: img,
    useCases: [
      {
        title: "See Personal Donations",
        description:
          "The Donor can browse his personal donations that been recorded by services that use bloodify,he can check the doctor that manage the blood extraction ,the date ,the qunatity and most importantly test results of his blood that determines whether he can still donate in future.",
      },
      {
        title: "Browse Blood services Posts",
        description:
          "Blood services can post to demand donations of blood,you as donor can browse these posts filter them by name or address and that help will to make decision to whether you donate or not ",
      },
    ],
  },
];

export default function ProgramExtended({
  whichProgram,
}: {
  whichProgram: 2 | 1 | 0;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
      smooth: true,
    });
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "linear" }}
      className={styles.ProgramExtended}
    >
      <div className={styles.firstLayer}>
        <h1>Bloodify</h1>
        <img src={backArrow} onClick={() => navigate(-1)} />
      </div>
      <div
        className={styles.middleLayer}
        style={{ backgroundImage: `url(${programs[whichProgram].img})` }}
      >
        <h1>{programs[whichProgram].title}</h1>
      </div>
      <div className={styles.lastLayer}>
        {programs[whichProgram].useCases.map((current, index) => (
          <div className={styles.Case}>
            <div>
              <span>{index + 1}</span>
              <h3>{current.title}</h3>
            </div>
            <p>{current.description}</p>
          </div>
        ))}
      </div>
    </m.div>
  );
}
