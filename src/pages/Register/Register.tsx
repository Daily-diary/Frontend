import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button, TextField, TopBar, Toast } from '../../components/ui';
import '../Login/Login.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', passwordConfirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.username.trim()) next.username = '닉네임을 입력해주세요';
    if (!form.email.trim()) next.email = '이메일을 입력해주세요';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = '올바른 이메일 형식이 아니에요';
    if (form.password.length < 6) next.password = '비밀번호는 6자 이상이어야 해요';
    if (form.password !== form.passwordConfirm) next.passwordConfirm = '비밀번호가 일치하지 않아요';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(credential.user, { displayName: form.username });
      setToast('회원가입이 완료되었어요! 환영해요 🎉');
      await auth.signOut();
      setTimeout(() => navigate('/login'), 700);
    } catch (e: any) {
      console.error('회원가입 에러:', e.code, e.message);
      if (e.code === 'auth/email-already-in-use') {
        setErrors({ email: '이미 사용 중인 이메일이에요' });
      } else if (e.code === 'auth/operation-not-allowed') {
        setErrors({ email: '이메일/비밀번호 로그인이 비활성화되어 있어요 (Firebase 콘솔 확인 필요)' });
      } else if (e.code === 'auth/weak-password') {
        setErrors({ password: '비밀번호가 너무 약해요' });
      } else if (e.code === 'auth/invalid-email') {
        setErrors({ email: '올바른 이메일 형식이 아니에요' });
      } else {
        setErrors({ email: `오류: ${e.code ?? e.message}` });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ background: 'var(--color-bg)' }}>
      <TopBar showBack title="회원가입" />

      <div className="auth-panel fade-in" style={{ marginTop: 'var(--space-lg)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)' }}>
        <TextField
          label="닉네임"
          placeholder="다른 사람에게 보여질 이름이에요"
          value={form.username}
          onChange={update('username')}
          error={errors.username}
        />
        <TextField
          label="이메일"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
        />
        <TextField
          label="비밀번호"
          type="password"
          placeholder="6자 이상 입력해주세요"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          value={form.passwordConfirm}
          onChange={update('passwordConfirm')}
          error={errors.passwordConfirm}
        />

        <Button fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? '가입 처리 중...' : '회원가입'}
        </Button>

        <p className="auth-footer-link">
          이미 계정이 있으신가요?
          <button type="button" onClick={() => navigate('/login')}>
            로그인
          </button>
        </p>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Register;
