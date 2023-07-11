import { useState, useEffect } from "react";
import checkUserStatus from "../utils/checkUserStatus"
import { motion } from "framer-motion";

const profileVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const Profile = () => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<ResponseError | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			const token = checkUserStatus();

			if (token) {
				const myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${token}`);

				const requestOptions = {
					method: "GET",
					headers: myHeaders,
				};

				try {
					const response = await fetch(
					`${import.meta.env.VITE_SERVER_URL}api/users/profile`,
						requestOptions
					);
					console.log("response fetching", response);

					if (response.ok) {
						const result: FetchProfileResult = await response.json();
						console.log("result if res is ok", result);
						setUser(result.user);
						setError(null);
					} else if (!response.ok && response.status === 401) {
						setError(response.statusText);
					} else {
						const result: FetchError = await response.json();
						setError(result.error);
					}
				} catch (error) {
					console.log("error", error);
				}
			} else {
				setError("Please log in first");
				setUser(null);
			}
		};

		fetchProfile();
	}, []);

	return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-lg mx-auto my-4">
        {user !== null && (
          <motion.div
            className="bg-white shadow rounded-lg p-6 mb-4"
            variants={profileVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-bold mb-2">{user.userName}</p>
            <p className="text-lg text-gray-600">{user.email}</p>
            <img
              src={user.avatar}
              alt=""
              className="border-4 border-sky-100 mt-4 w-48 h-48 rounded-full object-cover"
            />
          </motion.div>
        )}

        {error && <h3 className="text-red-500 mb-4">{error}</h3>}
      </div>
    </div>
  );
};

export default Profile;