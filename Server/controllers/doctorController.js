import stuffModel from "../models/serviceStuff.js";
import interactionModel from "../models/interaction.js";
import serviceModel from "../models/serviceModel.js";
import donorModel from "../models/donator.js";

export const getDoctorInfo = (req, res) => {
  const userId = req.userId;
  stuffModel
    .findById(userId, { password: 0, _id: 0, _v: 0 })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(503).send(err));
};
// export const updateProfile = (req, res) => {
//   const userId = req.userId;
//   stuffModel
//     .findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           profileImgPath: req.body.path,
//         },
//       },
//       { new: true }
//     )
//     .then((user) => res.status(200).send(user))
//     .catch((err) => res.status(503).send(err));
// };
export const getInteractions = (req, res) => {
  const serviceName = req.params.serviceName;
  interactionModel
    .find({})
    .then((interactions) => {
      const filterdInteractions = [];
      for (let int of interactions) {
        if (int.serviceName === serviceName) {
          filterdInteractions.push(int);
        }
      }
      res.status(200).send({ interactions: filterdInteractions });
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
  const serviceName = req.params.serviceName;
  serviceModel
    .findOneAndUpdate(
      { name: serviceName },
      {
        $set: { "patients.$[element]": parsedUpdate },
      },
      {
        arrayFilters: [
          { "element.nationalId": { $eq: parsedUpdate.nationalId } },
        ],
      }
    )
    .then((service) => res.status(200).send(service))
    .catch((err) => res.status(503).send(err));
};

export const addPatient = (req, res) => {
  const newPatient = req.body.newPatient || "{}";
  const parsedPatient = JSON.parse(newPatient);
  console.log(parsedPatient);
  const serviceName = req.params.serviceName;
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
  interactionModel
    .create(req.body)
    .then((interaction) => {
      serviceModel
        .findOneAndUpdate(
          { name: req.body.serviceName },
          {
            $push: { interactions: interaction._id },
          }
        )
        .then((service) => {
          if (interaction.exchangeType === 0) {
            addInteractionToDonor(interaction, res);
          } else {
            addInteractionToPatient(interaction, res);
          }
        })
        .catch((err) => res.status(503).send(err));
    })
    .catch((err) => res.status(503).send(err));
};

const addInteractionToDonor = (interaction, res) => {
  donorModel
    .findOne({ nationalId: interaction.EndNationalId.nationalId })
    .then((donor) => {
      if (donor) {
        donor.interactions.push(interaction._id);
        donor.lastDonation = new Date();
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
            bloodtype: interaction.EndNationalId.bloodtype,
            age: 21,
            lastDonation: new Date(),
            interactions: [interaction._id],
          })
          .then((donor) => res.status(201).send(donor))
          .catch((err) => res.status(503).send(err));
      }
    })
    .catch((err) => res.status(503).send(err));
};

const addInteractionToPatient = (interaction, res) => {
  serviceModel.findOne({ name: interaction.serviceName }).then((service) => {
    let exist = false;
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
