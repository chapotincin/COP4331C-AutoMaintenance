import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
//import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;