import { Router } from "express";
import { upload } from "../middlewares/multer.js";

const donatorRoute = Router();

donatorRoute.get("/", donatorController.getDonatorInfo);

donatorRoute.get("/posts", donatorController.getPosts);

donatorRoute.put("/", upload.single("image"), donatorController.updateProfile);

export default donatorRoute;
