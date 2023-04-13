import mongoose from "mongoose";

const interactionsSchema = new mongoose.Schema({
  date: {
    type: String,
    default: () => new Date(),
  },
  serviceName: {
    type: String,
    require: true,
  },
  EndNationalId: {
    name: {
      type: String,
      require: true,
    },
    nationalId: {
      type: String,
      require: true,
    },
  },
  doctor: {
    name: {
      type: String,
      require: true,
    },
    nationalId: {
      type: String,
      require: true,
    },
  },
  Quantity: {
    type: Number,
    require: true,
  },
  bloodtype: {
    type: String,
    require: true,
  },
  exchangeType: {
    type: Number,
    require: true,
    enum: [0, 1],
  },
  interactionNotice: {
    type: String,
    require: true,
    validate: {
      validator: (val) => (val.length >= 20 ? true : false),
    },
  },
});

export default mongoose.model("interactions", interactionsSchema);
