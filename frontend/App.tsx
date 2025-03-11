import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './src/pages/HomePage';
import Register from './src/pages/Register/Register';
import Login from './src/pages/Login/Login';
import CarPage from './src/pages/CarPage';
import TeamPage from './src/pages/Team';

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