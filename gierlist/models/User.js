// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  streamKey: {
    type: String,
    required: true,
    unique: true,
  },
  stream: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream",
    },
  ],
  
});

// Check if the model is already compiled, if not compile it
export default mongoose.models.User || mongoose.model("User", UserSchema);
