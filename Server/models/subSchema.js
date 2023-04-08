import mongoose from "mongoose";

export const quantity = new mongoose.Schema(
  {
    currentQunatity: {
      type: Number,
      require: true,
    },
    miniumQuantity: {
      type: Number,
      require: true,
    },
  },
  { autoIndex: false, versionKey: false }
);

export const bloodTypesQunatity = new mongoose.Schema(
  {
    "a+": {
      type: quantity,
      require: true,
    },
    "a-": {
      type: quantity,
      require: true,
    },
    "b+": {
      type: quantity,
      require: true,
    },
    "b-": {
      type: quantity,
      require: true,
    },
    "ab+": {
      type: quantity,
      require: true,
    },
    "ab-": {
      type: quantity,
      require: true,
    },
    "o+": {
      type: quantity,
      require: true,
    },
    "o-": {
      type: quantity,
      require: true,
    },
  },
  { autoIndex: false, versionKey: false }
);

export const post = new mongoose.Schema(
  {
    date: {
      type: String,
      default: () => new Date(),
    },
    message: {
      type: String,
      require: true,
      validator: {
        validate: (val) => (val.length >= 20 ? true : false),
      },
    },
  },
  { autoIndex: false, versionKey: false }
);

export const patient = mongoose.Schema(
  {
    FullName: {
      type: String,
      require: true,
    },
    nationalId: {
      type: String,
      require: true,
    },
    tel: {
      type: String,
      default: "0x1",
    },
    address: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    bloodtype: {
      type: String,
      require: true,
      enum: ["a+", "a-", "b+", "b-", "o+", "o-", "ab+", "ab-"],
    },
    profileImgPath: {
      type: String,
      default: "default.jpg",
    },
    healthStatus: {
      type: String,
      default: "",
    },
    interactions: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { versionKey: false }
);
