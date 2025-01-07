import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  cat: Types.ObjectId | null;
  room: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cat: { type: Schema.Types.ObjectId, ref: 'Cat', default: null },
    room: { type: Schema.Types.ObjectId, ref: 'Room', default: null },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
