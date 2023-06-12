import express from 'express';
import { createExercise, getExercises } from '../controller/exercisesController.js';

const router = express.Router();


router.post('/exercises', createExercise);


router.get('/exercises', getExercises);

export default router;
