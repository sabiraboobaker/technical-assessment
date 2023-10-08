import mongoose, { Schema, Document } from "mongoose";

// Define the Investor interface representing the schema
export interface IInvestor extends Document {
  name: string;
  email: string;
  branch: string;
  userId: string;
  password: string;
  kyc?: boolean;
  financialAdvisor?: string;
  tradeBalance?: number;
}

// Create the Mongoose schema for the Investor
const investorSchema: Schema<IInvestor> = new Schema<IInvestor>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  kyc: {
    type: Boolean,
    default: false,
  },
  financialAdvisor: {
    type: String,
  },
  tradeBalance: {
    type: Number,
    default: 0,
  },
});

// Create the Investor model from the schema
const Investor = mongoose.model<IInvestor>("Investor", investorSchema);

export default Investor;
