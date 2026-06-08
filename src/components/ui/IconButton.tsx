import type { ButtonHTMLAttributes } from 'react';
import Icon, { type IconName } from './Icon';
import './ui.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  size?: number;
  solid?: boolean;
  badge?: boolean;
}

const IconButton = ({ icon, size = 20, solid = false, badge = false, className = '', ...rest }: IconButtonProps) => {
  return (
    <button className={`icon-btn ${solid ? 'icon-btn--solid' : ''} ${className}`} {...rest} style={{ position: 'relative', ...rest.style }}>
      <Icon name={icon} size={size} />
      {badge && <span className="badge-dot" />}
    </button>
  );
};

export default IconButton;
