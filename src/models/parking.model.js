import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
  },
  entryTime: {
    type: Date,
    required: true,
  },
  exitTime: {
    type: Date,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  left: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Parking", parkingSchema);
