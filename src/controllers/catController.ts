import { RequestHandler } from 'express';
import { Cat } from '../models/catModel';
import { Room } from '../models/roomModel';
import User from '../models/userModel';

export const adoptCat: RequestHandler = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.cat) {
      return res.status(400).json({ message: 'User already has a cat' });
    }

    const { name, coatType } = req.body;
    const newCat = await Cat.create({
      name,
      owner: userId,
      coatType,
      parameters: {
        affection: 0,
        hunger: 50,
        thirst: 50,
        fun: 50,
        energy: 50,
        hygiene: 50,
      },
    });

    const newRoom = await Room.create({
      owner: userId,
      cat: newCat._id,
      // items default to clean in the schema
    });

    user.cat = newCat._id;
    user.room = newRoom._id;
    await user.save();

    return res.status(201).json({
      message: 'Cat adopted successfully',
      cat: newCat,
      room: newRoom,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
