import express, { Request, Response } from "express";
const app = express();
import User, { IUser } from "./../models/Users";
import Investor, { IInvestor } from "./../models/Investor";
import { authenticateToken } from "./../middleware/auth"; // Import the authentication middleware

// Login route
app.post(
  "/branch/verify-kyc",
  authenticateToken,
  async (req: any, res: Response) => {
    if (req.user.type !== "branch") {
      res.status(401).json({ message: "Un authorised" });
    }
    const { investorId} = req.body;

    // Find the user by userId (you should replace this with your database query)
    const investor: IInvestor | null = await Investor.findOne({
      userId: investorId,
    });
    if (!investor) {
      res.status(400).json({ message: "Invalid investor id" });
    }

    await Investor.findOneAndUpdate(
      {
        userId: investorId,
      },
      { kyc: true }
    );

    res.json({ message: "done" });
  }
);


export default app