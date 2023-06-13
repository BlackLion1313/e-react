import React, { useState, useEffect } from 'react';

interface Exercise {
  _id: string;
  exerciseId: number;
  title: string;
  description: string;
  code: string;
  missingWords: string[];
  difficulty: string;
  hints: string[];
  solution: string;
}

const ExerciseComponent = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showHints, setShowHints] = useState<boolean>(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/exercises/all');

        const data = await response.json();
        setExercises(data);
        setAnswers(new Array(data.length).fill([]));
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleCheckAnswer = () => {
    const currentExercise = exercises[currentExerciseIndex];
    const currentAnswer = answers[currentExerciseIndex];
    const missingWords = currentExercise.missingWords;
    const isAnswerCorrect = missingWords.every((word, index) => currentAnswer[index] === word);
    alert(`Your answer is ${isAnswerCorrect ? 'correct' : 'incorrect'}`);
  };

  const handleNextExercise = () => {
    setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentExerciseIndex] = '';
      return updatedAnswers;
    });
    setShowHints(false);
  };

  const currentExercise = exercises[currentExerciseIndex];

  if (!currentExercise) {
    return <div>No exercises found.</div>;
  }

  const handleAnswerChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  return (
    <div>
      <h2>{currentExercise.title}</h2>
      <p>{currentExercise.description}</p>
      <pre>{currentExercise.code}</pre>
      {currentExercise.missingWords.map((word, index) => (
        <input
          key={index}
          type="text"
          value={answers[currentExerciseIndex][index] || ''}
          onChange={event => handleAnswerChange(index, event)}
          placeholder={word}
        />
      ))}
      <button onClick={handleCheckAnswer}>Check</button>
      <button onClick={() => setShowHints(prevState => !prevState)}>
        {showHints ? 'Hide Hints' : 'Show Hints'}
      </button>
      {showHints && (
        <ul>
          {currentExercise.hints.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      )}
      <button onClick={handleNextExercise}>Next Exercise</button>
    </div>
  );
};

export default ExerciseComponent;
