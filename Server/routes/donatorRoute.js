import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import * as donatorController from "../controllers/donatorController.js";

const donatorRoute = Router();

donatorRoute.get("/", donatorController.getDonatorInfo); //done and tested

donatorRoute.get("/posts", donatorController.getPosts); //done and tested

donatorRoute.put("/", upload.single("image"), donatorController.updateProfile); //done and tested

donatorRoute.get("/appointment/:nationalId", donatorController.getAppointments); //done and tested

donatorRoute.post("/appointment", donatorController.addAppointment); //done and tested

export default donatorRoute;
