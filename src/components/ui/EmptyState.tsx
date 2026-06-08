import type { ReactNode } from 'react';
import './ui.css';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ icon = '🌱', title, description, action }: EmptyStateProps) => {
  return (
    <div className="empty-state fade-in">
      <div className="empty-state__icon">{icon}</div>
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__desc">{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
