import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from './IconButton';
import './ui.css';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  right?: ReactNode;
  onBack?: () => void;
}

/**
 * 페이지 상단 공통 헤더. 뒤로가기 버튼 / 타이틀 / 우측 액션 슬롯을 제공합니다.
 */
const TopBar = ({ title, showBack = false, right, onBack }: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="topbar__side">
        {showBack && (
          <IconButton icon="back" aria-label="뒤로가기" onClick={() => (onBack ? onBack() : navigate(-1))} />
        )}
      </div>
      {title && <h1 className="topbar__title">{title}</h1>}
      <div className="topbar__side" style={{ justifyContent: 'flex-end' }}>
        {right}
      </div>
    </header>
  );
};

export default TopBar;
