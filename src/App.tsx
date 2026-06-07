import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Write from './pages/Write';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;