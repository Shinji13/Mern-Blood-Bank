import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import * as doctorController from "../controllers/doctorController.js";

const doctorRoute = Router();

doctorRoute.get("/", doctorController.getDoctorInfo); //done tested

doctorRoute.get("/interactions/:serviceName", doctorController.getInteractions); //done tested

doctorRoute.get("/patient/:serviceName", doctorController.getPatients); //done tested

doctorRoute.post(
  "/interactions",
  doctorController.addInteraction,
  doctorController.storeNewInteraction
); //done tested

doctorRoute.post("/donor", doctorController.addDonor);

doctorRoute.post("/patient/:serviceName", doctorController.addPatient); //done tested

doctorRoute.put(
  "/patient/:serviceName",
  upload.single("image"),
  doctorController.modifeyPatient
); //done tested

export default doctorRoute;
