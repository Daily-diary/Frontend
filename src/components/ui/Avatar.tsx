import './ui.css';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
}

/**
 * 프로필 이미지가 없을 경우 이름의 첫 글자를 보여주는 아바타.
 */
const Avatar = ({ src, name = '', size = 44 }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'profile'}
        className="avatar"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      />
    );
  }

  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {name ? name.charAt(0).toUpperCase() : '🙂'}
    </span>
  );
};

export default Avatar;
