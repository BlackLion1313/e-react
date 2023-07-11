import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import checkUserStatus from "../utils/checkUserStatus";
import { PacmanLoader } from "react-spinners";



interface Exercise {
  exerciseId: number;
  title: string;
  description: string;
  code: string;
  missingWords: string[];
  solution: string;
  isFavorite: boolean;
}

interface UserAnswers {
  [key: number]: string[];
}

function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [answerMessage, setAnswerMessage] = useState<string>("");
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [inputWidth, setInputWidth] = useState<string>("1cm");
	const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const navigate = useNavigate();
	const spinnerDuration = 1500;
	const exerciseDelay = 1000; // Delay before displaying the exercises in milliseconds

	useEffect(() => {
    const token = checkUserStatus();
    if (!token) {
      // User is not authenticated, redirect to login or handle the unauthenticated case
      navigate("/login");
    } else {
      const fetchExercises = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);

          const requestOptions = {
            method: "GET",
            headers: Object.fromEntries(myHeaders.entries()),
          };

          const response = await axios.get<{ allExercises: Exercise[] }>(
            "http://localhost:5005/api/exercises/all",
            requestOptions
          );
          setExercises(response.data.allExercises);
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      };

      const spinnerTimeout = setTimeout(() => {
        setLoading(false);
      }, spinnerDuration);

      const exercisesTimeout = setTimeout(() => {
        setLoading(false);
      }, exerciseDelay);

      fetchExercises();

      return () => {
        clearTimeout(spinnerTimeout);
        clearTimeout(exercisesTimeout);
      };
    }
  }, [navigate]);



	const handleInputChange = (
		exerciseId: number,
		wordIndex: number,
		answer: string
	) => {
		const updatedUserAnswers: UserAnswers = {
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

	const toggleFavorite = async () => {
		const exerciseId = exercises[currentExerciseIndex].exerciseId;
		console.log("Toggle favorite button clicked");

		try {
			const response = await axios.put<{ exercise: Exercise }>(
				`http://localhost:5005/api/exercises/${exerciseId}/favorite`,
				{ isFavorite: !exercises[currentExerciseIndex].isFavorite }
			);
			console.log("Response from server Fav:", response.data);

			const updatedExercises = [...exercises];
			const updatedExercise = {
				...exercises[currentExerciseIndex],
				isFavorite: response.data.exercise.isFavorite,
			};
			updatedExercises[currentExerciseIndex] = updatedExercise;
			setExercises(updatedExercises);
		} catch (error) {
			console.error("Error updating favorite status:", error);
		}
	};

	const checkAnswers = (exerciseId: number) => {
		const exercise = exercises.find((ex) => ex.exerciseId === exerciseId);
		if (!exercise) {
			return;
		}

		const userAnswer = userAnswers[exerciseId];
		if (!userAnswer) {
			setAnswerMessage("Please provide your answers first.");
			return;
		}

		const isCorrect = exercise.missingWords.every(
			(word, index) => userAnswer[index] === word
		);

		const correctMessage = "Congratulations! Your answer is correct!";
		const incorrectMessage =
			"Oops! Your answer is incorrect. Please try again.";

		const messageVariants = {
			correct: {
				color: "green",
				y: [0, -5, 0],
				transition: { type: "spring", stiffness: 500 },
			},
			incorrect: {
				color: "red",
				x: [0, -5, 0],
				transition: { type: "spring", stiffness: 500 },
			},
		};

		if (isCorrect) {
			setAnswerMessage(correctMessage);
			setShowSolution(false);
		} else {
			setAnswerMessage(incorrectMessage);
		}

		const messageAnimation = isCorrect ? "correct" : "incorrect";
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
					textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
				}}>
				{answerMessage}
			</motion.p>
		);
	};

	const toggleSolution = () => {
		setShowSolution(!showSolution);
	};

	const handleNextQuestion = () => {
    setCurrentExerciseIndex(currentExerciseIndex + 1);
    setAnswerMessage("");
    setShowSolution(false);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <PacmanLoader color="#00bfff" size={40} />
      </div>
    );
  }

  if (exercises.length === 0) {
    return <p>Loading exercises...</p>;
  }
	const exercise = exercises[currentExerciseIndex];

	const codeBlockStyles = {
		backgroundColor: "#000",
		color: "#fff",
		fontFamily: "monospace",
		padding: "1em",
		borderRadius: "0.5em",
	};

	const inputStyles = {
		backgroundColor: "#fff",
		color: "#000",
		fontFamily: "monospace",
		padding: "0.2em 0.3em",
		borderRadius: "0.2em",
		border: "1px solid #888",
	};

	return (
	
		<div className="min-h-screen bg-gray-900 flex items-center justify-center">
			<motion.div
				className="bg-stone-300 text-gray-600 shadow-lg rounded-lg p-6 mb-4"
				initial={{ scale: 0, opacity: 0, rotateY: -180 }}
				animate={{ scale: 1, opacity: 1, rotateY: 0 }}
				transition={{ duration: 0.5, delay: 0.5 }}>
				<h2 className="mb-1">{`Exercise title: ${exercise.title}`}</h2>
				<p className="mb-4">{`Description: ${exercise.description}`}</p>
				<pre className="mb-4" style={codeBlockStyles}>
					{exercise.code.split(/%/g).map((part, index) =>
						index !== exercise.code.split(/%/g).length - 1 ? (
							<React.Fragment key={index}>
								{part}
								<input
									className="py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
									type="text"
									value={userAnswers[exercise.exerciseId]?.[index] || ""}
									onChange={(event) =>
										handleInputChange(
											exercise.exerciseId,
											index,
											event.target.value
										)
									}
									style={{ height: "0.5cm", width: inputWidth, ...inputStyles }}
								/>
							</React.Fragment>
						) : (
							part
						)
					)}
				</pre>
        <div className="flex justify-between ">
				<button
					className={`mt-4 px-3 py-2 bg-stone-500 hover:bg-stone-600 text-white rounded-md ${
						showSolution ? "hidden" : ""
					}`}
					onClick={toggleSolution}>
					Show Solution
				</button>
				<button
					className="mt-4 px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md"
					onClick={() => checkAnswers(exercise.exerciseId)}>
					Check Answers
				</button>

				<button
					className="mt-4 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
					onClick={toggleFavorite}>
					{exercise.isFavorite ? "Remove from ❤️" : "Add to ❤️"}
				</button>
        </div>
				{answerMessage && (
					<motion.p
						className="answer-message"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}>
						{answerMessage}
					</motion.p>
				)}

				{showSolution && (
					<p>
						<strong>Solution:</strong> {exercise.solution}
					</p>
				)}
				{currentExerciseIndex < exercises.length - 1 &&
					answerMessage === "Congratulations! Your answer is correct!" && (
						<button
							className="mt-4 px-3 py-2 bg-stone-500 hover:bg-stone-600 text-white rounded-md"
							onClick={handleNextQuestion}>
							Next Exercise
						</button>
					)}
			</motion.div>
		</div>
	);
}

export default ExercisesPage;
