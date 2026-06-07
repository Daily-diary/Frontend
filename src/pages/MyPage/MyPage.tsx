import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  BottomSheet,
  Button,
  Chip,
  EmptyState,
  Icon,
  TextField,
  TopBar,
  Toast,
} from '../../components/ui';
import { getMood } from '../../constants/moods';
import { ME, MY_DIARIES } from '../../api/mockData';
import './MyPage.css';

type Tab = 'all' | 'public' | 'private';

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'public', label: '공개' },
  { key: 'private', label: '비공개' },
];

/**
 * 마이페이지 — 프로필 조회/수정 (GET·PUT /api/users/me), 회원 탈퇴(DELETE /api/users/me)
 */
const MyPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({ ...ME });
  const [tab, setTab] = useState<Tab>('all');
  const [editOpen, setEditOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [draftName, setDraftName] = useState(profile.username);
  const [draftBio, setDraftBio] = useState(profile.bio ?? '');
  const [draftImage, setDraftImage] = useState<string | null>(profile.profileImageUrl ?? null);

  const openEdit = () => {
    setDraftName(profile.username);
    setDraftBio(profile.bio ?? '');
    setDraftImage(profile.profileImageUrl ?? null);
    setEditOpen(true);
  };

  const handleSaveProfile = () => {
    // TODO: 백엔드 연동 — PUT /api/users/me
    setProfile((prev) => ({ ...prev, username: draftName, bio: draftBio, profileImageUrl: draftImage }));
    setEditOpen(false);
    setToast('프로필을 수정했어요');
  };

  const handlePickImage = (file: File | undefined) => {
    if (!file) return;
    setDraftImage(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    setLogoutOpen(false);
    setToast('로그아웃 되었어요');
    setTimeout(() => navigate('/login'), 500);
  };

  const handleWithdraw = () => {
    // TODO: 백엔드 연동 — DELETE /api/users/me
    setWithdrawOpen(false);
    setToast('그동안 함께해주셔서 감사했어요');
    setTimeout(() => navigate('/login'), 600);
  };

  const filteredDiaries = MY_DIARIES.filter((d) => {
    if (tab === 'public') return d.isPublic;
    if (tab === 'private') return !d.isPublic;
    return true;
  });

  return (
    <div className="page">
      <TopBar
        title="마이페이지"
        right={<Icon name="settings" size={20} color="var(--color-text-muted)" />}
      />

      <div className="mypage-hero" />
      <div className="mypage-card fade-in">
        <Avatar src={profile.profileImageUrl} name={profile.username} size={84} />
        <p className="mypage-name">{profile.username}</p>
        <p className="mypage-bio">{profile.bio}</p>

        <div className="mypage-stats">
          <div className="stat">
            <span className="stat-value">{MY_DIARIES.length}</span>
            <span className="stat-label">기록한 일기</span>
          </div>
          <div className="stat">
            <span className="stat-value">3</span>
            <span className="stat-label">친구</span>
          </div>
        </div>

        <div className="mypage-actions">
          <Button variant="secondary" size="sm" fullWidth onClick={openEdit}>
            <Icon name="edit" size={15} />
            프로필 수정
          </Button>
          <Button variant="ghost" size="sm" fullWidth onClick={() => setLogoutOpen(true)}>
            <Icon name="logout" size={15} />
            로그아웃
          </Button>
        </div>
      </div>

      <div className="mypage-tabs">
        {TABS.map((t) => (
          <Chip key={t.key} active={tab === t.key} onClick={() => setTab(t.key)}>
            {t.label}
          </Chip>
        ))}
      </div>

      {filteredDiaries.length === 0 ? (
        <EmptyState icon="📔" title="아직 기록한 일기가 없어요" />
      ) : (
        <div className="diary-grid">
          {filteredDiaries.map((diary) => {
            const mood = getMood(diary.mood);
            const cover = diary.images[0]?.imageUrl;
            return (
              <div
                key={diary.id}
                className="diary-grid__tile fade-in"
                style={{ background: cover ? undefined : mood.bgVar }}
                onClick={() => navigate(`/diary/${diary.id}`)}
                role="button"
              >
                {cover && <img src={cover} alt={diary.title} />}
                {!diary.isPublic && (
                  <span className="lock-badge">
                    <Icon name="lock" size={12} color="#fff" />
                  </span>
                )}
                <span className="tile-overlay" style={{ color: cover ? '#fff' : mood.fgVar }}>
                  {mood.emoji}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="mypage-settings" style={{ marginTop: 'var(--space-xl)' }}>
        <button className="mypage-settings__item" onClick={() => navigate('/login')}>
          <Icon name="bell" size={18} />
          <span>알림 설정</span>
          <Icon name="chevron-right" size={16} color="var(--color-text-faint)" />
        </button>
        <button className="mypage-settings__item mypage-settings__item--danger" onClick={() => setWithdrawOpen(true)}>
          <Icon name="trash" size={18} />
          <span>회원 탈퇴</span>
          <Icon name="chevron-right" size={16} color="var(--color-text-faint)" />
        </button>
      </div>

      {/* 프로필 수정 시트 */}
      <BottomSheet open={editOpen} onClose={() => setEditOpen(false)}>
        <div className="edit-profile-form">
          <p className="section-title" style={{ textAlign: 'center' }}>프로필 수정</p>
          <div className="edit-profile-avatar-row">
            <Avatar src={draftImage} name={draftName} size={76} />
            <button type="button" onClick={() => fileInputRef.current?.click()}>사진 변경</button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handlePickImage(e.target.files?.[0])}
            />
          </div>
          <TextField label="닉네임" value={draftName} onChange={(e) => setDraftName(e.target.value)} />
          <TextField label="소개" value={draftBio} onChange={(e) => setDraftBio(e.target.value)} multiline />
          <Button fullWidth onClick={handleSaveProfile}>저장하기</Button>
        </div>
      </BottomSheet>

      {/* 로그아웃 확인 */}
      <BottomSheet centered open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <div style={{ textAlign: 'center', padding: '8px 4px' }}>
          <p style={{ fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--color-text-strong)', marginBottom: 8 }}>
            로그아웃 할까요?
          </p>
          <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 20 }}>
            언제든 다시 로그인해서 돌아올 수 있어요
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--outline btn--full" onClick={() => setLogoutOpen(false)}>취소</button>
            <button className="btn btn--primary btn--full" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </BottomSheet>

      {/* 회원 탈퇴 확인 */}
      <BottomSheet centered open={withdrawOpen} onClose={() => setWithdrawOpen(false)}>
        <div style={{ textAlign: 'center', padding: '8px 4px' }}>
          <p style={{ fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--color-text-strong)', marginBottom: 8 }}>
            정말 탈퇴하시겠어요?
          </p>
          <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 20 }}>
            작성한 모든 일기와 친구 기록이 삭제되며 복구할 수 없어요
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--outline btn--full" onClick={() => setWithdrawOpen(false)}>취소</button>
            <button className="btn btn--full" style={{ background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: 'var(--radius-pill)', padding: '13px 22px', fontWeight: 600 }} onClick={handleWithdraw}>
              탈퇴하기
            </button>
          </div>
        </div>
      </BottomSheet>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default MyPage;
