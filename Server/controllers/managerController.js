import stuffModel from "../models/serviceStuff.js";
import serviceModel from "../models/serviceModel.js";

export const getmanagerInfo = (req, res) => {
  const userId = req.userId;
  stuffModel
    .findById(userId, { password: 0, _id: 0, _v: 0 })
    .then(async (user) => {
      try {
        const service = await serviceModel.findOne({ name: user.serviceName });
        res.status(200).send({ service, user });
      } catch (error) {
        res.status(503).send(err);
      }
    })
    .catch((err) => res.status(503).send(err));
};

export const updateQuantity = async (req, res) => {
  const serviceName = req.params.serviceName;
  const { type, quantity, bloodtype } = req.body;
  try {
    const service = await serviceModel.findOne({ name: serviceName });
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
