import { Schema, model, Document, Types } from 'mongoose';

interface IRoomItem {
  cleanliness: number;
  lastCleanedAt: Date;
}

export interface IRoom extends Document {
  name: string;
  owner: Types.ObjectId;
  cat: Types.ObjectId;

  items: {
    litterBox: IRoomItem;
    waterBowl: IRoomItem;
    foodBowl: IRoomItem;
    floor: IRoomItem;
    catBed: IRoomItem;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      default: 'Main Cat Room',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cat: {
      type: Schema.Types.ObjectId,
      ref: 'Cat',
      required: true,
    },
    items: {
      litterBox: {
        cleanliness: { type: Number, default: 100, min: 0, max: 100 },
        lastCleanedAt: { type: Date, default: Date.now },
      },
      waterBowl: {
        cleanliness: { type: Number, default: 100, min: 0, max: 100 },
        lastCleanedAt: { type: Date, default: Date.now },
      },
      foodBowl: {
        cleanliness: { type: Number, default: 100, min: 0, max: 100 },
        lastCleanedAt: { type: Date, default: Date.now },
      },
      floor: {
        cleanliness: { type: Number, default: 100, min: 0, max: 100 },
        lastCleanedAt: { type: Date, default: Date.now },
      },
      catBed: {
        cleanliness: { type: Number, default: 100, min: 0, max: 100 },
        lastCleanedAt: { type: Date, default: Date.now },
      },
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  },
);

export const Room = model<IRoom>('Room', roomSchema);
