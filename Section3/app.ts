import express from "express";
import mongoose from "mongoose";

import login from "./routes/login";
import hq from "./routes/hq";
import branch from "./routes/branch";
import investor from "./routes/investor";

// Create an instance of Express
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "MTCT",
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middleware to parse JSON requests
app.use(express.json());

// Mount routes under "/api" namespace
app.use("/api", login, hq, branch, investor);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
