import donorModel from "../models/donator.js";
import interactionModel from "../models/interaction.js";
import serviceModel from "../models/serviceModel.js";

const doctorInteractions = (serviceName, doctorName, res) => {
  serviceModel
    .findOne({ name: serviceName }, { interactions: 1, _id: 0 })
    .then(async (service) => {
      let isError = false;
      let interactions = [];
      for (let interaction of service.interactions) {
        try {
          let inter = await interactionModel.findById(interaction);
          inter.doctor.name == doctorName && interaction.push(inter);
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

export const getUserInteraction = async (req, res) => {
  const userType = req.userType;
  if (userType == "manager") {
    const serviceName = req.body.serviceName;
    const doctorName = req.body.doctorName;
    doctorInteractions(serviceName, doctorName, res);
  } else {
    let isError = false;
    let interactions = [];
    for (let interaction of req.body.interactions) {
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
  }
};
export const getDonators = async (req, res) => {
  donorModel
    .find({}, { password: 0, appointments: 0 })
    .then((donors) => {
      res.status(200).send({ donors });
    })
    .catch((err) => res.status(503).send(err));
};
