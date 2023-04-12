import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home/Home";
import { AnimatePresence } from "framer-motion";
import ProgramExtended from "./Pages/home/ProgramExtended/ProgramExtended";
import Login from "./Pages/auth/login/login";
import Sign from "./Pages/auth/signup/sign";
import Intial from "./intial";
import Doctor from "./Pages/DoctorDashBoard/Doctor";
import Donor from "./Pages/DonorDashBoard/Donor";
import Manager from "./Pages/ManagerDashBoard/Manager";
import SecureRoute from "./Pages/Redirect/SecureRoute";

function App() {
  let location = useLocation();
  return (
    <AnimatePresence mode={"wait"}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Intial />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/home/manager"
          element={<ProgramExtended whichProgram={0} />}
        />
        <Route
          path="/home/doctor"
          element={<ProgramExtended whichProgram={1} />}
        />
        <Route
          path="/home/donor"
          element={<ProgramExtended whichProgram={2} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route
          path="/donor"
          element={<SecureRoute dashBoardName="donor" children={<Donor />} />}
        />
        <Route
          path="/doctor"
          element={<SecureRoute dashBoardName="doctor" children={<Doctor />} />}
        />
        <Route
          path="/manager"
          element={
            <SecureRoute dashBoardName="manager" children={<Manager />} />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
