import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { TopBar, TextField, Button, Toast } from '../../components/ui';
import { userApi } from '../../api/userApi';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    userApi.getMe().then((me) => {
      setNickname(me.nickname);
      setBio(me.bio ?? '');
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!nickname.trim()) {
      setToast('닉네임을 입력해주세요');
      return;
    }
    setLoading(true);
    try {
      await userApi.updateProfile(nickname.trim(), bio.trim());
      setToast('프로필이 저장되었어요');
      setTimeout(() => navigate('/mypage'), 800);
    } catch {
      setToast('저장에 실패했어요');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    try {
      await userApi.deleteMe();
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch {
      setToast('회원탈퇴에 실패했어요');
      setDeleteConfirm(false);
    }
  };

  return (
    <div className="settings-page">
      <TopBar showBack title="설정" />

      <section className="settings-section">
        <p className="settings-section__title">프로필 수정</p>
        <TextField
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname((e.target as HTMLInputElement).value)}
        />
        <TextField
          label="한줄 소개"
          placeholder="나를 한 줄로 표현해보세요"
          value={bio}
          onChange={(e) => setBio((e.target as HTMLInputElement).value)}
        />
        <Button fullWidth onClick={handleSave} disabled={loading}>
          {loading ? '저장 중...' : '저장하기'}
        </Button>
      </section>

      <div className="settings-divider" />

      <section className="settings-section">
        <p className="settings-section__title">계정</p>
        <button
          className={`settings-delete-btn ${deleteConfirm ? 'settings-delete-btn--confirm' : ''}`}
          onClick={handleDeleteAccount}
        >
          {deleteConfirm ? '정말 탈퇴하시겠어요? 다시 누르면 탈퇴됩니다' : '회원탈퇴'}
        </button>
        {deleteConfirm && (
          <button className="settings-cancel-btn" onClick={() => setDeleteConfirm(false)}>
            취소
          </button>
        )}
      </section>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Settings;
