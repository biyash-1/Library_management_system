



import dotenv from "dotenv"; // Load environment variables from .env file
import mongoose from "mongoose";
dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGOURI); // Remove deprecated options
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
    process.exit(1); // Exit process with failure
  }
}

export default connectToDatabase;
