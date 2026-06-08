import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Icon, TextField, Toggle, TopBar, Toast } from '../../components/ui';
import { MOODS } from '../../constants/moods';
import { MY_DIARIES } from '../../api/mockData';
import './DiaryWrite.css';

interface ImageDraft {
  id: string;
  url: string;
}

const todayLabel = () => {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

/**
 * 일기 작성 / 수정 화면.
 * - 작성: POST /api/diaries
 * - 수정: PUT /api/diaries/{id}  (id 파라미터가 있으면 수정 모드)
 */
const DiaryWrite = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(MOODS[0].key);
  const [isPublic, setIsPublic] = useState(true);
  const [images, setImages] = useState<ImageDraft[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    const existing = MY_DIARIES.find((d) => d.id === id);
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content);
      setMood(existing.mood);
      setIsPublic(existing.isPublic);
      setImages(existing.images.map((img) => ({ id: img.id, url: img.imageUrl })));
    }
  }, [id, isEdit]);

  const handleAddImages = (files: FileList | null) => {
    if (!files) return;
    const drafts = Array.from(files)
      .slice(0, 5 - images.length)
      .map((file) => ({ id: `${file.name}-${Date.now()}-${Math.random()}`, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...drafts]);
  };

  const handleRemoveImage = (imgId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imgId));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setToast('제목과 내용을 입력해주세요');
      return;
    }
    // TODO: 백엔드 연동 — POST /api/diaries 또는 PUT /api/diaries/{id}
    setToast(isEdit ? '일기를 수정했어요' : '오늘의 일기를 저장했어요 🌙');
    setTimeout(() => navigate(isEdit ? `/diary/${id}` : '/'), 700);
  };

  return (
    <div className="page page--no-nav">
      <TopBar
        showBack
        title={isEdit ? '일기 수정' : '일기 쓰기'}
        right={
          <Button size="sm" onClick={handleSubmit}>
            {isEdit ? '수정 완료' : '저장'}
          </Button>
        }
      />

      <div className="write-form">
        <div>
          <p className="write-section-label">오늘의 감정</p>
          <div className="mood-picker">
            {MOODS.map((m) => (
              <button
                key={m.key}
                type="button"
                className={`mood-option ${mood === m.key ? 'mood-option--active' : ''}`}
                style={mood === m.key ? { background: m.bgVar, color: m.fgVar } : undefined}
                onClick={() => setMood(m.key)}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <TextField label="날짜" value={todayLabel()} disabled />

        <TextField
          label="제목"
          placeholder="오늘 하루를 한 줄로 표현한다면?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="내용"
          placeholder="오늘 있었던 일, 느낀 감정을 자유롭게 적어보세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
        />

        <div>
          <p className="write-section-label">사진 ({images.length}/5)</p>
          <div className="image-uploader">
            {images.length < 5 && (
              <button type="button" className="image-uploader__add" onClick={() => fileInputRef.current?.click()}>
                <Icon name="camera" size={22} />
                <span>사진 추가</span>
              </button>
            )}
            {images.map((img) => (
              <div key={img.id} className="image-uploader__thumb">
                <img src={img.url} alt="diary" />
                <button type="button" className="image-uploader__remove" onClick={() => handleRemoveImage(img.id)}>
                  <Icon name="close" size={13} color="#fff" />
                </button>
              </div>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleAddImages(e.target.files)}
          />
        </div>

        <div className="write-toggle-row">
          <div>
            <p className="write-toggle-row__label">
              <Icon name={isPublic ? 'globe' : 'lock'} size={17} />
              {isPublic ? '친구에게 공개' : '나만 보기'}
            </p>
            <p className="write-toggle-row__desc">
              {isPublic ? '친구들의 피드에서 이 일기를 볼 수 있어요' : '나만 볼 수 있는 비공개 일기예요'}
            </p>
          </div>
          <Toggle checked={isPublic} onChange={setIsPublic} ariaLabel="공개 여부" />
        </div>

        <Button fullWidth onClick={handleSubmit}>
          {isEdit ? '수정 완료' : '일기 저장하기'}
        </Button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DiaryWrite;
