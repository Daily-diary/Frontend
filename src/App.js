import './App.css';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await signOut(auth);
    } catch (err) {
      setError("Logout failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="login-card">
        <h1 className="title">Daily Diary</h1>
        <p className="subtitle">Sign in to continue</p>

        {user ? (
          <div className="user-box">
            <img
              className="avatar"
              src={user.photoURL || "https://placehold.co/72x72"}
              alt="Profile"
            />
            <div className="user-meta">
              <div className="user-name">{user.displayName || "User"}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <button className="btn" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        ) : (
          <button className="btn" onClick={handleLogin}>
            Continue with Google
          </button>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;
