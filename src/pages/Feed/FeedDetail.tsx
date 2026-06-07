import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Icon, MoodTag, Spinner, TopBar, EmptyState } from '../../components/ui';
import { MOCK_DIARIES, MY_DIARIES } from '../../api/mockData';
import type { Diary } from '../../types/models';
import './FeedDetail.css';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

/**
 * 친구 피드 상세 조회 (GET /api/feed/{diaryId})
 */
const FeedDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<Diary | null | undefined>(undefined);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const found = [...MOCK_DIARIES, ...MY_DIARIES].find((d) => d.id === diaryId);
    const timer = setTimeout(() => setDiary(found ?? null), 250);
    return () => clearTimeout(timer);
  }, [diaryId]);

  return (
    <div className="page page--no-nav">
      <TopBar showBack title="일기" />

      {diary === undefined ? (
        <Spinner />
      ) : diary === null ? (
        <EmptyState icon={<Icon name="search" size={26} />} title="일기를 찾을 수 없어요" />
      ) : (
        <article className="fade-in">
          {diary.images.length > 0 && (
            <div className="feed-detail__images">
              {diary.images.map((img) => (
                <img key={img.id} src={img.imageUrl} alt={diary.title} />
              ))}
            </div>
          )}

          <div className="feed-detail__body">
            <div
              className="feed-detail__author"
              onClick={() => navigate(`/feed/users/${diary.author.id}`)}
              role="button"
            >
              <Avatar src={diary.author.profileImageUrl} name={diary.author.username} size={46} />
              <div>
                <p className="name">{diary.author.username}</p>
                <p className="date">{formatDate(diary.diaryDate)}</p>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <MoodTag mood={diary.mood} />
              </div>
            </div>

            <h2 className="feed-detail__title">{diary.title}</h2>
            <p className="feed-detail__content">{diary.content}</p>

            <div className="feed-detail__actions">
              <button className={liked ? 'liked' : ''} onClick={() => setLiked((v) => !v)}>
                <Icon name={liked ? 'heart-filled' : 'heart'} size={18} />
                공감하기
              </button>
              <button>
                <Icon name="message" size={18} />
                이야기 남기기
              </button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default FeedDetail;
