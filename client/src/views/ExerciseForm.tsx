import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import checkUserStatus from "../utils/checkUserStatus";

interface Exercise {
	_id: string;
	exerciseId: number;
	title: string;
	description: string;
	code: string;
	missingWords: string[];
	solution: string;
}

export function ExerciseForm() {
	const [exercise, setExercise] = useState<Exercise>({
		_id: "",
		exerciseId: 0,
		title: "",
		description: "",
		code: "",
		missingWords: [""],
		solution: "",
	});
	const [isExerciseCreated, setIsExerciseCreated] = useState(false);
	const [createdExercise, setCreatedExercise] = useState<Exercise | null>(null);

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

		if (!exercise.description || !exercise.code || !exercise.solution) {
			console.error("Please fill in all required fields.");
			return;
		}
		const token = checkUserStatus();
		try {
			if (isExerciseCreated) {
				console.log("Exercise edited:", exercise);
				await axios.put(
					`${import.meta.env.VITE_SERVER_URL}api/exercises/${
						createdExercise?._id
					}`,
					exercise,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log("Exercise updated successfully.");
			} else {
				const response = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}api/exercises/post-exercise`,
					exercise,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log("Exercise created successfully.");

				setIsExerciseCreated(true);
				setCreatedExercise(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async () => {
		if (!createdExercise?._id) return;
		const token = checkUserStatus();

		if (!token) {
			console.error("Please log in first or check authorization.");
			return;
		}

		try {
			await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}api/exercises/${createdExercise._id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Exercise deleted successfully.");
			setExercise({
				_id: "",
				exerciseId: 0,
				title: "",
				description: "",
				code: "",
				missingWords: [""],
				solution: "",
			});
			setIsExerciseCreated(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = () => {
		const token = checkUserStatus();

		if (!token) {
			console.error("Please log in first or check authorization.");
			return;
		}

		if (!createdExercise) return;

		setExercise((prevExercise) => ({
			...prevExercise,
			_id: createdExercise._id,
			exerciseId: createdExercise.exerciseId,
			title: createdExercise.title,
			description: createdExercise.description,
			code: createdExercise.code,
			missingWords: createdExercise.missingWords,
			solution: createdExercise.solution,
		}));
		setIsExerciseCreated(false);
		setCreatedExercise(null);
	};

	const fetchExercise = async (exerciseId: number) => {
		const token = checkUserStatus();
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}api/exercises/${exerciseId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}

			);

			setCreatedExercise(response.data.exercise);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (createdExercise && createdExercise.exerciseId) {
			const exerciseId = createdExercise.exerciseId;
			fetchExercise(exerciseId);
		}
	}, [createdExercise]);

	return (
		<form
			onSubmit={handleSubmit}
			className="min-h-screen bg-gray-900 flex items-center justify-center">
			{!isExerciseCreated ? (
				<motion.div
					className="bg-stone-300 text-gray-600 shadow-lg rounded-lg p-6 w-1/3"
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}>
					<h1 className="text-2xl text-gray-900 font-bold mb-6">
						Create Exercise
					</h1>
					<div className="mb-4">
						<label
							htmlFor="title"
							className="block text-gray-900 font-bold mb-1">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={exercise.title}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="description"
							className="block text-gray-900 font-bold mb-1">
							Description
						</label>
						<textarea
							id="description"
							name="description"
							value={exercise.description}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
							required></textarea>
					</div>
					<div className="mb-4">
						<label
							htmlFor="code"
							className="block text-gray-900 font-bold mb-1">
							Code
						</label>
						<textarea
							id="code"
							name="code"
							value={exercise.code}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
							required></textarea>
					</div>
					<div className="mb-4">
						<label
							htmlFor="missingWords"
							className="block text-gray-900 font-bold mb-1">
							Missing Words
						</label>
						<input
							type="text"
							id="missingWords"
							name="missingWords"
							value={exercise.missingWords}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="solution"
							className="block text-gray-900 font-bold mb-1">
							Solution
						</label>
						<textarea
							id="solution"
							name="solution"
							value={exercise.solution}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
							required></textarea>
					</div>
					<button
						type="submit"
						className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
						Create
					</button>
				</motion.div>
			) : (
				<motion.div
					className="bg-stone-300 text-gray-600 shadow-lg rounded-lg p-6 w-1/3"
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}>
					<h1 className="text-2xl text-gray-900 font-bold mb-6">
						View Exercise
					</h1>
					<div className="mb-4">
						<label
							htmlFor="title"
							className="block text-gray-900 font-bold mb-1">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={exercise.title}
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="description"
							className="block text-gray-900 font-bold mb-1">
							Description
						</label>
						<textarea
							id="description"
							name="description"
							value={exercise.description}
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"></textarea>
					</div>
					<div className="mb-4">
						<label
							htmlFor="code"
							className="block text-gray-900 font-bold mb-1">
							Code
						</label>
						<textarea
							id="code"
							name="code"
							value={exercise.code}
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"></textarea>
					</div>
					<div className="mb-4">
						<label
							htmlFor="missingWords"
							className="block text-gray-900 font-bold mb-1">
							Missing Words
						</label>
						<input
							type="text"
							id="missingWords"
							name="missingWords"
							value={exercise.missingWords}
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="solution"
							className="block text-gray-900 font-bold mb-1">
							Solution
						</label>
						<textarea
							id="solution"
							name="solution"
							value={exercise.solution}
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"></textarea>
					</div>
					<div className="flex justify-end">
						<button
							type="button"
							className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2"
							onClick={handleEdit}>
							Edit
						</button>
						<button
							type="button"
							className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
							onClick={handleDelete}>
							Delete
						</button>
					</div>
				</motion.div>
			)}
		</form>
	);
}
