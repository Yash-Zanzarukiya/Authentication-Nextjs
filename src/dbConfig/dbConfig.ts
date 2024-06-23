import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connection", () => {
      console.log("MongoDB Connected...");
    });
    connection.on("error", (error) => {
      console.log("MONGODB CONNECTION ERROR: ", error);
      process.exit();
    });
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED...");
    console.log(error);
  }
}
