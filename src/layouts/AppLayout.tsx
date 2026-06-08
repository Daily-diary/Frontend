import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AppRoutes from '../routes/AppRoutes';

const HIDDEN_NAV_PATHS = ['/login', '/register'];

/**
 * 공통 레이아웃 — 로그인/회원가입 화면을 제외한 모든 화면에 하단 네비게이션을 표시합니다.
 */
const AppLayout = () => {
  const location = useLocation();
  const hideNav = HIDDEN_NAV_PATHS.some((path) => location.pathname.startsWith(path));

  return (
    <div className="app-container">
      <AppRoutes />
      {!hideNav && <NavBar />}
    </div>
  );
};

export default AppLayout;
