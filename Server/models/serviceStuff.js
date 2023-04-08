import mongoose from "mongoose";

const serviceStuffSchema = new mongoose.Schema({
  FullName: {
    type: String,
    require: true,
  },
  nationalId: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  tel: {
    type: String,
    default: "0x1",
  },
  profileImgPath: {
    type: String,
    default: "default.jpg",
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
