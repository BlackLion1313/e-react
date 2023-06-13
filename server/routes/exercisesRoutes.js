import express from 'express';
import {  createExercise, getExercises } from '../controller/exercisesController.js';

const router = express.Router();


router.post('/post-exercise', createExercise);


router.get('/all', getExercises);

export default router;
