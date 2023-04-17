import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import * as doctorController from "../controllers/doctorController.js";

const doctorRoute = Router();

doctorRoute.get("/", doctorController.getDoctorInfo); //done tested

doctorRoute.get("/interactions/:serviceName", doctorController.getInteractions); //done tested

doctorRoute.get("/patient/:serviceName", doctorController.getPatients); //done tested

doctorRoute.post("/interactions", doctorController.addInteraction); //done tested

doctorRoute.post(
  "/patient/:serviceName",
  upload.single("image"),
  doctorController.addPatient
); //done tested

doctorRoute.put(
  "/patient/:serviceName",
  upload.single("image"),
  doctorController.modifeyPatient
); //done tested

export default doctorRoute;
