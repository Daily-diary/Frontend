import './App.css';
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";
import MyPage from "./MyPage";
import FriendPage from "./FriendPage";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [page, setPage] = useState("mypage"); // "mypage" | "friends"
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (!currentUser) setPage("mypage");
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    }
  };

  if (authLoading) {
    return (
      <div className="App">
        <div className="login-card">
          <p style={{ color: "#6b7280" }}>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (user) {
    if (page === "friends") {
      return <FriendPage onBack={() => setPage("mypage")} />;
    }
    return <MyPage onNavigate={setPage} />;
  }

  return (
    <div className="App">
      <div className="login-card">
        <h1 className="title">Daily Diary</h1>
        <p className="subtitle">Sign in to continue</p>
        <button className="btn" onClick={handleLogin}>
          Continue with Google
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;
