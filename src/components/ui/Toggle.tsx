import './ui.css';

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel?: string;
}

const Toggle = ({ checked, onChange, ariaLabel }: ToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`toggle ${checked ? 'toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle__knob" />
    </button>
  );
};

export default Toggle;
