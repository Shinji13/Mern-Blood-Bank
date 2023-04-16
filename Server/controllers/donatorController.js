import donorModel from "../models/donator.js";
import serviceModle from "../models/serviceModel.js";
import appointmentModel from "../models/appointment.js";

export const getDonatorInfo = (req, res) => {
  const Id = req.userId;
  donorModel
    .findOne({ _id: Id }, { password: 0, _id: 0 })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(503).send(err));
};

export const getPosts = (req, res) => {
  serviceModle
    .find({}, { posts: 1, address: 1, name: 1, _id: 0 })
    .then((services) => {
      res.status(200).send({ services: services });
    })
    .catch((err) => res.status(503).send(err));
};

export const updateProfile = (req, res) => {
  const update = req.body.update || "{}";
  const parsedUpdate = JSON.parse(update);
  const userId = req.userId;
  donorModel
    .findByIdAndUpdate(userId, {
      $set: {
        fullName: parsedUpdate.fullName,
        address: parsedUpdate.address,
        tel: parsedUpdate.tel,
        profileImgPath: parsedUpdate.profileImgPath,
        lastDonation: parsedUpdate.lastDonation,
      },
    })
    .then((donor) => res.status(200).send(donor))
    .catch((err) => res.status(503).send(err));
};

export const getAppointments = async (req, res) => {
  const nationalId = req.params.nationalId;
  appointmentModel
    .find({})
    .then((appointments) => {
      const returnedList = [];
      for (let apt of appointments) {
        if (apt.donor === nationalId) returnedList.push(apt);
      }
      res.status(200).send({ appointments: returnedList });
    })
    .catch((err) => res.status(503).send(err));
};

export const addAppointment = (req, res) => {
  const userId = req.userId;
  const newAppointment = new appointmentModel(req.body.appointment);
  newAppointment
    .save()
    .then((apt) => {
      serviceModle
        .findOne({ name: newAppointment.Service })
        .then((service) => {
          service.appointments.push(newAppointment._id);
          service
            .save()
            .then((service) => {
              donorModel
                .findByIdAndUpdate(userId, {
                  $push: { appointments: newAppointment._id },
                })
                .then(() => res.status(201).send(apt))
                .catch((err) => res.status(503).send(err));
            })
            .catch((err) => res.status(503).send(err));
        })
        .catch((err) => res.status(503).send(err));
    })
    .catch((err) => res.status(503).send(err));
};
