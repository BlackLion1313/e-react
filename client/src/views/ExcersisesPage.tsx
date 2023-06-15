import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  // Состояния для управления списком упражнений, текущим индексом упражнения, ответами пользователя, сообщением о результате и флагами отображения

  // exercises - список всех упражнений
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // currentExerciseIndex - индекс текущего упражнения в списке exercises
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // userAnswers - объект для хранения ответов пользователя в формате { exerciseId: [answers] }
  const [userAnswers, setUserAnswers] = useState<{ [exerciseId: number]: string[] }>({});

  // answerMessage - сообщение о результате проверки ответа пользователя
  const [answerMessage, setAnswerMessage] = useState('');

  // showSolution - флаг для отображения решения упражнения
  const [showSolution, setShowSolution] = useState(false);

  // showHints - флаг для отображения подсказок упражнения
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    // Используем хук useEffect для получения списка упражнений при загрузке компонента
    const fetchExercises = async () => {
      try {
        // Отправляем GET-запрос на сервер, чтобы получить список упражнений
        const response = await axios.get('http://localhost:5001/api/exercises/all');

        // Обновляем состояние exercises, сохраняя полученные данные упражнений
        setExercises(response.data.allExercises);
      } catch (error) {
        console.error('Ошибка при получении упражнений:', error);
      }
    };

    fetchExercises();
  }, []);


  const handleInputChange = (exerciseId: number, wordIndex: number, answer: string) => {
    const updatedUserAnswers = {
      ...userAnswers,
      [exerciseId]: {
        ...(userAnswers[exerciseId] || {}),
        [wordIndex]: answer,
      },
    };

    setUserAnswers(updatedUserAnswers);
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

    if (isCorrect) {
      setAnswerMessage('Congratulations! Your answer is correct!');
      setShowSolution(false);
      setShowHints(false);
    } else {
      setAnswerMessage('Oops! Your answer is incorrect. Please try again.');
    }
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
    <div>
      <div>
        <h2>{exercise.title}</h2>
        <p>{exercise.description}</p>
        <pre>
        {exercise.code.split(/%/g).map((part, index) =>
            index !== exercise.code.length - 1 ? (
              <React.Fragment key={index}>
                {part}
                <input
                  type="text"
                  value={userAnswers[exercise.exerciseId]?.[index] || ''}
                  onChange={(event) =>
                    handleInputChange(exercise.exerciseId, index, event.target.value)
                  }
                  style={{ height: '0.5cm', width: '2cm' }}
                />
              </React.Fragment>
            ) : (
              part
            )
          )}
        </pre>
        <button className='' onClick={() => checkAnswers(exercise.exerciseId)}>Check Answer</button>
        {answerMessage && <p>{answerMessage}</p>}
        {answerMessage && (
          <button onClick={handleNextQuestion} disabled={!answerMessage.includes('correct')}>
            Next Question
          </button>
        )}
        <button onClick={showSolutionHints}>Solution / Hints</button>
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
      </div>
    </div>
  );
};

export default ExerciseComponent;

