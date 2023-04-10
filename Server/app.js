import cookieParser from "cookie-parser";
import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import donatorModel from "./models/donator.js";
import interactionModel from "./models/interaction.js";
import requestModel from "./models/serviceRequests.js";
import serviceModel from "./models/serviceModel.js";
import serviceStuffModel from "./models/serviceStuff.js";
import appointmentModel from "./models/appointment.js";
import { writeFileSync } from "fs";

import { getUserInteraction, getDonators } from "./utils/globalApiHandlers.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

dotenv.config({
  path: "C:/Users/hp/Documents/study/OwnStudy/Projects/BloodBank/Server/.env",
});
const app = express();

// database connection
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "BloodBank",
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      writeFileSync(
        "C:/Users/hp/Documents/study/OwnStudy/Projects/BloodBank/Server/logs/ServerLogs.txt",
        `server start listening at localhost:${
          process.env.PORT
        } on ${Date()} \n`,
        { flag: "a" }
      );
    });
  })
  .catch((err) => {
    console.log(`${err} unable to connect`);
  });

//json parser global middleware
app.use(json());
//cookie parser global middleware
app.use(cookieParser());
//helmet headers
app.use(helmet());
//morgan display of requests in terminal
app.use(morgan("dev"));

// app.use("/api/donator", donatorRoute);

// app.use("/api/doctors", doctorRoute);

// app.use("/api/manager", managerRoute);

// app.get("/api/userInteraction/:nationalId", getUserInteraction);
// app.get("/api/donators/all", getDonators);
