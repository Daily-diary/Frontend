import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <span className="nav-icon">🏠</span>
        <span className="nav-text">피드</span>
      </Link>
      <Link to="/write" className={`nav-item ${location.pathname === '/write' ? 'active' : ''}`}>
        <span className="nav-icon">✍️</span>
        <span className="nav-text">작성</span>
      </Link>
      <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
        <span className="nav-icon">👤</span>
        <span className="nav-text">프로필</span>
      </Link>
    </nav>
  );
};

export default NavBar;