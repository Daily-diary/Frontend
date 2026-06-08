import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, TopBar, IconButton } from '../../components/ui';
import { ME, MY_DIARIES, MOCK_FRIENDSHIPS } from '../../api/mockData';
import { getMood } from '../../constants/moods';
import '../../styles/Profile.css';

type Tab = 'grid' | 'friends';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('grid');
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <TopBar
        title="마이페이지"
        right={<IconButton icon="settings" aria-label="설정" onClick={() => {}} />}
      />

      <div className="profile-header-bg" />

      <div className="profile-card">
        <Avatar src={ME.profileImageUrl} name={ME.username} size={72} />
        <h2 className="profile-name">{ME.username}</h2>
        <p className="profile-bio">{ME.bio}</p>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{MY_DIARIES.length}</span>
            <span className="stat-label">게시물</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{MOCK_FRIENDSHIPS.length}</span>
            <span className="stat-label">친구</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`}
          onClick={() => setActiveTab('grid')}
        >
          내 일기
        </button>
        <button
          className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          친구들
        </button>
      </div>

      {activeTab === 'grid' && (
        <div className="instagram-grid">
          {MY_DIARIES.map((diary) => {
            const m = getMood(diary.mood);
            return (
              <div
                key={diary.id}
                className="grid-tile"
                style={{ backgroundColor: m.bgVar }}
                onClick={() => navigate(`/diary/${diary.id}`)}
              >
                <span className="tile-emoji">{m.emoji}</span>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="friends-list">
          {MOCK_FRIENDSHIPS.map((f) => (
            <div
              key={f.id}
              className="friend-row"
              onClick={() => navigate(`/feed/users/${f.user.id}`)}
              role="button"
            >
              <Avatar src={f.user.profileImageUrl} name={f.user.username} size={44} />
              <span className="friend-name">{f.user.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
