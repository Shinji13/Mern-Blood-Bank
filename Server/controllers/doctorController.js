import stuffModel from "../models/serviceStuff.js";
import serviceModel from "../models/serviceModel.js";
import interactionModel from "../models/interaction.js";
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
  const nationalId = req.body.nationalId;
  const parsedUpdate = JSON.parse(update);
  const serviceName = req.params.serviceName;
  serviceModel
    .findOneAndUpdate(
      { name: serviceName },
      {
        $set: {
          "patients.$[element].tel": parsedUpdate.tel,
          "patients.$[element].healthStatus": parsedUpdate.healthStatus,
          "patients.$[element].profileImgPath": parsedUpdate.profileImgPath,
          "patients.$[element].address": parsedUpdate.address,
        },
      },
      {
        arrayFilters: [{ "element.nationalId": { $eq: nationalId } }],
      }
    )
    .then((service) => res.status(200).send(service))
    .catch((err) => res.status(503).send(err));
};

export const addDonor = async (req, res) => {
  const newDonor = req.body.user;
  donorModel
    .create({
      fullName: newDonor.fullName,
      email: "default",
      password: "default",
      nationalId: newDonor.nationalId,
      address: newDonor.address,
      bloodtype: newDonor.bloodtype,
      tel: newDonor.tel,
      age: newDonor.age,
    })
    .then((donor) => res.status(201).send(donor))
    .catch((err) => res.status(503).send(err));
};

export const addPatient = (req, res) => {
  const newPatient = req.body.user;
  const serviceName = req.params.serviceName;
  serviceModel
    .findOneAndUpdate(
      { name: serviceName },
      {
        $push: {
          patients: {
            ...newPatient,
            interactions: [],
            healthStatus: "default",
          },
        },
      }
    )
    .then((service) => res.status(201).send(service))
    .catch((err) => res.status(503).send(err));
};

export const addInteraction = (req, res, next) => {
  const interaction = new interactionModel(req.body.interaction);
  if (interaction.exchangeType === 0) {
    addInteractionToDonor(interaction, req, res, next);
  } else {
    addInteractionToPatient(interaction, req, res, next);
  }
};

export const storeNewInteraction = (req, res) => {
  const interaction = req.interaction;
  interaction
    .save()
    .then(() =>
      serviceModel
        .findOne({ name: interaction.serviceName })
        .then((service) => {
          service.interactions.push(interaction._id);
          updateQuantity(service, interaction);
          service
            .save()
            .then(() =>
              res
                .status(201)
                .send({ message: "interaction is created successfully" })
            )
            .catch((err) => {
              console.log(err);
              res.status(503).send(err);
            });
        })
        .catch((err) => res.status(503).send(err))
    )
    .catch((err) => res.status(503).send(err));
};

const updateQuantity = (service, interaction) => {
  let threshHold =
    interaction.exchangeType == 0
      ? interaction.Quantity
      : -interaction.Quantity;
  if (
    interaction.bloodtype == "Red Cells" ||
    interaction.bloodtype == "Full Blood"
  ) {
    service[interaction.bloodtype][
      interaction.EndNationalId.bloodtype
    ].currentQunatity += threshHold;
  } else service[interaction.bloodtype].currentQunatity += threshHold;
};

const addInteractionToDonor = (interaction, req, res, next) => {
  donorModel
    .findOne({ nationalId: interaction.EndNationalId.nationalId })
    .then((donor) => {
      if (donor) {
        donor.interactions.push(interaction._id);
        donor.lastDonation = interaction.date;
        donor
          .save()
          .then((donor) => {
            interaction.EndNationalId.bloodtype = donor.bloodtype;
            interaction.EndNationalId.name = donor.fullName;
            req.interaction = interaction;
            next();
          })
          .catch((err) => {
            console.log(err);
            res.status(503).send(err);
          });
      } else res.status(403).send("donor doenst exist");
    })
    .catch((err) => res.status(503).send(err));
};

const addInteractionToPatient = (interaction, req, res, next) => {
  serviceModel.findOne({ name: interaction.serviceName }).then((service) => {
    let patient = null;
    for (let i = 0; i < service.patients.length; i++) {
      if (
        service.patients[i].nationalId === interaction.EndNationalId.nationalId
      ) {
        patient = service.patients[i];
        service.patients[i].interactions.push(interaction._id);
        break;
      }
    }
    if (patient == null)
      res.status(403).send({ message: "patient doenst exist" });
    else
      service
        .save()
        .then((service) => {
          interaction.EndNationalId.bloodtype = patient.bloodtype;
          interaction.EndNationalId.name = patient.fullName;
          req.interaction = interaction;
          next();
        })
        .catch((err) => res.status(503).send(err));
  });
};
