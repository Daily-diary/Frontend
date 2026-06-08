import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, TextField, Toast } from '../../components/ui';
import './Login.css';

/**
 * 로그인 화면.
 * - Firebase Auth(Google)로 로그인 후 JWT 발급 → POST /api/auth/login
 * - 로그인 실패 시 에러 메시지를 보여줍니다.
 */
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    setLoading(true);
    setError('');
    // TODO: 백엔드 연동 — Firebase Auth 팝업 → ID 토큰 → POST /api/auth/login
    setTimeout(() => {
      setLoading(false);
      setToast('환영해요! 오늘 하루도 기록해볼까요? 🌙');
      setTimeout(() => navigate('/'), 600);
    }, 700);
  };

  const handleEmailLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요');
      return;
    }
    setError('');
    setLoading(true);
    // TODO: 백엔드 연동 — POST /api/auth/login
    setTimeout(() => {
      setLoading(false);
      setToast('로그인되었어요');
      setTimeout(() => navigate('/'), 600);
    }, 700);
  };

  return (
    <div className="auth-page">
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
