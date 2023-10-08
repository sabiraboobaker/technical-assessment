import express, { Request, Response } from "express";
import Investor, { IInvestor } from "./../models/Investor";
import { authenticateToken } from "./../middleware/auth"; // Import the authentication middleware

const app = express();

// Route to deposit funds into an investor's trade balance (requires authentication)
app.post(
  "/investor/trade-deposit",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      // Check if the authenticated user is of type "investor"
      if (req.user.type !== "investor") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { amount } = req.body;

      // Find the investor by userId in the database
      const investor: IInvestor | null = await Investor.findOne({
        userId: req.user.userId,
      });

      if (!investor) {
        return res.status(400).json({ message: "Invalid investor id" });
      }

      // Update the trade balance by adding the deposited amount
      await Investor.findOneAndUpdate(
        { userId: req.user.userId },
        { tradeBalance: investor.tradeBalance + amount }
      );

      return res.json({ message: "Funds deposited into trade balance" });
    } catch (error) {
      console.error("Error depositing funds:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default app;
