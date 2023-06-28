import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

export function ExerciseForm() {
  const [exercise, setExercise] = useState<Exercise>({
    _id: "",
    exerciseId: 0,
    title: "",
    description: "",
    code: "",
    missingWords: [""],
    difficulty: "",
    hints: [""],
    solution: "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    
    if (!exercise.description || !exercise.code || !exercise.difficulty || !exercise.solution) {
      console.error("Please fill in all required fields.");
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:5005/api/exercises/post-exercise",
        exercise
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <label className="block mb-4">
        <span className="text-gray-700">Exercise Title:</span>
        <input
          type="text"
          name="title"
          value={exercise.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      
      <label className="block mb-4">
        <span className="text-gray-700">Exercise Description:</span>
        <textarea
          name="description"
          value={exercise.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      
      <label className="block mb-4">
        <span className="text-gray-700">Exercise Code:</span>
        <textarea
          name="code"
          value={exercise.code}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      
      <label className="block mb-4">
        <span className="text-gray-700">Missing Words:</span>
        <input
          type="text"
          name="missingWords"
          value={exercise.missingWords}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      
      <label className="block mb-4">
        <span className="text-gray-700">Difficulty:</span>
        <input
          type="text"
          name="difficulty"
          value={exercise.difficulty}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      
      <label className="block mb-4">
        <span className="text-gray-700">Hints:</span>
        <input
          type="text"
          name="hints"
          value={exercise.hints}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      
      <label className="block mb-4">
        <span className="text-gray-700">Solution:</span>
        <input
          type="text"
          name="solution"
          value={exercise.solution}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      >
        Create Exercise
      </button>
    </form>
  );
}
