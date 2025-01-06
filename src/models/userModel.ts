import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
