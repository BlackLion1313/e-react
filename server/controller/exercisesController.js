import mongoose from 'mongoose';
import exercisesModel from '../models/exercisesModel.js';


const getExercises = async (req, res) => {

  try {
    const allExercises = await exercisesModel.find({})

    // console.log('allExercises', allExercises)
    res.status(200).json({
      allExercises
    })

  } catch (error) {
    res.status(500).json({
      msg: "something went wrong in the server"
    })
  }
}

async function createExercise(req, res) {
  console.log("createExercise run")

  console.log('req.body', req.body)
  const { exerciseId, title, description, code, missingWords, difficulty, hints, solution } = req.body

  const newExercise = new exercisesModel({
    exerciseId: req.body.exerciseId,
    title: title,
    description: description,
    code: code,
    missingWords: missingWords,
    difficulty: difficulty,
    hints: hints,
    solution: solution
  })

  const savedExercise = await newExercise.save()
  console.log('savedExercise', savedExercise)

  res.status(201).json({
    msg: "new exercise saved"
  })

}



export { createExercise, getExercises }