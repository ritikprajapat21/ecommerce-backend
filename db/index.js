import mongoose from "mongoose";

let connection;

export const createConnection = async () => {
  if (connection) {
    return connection;
  }

  console.log("Connecting to database...");
  connection = await mongoose.connect("mongodb://0.0.0.0:27017/mongodb", {
    authSource: "admin",
    user: "root",
    pass: "password",
  });
  console.log("Connection state:", mongoose.connection.readyState);

  return connection;
};
