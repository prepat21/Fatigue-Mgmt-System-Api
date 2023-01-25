const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  certifications: {
    type: String,
  },
  training: {
    type: String,
    enum: ["Lifestyle", "Sports", "Bodybuilding", "Powerlifting"],
  },
});

module.exports = mongoose.model("Trainer", TrainerSchema);
