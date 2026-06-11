import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut, type User } from 'firebase/auth';
import { auth } from '../firebase';
import Icon from './ui/Icon';
import '../styles/NavBar.css';

const NAV_ITEMS = [
  { to: '/feed', label: '피드', icon: 'home' as const },
  { to: '/friend', label: '친구', icon: 'users' as const },
];

interface NavBarProps {
  user: User | null;
}

const NavBar = ({ user }: NavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMyPage = location.pathname.startsWith('/mypage');
  const isLogin = location.pathname.startsWith('/login');

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const active = location.pathname === item.to;
        return (
          <Link key={item.to} to={item.to} className={`nav-item ${active ? 'active' : ''}`}>
            <Icon name={item.icon} size={22} strokeWidth={active ? 2.1 : 1.7} />
            <span className="nav-text">{item.label}</span>
          </Link>
        );
      })}

      <Link to="/write" className="nav-write" aria-label="일기 작성">
        <Icon name="plus" size={26} color="#ffffff" strokeWidth={2.2} />
      </Link>

      <Link to="/mypage" className={`nav-item ${isMyPage ? 'active' : ''}`}>
        <Icon name="user" size={22} strokeWidth={isMyPage ? 2.1 : 1.7} />
        <span className="nav-text">마이페이지</span>
      </Link>

      {user ? (
        <button className="nav-item" onClick={() => signOut(auth).then(() => navigate('/login'))}>
          <Icon name="logout" size={22} strokeWidth={1.7} />
          <span className="nav-text">로그아웃</span>
        </button>
      ) : (
        <Link to="/login" className={`nav-item ${isLogin ? 'active' : ''}`}>
          <Icon name="user" size={22} strokeWidth={isLogin ? 2.1 : 1.7} />
          <span className="nav-text">로그인</span>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
