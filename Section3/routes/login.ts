import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../models/Users";
import Investor, { IInvestor } from "./../models/Investor";

const app = express();

// Staff login route
app.post("/staff/login", async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;

    // Find the staff user by userId
    const user = await User.findOne({ userId });

    // Check if the user exists and password matches
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a JWT token for staff
    const token = jwt.sign(
      { userId: user.userId, type: user.type },
      "secret-key",
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during staff login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Investor login route
app.post("/investor/login", async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;

    // Find the investor by userId
    const user = await Investor.findOne({ userId });

    // Check if the investor exists and password matches
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a JWT token for investors
    const token = jwt.sign(
      { userId: user.userId, type: "investor" },
      "secret-key",
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during investor login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Investor registration route
app.post("/investor/register", async (req: Request, res: Response) => {
  try {
    const { name, email, branch, userId, password } = req.body;

    // Check if the user already exists by userId
    const existingUser = await Investor.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newInvestor: IInvestor = new Investor({
      name,
      email,
      branch,
      userId,
      password: hashedPassword,
    });

    await newInvestor.save();
    res.status(201).json({ message: "Investor registered successfully" });
  } catch (error) {
    console.error("Error registering investor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
