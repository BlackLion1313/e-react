import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExerciseComponent from './components/ExcerciseComponent';

import Register from "./views/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExerciseComponent />} />
      </Routes>
      <Register />
    </BrowserRouter>
  );
}

export default App;

