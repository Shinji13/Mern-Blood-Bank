import { Router } from "express";
import { upload } from "../middlewares/multer.js";

const managerRoute = Router();

managerRoute.get("/", managerController.getmanagerInfo);

managerRoute.get("/posts", managerController.getPosts);

managerRoute.put("/", upload.single("image"), managerController.updateProfile);

managerRoute.post("/", managerController.addPost);

managerRoute.get("/donators", managerController.getDonators);

managerRoute.get("/doctors", managerController.getDoctors);

managerRoute.post(
  "/doctors",
  upload.single("image"),
  managerController.addDoctor
);

managerRoute.put("/doctors/nationalId", managerController.resetDoctorPassword);

managerRoute.get("request", managerController.getRequests);

managerRoute.post("/request", managerController.addNewRequest);

managerRoute.put("/request/:id", managerController.respondToRequest);

managerRoute.put("/request/:id", managerController.fulFillRequest);

managerRoute.put("/bank/plasma", managerController.updatePlasmaQuantity);

managerRoute.put("bank/platelets", managerController.updatePlateletsQuantity);

managerRoute.put("bank/redCells", managerController.updateRedCellsQuantity);

managerRoute.put("bank/redCells", managerController.updatefullBloodQuantity);

managerRoute.get("/service", managerController.getServices);

export default managerRoute;
