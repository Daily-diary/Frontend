import { useState, useEffect } from 'react';
import '../styles/Home.css';

interface Diary {
  id: number;
  nickname: string;
  profileImage: string;
  mood: string;
  content: string;
  images: string[];
  date: string;
}

const Home = () => {
  const [feed, setFeed] = useState<Diary[]>([]);

  useEffect(() => {
    const mockData: Diary[] = [
      {
        id: 1,
        nickname: "Sunyjun1",
        profileImage: "https://via.placeholder.com/40",
        mood: "뿌듯함",
        content: "드디어 프론트엔드 라우터 세팅 완료!",
        images: [
          "https://via.placeholder.com/400x300",
          "https://via.placeholder.com/400x300"
        ],
        date: "2026-06-05"
      }
    ];
    setFeed(mockData);
  }, []);

  return (
    <div className="feed-container">
      <header className="feed-header">
        <h1>Daily Diary 피드</h1>
      </header>
      
      <main className="feed-list">
        {feed.map((diary) => (
          <article key={diary.id} className="feed-card">
            <div className="feed-card-header">
              <img
                src={diary.profileImage}
                alt=""
                className="profile-img"
                onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
              />
              <div className="header-info">
                <span className="nickname">{diary.nickname}</span>
                <span className="date">{diary.date}</span>
              </div>
              <span className="mood">{diary.mood}</span>
            </div>

            <div className="feed-card-images">
              {diary.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="diary-img"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'linear-gradient(135deg, #ffdde4, #ffc5d0)';
                    el.removeAttribute('src');
                  }}
                />
              ))}
            </div>
            
            <div className="feed-card-content">
              <p>{diary.content}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Home;