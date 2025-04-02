import { Schema, model, Document, Types } from 'mongoose';

export interface IGameSave extends Document {
  userId: Types.ObjectId;
  gameState: {
    characterName: string;
    currentDay: Number;
    money: Number;
  };

  createdAt: Date;
  updatedAt: Date;
}

const gameSaveSchema = new Schema<IGameSave>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    gameState: {
      characterName: { type: String, required: true },
      currentDay: { type: Number, required: true },
      money: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

export const GameSave = model<IGameSave>('GameSave', gameSaveSchema);
