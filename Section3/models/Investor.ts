
import mongoose, { Schema, Document } from 'mongoose';

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
    default:0
  },
});

const Investor = mongoose.model<IInvestor>('Investor', investorSchema);

export default Investor;
