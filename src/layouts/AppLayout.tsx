import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase';
import NavBar from '../components/NavBar';
import AppRoutes from '../routes/AppRoutes';

const HIDDEN_NAV_PATHS = ['/login', '/register'];

const AppLayout = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const hideNav = HIDDEN_NAV_PATHS.some((path) => location.pathname.startsWith(path));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <div className="app-container">
      <AppRoutes />
      {!hideNav && user !== undefined && <NavBar user={user} />}
    </div>
  );
};

export default AppLayout;
