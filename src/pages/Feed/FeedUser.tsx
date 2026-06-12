import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Icon, MoodTag, Spinner, TopBar, EmptyState } from '../../components/ui';
import { feedApi, type FeedItem } from '../../api/feedApi';
import { userApi, type UserSearchResult } from '../../api/userApi';
import './Feed.css';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
};

const FeedUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserSearchResult | null | undefined>(undefined);
  const [diaries, setDiaries] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (!userId) return;
    feedApi.getFriendFeed(userId)
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setDiaries(sorted);
        if (data.length > 0) {
          setUser({
            id: data[0].authorId,
            nickname: data[0].authorName,
            profileImageUrl: data[0].authorProfileImageUrl,
            bio: null,
            friendshipStatus: 'FRIEND',
          });
        } else {
          userApi.search('').catch(() => {});
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [userId]);

  return (
    <div className="page">
      <TopBar showBack title={user ? `${user.nickname}님의 피드` : '피드'} />

      {user === undefined ? (
        <Spinner />
      ) : user === null ? (
        <EmptyState icon={<Icon name="user" size={26} />} title="사용자를 찾을 수 없어요" />
      ) : (
        <>
          <section style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px var(--space-lg) 4px' }}>
            <Avatar src={user.profileImageUrl} name={user.nickname} size={56} />
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-text-strong)', fontSize: 'var(--font-size-md)' }}>
                {user.nickname}
              </p>
              {user.bio && <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>{user.bio}</p>}
            </div>
          </section>

          {diaries.length === 0 ? (
            <EmptyState icon="🌧️" title="공개된 일기가 아직 없어요" />
          ) : (
            <main className="feed-list">
              {diaries.map((diary) => (
                <article key={diary.id} className="feed-card fade-in" onClick={() => navigate(`/feed/${diary.id}`)} role="button">
                  {diary.imageUrls.length > 0 && (
                    <div className="feed-card-images">
                      {diary.imageUrls.map((url, i) => (
                        <img key={i} src={url} alt={diary.title} loading="lazy" />
                      ))}
                    </div>
                  )}
                  <div className="feed-card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <p className="feed-card-title" style={{ marginBottom: 0 }}>{diary.title}</p>
                      <MoodTag mood={diary.mood} size="sm" />
                    </div>
                    <p className="feed-card-content">{diary.content}</p>
                    <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)', marginTop: 8 }}>
                      {formatDate(diary.diaryDate)}
                    </p>
                  </div>
                </article>
              ))}
            </main>
          )}
        </>
      )}
    </div>
  );
};

export default FeedUser;
