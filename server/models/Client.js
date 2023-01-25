const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  goals: {
    type: String,
  },
  experience: {
    type: String,
    enum: ["Novice", "Intermediate", "Advanced"],
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },
});

module.exports = mongoose.model("Client", ClientSchema);
