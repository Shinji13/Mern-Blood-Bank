import { Router } from "express";
import { upload } from "../middlewares/multer.js";

const doctorRoute = Router();

doctorRoute.get("/", doctorController.getDoctorInfo);

doctorRoute.put("/", upload.single("image"), doctorController.updateProfile);

doctorRoute.post("/interactions", doctorController.addInteraction);

doctorRoute.get("/interactions/:serviceName", doctorController.getInteractions);

doctorRoute.get("/patient/:serviceName", doctorController.getPatients);

doctorRoute.post(
  "/patient",
  upload.single("image"),
  doctorController.addPatient
);

doctorRoute.put(
  "/patient/:id",
  upload.single("image"),
  doctorController.modifeyPatient
);

doctorRoute.get("/patient/:nationalId", doctorController.getMedicalFile);

export default doctorRoute;
