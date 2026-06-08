import type { ReactNode } from 'react';
import './ui.css';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** true면 화면 중앙에 카드 형태로 표시 (확인/알림 다이얼로그용) */
  centered?: boolean;
}

const BottomSheet = ({ open, onClose, children, centered = false }: BottomSheetProps) => {
  if (!open) return null;

  return (
    <div className={`backdrop ${centered ? 'backdrop--center' : ''}`} onClick={onClose}>
      <div
        className={centered ? 'sheet sheet--card' : 'sheet'}
        onClick={(e) => e.stopPropagation()}
      >
        {!centered && <div className="sheet__handle" />}
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
