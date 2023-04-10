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
      if (!user || user.email == "default") {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          donorModel
            .create({ ...req.body, password: hash })
            .then((user) => {
              userResponse(res, {
                userid: user._id,
                userType: "donor",
              });
            })
            .catch((err) => res.status(503).send());
        });
      }
    })
    .catch((err) => res.status(503).send());
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
            : res.status(401).send()
        );
      } else {
        ServiceStuffModel.find({ email: req.body.email })
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
                    : res.status(401).send()
                );
            } else {
              res.status(404).send();
            }
          })
          .catch((err) => res.status(503).send());
      }
    })
    .catch((err) => res.status(503).send());
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
