import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CarPage from './pages/CarPage/CarPage';
import TeamPage from './pages/Team';
import EmailVerify from './pages/EmailVerify/EmailVerify';
import ResetPassword from './pages/ResetPassword/ResetPassword'; // ← New import

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/carpage" element={<CarPage />} />
          <Route path ="/team" element={<TeamPage />} />
          <Route path ="/emailverify" element={<EmailVerify />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* ← New route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;