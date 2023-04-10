import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home/Home";
import { AnimatePresence } from "framer-motion";
import ProgramExtended from "./Pages/home/ProgramExtended/ProgramExtended";
import Login from "./Pages/auth/login/login";
import Sign from "./Pages/auth/signup/sign";

function App() {
  let location = useLocation();
  return (
    <AnimatePresence mode={"wait"}>
      <Routes location={location} key={location.pathname}>
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
      </Routes>
    </AnimatePresence>
  );
}

export default App;
