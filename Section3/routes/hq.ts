import express, { Request, Response } from "express";
const app = express();
import User, { IUser } from "./../models/Users";
import Investor, { IInvestor } from "./../models/Investor";
import { authenticateToken } from "./../middleware/auth"; // Import the authentication middleware

// Login route
app.post(
  "/hq/assign-advisor",
  authenticateToken,
  async (req: any, res: Response) => {
    if (req.user.type !== "hq") {
      res.status(401).json({ message: "Un authorised" });
    }
    const { investorId, advisorId } = req.body;

    // Find the user by userId (you should replace this with your database query)
    const advisor: IUser | null = await User.findOne({ userId: advisorId });
    if (!advisor || advisor.type != "advisor") {
      res.status(400).json({ message: "Invalid advisor id" });
    }
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
      { financialAdvisor: advisorId }
    );

    res.json({ message: "done" });
  }
);


export default app