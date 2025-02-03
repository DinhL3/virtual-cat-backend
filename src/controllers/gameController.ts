import { Request, Response } from 'express';
import { GameSave } from '../models/gameSaveModel';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  userId?: string;
}

export const newGame = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { characterName } = req.body;
    const userId = req.userId; // This comes from auth middleware

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Check if autosave slot already exists
    const existingAutosave = await GameSave.findOne({
      userId: new Types.ObjectId(userId),
      slotNumber: 0,
    });

    if (existingAutosave) {
      await existingAutosave.deleteOne();
    }

    // Create new game save
    const newGameSave = new GameSave({
      userId: new Types.ObjectId(userId),
      slotNumber: 0,
      name: 'Autosave',
      gameState: {
        currentChapter: 'chapter-1',
        currentBlock: 'block-1',
        characterStats: {
          name: characterName,
        },
      },
    });

    await newGameSave.save();

    res.status(201).json({
      message: 'New game started successfully',
      gameSave: newGameSave,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error creating new game',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
