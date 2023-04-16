import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  Service: {
    type: String,
    require: true,
  },
  donor: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    default: () => new Date(),
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  appointmentType: {
    type: String,
    enum: ["Plasma", "Red Cells", "Platelets", "Full Blood"],
    require: true,
  },
});

export default mongoose.model("appointments", appointmentSchema);
