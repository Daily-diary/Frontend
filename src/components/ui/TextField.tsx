import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './ui.css';

interface BaseProps {
  label?: string;
  error?: string;
  hint?: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

/**
 * 라벨 / 에러 / 힌트 메시지를 함께 보여주는 공통 입력 필드.
 * multiline=true 인 경우 textarea 로 렌더링됩니다.
 */
const TextField = (props: InputProps | TextareaProps) => {
  const { label, error, hint, ...rest } = props;
  const id = (rest as { id?: string }).id;

  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}
      {props.multiline ? (
        <textarea id={id} className="field-textarea" {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={id} className="field-input" {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error ? <span className="field-error">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </div>
  );
};

export default TextField;
