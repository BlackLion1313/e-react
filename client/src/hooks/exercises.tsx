import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export function useExercises() {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchExercises = async () => {
			try {
				setError("");
				setLoading(true);
				const response = await axios.get(
					"http://localhost:5005/api/exercises/all"
				);
				setExercises(response.data.allExercises);
				// console.log(
				// 	"response.data.allExercises>>>>",
				// 	response.data.allExercises
				// );
				// console.log("exercises!!!", exercises)
				setLoading(false);
	
			} catch (e: unknown) {
				const error = e as AxiosError;
				setLoading(false);
				setError(error.message);
				console.error("Error with fetching exercises", error);
			}
		};

		fetchExercises();
	}, []);

	return { exercises, loading, error };
}
