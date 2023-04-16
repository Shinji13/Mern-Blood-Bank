import mongoose from "mongoose";

const donatorSchema = new mongoose.Schema({
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
  address: {
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
  bloodtype: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
    min: 18,
    max: 54,
  },
  interactions: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  appointments: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  lastDonation: {
    type: String,
    default: () => new Date(),
  },
});

export default mongoose.model("donator", donatorSchema);
