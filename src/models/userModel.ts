import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
