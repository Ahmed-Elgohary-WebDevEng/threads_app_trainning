import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // prevent unknown queries

  if (!process.env.MONGODB_URI) {
    return console.log("Mongodb URI is missing");
  }

  if (isConnected) {
    return console.log("Mongodb URI is connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
