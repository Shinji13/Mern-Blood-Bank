import stuffModel from "../models/serviceStuff.js";
import interactionModel from "../models/interactionModel.js";
import serviceModel from "../models/serviceModel.js";

export const getDoctorInfo = (req, res) => {
  const userId = req.userId;
  stuffModel
    .findById(userId, { stuffType: 0, password: 0, _id: 0 })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(503).send(err));
};
export const updateProfile = (req, res) => {
  const update = req.body.update || "{}";
  const parsedUpdate = JSON.parse(update);
  const userId = req.userId;
  stuffModel.findByIdAndUpdate(userId, {
    $set: parsedUpdate,
  });
};
export const getInteractions = (req, res) => {
  const serviceName = req.params.serviceName;
  serviceModel
    .findOne({ name: serviceName }, { interactions: 1, _id: 0 })
    .then(async (service) => {
      let isError = false;
      let interactions = [];
      for (let interaction of service.interactions) {
        try {
          let inter = await interactionModel.findById(interaction);
          interaction.push(inter);
        } catch (error) {
          isError = true;
          break;
        }
      }
      !isError
        ? res.status(200).send({ interactions })
        : res.status(503).send(err);
    })
    .catch((err) => res.status(503).send(err));
};

export const getPatients = (req, res) => {
  const serviceName = req.params.serviceName;
  serviceModel
    .findOne({ name: serviceName }, { patients: 1, _id: 0 })
    .then((service) => {
      res.status(200).send({ patients: service.patients });
    })
    .catch((err) => res.status(503).send(err));
};
