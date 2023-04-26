import stuffModel from "../models/serviceStuff.js";
import serviceModel from "../models/serviceModel.js";
import appointmentModel from "../models/appointment.js";
import requestModel from "../models/serviceRequests.js";
import bcrypt from "bcrypt";

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
    console.log(error);
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
    const allAppointments = await appointmentModel.find({});
    for (const appointment of allAppointments)
      if (appointment.Service === serviceName) appointments.push(appointment);
    res.status(200).send({ appointments });
  } catch (error) {
    res.status(503).send(error);
  }
};

export const getDoctors = async (req, res) => {
  const serviceName = req.params.serviceName;
  try {
    let doctors = [];
    const allStuff = await stuffModel.find({});
    for (const user of allStuff)
      if (user.serviceName === serviceName && user.stuffType == 1)
        doctors.push(user);
    res.status(200).send({ doctors });
  } catch (error) {
    res.status(503).send(error);
  }
};

export const addDoctor = async (req, res) => {
  const doctor = req.body.doctor;
  try {
    const hashPassword = await bcrypt.hash(doctor.password, 10);
    const { _id } = await stuffModel.create({
      ...doctor,
      password: hashPassword,
    });
    const service = await serviceModel.findOneAndUpdate(
      { name: doctor.serviceName },
      {
        $push: { doctors: _id },
      }
    );
    res.status(201).send({ service });
  } catch (error) {
    res.status(503).send(error);
  }
};

export const resetDoctorPassword = async (req, res) => {
  const { newPassword, doctorId } = req.body;
  try {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await stuffModel.findOneAndUpdate(
      { nationalId: doctorId },
      {
        $set: { password: hashPassword },
      }
    );
    res.status(200).send();
  } catch (error) {
    res.status(503).send(error);
  }
};

export const deleteDoctor = async (req, res) => {
  const { doctorId, serviceName } = req.params;
  try {
    const doctor = await stuffModel.findOneAndDelete({ nationalId: doctorId });
    const service = await serviceModel.findOneAndUpdate(
      { name: serviceName },
      {
        $pull: { doctors: { $eq: doctor._id } },
      },
      {
        new: true,
      }
    );
    res.status(200).send(service);
  } catch (error) {
    console.log(error);
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

export const addNewRequest = async (req, res) => {
  const rawRequest = req.body.request;
  try {
    const createdRequest = await requestModel.create(rawRequest);
    const services = await Promise.all([
      serviceModel.findOneAndUpdate(
        { name: createdRequest.senderService },
        {
          $push: { requests: createdRequest._id },
        },
        {
          new: true,
        }
      ),
      serviceModel.findOneAndUpdate(
        { name: createdRequest.recieverService },
        {
          $push: { requests: createdRequest._id },
        }
      ),
    ]);

    res.status(201).send({ service: services[0] });
  } catch (error) {
    console.log(error);
    res.status(503).send(error);
  }
};

export const respondToRequest = async (req, res) => {
  const { requestId, respondMessage, requestStatus } = req.body;
  try {
    await requestModel.findByIdAndUpdate(requestId, {
      $set: { respondMessage: respondMessage, requestStatus: requestStatus },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(503).send(error);
  }
};
