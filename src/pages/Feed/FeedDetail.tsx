import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Icon, MoodTag, Spinner, TopBar, EmptyState } from '../../components/ui';
import { feedApi, type FeedItem } from '../../api/feedApi';
import './FeedDetail.css';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

const FeedDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<FeedItem | null | undefined>(undefined);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!diaryId) return;
    feedApi.getFeedDetail(diaryId).then(setDiary).catch(() => setDiary(null));
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
          {diary.imageUrls.length > 0 && (
            <div className="feed-detail__images">
              {diary.imageUrls.map((url, i) => (
                <img key={i} src={url} alt={diary.title} />
              ))}
            </div>
          )}

          <div className="feed-detail__body">
            <div className="feed-detail__author" onClick={() => navigate(`/feed/users/${diary.authorId}`)} role="button">
              <Avatar src={diary.authorProfileImageUrl} name={diary.authorName} size={46} />
              <div>
                <p className="name">{diary.authorName}</p>
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
