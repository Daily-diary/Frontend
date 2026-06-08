import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AppRoutes from '../routes/AppRoutes';

const HIDDEN_NAV_PATHS = ['/login', '/register'];

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
