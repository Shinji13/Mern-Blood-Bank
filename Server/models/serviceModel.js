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
  redCells: {
    default: {
      "a+": { currentQunatity: 0, miniumQuantity: 0 },
      "a-": { currentQunatity: 0, miniumQuantity: 0 },
      "b+": { currentQunatity: 0, miniumQuantity: 0 },
      "b-": { currentQunatity: 0, miniumQuantity: 0 },
      "o+": { currentQunatity: 0, miniumQuantity: 0 },
      "o-": { currentQunatity: 0, miniumQuantity: 0 },
      "ab+": { currentQunatity: 0, miniumQuantity: 0 },
      "ab-": { currentQunatity: 0, miniumQuantity: 0 },
    },
    type: bloodTypesQunatity,
    patient,
  },
  fullBlood: {
    default: {
      "a+": { currentQunatity: 0, miniumQuantity: 0 },
      "a-": { currentQunatity: 0, miniumQuantity: 0 },
      "b+": { currentQunatity: 0, miniumQuantity: 0 },
      "b-": { currentQunatity: 0, miniumQuantity: 0 },
      "o+": { currentQunatity: 0, miniumQuantity: 0 },
      "o-": { currentQunatity: 0, miniumQuantity: 0 },
      "ab+": { currentQunatity: 0, miniumQuantity: 0 },
      "ab-": { currentQunatity: 0, miniumQuantity: 0 },
    },
    type: bloodTypesQunatity,
    patient,
  },
  plasma: {
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
