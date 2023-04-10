import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  ServiceId: {
    name: {
      type: String,
      require: true,
    },
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
  },
  donorNationalId: {
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
    enum: ["plasma", "red_cells", "platelets", "full_blood"],
    require: true,
  },
});

export default mongoose.model("appointments", appointmentSchema);
