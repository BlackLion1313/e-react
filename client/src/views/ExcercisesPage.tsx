import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ExerciseComponent = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [exerciseId: number]: string[] }>({});
  const [answerMessage, setAnswerMessage] = useState<string>('');
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [inputWidth, setInputWidth] = useState<string>('1cm');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/exercises/all');
        setExercises(response.data.allExercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleInputChange = (
    exerciseId: number,
    wordIndex: number,
    answer: string
  ) => {
    const updatedUserAnswers = {
      ...userAnswers,
      [exerciseId]: {
        ...(userAnswers[exerciseId] || {}),
        [wordIndex]: answer,
      },
    };

    setUserAnswers(updatedUserAnswers);

    const newWidth = `${(answer.length + 1) * 0.35}cm`;
    setInputWidth(newWidth);
  };

  const checkAnswers = (exerciseId: number) => {
    const exercise = exercises.find((ex) => ex.exerciseId === exerciseId);
    if (!exercise) {
      return;
    }

    const userAnswer = userAnswers[exerciseId];
    if (!userAnswer) {
      setAnswerMessage('Please provide your answers first.');
      return;
    }

    const isCorrect = exercise.missingWords.every(
      (word, index) => userAnswer[index] === word
    );

    const correctMessage = 'Congratulations! Your answer is correct!';
    const incorrectMessage = 'Oops! Your answer is incorrect. Please try again.';

    const messageVariants = {
      correct: {
        color: 'green',
        y: [0, -5, 0],
        transition: { type: 'spring', stiffness: 500 },
      },
      incorrect: {
        color: 'red',
        x: [0, -5, 0],
        transition: { type: 'spring', stiffness: 500 },
      },
    };

    if (isCorrect) {
      setAnswerMessage(correctMessage);
      setShowSolution(false);
      setShowHints(false);
    } else {
      setAnswerMessage(incorrectMessage);
    }

    const messageAnimation = isCorrect ? 'correct' : 'incorrect';
    const messageAnimationConfig = messageVariants[messageAnimation];

    return (
      <motion.p
        className="answer-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          color: messageAnimationConfig.color,
          transform: `translateY(${messageAnimationConfig})`,
          textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        {answerMessage}
      </motion.p>
    );
  };

  const showSolutionHints = () => {
    setShowSolution(!showSolution);
    setShowHints(!showHints);
  };

  const handleNextQuestion = () => {
    setCurrentExerciseIndex(currentExerciseIndex + 1);
    setAnswerMessage('');
    setShowSolution(false);
    setShowHints(false);
  };

  if (exercises.length === 0) {
    return <p>Loading exercises...</p>;
  }

  const exercise = exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-stone-300 text-blue-600 shadow-lg rounded-lg p-6 mb-4"
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2>{`Exercise title: ${exercise.title}`}</h2>
        <p>{`Description: ${exercise.description}`}</p>
        <pre>
          {exercise.code.split(/%/g).map((part: string, index: number) =>
            index !== exercise.code.split(/%/g).length - 1 ? (
              <React.Fragment key={index}>
                {part}
                <input
                  className="py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  type="text"
                  value={userAnswers[exercise.exerciseId]?.[index] || ''}
                  onChange={(event) =>
                    handleInputChange(exercise.exerciseId, index, event.target.value)
                  }
                  style={{ height: '0.5cm', width: inputWidth }}
                />
              </React.Fragment>
            ) : (
              part
            )
          )}
        </pre>
        <button className="mt-7 px-3 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md" onClick={() => checkAnswers(exercise.exerciseId)}>
          Check Answer
        </button>
        {answerMessage && (
          <motion.p
            className="answer-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              color: answerMessage.includes('correct') ? 'green' : 'red',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {answerMessage}
          </motion.p>
        )}
        {answerMessage && (
          <button
            className="mt-7 ml-40 px-3 py-2 bg-sky-400 hover: bg-sky-500 text-white rounded-md"
            onClick={handleNextQuestion}
            disabled={!answerMessage.includes('correct')}
          >
            Next Question
          </button>
        )}
        <button
          className="mt-7 ml-40 px-3 py-2 border-slate-600 text-white rounded-md"
          onClick={showSolutionHints}
        >
          Solution / Hints
        </button>
        {showSolution && <p>Solution: {exercise.solution}</p>}
        {showHints && (
          <div>
            <h4>Hints:</h4>
            <ul>
              {exercise.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ExerciseComponent;




// import { useExercises } from "../hooks/exercises";
// import { motion } from "framer-motion";

// const cardVariants = {
//   hidden: { opacity: 0, y: -50 },
//   visible: { opacity: 1, y: 0 },
// };

// const ExercisesPage = () => {
//   const { exercises, loading, error } = useExercises();

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         exercises.map((exercise) => (
//           <motion.div
//             key={exercise._id}
//             className="bg-yellow-50 rounded-lg shadow-lg p-4 mt-10"
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-xl font-semibold">{exercise.title}</h2>
//             <p className="text-gray-600">{exercise.description}</p>
//             <p className="text-gray-600">{exercise.code}</p>
//             <p className="text-gray-600">{exercise.difficulty}</p>
//             <p className="text-gray-600">{exercise.hints}</p>
//             <p className="text-gray-600">{exercise.solution}</p>
//           </motion.div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ExercisesPage;
