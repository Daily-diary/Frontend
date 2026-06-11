import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Icon, MoodTag, Spinner, EmptyState } from '../../components/ui';
import { feedApi, type FeedItem } from '../../api/feedApi';
import { userApi, type UserProfile } from '../../api/userApi';
import './Feed.css';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
};

const Feed = () => {
  const [feed, setFeed] = useState<FeedItem[] | null>(null);
  const [me, setMe] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    userApi.getMe().then(setMe).catch(() => {});
    feedApi.getFeed().then(setFeed).catch(() => setFeed([]));
  }, []);

  const toggleLike = async (diary: FeedItem) => {
    try {
      const { liked } = await feedApi.toggleLike(diary.id);
      setFeed(prev =>
        prev?.map(d =>
          d.id === diary.id
            ? { ...d, liked, likeCount: liked ? d.likeCount + 1 : d.likeCount - 1 }
            : d
        ) ?? prev
      );
    } catch {
      // ignore
    }
  };

  return (
    <div className="page">
      <section className="feed-hero">
        <p className="feed-hero__greeting">{me ? `${me.nickname}님, 오늘 하루는 어땠나요?` : '오늘 하루는 어땠나요?'}</p>
        <h1 className="feed-hero__title">
          친구들의 <span>오늘</span>을 들여다봐요
        </h1>
      </section>

      {feed === null ? (
        <Spinner />
      ) : feed.length === 0 ? (
        <EmptyState
          icon={<Icon name="sparkle" size={28} color="var(--color-primary)" />}
          title="아직 친구의 일기가 없어요"
          description="친구를 추가하면 서로의 하루를 볼 수 있어요"
        />
      ) : (
        <main className="feed-list">
          {feed.map((diary) => (
            <article key={diary.id} className="feed-card fade-in">
              <div
                className="feed-card-header"
                onClick={() => navigate(`/feed/users/${diary.authorId}`)}
                role="button"
              >
                <Avatar src={diary.authorProfileImageUrl} name={diary.authorName} size={42} />
                <div className="header-info">
                  <span className="nickname">{diary.authorName}</span>
                  <span className="date">{formatDate(diary.diaryDate)}</span>
                </div>
                <MoodTag mood={diary.mood} size="sm" />
              </div>

              {diary.imageUrls.length > 0 && (
                <div className="feed-card-images" onClick={() => navigate(`/feed/${diary.id}`)} role="button">
                  {diary.imageUrls.map((url, i) => (
                    <img key={i} src={url} alt={diary.title} loading="lazy" />
                  ))}
                </div>
              )}

              <div className="feed-card-body" onClick={() => navigate(`/feed/${diary.id}`)} role="button">
                <p className="feed-card-title">{diary.title}</p>
                <p className="feed-card-content">{diary.content}</p>
              </div>

              <div className="feed-card-actions">
                <button className={diary.liked ? 'liked' : ''} onClick={() => toggleLike(diary)}>
                  <Icon name={diary.liked ? 'heart-filled' : 'heart'} size={19} />
                  공감{diary.likeCount > 0 && ` ${diary.likeCount}`}
                </button>
                <button onClick={() => navigate(`/feed/${diary.id}`)}>
                  <Icon name="message" size={19} />
                  이야기 나누기{diary.commentCount > 0 && ` ${diary.commentCount}`}
                </button>
              </div>
            </article>
          ))}
        </main>
      )}
    </div>
  );
};

export default Feed;
