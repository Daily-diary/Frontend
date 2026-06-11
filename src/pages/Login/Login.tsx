import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { Button, Icon, TextField, Toast, TopBar } from '../../components/ui';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) navigate('/feed', { replace: true });
    });
    return unsubscribe;
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      setToast('환영해요! 오늘 하루도 기록해볼까요? 🌙');
      setTimeout(() => navigate('/feed'), 600);
    } catch {
      setError('Google 로그인에 실패했어요');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToast('로그인되었어요');
      setTimeout(() => navigate('/feed'), 600);
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않아요');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <TopBar title="" />
      <div className="auth-hero">
        <span className="auth-hero__emoji">📔</span>
        <h1 className="auth-hero__title">
          Daily <span>Diary</span>
        </h1>
        <p className="auth-hero__desc">
          오늘 하루의 감정을 기록하고
          <br />
          친구들과 따뜻하게 나눠보세요
        </p>
      </div>

      <div className="auth-panel fade-in">
        <Button fullWidth variant="outline" onClick={handleGoogleLogin} disabled={loading}>
          <Icon name="sparkle" size={17} color="var(--color-primary)" />
          Google로 계속하기
        </Button>

        <div className="auth-divider">또는 이메일로 로그인</div>

        <TextField
          placeholder="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error || undefined}
        />

        <Button fullWidth onClick={handleEmailLogin} disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </Button>

        <p className="auth-footer-link">
          아직 계정이 없으신가요?
          <button type="button" onClick={() => navigate('/register')}>
            회원가입
          </button>
        </p>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Login;
