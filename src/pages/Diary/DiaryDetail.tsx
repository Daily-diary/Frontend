import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, BottomSheet, EmptyState, Icon, IconButton, MoodTag, Spinner, TopBar, Toast } from '../../components/ui';
import { diaryApi, type DiaryItem } from '../../api/diaryApi';
import { feedApi, type CommentItem } from '../../api/feedApi';
import { userApi, type UserProfile } from '../../api/userApi';
import { formatDateKST, formatCommentDateKST } from '../../utils/dateUtils';
import '../Feed/FeedDetail.css';
import './DiaryDetail.css';

const DiaryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryItem | null | undefined>(undefined);
  const [me, setMe] = useState<UserProfile | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    userApi.getMe().then(setMe).catch(() => {});
    diaryApi.getOne(id).then(setDiary).catch(() => setDiary(null));
    feedApi.getComments(id).then(setComments).catch(() => {});
  }, [id]);

  const handleAddComment = async () => {
    if (!id || !commentText.trim() || submitting) return;
    setSubmitting(true);
    try {
      const newComment = await feedApi.addComment(id, commentText.trim());
      setComments(prev => [...prev, newComment]);
      setCommentText('');
    } catch {
      setToast('댓글 작성에 실패했어요');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!id) return;
    try {
      await feedApi.deleteComment(id, commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch {
      setToast('댓글 삭제에 실패했어요');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await diaryApi.delete(id);
      setConfirmOpen(false);
      setToast('일기를 삭제했어요');
      setTimeout(() => navigate('/mypage'), 600);
    } catch {
      setToast('삭제에 실패했어요');
    }
  };

  return (
    <div className="page">
      <TopBar
        showBack
        title="내 일기"
        right={diary ? <IconButton icon="more" aria-label="더보기" onClick={() => setMenuOpen(true)} /> : undefined}
      />

      {diary === undefined ? (
        <Spinner />
      ) : diary === null ? (
        <EmptyState icon={<Icon name="search" size={26} />} title="일기를 찾을 수 없어요" />
      ) : (
        <article className="fade-in">
          <div className="feed-detail__body">
            <div className="feed-detail__author">
              <Avatar src={me?.profileImageUrl ?? null} name={me?.nickname ?? ''} size={46} />
              <div>
                <p className="name">{me?.nickname}</p>
                <p className="date">{formatDateKST(diary.diaryDate)}</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
                <MoodTag mood={diary.mood} />
                <span className="text-muted">
                  <Icon name={diary.isPublic ? 'globe' : 'lock'} size={16} />
                </span>
              </div>
            </div>

            <h2 className="feed-detail__title">{diary.title}</h2>
          </div>

          {diary.imageUrls.length > 0 && (
            <div className="feed-detail__images">
              {diary.imageUrls.map((url, i) => (
                <img key={i} src={url} alt={diary.title} />
              ))}
            </div>
          )}

          <div className="feed-detail__body">
            <p className="feed-detail__content">{diary.content}</p>

            <div className="feed-detail__actions">
              <button onClick={() => { inputRef.current?.focus(); inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
                <Icon name="message" size={18} />
                이야기 남기기{comments.length > 0 && ` ${comments.length}`}
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
                      <span className="feed-detail__comment-date">{formatCommentDateKST(c.createdAt)}</span>
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

      <BottomSheet open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="diary-detail__menu">
          <button className="diary-detail__menu-item" onClick={() => navigate(`/diary/${id}/edit`)}>
            <Icon name="edit" size={18} />
            일기 수정하기
          </button>
          <button className="diary-detail__menu-item diary-detail__menu-item--danger" onClick={() => { setMenuOpen(false); setConfirmOpen(true); }}>
            <Icon name="trash" size={18} />
            일기 삭제하기
          </button>
        </div>
      </BottomSheet>

      <BottomSheet centered open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div style={{ textAlign: 'center', padding: '8px 4px' }}>
          <p style={{ fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--color-text-strong)', marginBottom: 8 }}>
            일기를 삭제할까요?
          </p>
          <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 20 }}>
            삭제한 일기는 복구할 수 없어요
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--outline btn--full" onClick={() => setConfirmOpen(false)}>취소</button>
            <button className="btn btn--danger btn--full" style={{ background: 'var(--color-danger)', color: '#fff', border: 'none' }} onClick={handleDelete}>삭제</button>
          </div>
        </div>
      </BottomSheet>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DiaryDetail;
