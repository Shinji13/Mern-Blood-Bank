import donorModel from "../models/donator.js";
import interactionModel from "../models/interaction.js";
import serviceModel from "../models/serviceModel.js";

const doctorInteractions = (serviceName, doctorId, res) => {
  console.log(serviceName, doctorId);
  serviceModel
    .findOne({ name: serviceName }, { interactions: 1, _id: 0 })
    .then(async (service) => {
      interactionModel
        .find({})
        .then((interactions) => {
          const filterdInteractions = [];
          for (let int of interactions) {
            if (
              service.interactions.includes(int._id) &&
              int.doctor.nationalId == doctorId
            ) {
              filterdInteractions.push(int);
            }
          }
          res.status(200).send({ interactions: filterdInteractions });
        })
        .catch((err) => res.status(503).send(err));
    })
    .catch((err) => res.status(503).send(err));
};

export const getUserInteraction = async (req, res) => {
  const userType = req.userType;
  if (userType == "doctor") {
    const serviceName = req.body.serviceName;
    const doctorId = req.body.doctorId;
    doctorInteractions(serviceName, doctorId, res);
  } else
    interactionModel
      .find({})
      .then((interactions) => {
        const filterdInteractions = [];
        for (let int of interactions) {
          if (req.body.interactions.includes(int._id.toString())) {
            filterdInteractions.push(int);
          }
        }
        res.status(200).send({ interactions: filterdInteractions });
      })
      .catch((err) => res.status(503).send(err));
};
export const getDonators = async (req, res) => {
  donorModel
    .find({}, { password: 0, appointments: 0 })
    .then((donors) => {
      res.status(200).send({ donors });
    })
    .catch((err) => res.status(503).send(err));
};
