import { Schema, model, Document, Types } from 'mongoose';

export interface IGameSave extends Document {
  userId: Types.ObjectId;
  slotNumber: Number;
  name: String;
  gameState: {
    currentChapter: Types.ObjectId;
    currentBlock: Types.ObjectId;
    characterStats: {
      name: String;
    };
  };

  createdAt: Date;
  updatedAt: Date;
}

const gameSaveSchema = new Schema<IGameSave>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    slotNumber: { type: Number, required: true },
    name: { type: String, required: true },
    gameState: {
      currentChapter: { type: String, required: true },
      currentBlock: { type: String, required: true },
      characterStats: {
        name: { type: String, required: true },
      },
    },
  },
  { timestamps: true },
);

export const GameSave = model<IGameSave>('GameSave', gameSaveSchema);
