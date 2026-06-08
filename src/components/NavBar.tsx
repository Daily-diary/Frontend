import { Link, useLocation } from 'react-router-dom';
import { Icon } from './ui';
import '../styles/NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const isMyPage = location.pathname.startsWith('/mypage');
  const isLogin = location.pathname.startsWith('/login');

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Icon name="home" size={22} strokeWidth={location.pathname === '/' ? 2.1 : 1.7} />
        <span className="nav-text">피드</span>
      </Link>

      <Link to="/friend" className={`nav-item ${location.pathname === '/friend' ? 'active' : ''}`}>
        <Icon name="users" size={22} strokeWidth={location.pathname === '/friend' ? 2.1 : 1.7} />
        <span className="nav-text">친구</span>
      </Link>

      <Link to="/write" className="nav-write" aria-label="일기 작성">
        <Icon name="plus" size={26} color="#ffffff" strokeWidth={2.2} />
      </Link>

      <Link to="/mypage" className={`nav-item ${isMyPage ? 'active' : ''}`}>
        <Icon name="user" size={22} strokeWidth={isMyPage ? 2.1 : 1.7} />
        <span className="nav-text">마이페이지</span>
      </Link>

      <Link to="/login" className={`nav-item ${isLogin ? 'active' : ''}`}>
        <Icon name="logout" size={22} strokeWidth={isLogin ? 2.1 : 1.7} />
        <span className="nav-text">로그인</span>
      </Link>
    </nav>
  );
};

export default NavBar;
