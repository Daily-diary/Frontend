import { Route, Routes } from 'react-router-dom';
import Feed from '../pages/Feed/Feed';
import FeedDetail from '../pages/Feed/FeedDetail';
import FeedUser from '../pages/Feed/FeedUser';
import Friend from '../pages/Friend/Friend';
import DiaryWrite from '../pages/Diary/DiaryWrite';
import DiaryDetail from '../pages/Diary/DiaryDetail';
import MyPage from '../pages/MyPage/MyPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

/**
 * 전역 라우팅 설정.
 * API 명세서의 화면 단위(Feed / Friend / Diary / MyPage / Auth)에 맞춰 구성했습니다.
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Feed />} />
    <Route path="/feed/:diaryId" element={<FeedDetail />} />
    <Route path="/feed/users/:userId" element={<FeedUser />} />

    <Route path="/friend" element={<Friend />} />

    <Route path="/write" element={<DiaryWrite />} />
    <Route path="/diary/:id" element={<DiaryDetail />} />
    <Route path="/diary/:id/edit" element={<DiaryWrite />} />

    <Route path="/mypage" element={<MyPage />} />

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AppRoutes;
