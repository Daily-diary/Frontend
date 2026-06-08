import { Link, useLocation } from 'react-router-dom';
import { Icon } from './ui';
import type { IconName } from './ui/Icon';
import '../styles/NavBar.css';

const NAV_ITEMS: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: '피드', icon: 'home' },
  { to: '/friend', label: '친구', icon: 'users' },
];

const NavBar = () => {
  const location = useLocation();
  const isMyPage = location.pathname.startsWith('/mypage');

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
    </nav>
  );
};

export default NavBar;
