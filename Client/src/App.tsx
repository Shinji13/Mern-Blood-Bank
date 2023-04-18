import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home/Home";
import { AnimatePresence } from "framer-motion";
import ProgramExtended from "./Pages/home/ProgramExtended/ProgramExtended";
import Login from "./Pages/auth/login/login";
import Sign from "./Pages/auth/signup/sign";
import Intial from "./intial";
import Manager from "./Pages/ManagerDashBoard/Manager";
import SecureRoute from "./Pages/ReUseComponents/SecureRoute";
import DonorProxy from "./Pages/DonorDashBoard/entry/DonorProxy";
import DonorProfile from "./Pages/DonorDashBoard/profile/DonorProfile";
import { Donations } from "./Pages/DonorDashBoard/donations/donation";
import Interaction from "./Pages/ReUseComponents/UniqueInteraction/interaction";
import { Posts } from "./Pages/DonorDashBoard/posts/Posts";
import Post from "./Pages/ReUseComponents/Post/Post";
import Appointement from "./Pages/DonorDashBoard/appointements/appointement";
import DoctorProxy from "./Pages/DoctorDashBoard/entry/DoctorProxy";
import ServiceInteractions from "./Pages/DoctorDashBoard/interactions/ServiceInteractions";
import AddInteraction from "./Pages/DoctorDashBoard/addInteraction/AddInteraction";
import ShowDonors from "./Pages/ReUseComponents/users/showDonors/ShowDonors";
import ShowPatients from "./Pages/ReUseComponents/users/showPatients/ShowPatients";
import AddUser from "./Pages/DoctorDashBoard/addUser/addUser";

function App() {
  let location = useLocation();
  return (
    <AnimatePresence mode={"wait"}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Intial />} />
        <Route path="/home">
          <Route index element={<Home />} />
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
        </Route>
        <Route path="/interactions/:id" element={<Interaction />} />
        <Route path="/Posts/:id/:serviceName" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route
          path="/donor"
          element={
            <SecureRoute dashBoardName="donor" children={<DonorProxy />} />
          }
        >
          <Route index element={<DonorProfile />} />
          <Route path="/donor/donations" element={<Donations />} />
          <Route path="/donor/posts" element={<Posts />} />
          <Route path="/donor/appointements" element={<Appointement />} />
        </Route>
        <Route
          path="/doctor"
          element={
            <SecureRoute dashBoardName="doctor" children={<DoctorProxy />} />
          }
        >
          <Route index path="/doctor" element={<ServiceInteractions />} />
          <Route path="/doctor/donors" element={<ShowDonors />} />
          <Route path="/doctor/patients" element={<ShowPatients />} />
        </Route>
        <Route
          path="/addInteraction"
          element={
            <SecureRoute dashBoardName="doctor" children={<AddInteraction />} />
          }
        />
        <Route
          path="/addDonor"
          element={
            <SecureRoute
              dashBoardName="doctor"
              children={<AddUser userType={0} />}
            />
          }
        />
        <Route
          path="/addPatient"
          element={
            <SecureRoute
              dashBoardName="doctor"
              children={<AddUser userType={1} />}
            />
          }
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
