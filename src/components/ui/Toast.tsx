import { useEffect } from 'react';
import './ui.css';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

/**
 * 화면 하단에 잠시 떠 있다가 사라지는 알림 토스트.
 */
const Toast = ({ message, onClose, duration = 2000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return <div className="toast">{message}</div>;
};

export default Toast;
