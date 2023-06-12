import { exercisesModel } from '../models/exercisesModel.js';


async function createExercise(req, res) {
  try {
    const exercise = new exercisesModel(req.body);
    await exercise.save();
    res.status(201).json({ success: true, exercise });
  } catch (error) {
    console.error('Failed to create exercise:', error);
    res.status(500).json({ success: false, error: 'Failed to create exercise' });
  }
}

async function getExercises(req, res) {
  try {
    const exercises = await exercisesModel.find();
    res.json({ success: true, exercises });
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch exercises' });
  }
}

export { createExercise, getExercises };
