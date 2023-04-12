import stuffModel from "../models/serviceStuff.js";
import interactionModel from "../models/interactionModel.js";
import serviceModel from "../models/serviceModel.js";
import donorModel from "../models/donator.js";
import interaction from "../models/interaction.js";

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
  stuffModel
    .findByIdAndUpdate(userId, {
      $set: parsedUpdate,
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(503).send(err));
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

export const modifeyPatient = (req, res) => {
  const update = req.body.update || "{}";
  const parsedUpdate = JSON.parse(update);
  const serviceName = req.para.serviceName;
  serviceModel
    .findOneAndUpdate(
      { name: serviceName },
      {
        $set: { "patients.$[element]": parsedUpdate },
      },
      { arrayFilters: [{ "element.nationalId": parsedUpdate.nationalId }] }
    )
    .then((service) => res.status(200).send(service))
    .catch((err) => res.status(503).send(err));
};

export const addPatient = (req, res) => {
  const newPatient = req.body.newPatient || "{}";
  const parsedPatient = JSON.parse(newPatient);
  const serviceName = req.para.serviceName;
  serviceModel
    .findOneAndUpdate(
      { name: serviceName },
      {
        $push: { patients: parsedPatient },
      }
    )
    .then((service) => res.status(201).send(service))
    .catch((err) => res.status(503).send(err));
};

export const addInteraction = (req, res) => {
  interaction
    .create(req.body.interaction)
    .then((interaction) => {
      if (interaction.exchangeType === 0) {
        addInteractionToDonor(interaction);
      } else {
        addInteractionToPatient(interaction);
      }
    })
    .catch((err) => res.status(503).send(err));
};

const addInteractionToDonor = (interaction) => {
  donorModel
    .findOne({ nationalId: interaction.EndNationalId.nationalId })
    .then((donor) => {
      if (donor) {
        donor.interactions.push(interaction._id);
        donor
          .save()
          .then((donor) => res.status(201).send(donor))
          .catch((err) => res.status(503).send(err));
      } else {
        donorModel
          .create({
            fullName: interaction.EndNationalId.name,
            email: "default",
            password: "default",
            nationalId: interaction.EndNationalId.nationalId,
            address: "default",
            bloodtype: "default",
            age: 21,
            interactions: [interaction._id],
          })
          .then((donor) => res.status(201).send(donor))
          .catch((err) => res.status(503).send(err));
      }
    })
    .catch((err) => res.status(503).send(err));
};

const addInteractionToPatient = (interaction) => {
  serviceModel.findOne({ name: interaction.serviceName }).then((service) => {
    const exist = false;
    for (let i = 0; i < service.patients.length; i++) {
      if (
        service.patients[i].nationalId === interaction.EndNationalId.nationalId
      ) {
        exist = true;
        service.patients[i].interactions.push(interaction._id);
        break;
      }
    }
    if (!exist) res.status(403).send({ message: "patient doenst exist" });
    else
      service
        .save()
        .then((service) => res.status(201).send(service))
        .catch((err) => res.status(503).send(err));
  });
};
