import type { ButtonHTMLAttributes } from 'react';
import './ui.css';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Chip = ({ active = false, className = '', ...rest }: ChipProps) => (
  <button type="button" className={`chip ${active ? 'chip--active' : ''} ${className}`} {...rest} />
);

export default Chip;
