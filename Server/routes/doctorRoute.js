import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import * as doctorController from "../controllers/doctorController.js";

const doctorRoute = Router();

doctorRoute.get("/", doctorController.getDoctorInfo); //done

doctorRoute.put("/", upload.single("image"), doctorController.updateProfile); //done

doctorRoute.get("/interactions/:serviceName", doctorController.getInteractions); //done

doctorRoute.get("/patient/:serviceName", doctorController.getPatients); //done

doctorRoute.post("/interactions", doctorController.addInteraction);

doctorRoute.post(
  "/patient/:serviceName",
  upload.single("image"),
  doctorController.addPatient
); //done

doctorRoute.put(
  "/patient/:serviceName",
  upload.single("image"),
  doctorController.modifeyPatient
); //done

export default doctorRoute;
