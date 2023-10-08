import express, { Response } from "express";
import User, { IUser } from "./../models/Users";
import Investor, { IInvestor } from "./../models/Investor";
import { authenticateToken } from "./../middleware/auth"; // Import the authentication middleware

const app = express();

// Route to assign an advisor to an investor (requires authentication)
app.post(
  "/hq/assign-advisor",
  authenticateToken,
  async (req: any, res: Response) => {
    try {
      // Check if the authenticated user is of type "hq"
      if (req.user.type !== "hq") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { investorId, advisorId } = req.body;

      // Find the advisor by userId in the database
      const advisor: IUser | null = await User.findOne({ userId: advisorId });

      // Check if the advisor exists and is of type "advisor"
      if (!advisor || advisor.type !== "advisor") {
        return res.status(400).json({ message: "Invalid advisor id" });
      }

      // Find the investor by userId in the database
      const investor: IInvestor | null = await Investor.findOne({
        userId: investorId,
      });

      // Check if the investor exists
      if (!investor) {
        return res.status(400).json({ message: "Invalid investor id" });
      }

      // Assign the financial advisor to the investor
      await Investor.findOneAndUpdate(
        { userId: investorId },
        { financialAdvisor: advisorId }
      );

      return res.json({ message: "Advisor assigned to the investor" });
    } catch (error) {
      console.error("Error assigning advisor:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default app;
