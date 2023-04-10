import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  senderService: {
    name: {
      type: String,
      require: true,
    },
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
  },
  recieverService: {
    name: {
      type: String,
      require: true,
    },
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
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
    plasma: {
      type: Number,
      default: 0,
    },
    Platelets: {
      type: Number,
      default: 0,
    },
    RedCells: {
      type: {
        "a+": Number,
        "a-": Number,
        "b+": Number,
        "b-": Number,
        "o+": Number,
        "o-": Number,
        "ab+": Number,
        "ab-": Number,
      },
      default: {
        "a+": 0,
        "a-": 0,
        "b+": 0,
        "b-": 0,
        "o+": 0,
        "o-": 0,
        "ab+": 0,
        "ab-": 0,
      },
    },
    fullBlood: {
      type: {
        "a+": Number,
        "a-": Number,
        "b+": Number,
        "b-": Number,
        "o+": Number,
        "o-": Number,
        "ab+": Number,
        "ab-": Number,
      },
      default: {
        "a+": 0,
        "a-": 0,
        "b+": 0,
        "b-": 0,
        "o+": 0,
        "o-": 0,
        "ab+": 0,
        "ab-": 0,
      },
    },
  },
});

export default mongoose.model("servicesRequest", requestSchema);
