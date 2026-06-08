import { getMood } from '../../constants/moods';
import './ui.css';

interface MoodTagProps {
  mood: string;
  size?: 'sm' | 'md';
}

const MoodTag = ({ mood, size = 'md' }: MoodTagProps) => {
  const m = getMood(mood);
  return (
    <span
      className="mood-tag"
      style={{
        background: m.bgVar,
        color: m.fgVar,
        fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
      }}
    >
      <span>{m.emoji}</span>
      <span>{m.label}</span>
    </span>
  );
};

export default MoodTag;
