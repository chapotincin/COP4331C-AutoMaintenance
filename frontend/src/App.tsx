import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CarPage from './pages/CarPage';
import TeamPage from './pages/Team';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/carpage" element={<CarPage />} />
          <Route path ="/team" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;