import express from 'express';
import {
  createExercise, 
  getExercises, 
  getExerciseById,
  deleteExercise,
  updateExercise,
  updateExerciseFavoriteStatus
} from '../controller/exercisesController.js';

import jwtAuth from '../middleware/jwtAuth.js';

const router = express.Router();

router.post('/post-exercise', jwtAuth, createExercise);
router.get('/all', jwtAuth, getExercises);
router.get('/:exerciseId', jwtAuth, getExerciseById);
router.delete('/:exerciseId', jwtAuth, deleteExercise);
router.put('/:exerciseId', jwtAuth, updateExercise);
router.put('/:exerciseId/favorite', jwtAuth, updateExerciseFavoriteStatus);

export default router;
