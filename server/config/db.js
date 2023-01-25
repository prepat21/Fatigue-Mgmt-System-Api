const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .set("strictQuery", true)
    .connect(process.env.MONGO_URI)
    .catch((err) => {
      console.log(err);
    });
  console.log(`MongoDB connected to ${process.env.MONGO_URI}`);
};

module.exports = connectDB;
