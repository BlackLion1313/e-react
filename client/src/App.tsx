import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import LoginPage from "./views/LoginPage";
import NotFoundPage from "./views/NotFoundPage";
import Profile from "./views/Profile";
import ExercisesPage from "./views/ExcercisesPage";
import FavouritesPage from "./views/FavouritesPage";
import { Navigation } from "./components/Navigation";
import { ExerciseForm } from "./views/ExerciseForm";


const App = () => {
	return (
		<>
			<Router>
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/exercises" element={<ExercisesPage />} />
					<Route path="/favourites" element={<FavouritesPage />} />
					<Route path="/create-exercise" element={<ExerciseForm />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
