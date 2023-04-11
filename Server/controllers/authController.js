import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./jwtToken.js";
import donorModel from "../models/donator.js";
import ServiceStuffModel from "../models/serviceStuff.js";
import dotenv from "dotenv";

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
  res.status(200).send(payload);
};

const register = async (req, res) => {
  donorModel
    .findOne({ nationalId: req.body.nationalId })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          donorModel
            .create({ ...req.body, password: hash })
            .then((user) => {
              userResponse(res, {
                userid: user._id,
                userType: "donor",
              });
            })
            .catch((err) => res.status(503).send(err));
        });
      } else if (user.email == "default") {
        user.email = req.body.email;
        user.password = bcrypt.hashSync(req.body.password, 12);
        user.tel = req.body.tel || "";
        user.address = req.body.address || "";
        user.age = req.body.age;
        user.bloodtype = req.body.bloodtype;
        user.fullName = req.body.fullName;
        user.save();
        userResponse(res, {
          userid: user._id,
          userType: "donor",
        });
      } else res.status(401).send({ message: "user already exists" });
    })
    .catch((err) => res.status(503).send(err));
};
const login = async (req, res) => {
  donorModel
    .findOne({ email: req.body.email })
    .then(async (oldDonor) => {
      if (oldDonor) {
        bcrypt.compare(req.body.password, oldDonor.password).then((isValid) =>
          isValid
            ? userResponse(res, {
                userid: oldDonor._id,
                userType: "donor",
              })
            : res.status(401).send({ message: "forgot password" })
        );
      } else {
        ServiceStuffModel.findOne({ email: req.body.email })
          .then((oldStuff) => {
            if (oldStuff) {
              bcrypt
                .compare(req.body.password, oldStuff.password)
                .then((isValid) =>
                  isValid
                    ? userResponse(res, {
                        userid: oldStuff._id,
                        userType:
                          oldStuff.stuffType == 0 ? "manager" : "doctor",
                      })
                    : res.status(401).send({ message: "forgot password" })
                );
            } else {
              res.status(404).send({ message: "user doesn't exist" });
            }
          })
          .catch((err) => res.status(503).send(err));
      }
    })
    .catch((err) => res.status(503).send(err));
};

const refresh = async (req, res) => {
  const clientToken = req.cookies.apiauth;
  let payload = null;
  if (!clientToken) return res.status(401).send("no token");
  try {
    payload = jwt.verify(clientToken, process.env.REFRESH_TOKEN_KEY);
  } catch (err) {
    return res.status(401).send("token expired");
  }
  userResponse(res, payload);
};

export { login, register, refresh };
