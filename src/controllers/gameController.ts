import { Request, Response } from 'express';
import { GameSave } from '../models/gameSaveModel';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  userId?: string;
}

export const checkGameSave = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Check if user has an existing game save
    const existingGameSave = await GameSave.findOne({
      userId: new Types.ObjectId(userId),
    });

    res.status(200).json({
      hasSave: !!existingGameSave,
      saveData: existingGameSave || null,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error checking game save',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const loadGame = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Find the user's game save
    const gameSave = await GameSave.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!gameSave) {
      res.status(404).json({ error: 'No saved game found' });
      return;
    }

    // Return the saved game state
    res.status(200).json({
      message: 'Game loaded successfully',
      gameSave: gameSave,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error loading game',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

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

    // Check if user already has a game save
    const existingGameSave = await GameSave.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (existingGameSave) {
      // Delete existing save if found
      await existingGameSave.deleteOne();
    }

    // Create new game save with starting values for cat shelter game
    const newGameSave = new GameSave({
      userId: new Types.ObjectId(userId),
      gameState: {
        characterName: characterName,
        currentDay: 1, // Starting on day 1
        money: 0, // Starting with 0 money
      },
    });

    await newGameSave.save();

    res.status(201).json({
      message: 'New cat shelter game started successfully',
      gameSave: newGameSave,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error creating new game',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateGameState = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;
    const { money } = req.body; // Expecting money to be in the body

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (typeof money !== 'number') {
      res.status(400).json({ error: 'money must be a number' });
      return;
    }

    // Find the user's game save and update it
    const gameSave = await GameSave.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { 'gameState.money': money } },
      { new: true }, // Return the updated document
    );

    if (!gameSave) {
      res.status(404).json({ error: 'No saved game found' });
      return;
    }

    res.status(200).json({
      message: 'Game state updated successfully',
      gameSave: gameSave,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error updating game state',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
