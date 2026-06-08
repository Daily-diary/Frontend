interface IconProps {
  name: 'home' | 'users' | 'plus' | 'user';
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const paths: Record<IconProps['name'], string> = {
  home: 'M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z M9 21V12h6v9',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  plus: 'M12 5v14 M5 12h14',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
};

const Icon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {paths[name].split(' M').map((segment, i) => (
      <path key={i} d={i === 0 ? segment : `M${segment}`} />
    ))}
  </svg>
);

export default Icon;
