import mongoose from "mongoose";

const serviceStuffSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  nationalId: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  serviceName: {
    type: String,
    require: true,
  },
  stuffType: {
    type: Number,
    require: true,
    enum: [0, 1],
  },
});

export default mongoose.model("serviceStuff", serviceStuffSchema);
