import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import LoginPage from "./views/LoginPage";
import NotFoundPage from "./views/NotFoundPage";
import Profile from "./views/Profile";
import ExercisesPage from "./views/ExercisesPage";
import FavouritesPage from "./views/FavouritesPage";
import { Navigation } from "./components/Navigation";
import { ExerciseForm } from "./views/ExerciseForm";
// import { AuthProvider } from "./context/AuthContext";
import { Footer } from "./components/Footer";


const App = () => {
  return (
    <Router>
      {/* <AuthProvider> */}
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/exercises/:exerciseId" element={<ExercisesPage/>} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/create-exercise" element={<ExerciseForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      {/* </AuthProvider> */}
    </Router>
  );
};

export default App;