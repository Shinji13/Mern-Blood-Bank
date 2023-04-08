import mongoose from "mongoose";

const donatorSchema = new mongoose.Schema({
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
  bloodtype: {
    type: String,
    require: true,
    enum: ["a+", "a-", "b+", "b-", "o+", "o-", "ab+", "ab-"],
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
});

export default mongoose.model("donator", donatorSchema);
