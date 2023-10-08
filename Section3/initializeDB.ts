import mongoose from "mongoose";
import User, { IUser } from "./models/Users";
import bcrypt from "bcrypt";

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "MTCT",
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    const salt = await bcrypt.genSalt(10);

    // Define the JSON data to insert
    const userData: Partial<IUser>[] = [
      {
        userId: "MTCT001",
        name: "Head Quarters",
        type: "hq",
        password: await bcrypt.hash("hq123", salt),
      },
      {
        userId: "MTCT002",
        name: "Branch 1",
        type: "branch",
        password: await bcrypt.hash("br123", salt),
      },
      {
        userId: "MTCT003",
        name: "Branch 2",
        type: "branch",
        password: await bcrypt.hash("br123", salt),
      },
      {
        userId: "MTCT004",
        name: "Advisor 1",
        type: "advisor",
        password: await bcrypt.hash("fa123", salt),
      },
      {
        userId: "MTCT005",
        name: "Advisor 2",
        type: "advisor",
        password: await bcrypt.hash("fa123", salt),
      },
    ];

    // Insert the data into the User collection
    User.insertMany(userData as IUser[])
      .then(() => {
        console.log("Data inserted successfully");
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      })
      .finally(() => {
        // Close the database connection
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
