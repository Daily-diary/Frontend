import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/friend" element={<div style={{ padding: '20px' }}>친구 페이지 준비 중</div>} />
                <Route path="/write" element={<div style={{ padding: '20px' }}>일기 작성 페이지 준비 중</div>} />
                <Route path="/mypage" element={<Profile />} />
              </Routes>
              <NavBar />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
