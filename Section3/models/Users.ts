import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt'; 

// Define the User schema
export interface IUser extends Document {
  userId: string;
  name: string;
  type: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error:any) {
    return next(error);
  }
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
