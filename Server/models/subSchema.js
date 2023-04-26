import mongoose from "mongoose";

export const requestBlood = new mongoose.Schema({
  Plasma: {
    type: Number,
  },
  Platelets: {
    type: Number,
  },
  "Red Cells": {
    type: {
      "A+": Number,
      "A-": Number,
      "B+": Number,
      "B-": Number,
      "O+": Number,
      "O-": Number,
      "AB+": Number,
      "AB-": Number,
    },
  },
  "Full Blood": {
    type: {
      "A+": Number,
      "A-": Number,
      "B+": Number,
      "B-": Number,
      "O+": Number,
      "O-": Number,
      "AB+": Number,
      "AB-": Number,
    },
  },
});

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
    "A+": {
      type: quantity,
      require: true,
    },
    "A-": {
      type: quantity,
      require: true,
    },
    "B+": {
      type: quantity,
      require: true,
    },
    "B-": {
      type: quantity,
      require: true,
    },
    "AB+": {
      type: quantity,
      require: true,
    },
    "AB-": {
      type: quantity,
      require: true,
    },
    "O+": {
      type: quantity,
      require: true,
    },
    "O-": {
      type: quantity,
      require: true,
    },
  },
  { autoIndex: false, versionKey: false }
);

export const post = new mongoose.Schema(
  {
    id: {
      type: "string",
      require: true,
    },
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
    fullName: {
      type: String,
      require: true,
    },
    nationalId: {
      type: String,
      require: true,
    },
    tel: {
      type: String,
      default: "default",
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
  { versionKey: false, autoIndex: false }
);

patient.set("autoIndex", false);
post.set("autoIndex", false);
quantity.set("autoIndex", false);
bloodTypesQunatity.set("autoIndex", false);
