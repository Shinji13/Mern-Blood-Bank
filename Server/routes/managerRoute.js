import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import * as managerController from "../controllers/managerController.js";

const managerRoute = Router();

managerRoute.get("/", managerController.getmanagerInfo); //done and tested

managerRoute.put("/bank/:id", managerController.updateQuantity); //done and tested

managerRoute.post("/post/:id", managerController.addPost); //done and tested

managerRoute.get(
  "/appointment/:serviceName",
  managerController.getAppointments
);

managerRoute.get("/doctors/:serviceName", managerController.getDoctors);

managerRoute.get("request/:serviceName", managerController.getRequests);

managerRoute.put("/appointment/:id", managerController.updateAppointmentStatus);

managerRoute.post("/doctors", managerController.addDoctor);

managerRoute.put("/doctors/reset", managerController.resetDoctorPassword);

managerRoute.delete(
  "/doctors/:doctorId/:serviceName",
  managerController.deleteDoctor
);

// managerRoute.post("/request", managerController.addNewRequest);

// managerRoute.put("/request/:id", managerController.respondToRequest);

// managerRoute.put("/request/:id", managerController.fulFillRequest);

export default managerRoute;
