import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Icon, MoodTag, Spinner, TopBar, EmptyState } from '../../components/ui';
import { feedApi, type FeedItem, type CommentItem } from '../../api/feedApi';
import { userApi, type UserProfile } from '../../api/userApi';
import './FeedDetail.css';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

const formatCommentDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const FeedDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<FeedItem | null | undefined>(undefined);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [me, setMe] = useState<UserProfile | null>(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!diaryId) return;
    userApi.getMe().then(setMe).catch(() => {});
    feedApi.getFeedDetail(diaryId).then(setDiary).catch(() => setDiary(null));
    feedApi.getComments(diaryId).then(setComments).catch(() => {});
  }, [diaryId]);

  const toggleLike = async () => {
    if (!diary || !diaryId) return;
    try {
      const { liked } = await feedApi.toggleLike(diaryId);
      setDiary(prev =>
        prev ? { ...prev, liked, likeCount: liked ? prev.likeCount + 1 : prev.likeCount - 1 } : prev
      );
    } catch {
      // ignore
    }
  };

  const handleAddComment = async () => {
    if (!diaryId || !commentText.trim() || submitting) return;
    setSubmitting(true);
    try {
      const newComment = await feedApi.addComment(diaryId, commentText.trim());
      setComments(prev => [...prev, newComment]);
      setCommentText('');
      setDiary(prev => prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev);
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!diaryId) return;
    try {
      await feedApi.deleteComment(diaryId, commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      setDiary(prev => prev ? { ...prev, commentCount: prev.commentCount - 1 } : prev);
    } catch {
      // ignore
    }
  };

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
              <button className={diary.liked ? 'liked' : ''} onClick={toggleLike}>
                <Icon name={diary.liked ? 'heart-filled' : 'heart'} size={18} />
                공감{diary.likeCount > 0 && ` ${diary.likeCount}`}
              </button>
              <button onClick={() => inputRef.current?.focus()}>
                <Icon name="message" size={18} />
                이야기 남기기{diary.commentCount > 0 && ` ${diary.commentCount}`}
              </button>
            </div>
          </div>

          <div className="feed-detail__comments">
            <p className="feed-detail__comments-title">이야기 나누기</p>

            {comments.length === 0 ? (
              <p className="feed-detail__comments-empty">아직 이야기가 없어요. 첫 번째로 남겨보세요!</p>
            ) : (
              <ul className="feed-detail__comment-list">
                {comments.map(c => (
                  <li key={c.id} className="feed-detail__comment-item">
                    <Avatar src={c.authorProfileImageUrl} name={c.authorName} size={34} />
                    <div className="feed-detail__comment-bubble">
                      <span className="feed-detail__comment-author">{c.authorName}</span>
                      <p className="feed-detail__comment-content">{c.content}</p>
                      <span className="feed-detail__comment-date">{formatCommentDate(c.createdAt)}</span>
                    </div>
                    {me?.id === c.authorId && (
                      <button
                        className="feed-detail__comment-delete"
                        onClick={() => handleDeleteComment(c.id)}
                        aria-label="삭제"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="feed-detail__comment-input">
              <Avatar src={me?.profileImageUrl ?? null} name={me?.nickname ?? ''} size={34} />
              <input
                ref={inputRef}
                type="text"
                placeholder="따뜻한 이야기를 남겨보세요"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
                maxLength={300}
              />
              <button
                className="feed-detail__comment-send"
                onClick={handleAddComment}
                disabled={!commentText.trim() || submitting}
              >
                <Icon name="send" size={18} />
              </button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default FeedDetail;
