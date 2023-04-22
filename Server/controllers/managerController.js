import stuffModel from "../models/serviceStuff.js";
import serviceModel from "../models/serviceModel.js";
import appointmentModel from "../models/appointment.js";
import requestModel from "../models/serviceRequests.js";

export const getmanagerInfo = (req, res) => {
  const userId = req.userId;
  stuffModel
    .findById(userId, { password: 0, _id: 0, _v: 0 })
    .then(async (user) => {
      try {
        const service = await serviceModel.findOne({ name: user.serviceName });
        res.status(200).send({ service, user });
      } catch (error) {
        console.log(error);
        res.status(503).send(error);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send(err);
    });
};

export const updateQuantity = async (req, res) => {
  const id = req.params.id;
  const { type, quantity, bloodtype } = req.body;
  try {
    const service = await serviceModel.findById(id);
    if (type == "Plasma" || type == "Platelets") service[type] = quantity;
    else service[type][bloodtype] = quantity;
    service
      .save()
      .then((service) => res.status(200).send({ service }))
      .catch((err) => res.status(503).send(err));
  } catch (error) {
    res.status(503).send(error);
  }
};

export const addPost = async (req, res) => {
  const id = req.params.id;
  const post = req.body.post;
  try {
    const service = await serviceModel.findByIdAndUpdate(
      id,
      {
        $push: { posts: post },
      },
      { new: true }
    );
    res.status(200).send(service);
  } catch (error) {
    res.status(503).send(error);
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const id = req.params.id;
  try {
    await appointmentModel.findByIdAndUpdate(id, {
      $set: { status: req.body.status },
    });
    res.status(200).send();
  } catch (error) {
    res.status(503).send(error);
  }
};

export const getAppointments = async (req, res) => {
  const serviceName = req.params.serviceName;
  try {
    let appointments = [];
    const allAppointments = appointmentModel.find({});
    for (const appointment of allAppointments)
      if (appointment.Service === serviceName) appointment.push(appointment);
    res.status(200).send({ appointments });
  } catch (error) {
    res.status(503).send(error);
  }
};

export const getDoctors = async (req, res) => {
  const serviceName = req.params.serviceName;
  try {
    let doctors = [];
    const allStuff = stuffModel.find({});
    for (const user of allStuff)
      if (user.serviceName === serviceName) doctors.push(user);
    res.status(200).send({ doctors });
  } catch (error) {
    res.status(503).send(error);
  }
};

export const getRequests = async (req, res) => {
  const serviceName = req.params.serviceName;
  try {
    let requestsSent = [];
    let requestsRecieved = [];
    const allRequests = await requestModel.find({});
    for (const request of allRequests) {
      if (request.senderService === serviceName) requestsSent.push(request);
      else if (request.recieverService === serviceName)
        requestsRecieved.push(request);
    }
    res.status(200).send({ requestsRecieved, requestsSent });
  } catch (error) {
    res.status(503).send(error);
  }
};
