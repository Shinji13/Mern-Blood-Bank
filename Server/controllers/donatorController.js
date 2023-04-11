import donorModel from "../models/donator.js";
import serviceModle from "../models/serviceModel.js";
import appointmentModel from "../models/appointment.js";

export const getDonatorInfo = (req, res) => {
  const Id = req.userId;
  donorModel
    .findOne({ _id: Id }, { password: 0, _id: 0 })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(503).send(err));
};

export const getPosts = (req, res) => {
  serviceModle
    .find({}, { posts: 1, name: 1, address: 1 })
    .then((services) => {
      res.status(200).send({});
    })
    .catch((err) => res.status(503).send(err));
};

export const updateProfile = (req, res) => {
  const update = req.body.update || "{}";
  const parsedUpdate = JSON.parse(update);
  const userId = req.userId;
  donorModel.findByIdAndUpdate(userId, {
    $set: parsedUpdate,
  });
};

export const getAppointments = async (req, res) => {
  const Id = req.userId;
  const appointmentsIds = req.body.ListOfAppointments;
  const appointments = [];
  const isErros = false;
  for (let appointmentId of appointmentsIds) {
    try {
      let apt = await appointmentModel.findById(appointmentId);
      appointments.push(apt);
    } catch (error) {
      res.status(503).send(err);
      isErros = true;
      break;
    }
  }
  if (!isErros) res.status(200).send({ appointments });
};

export const addAppointment = (req, res) => {
  const newAppointment = new appointmentModel(req.body.appointment);
  newAppointment
    .save()
    .then((apt) => {
      res.status(201).send(apt);
    })
    .catch((err) => res.status(503).send(err));
};
