// Import required modules
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import login from "./routes/login";
import hq from "./routes/hq";
import branch from "./routes/branch";
import investor from "./routes/investor";

// Create an instance of Express
const app = express();
const port = 3000;

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
app.use("/api", login, hq, branch, investor);

// // Sample data
// const books = [
//   { id: 1, title: 'Book 1' },
//   { id: 2, title: 'Book 2' },
// ];

// // Routes
// app.get('/api/books', (req: Request, res: Response) => {
//   res.json(books);
// });

// app.get('/api/books/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const book = books.find((b) => b.id === id);
//   if (!book) {
//     res.status(404).json({ message: 'Book not found' });
//   } else {
//     res.json(book);
//   }
// });

// app.post('/api/books', (req: Request, res: Response) => {
//   const newBook = req.body;
//   books.push(newBook);
//   res.status(201).json(newBook);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
