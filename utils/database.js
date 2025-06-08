import mongoose from "mongoose";

let isConnected = false; // allow us to track the connection status

export const connectToDB = async () => {
  // set the mongoose's options,
  // if not, we'll get warning from the console:
  // mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("[connectToDB] MongoDB is already connected!");
    return;
  }

  try {
    // try to establish a connection
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    console.log("[connectToDB] mongoDB connected!");

    isConnected = true;
  } catch (error) {
    console.info("[connectToDB] error:", error);
  }
};
