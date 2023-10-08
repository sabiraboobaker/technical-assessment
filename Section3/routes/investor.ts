import express, { Request, Response } from "express";
const app = express();
import Investor, { IInvestor } from "./../models/Investor";
import { authenticateToken } from "./../middleware/auth"; // Import the authentication middleware

// Login route
app.post(
  "/investor/trade-deposit",
  authenticateToken,
  async (req: any, res: Response) => {
    if (req.user.type !== "investor") {
      res.status(401).json({ message: "Un authorised" });
    }
    const { amount } = req.body;

    const investor: IInvestor | null = await Investor.findOne({
      userId: req.user.userId,
    });

    await Investor.findOneAndUpdate(
      {
        userId: req.user.userId,
      },
      { tradeBalance: investor?.tradeBalance + amount }
    );

    res.json({ message: "done" });
  }
);

export default app;
