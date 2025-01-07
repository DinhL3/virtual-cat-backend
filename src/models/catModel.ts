// catModel.ts

import { Schema, model, Document, Types } from 'mongoose';

export interface ICat extends Document {
  name: string;
  owner: Types.ObjectId;
  adoptedOn: Date;

  /**
   * Group 'last actions' in a subdocument for clarity.
   * Each field tracks when the cat was last fed, played with, etc.
   */
  lastActions: {
    fedAt: Date;
    playedWithAt: Date;
    brushedAt: Date;
  };

  /**
   * 'parameters' tracks various cat stats or needs.
   */
  parameters: {
    affection: number;
    hunger: number;
    thirst: number;
    fun: number;
    energy: number;
    hygiene: number;
  };

  status: 'alive' | 'dead';

  coatType: 'tabby' | 'void' | 'tuxedo' | 'orange' | 'calico' | 'snow';

  // Mongoose adds these automatically when { timestamps: true } is set.
  createdAt?: Date;
  updatedAt?: Date;
}

const catSchema = new Schema<ICat>(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adoptedOn: {
      type: Date,
      default: Date.now,
    },
    lastActions: {
      fedAt: { type: Date, default: Date.now },
      playedWithAt: { type: Date, default: Date.now },
      brushedAt: { type: Date, default: Date.now },
    },
    parameters: {
      affection: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
      hunger: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
      thirst: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
      fun: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
      energy: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
      hygiene: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
    },
    status: {
      type: String,
      enum: ['alive', 'dead'],
      default: 'alive',
    },
    coatType: {
      type: String,
      enum: ['tabby', 'void', 'tuxedo', 'orange', 'calico', 'snow'],
      default: 'snow',
    },
  },
  {
    timestamps: true,
  },
);

export const Cat = model<ICat>('Cat', catSchema);
