import React, { useEffect, useState } from "react";
import axios from "axios";
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

function FavouritesPage() {
  const [favoriteExercises, setFavoriteExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const navigate = useNavigate();
  const spinnerDuration = 1500; // Adjust the duration as needed
  const exerciseDelay = 1500; // Delay before displaying the exercises in milliseconds

  useEffect(() => {
    const fetchFavoriteExercises = async () => {
      const token = checkUserStatus();
      if (token) {
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const timerId = setTimeout(() => {
          axios
            .get<{ allExercises: Exercise[] }>(
              "http://localhost:5005/api/exercises/all",
              requestOptions
            )
            .then((response) => {
              const favoriteExercises = response.data.allExercises.filter(
                (exercise) => exercise.isFavorite
              );
              setFavoriteExercises(favoriteExercises);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching favorite exercises:", error);
            });
        }, exerciseDelay);

        return () => {
          clearTimeout(timerId);
        };
      }
    };

    const spinnerTimeout = setTimeout(() => {
      setLoading(false);
    }, spinnerDuration);

    fetchFavoriteExercises();

    return () => {
      clearTimeout(spinnerTimeout);
    };
  }, []);

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
  };

  const toggleFavorite = async (exerciseId: number) => {
    try {
      const response = await axios.put<{ exercise: Exercise }>(
        `http://localhost:5005/api/exercises/${exerciseId}/favorite`,
        { isFavorite: false } // Toggle the favorite status based on your requirements
      );
      const updatedFavoriteExercises = favoriteExercises.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? { ...exercise, isFavorite: response.data.exercise.isFavorite }
          : exercise
      );
      setFavoriteExercises(updatedFavoriteExercises);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const answerExercise = (exerciseId: number) => {
    navigate(`/exercises/${exerciseId}`);
  };

  const handleNextExercise = () => {
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  if (!checkUserStatus()) {
    // Handle the case when the user is not authenticated
    return <p>Please log in to view your favorite exercises.</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-900">
      <PacmanLoader color="#00bfff" size={40} />
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-3xl text-gray-100 font-bold mb-4">Favorites</h1>
          {favoriteExercises.length === 0 ? (
            <p>No favorite exercises found.</p>
          ) : (
            <div className="bg-gray-800 rounded-md p-4">
              <h2 className="text-xl text-gray-100 font-semibold mb-2">
                {favoriteExercises[currentExerciseIndex].title}
              </h2>
              <p className="text-gray-300 mb-2">
                {favoriteExercises[currentExerciseIndex].description}
              </p>
              <pre
                className="mb-4"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontFamily: "monospace",
                  padding: "1em",
                  borderRadius: "0.5em",
                }}
              >
                {favoriteExercises[currentExerciseIndex].code.split(/%/g).map((part, index) =>
                  index !== favoriteExercises[currentExerciseIndex].code.split(/%/g).length - 1 ? (
                    <React.Fragment key={index}>
                      {part}
                      <input
                        className="py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        type="text"
                        value={
                          userAnswers[favoriteExercises[currentExerciseIndex].exerciseId]?.[index] || ""
                        }
                        onChange={(event) =>
                          handleInputChange(
                            favoriteExercises[currentExerciseIndex].exerciseId,
                            index,
                            event.target.value
                          )
                        }
                        style={{ height: "0.5cm" }}
                      />
                    </React.Fragment>
                  ) : (
                    part
                  )
                )}
              </pre>
              <button
                className="motion-button bg-red-100 hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transform motion-safe:hover:scale-105"
                onClick={() =>
                  toggleFavorite(favoriteExercises[currentExerciseIndex].exerciseId)
                }
              >
                💔
              </button>
              <button
                className="motion-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transform motion-safe:hover:scale-105"
                onClick={() =>
                  answerExercise(favoriteExercises[currentExerciseIndex].exerciseId)
                }
              >
                ⤴️
              </button>
              {currentExerciseIndex < favoriteExercises.length - 1 && (
                <button
                  className="bg-stone-500 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-stone-500 mt-4"
                  onClick={handleNextExercise}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FavouritesPage;
