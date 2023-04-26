import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  senderService: {
    type: String,
    require: true,
  },
  recieverService: {
    type: String,
    require: true,
  },
  requestMessage: {
    type: String,
    require: true,
  },
  respondMessage: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: () => new Date(),
  },
  requestStatus: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3],
  },
});

export default mongoose.model("servicesRequest", requestSchema);
