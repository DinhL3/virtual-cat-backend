import mongoose, { Types } from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  cat: Types.ObjectId;
  room: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Cat' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
