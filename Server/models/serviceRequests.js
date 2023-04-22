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
    default: "",
    validate: {
      validator: (val) => (val.length >= 20 ? true : false),
    },
  },
  respondMessage: {
    type: String,
    require: true,
    validate: {
      validator: (val) => (val.length >= 20 ? true : false),
    },
  },
  date: {
    type: String,
    default: () => new Date(),
  },
  requestStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected", "fulfilled"],
  },
  requestedBlood: {
    Plasma: {
      type: Number,
      default: 0,
    },
    Platelets: {
      type: Number,
      default: 0,
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
      default: {
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "B+": 0,
        "O-": 0,
        "AB+": 0,
        "AB-": 0,
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
      default: {
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "B+": 0,
        "O-": 0,
        "AB+": 0,
        "AB-": 0,
      },
    },
  },
});

export default mongoose.model("servicesRequest", requestSchema);
