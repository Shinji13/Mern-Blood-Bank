import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./jwtToken.js";
import donorModel from "../models/donator.js";
import ServiceStuffModel from "../models/serviceStuff.js";
import dotenv from "dotenv";
import serviceStuff from "../models/serviceStuff.js";

dotenv.config({
  path: "C:/Users/hp/Documents/study/OwnStudy/Projects/NoteApp/server/.env",
});

const userResponse = async (res, payload) => {
  const refresh = createRefreshToken(payload);
  const access = createAccessToken(payload);
  res.cookie("apiauth", refresh, {
    httpOnly: true,
    secure: true,
  });
  res.set("authentication", access);
  res.status(200).send({ message: "authentication successful" });
};

const register = async (req, res) => {
  const isExist = await userModel.findOne({ username: req.body.username });
  if (isExist) return res.status(404).send({ message: "user already exists" });
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let newUser = null;
  try {
    newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
  } catch (error) {
    return res.status(503).send();
  }
  userResponse(res, newUser._id);
};
const login = async (req, res) => {
  try {
    let oldDonor = await donorModel.find({ email: req.body.email });
    if (oldDonor) {
      let isValid = bcrypt.compare(req.body.password, oldDonor.password);
      if (isValid)
        return userResponse(res, { userid: oldDonor._id, userType: 2 });
      return res.status(401).send();
    }
    let oldStuff = await serviceStuff.find({ email: req.body.email });
    if (oldStuff) {
      let isValid = bcrypt.compare(req.body.password, oldStuff.password);
      if (isValid)
        return userResponse(res, {
          userid: oldStuff._id,
          userType: oldStuff.stuffType,
        });
      return res.status(401).send();
    }
    return res.status(404).send();
  } catch (error) {
    res.status(503).send();
  }
};

const refresh = async (req, res) => {
  const clientToken = req.cookies.apiauth;
  let payload = null;
  if (!clientToken) return res.status(401).send();
  try {
    payload = jwt.verify(clientToken, process.env.REFRESH_TOKEN_KEY);
  } catch (err) {
    return res.status(401).send();
  }
  userResponse(res, payload);
};

export { login, register, refresh };
