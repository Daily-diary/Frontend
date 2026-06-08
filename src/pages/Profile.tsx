import { useState, useEffect } from 'react';
import '../styles/Profile.css';

interface UserProfile {
  nickname: string;
  bio: string;
  diaryCount: number;
  friendCount: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'grid' | 'friends'>('grid');

  useEffect(() => {
    setProfile({
      nickname: "김석현",
      bio: "오늘 하루 수고 🌙",
      diaryCount: 9,
      friendCount: 15,
    });
  }, []);

  if (!profile) return null;

  const dummyDiaries = [
    { id: 1, emotion: '🥰', color: '#ffe0e6' },
    { id: 2, emotion: '✨', color: '#fff0d4' },
    { id: 3, emotion: '🌿', color: '#d4f0df' },
    { id: 4, emotion: '💧', color: '#d4e8ff' },
    { id: 5, emotion: '🔥', color: '#ffd4d4' },
    { id: 6, emotion: '🥰', color: '#ffe0e6' },
    { id: 7, emotion: '💤', color: '#f0e6ff' },
    { id: 8, emotion: '✨', color: '#fff0d4' },
    { id: 9, emotion: '🌿', color: '#d4f0df' },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header-bg"></div>

      <div className="profile-card">
        <h2 className="profile-name">{profile.nickname}</h2>
        <p className="profile-bio">{profile.bio}</p>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{profile.diaryCount}</span>
            <span className="stat-label">게시물</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{profile.friendCount}</span>
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
          {dummyDiaries.map((diary) => (
            <div 
              key={diary.id} 
              className="grid-tile" 
              style={{ backgroundColor: diary.color }}
            >
              <span className="tile-emoji">{diary.emotion}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="friends-list">
          <div className="friend-row">
            <span className="friend-emoji">🧑‍💻</span>
            <span className="friend-name">상민</span>
          </div>
          <div className="friend-row">
            <span className="friend-emoji">🧑</span>
            <span className="friend-name">성우</span>
          </div>
          <div className="friend-row">
            <span className="friend-emoji">👩</span>
            <span className="friend-name">성민</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;