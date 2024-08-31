import mongoose from "mongoose";

const StreamSchema = new mongoose.Schema({
  streamName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  streamDescription: {
    type: String,
  },
  status: {
    type: String,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Stream || mongoose.model("Stream", StreamSchema);
