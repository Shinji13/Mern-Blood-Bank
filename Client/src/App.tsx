import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Main";
function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
