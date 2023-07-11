import Exercise from '../models/exercisesModel.js';

const getExerciseById = async (req, res) => {
  const exerciseId = parseInt(req.params.exerciseId, 10); // Convert exerciseId to a number


  try {
    const exercise = await Exercise.findOne({ exerciseId: exerciseId  });

    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    res.status(200).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong on the server' });
  }
};

const getExercises = async (req, res) => {
  try {
    const allExercises = await Exercise.find({});

    res.status(200).json({ allExercises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong on the server' });
  }
};





const createExercise = async (req, res) => {
  const { title, description, code, missingWords, solution } = req.body;
  console.log("heeeeeerereeee", typeof req.body.exerciseId); // Add this line to check the data type

  try {
    const latestExercise = await Exercise.findOne({}, {}, { sort: { exerciseId: -1 } });
    const exerciseId = latestExercise ? latestExercise.exerciseId + 1 : 1;

    const exercise = new Exercise({
      exerciseId,
      title,
      description,
      code,
      missingWords,
      solution,
    });

    const savedExercise = await exercise.save();

    res.status(201).json(savedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateExercise = async (req, res) => {
  const exerciseId = req.params.exerciseId;
  const { title, description, code, missingWords, solution } = req.body;

  try {
    const exercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      { title, description, code, missingWords, solution },
      { new: true }
    );

    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    res.status(200).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong on the server' });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const latestExercise = await Exercise.findOne({}, {}, { sort: { exerciseId: -1 } });

    if (!latestExercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    const exerciseId = latestExercise.exerciseId;

    const exercise = await Exercise.findOneAndDelete({ exerciseId });

    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    console.log('Exercise deleted successfully');
    res.status(200).json({ msg: 'Exercise deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong on the server' });
  }
};

const updateExerciseFavoriteStatus = async (req, res) => {
  const { exerciseId } = req.params;
  console.log('exerciseId Fav', exerciseId);
  const { isFavorite } = req.body;
  console.log('isFavorite', isFavorite);

  try {
    const exercise = await Exercise.findOneAndUpdate(
      { exerciseId },
      { isFavorite },
      { new: true }
    );
console.log('exercise Fav', exercise)
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    res.status(200).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong on the server' });
  }
};


export {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
  updateExerciseFavoriteStatus
};
