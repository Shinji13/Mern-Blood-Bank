import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import * as donatorController from "../controllers/donatorController.js";

const donatorRoute = Router();

donatorRoute.get("/", donatorController.getDonatorInfo); //done

donatorRoute.get("/posts", donatorController.getPosts); //done

donatorRoute.put("/", upload.single("image"), donatorController.updateProfile); //done

donatorRoute.get("/appointment/:nationalId", donatorController.getAppointments); //done

donatorRoute.post("/appointment", donatorController.addAppointment); //done

export default donatorRoute;
