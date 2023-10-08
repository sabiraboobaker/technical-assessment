import express, {  Response } from "express";
import Investor, { IInvestor } from "./../models/Investor";
import { authenticateToken } from "./../middleware/auth"; // Import the authentication middleware

const app = express();

// Route to verify KYC for a branch (requires authentication)
app.post(
  "/branch/verify-kyc",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      // Check if the authenticated user is of type "branch"
      if (req.user.type !== "branch") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { investorId } = req.body;

      // Find the investor by userId in the database
      const investor: IInvestor | null = await Investor.findOne({
        userId: investorId,
      });

      if (!investor) {
        return res.status(400).json({ message: "Invalid investor id" });
      }

      // Update the KYC status for the investor
      await Investor.findOneAndUpdate({ userId: investorId }, { kyc: true });

      return res.json({ message: "KYC verification done" });
    } catch (error) {
      console.error("Error verifying KYC:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default app;
