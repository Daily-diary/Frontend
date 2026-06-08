type IconName =
  | 'home'
  | 'plus'
  | 'user'
  | 'users'
  | 'heart'
  | 'heart-filled'
  | 'message'
  | 'search'
  | 'back'
  | 'more'
  | 'globe'
  | 'lock'
  | 'image'
  | 'edit'
  | 'trash'
  | 'check'
  | 'close'
  | 'bell'
  | 'settings'
  | 'camera'
  | 'send'
  | 'logout'
  | 'chevron-right'
  | 'calendar'
  | 'sparkle';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

/**
 * 라인 스타일의 인라인 SVG 아이콘 세트.
 * 이모지 대신 통일된 톤앤매너를 위해 사용합니다. (currentColor 기반)
 */
const Icon = ({ name, size = 22, color = 'currentColor', strokeWidth = 1.8, className }: IconProps) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3.5 10.5 12 4l8.5 6.5" />
          <path d="M5.5 9.5V19a1 1 0 0 0 1 1H10v-4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1V9.5" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20c.7-3.4 3.4-5.2 7-5.2s6.3 1.8 7 5.2" />
        </svg>
      );
    case 'users':
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="3" />
          <path d="M3.5 19c.5-2.8 2.7-4.3 5.5-4.3s5 1.5 5.5 4.3" />
          <path d="M15.2 5.4a3 3 0 0 1 0 5.8" />
          <path d="M16 14.9c2.4.3 4 1.7 4.5 4.1" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-9-8.6C1.4 8 3 5 6.3 5c1.9 0 3.4 1 5.7 3.4C14.3 6 15.8 5 17.7 5 21 5 22.6 8 21 11.4 19 15.6 12 20 12 20Z" />
        </svg>
      );
    case 'heart-filled':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
          <path d="M12 20s-7-4.4-9-8.6C1.4 8 3 5 6.3 5c1.9 0 3.4 1 5.7 3.4C14.3 6 15.8 5 17.7 5 21 5 22.6 8 21 11.4 19 15.6 12 20 12 20Z" />
        </svg>
      );
    case 'message':
      return (
        <svg {...common}>
          <path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.4-3.4" />
        </svg>
      );
    case 'back':
      return (
        <svg {...common}>
          <path d="M14.5 18.5 8 12l6.5-6.5" />
        </svg>
      );
    case 'more':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c2.2 2.4 3.3 5.1 3.3 8s-1.1 5.6-3.3 8c-2.2-2.4-3.3-5.1-3.3-8S9.8 6.4 12 4Z" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5.5" y="10.5" width="13" height="9" rx="2.4" />
          <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
        </svg>
      );
    case 'image':
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.6" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m4.5 17.5 4.6-4.6a1.6 1.6 0 0 1 2.26 0l1.64 1.64M14.5 14l1.4-1.4a1.6 1.6 0 0 1 2.26 0l1.34 1.34" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...common}>
          <path d="M5 19.5h14" />
          <path d="M14.7 4.6a1.7 1.7 0 0 1 2.4 0l1.5 1.5a1.7 1.7 0 0 1 0 2.4L8.6 18.5 4.5 19.4l.9-4.1Z" />
        </svg>
      );
    case 'trash':
      return (
        <svg {...common}>
          <path d="M5 7.5h14M9.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 6v1.5" />
          <path d="M7 7.5 7.7 18a2 2 0 0 0 2 1.9h4.6a2 2 0 0 0 2-1.9l.7-10.5" />
          <path d="M10.3 11v5M13.7 11v5" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...common}>
          <path d="M7 10a5 5 0 0 1 10 0c0 4.2 1 5.4 1.6 6H5.4C6 15.4 7 14.2 7 10Z" />
          <path d="M10.4 19a1.8 1.8 0 0 0 3.2 0" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 13a7.6 7.6 0 0 0 0-2l1.7-1.4-2-3.4-2.1.6a7.7 7.7 0 0 0-1.7-1l-.4-2.2h-4l-.4 2.2a7.7 7.7 0 0 0-1.7 1l-2.1-.6-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-1.7 1.4 2 3.4 2.1-.6a7.7 7.7 0 0 0 1.7 1l.4 2.2h4l.4-2.2a7.7 7.7 0 0 0 1.7-1l2.1.6 2-3.4Z" />
        </svg>
      );
    case 'camera':
      return (
        <svg {...common}>
          <path d="M4 8.5a1.5 1.5 0 0 1 1.5-1.5h1.8l1-1.6a1.5 1.5 0 0 1 1.27-.7h4.86a1.5 1.5 0 0 1 1.27.7l1 1.6h1.8A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" />
          <circle cx="12" cy="13" r="3.4" />
        </svg>
      );
    case 'send':
      return (
        <svg {...common}>
          <path d="m4 12 16-7-6.5 16-2.4-7L4 12Z" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...common}>
          <path d="M9 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
          <path d="M16 16l4-4-4-4M20 12H9" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...common}>
          <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="4.5" y="5.5" width="15" height="14" rx="2.4" />
          <path d="M4.5 9.5h15M8.5 4v3M15.5 4v3" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
          <path d="M12 3.5c.6 2.8 1.7 4 4.5 4.5-2.8.6-3.9 1.7-4.5 4.5-.6-2.8-1.7-3.9-4.5-4.5 2.8-.5 3.9-1.7 4.5-4.5Z" />
          <path d="M18.5 14c.4 1.6 1 2.2 2.5 2.5-1.5.4-2.1 1-2.5 2.5-.4-1.5-1-2.1-2.5-2.5 1.5-.3 2.1-.9 2.5-2.5Z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
export type { IconName };
