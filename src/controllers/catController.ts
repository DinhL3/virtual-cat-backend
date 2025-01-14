import { Request, Response } from 'express';
import { Cat } from '../models/catModel';
import { Room } from '../models/roomModel';
import User from '../models/userModel';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  userId?: string;
}

export const getUserCat = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Not authorized.' });
      return;
    }

    // Find the user first to get their cat reference
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // If user has no cat, return null (this matches our frontend expectation)
    if (!user.cat) {
      res.status(200).json(null);
      return;
    }

    // Find the cat with populated data
    const cat = await Cat.findById(user.cat);
    if (!cat) {
      // This should rarely happen - only if cat was deleted but user still has reference
      res.status(404).json({ message: 'Cat not found.' });
      return;
    }

    //cat found, return cat
    res.status(200).json(cat);
  } catch (error) {
    console.error('Error fetching user cat:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the cat.',
      error,
    });
  }
};

export const adoptCat = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Not authorized.' });
      return;
    }

    const { name, coatType } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (user.cat) {
      res.status(400).json({ message: 'User already has a cat.' });
      return;
    }

    const newCat = new Cat({
      name,
      coatType,
      owner: user._id,
      parameters: {
        affection: 0,
        hunger: 50,
        thirst: 50,
        fun: 40,
        energy: 60,
        hygiene: 70,
      },
    });
    await newCat.save();

    const newRoom = new Room({
      owner: user._id,
      cat: newCat._id,
    });
    await newRoom.save();

    user.cat = newCat._id as Types.ObjectId;
    user.room = newRoom._id as Types.ObjectId;
    await user.save();

    res.status(201).json({
      message: 'Cat adopted successfully!',
      cat: newCat,
      room: newRoom,
    });
  } catch (error) {
    console.error('Error adopting cat:', error);
    res.status(500).json({
      message: 'An error occurred while adopting the cat.',
      error,
    });
  }
};
