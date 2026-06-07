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
        nickname: "석현",
        profileImage: "https://via.placeholder.com/40",
        mood: "뿌듯함",
        content: "세팅 ...",
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
              <img src={diary.profileImage} alt="profile" className="profile-img" />
              <div className="header-info">
                <span className="nickname">{diary.nickname}</span>
                <span className="date">{diary.date}</span>
              </div>
              <span className="mood">{diary.mood}</span>
            </div>
            
            <div className="feed-card-images">
              {diary.images.map((img, idx) => (
                <img key={idx} src={img} alt="diary" className="diary-img" />
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