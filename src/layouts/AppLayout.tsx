import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase';
import NavBar from '../components/NavBar';
import AppRoutes from '../routes/AppRoutes';

const HIDDEN_NAV_PATHS = ['/login', '/register'];
const PUBLIC_PATHS = ['/login', '/register'];

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const hideNav = HIDDEN_NAV_PATHS.some((path) => location.pathname.startsWith(path));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u && !PUBLIC_PATHS.some((p) => location.pathname.startsWith(p))) {
        navigate('/login');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="app-container">
      <AppRoutes />
      {!hideNav && <NavBar user={user ?? null} />}
    </div>
  );
};

export default AppLayout;
