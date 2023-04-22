import mongoose from "mongoose";
import { quantity, bloodTypesQunatity, patient, post } from "./subSchema.js";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  manageNationalId: {
    type: String,
    require: true,
  },
  doctors: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  "Red Cells": {
    default: {
      "A+": { currentQunatity: 0, miniumQuantity: 0 },
      "A-": { currentQunatity: 0, miniumQuantity: 0 },
      "B+": { currentQunatity: 0, miniumQuantity: 0 },
      "B-": { currentQunatity: 0, miniumQuantity: 0 },
      "O+": { currentQunatity: 0, miniumQuantity: 0 },
      "O-": { currentQunatity: 0, miniumQuantity: 0 },
      "AB+": { currentQunatity: 0, miniumQuantity: 0 },
      "AB-": { currentQunatity: 0, miniumQuantity: 0 },
    },
    type: bloodTypesQunatity,
    patient,
  },
  "Full Blood": {
    default: {
      "A+": { currentQunatity: 0, miniumQuantity: 0 },
      "A-": { currentQunatity: 0, miniumQuantity: 0 },
      "B+": { currentQunatity: 0, miniumQuantity: 0 },
      "B-": { currentQunatity: 0, miniumQuantity: 0 },
      "O+": { currentQunatity: 0, miniumQuantity: 0 },
      "O-": { currentQunatity: 0, miniumQuantity: 0 },
      "AB+": { currentQunatity: 0, miniumQuantity: 0 },
      "AB-": { currentQunatity: 0, miniumQuantity: 0 },
    },
    type: bloodTypesQunatity,
    patient,
  },
  Plasma: {
    type: quantity,
    default: { currentQunatity: 0, miniumQuantity: 0 },
  },
  Platelets: {
    type: quantity,
    default: { currentQunatity: 0, miniumQuantity: 0 },
  },
  posts: {
    type: [post],
    default: [],
  },
  requests: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  interactions: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  patients: {
    type: [patient],
    default: [],
  },
  appointments: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

export default mongoose.model("services", serviceSchema);
