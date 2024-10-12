const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Setting up db connection with Mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connection done !");
  } catch (error) {
    console.log("Error connecting to the mongodb", error);
    process.exit(1);
  }
};

module.exports = connectDB;
