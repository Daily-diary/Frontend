import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, BottomSheet, EmptyState, Icon, IconButton, MoodTag, Spinner, TopBar, Toast } from '../../components/ui';
import { MY_DIARIES } from '../../api/mockData';
import type { Diary } from '../../types/models';
import '../Feed/FeedDetail.css';
import './DiaryDetail.css';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

/**
 * 내 일기 상세 조회 (GET /api/diaries/{id})
 * 수정(PUT) / 삭제(DELETE) 메뉴를 제공합니다.
 */
const DiaryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<Diary | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const found = MY_DIARIES.find((d) => d.id === id);
    const timer = setTimeout(() => setDiary(found ?? null), 200);
    return () => clearTimeout(timer);
  }, [id]);

  const handleDelete = () => {
    // TODO: 백엔드 연동 — DELETE /api/diaries/{id}
    setConfirmOpen(false);
    setToast('일기를 삭제했어요');
    setTimeout(() => navigate('/mypage'), 600);
  };

  return (
    <div className="page page--no-nav">
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
          {diary.images.length > 0 && (
            <div className="feed-detail__images">
              {diary.images.map((img) => (
                <img key={img.id} src={img.imageUrl} alt={diary.title} />
              ))}
            </div>
          )}

          <div className="feed-detail__body">
            <div className="feed-detail__author">
              <Avatar src={diary.author.profileImageUrl} name={diary.author.username} size={46} />
              <div>
                <p className="name">{diary.author.username}</p>
                <p className="date">{formatDate(diary.diaryDate)}</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
                <MoodTag mood={diary.mood} />
                <span className="text-muted" title={diary.isPublic ? '친구에게 공개' : '나만 보기'}>
                  <Icon name={diary.isPublic ? 'globe' : 'lock'} size={16} />
                </span>
              </div>
            </div>

            <h2 className="feed-detail__title">{diary.title}</h2>
            <p className="feed-detail__content">{diary.content}</p>
          </div>
        </article>
      )}

      <BottomSheet open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="diary-detail__menu">
          <button className="diary-detail__menu-item" onClick={() => navigate(`/diary/${id}/edit`)}>
            <Icon name="edit" size={18} />
            일기 수정하기
          </button>
          <button
            className="diary-detail__menu-item diary-detail__menu-item--danger"
            onClick={() => {
              setMenuOpen(false);
              setConfirmOpen(true);
            }}
          >
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
            <button
              className="btn btn--outline btn--full"
              onClick={() => setConfirmOpen(false)}
            >
              취소
            </button>
            <button className="btn btn--danger btn--full" style={{ background: 'var(--color-danger)', color: '#fff', border: 'none' }} onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>
      </BottomSheet>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DiaryDetail;
