export interface Mood {
  key: string;
  label: string;
  emoji: string;
  bgVar: string;
  fgVar: string;
}

/**
 * 일기 작성 시 선택할 수 있는 감정 목록.
 * ERD의 diaries.mood(varchar) 컬럼에 key 값이 저장됩니다.
 */
export const MOODS: Mood[] = [
  { key: 'happy', label: '행복', emoji: '😊', bgVar: 'var(--mood-happy-bg)', fgVar: 'var(--mood-happy-fg)' },
  { key: 'love', label: '설렘', emoji: '🥰', bgVar: 'var(--mood-love-bg)', fgVar: 'var(--mood-love-fg)' },
  { key: 'calm', label: '평온', emoji: '🌿', bgVar: 'var(--mood-calm-bg)', fgVar: 'var(--mood-calm-fg)' },
  { key: 'sad', label: '슬픔', emoji: '🥲', bgVar: 'var(--mood-sad-bg)', fgVar: 'var(--mood-sad-fg)' },
  { key: 'tired', label: '피곤', emoji: '😴', bgVar: 'var(--mood-tired-bg)', fgVar: 'var(--mood-tired-fg)' },
  { key: 'angry', label: '속상', emoji: '😣', bgVar: 'var(--mood-angry-bg)', fgVar: 'var(--mood-angry-fg)' },
];

export const getMood = (key: string): Mood =>
  MOODS.find((m) => m.key === key) ?? MOODS[0];
