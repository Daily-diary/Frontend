import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Avatar, TopBar, IconButton, Spinner, Icon, TextField, Button, Toast } from '../../components/ui';
import { userApi, type UserProfile } from '../../api/userApi';
import { diaryApi, type DiaryItem } from '../../api/diaryApi';
import { friendApi, type FriendItem } from '../../api/friendApi';
import { getMood } from '../../constants/moods';
import '../../styles/Profile.css';

type Tab = 'grid' | 'friends';

const MyPage = () => {
  const [me, setMe] = useState<UserProfile | null>(null);
  const [diaries, setDiaries] = useState<DiaryItem[]>([]);
  const [friends, setFriends] = useState<FriendItem[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('grid');
  const [loading, setLoading] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = URL.createObjectURL(file);
      const updated = await userApi.updateProfileImage(url);
      setMe(updated);
      setProfileModalOpen(false);
    } catch {
      // silent
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const openSettings = () => {
    setNickname(me?.nickname ?? '');
    setBio(me?.bio ?? '');
    setDeleteConfirm(false);
    setSettingsOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!nickname.trim()) {
      setToast('닉네임을 입력해주세요');
      return;
    }
    setSaving(true);
    try {
      const updated = await userApi.updateProfile(nickname.trim(), bio.trim());
      setMe(updated);
      setSettingsOpen(false);
      setToast('프로필이 저장되었어요');
    } catch {
      setToast('저장에 실패했어요');
    } finally {
      setSaving(false);
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

  useEffect(() => {
    Promise.all([
      userApi.getMe(),
      diaryApi.getMyDiaries(),
      friendApi.getFriends(),
    ]).then(([user, myDiaries, myFriends]) => {
      setMe(user);
      setDiaries([...myDiaries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setFriends(myFriends);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><Spinner /></div>;

  return (
    <div className="profile-container">
      <TopBar
        title="마이페이지"
        right={<IconButton icon="settings" aria-label="설정" onClick={openSettings} />}
      />

      <div className="profile-header-bg" />

      <div className="profile-card">
        <div className="profile-avatar-wrapper" onClick={() => setProfileModalOpen(true)}>
          <Avatar src={me?.profileImageUrl ?? null} name={me?.nickname ?? ''} size={72} />
          <div className="profile-avatar-edit-badge">
            <Icon name="camera" size={13} color="#fff" />
          </div>
        </div>
        <h2 className="profile-name">{me?.nickname}</h2>
        <p className="profile-bio">{me?.bio ?? '한 줄 소개를 추가해보세요'}</p>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{diaries.length}</span>
            <span className="stat-label">게시물</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{friends.length}</span>
            <span className="stat-label">친구</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`} onClick={() => setActiveTab('grid')}>
          내 일기
        </button>
        <button className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => setActiveTab('friends')}>
          친구들
        </button>
      </div>

      {activeTab === 'grid' && (
        diaries.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>아직 일기가 없어요</p>
        ) : (
          <div className="instagram-grid">
            {diaries.map((diary) => {
              const m = getMood(diary.mood);
              return (
                <div key={diary.id} className="grid-tile" style={{ backgroundColor: m.bgVar }} onClick={() => navigate(`/diary/${diary.id}`)}>
                  {diary.imageUrls.length > 0
                    ? <img src={diary.imageUrls[0]} alt={diary.title} className="tile-image" />
                    : <span className="tile-emoji">{m.emoji}</span>
                  }
                </div>
              );
            })}
          </div>
        )
      )}

      {activeTab === 'friends' && (
        friends.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>아직 친구가 없어요</p>
        ) : (
          <div className="friends-list">
            {friends.map((f) => (
              <div key={f.userId} className="friend-row" onClick={() => navigate(`/feed/users/${f.userId}`)} role="button">
                <Avatar src={f.profileImageUrl} name={f.nickname} size={44} />
                <span className="friend-name">{f.nickname}</span>
              </div>
            ))}
          </div>
        )
      )}

      {/* 프로필 사진 모달 */}
      {profileModalOpen && (
        <div className="profile-photo-modal" onClick={() => setProfileModalOpen(false)}>
          <div className="profile-photo-modal__card" onClick={e => e.stopPropagation()}>
            <button className="profile-photo-modal__close" onClick={() => setProfileModalOpen(false)}>
              <Icon name="close" size={20} />
            </button>
            <div className="profile-photo-modal__image">
              <Avatar src={me?.profileImageUrl ?? null} name={me?.nickname ?? ''} size={130} />
            </div>
            <p className="profile-photo-modal__name">{me?.nickname}</p>
            <button
              className="profile-photo-modal__change"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
            >
              <Icon name="camera" size={16} color="#fff" />
              {uploadingPhoto ? '변경 중...' : '사진 변경'}
            </button>
          </div>
        </div>
      )}

      {/* 설정 모달 */}
      {settingsOpen && (
        <div className="profile-photo-modal" onClick={() => setSettingsOpen(false)}>
          <div className="settings-modal__card" onClick={e => e.stopPropagation()}>
            <div className="settings-modal__header">
              <p className="settings-modal__title">설정</p>
              <button className="profile-photo-modal__close" onClick={() => setSettingsOpen(false)}>
                <Icon name="close" size={20} />
              </button>
            </div>

            <p className="settings-modal__section-label">프로필 수정</p>
            <div className="settings-modal__fields">
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
              <Button fullWidth onClick={handleSaveProfile} disabled={saving}>
                {saving ? '저장 중...' : '저장하기'}
              </Button>
            </div>

            <div className="settings-modal__divider" />

            <div className="settings-modal__fields">
              <button
                className={`settings-delete-btn ${deleteConfirm ? 'settings-delete-btn--confirm' : ''}`}
                onClick={handleDeleteAccount}
              >
                {deleteConfirm ? '다시 누르면 탈퇴됩니다' : '회원탈퇴'}
              </button>
              {deleteConfirm && (
                <button className="settings-cancel-btn" onClick={() => setDeleteConfirm(false)}>
                  취소
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleProfileImageChange} />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default MyPage;
