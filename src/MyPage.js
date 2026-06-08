import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import {
  getMyProfile,
  updateMyProfile,
  updateMyProfileImage,
} from "./api";
import "./MyPage.css";

function MyPage({ onNavigate }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");

  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  useEffect(() => {
    getMyProfile()
      .then((data) => {
        setProfile(data);
        setNicknameInput(data.nickname || "");
        setImageUrlInput(data.profileImageUrl || "");
      })
      .catch(() => setError("프로필을 불러오는데 실패했습니다."))
      .finally(() => setLoading(false));
  }, []);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setError("");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleNicknameSave = async () => {
    try {
      const updated = await updateMyProfile(nicknameInput);
      setProfile(updated);
      setIsEditingNickname(false);
      showSuccess("닉네임이 변경되었습니다.");
    } catch {
      setError("닉네임 변경에 실패했습니다.");
    }
  };

  const handleNicknameCancel = () => {
    setNicknameInput(profile.nickname || "");
    setIsEditingNickname(false);
  };

  const handleImageSave = async () => {
    try {
      const updated = await updateMyProfileImage(imageUrlInput);
      setProfile(updated);
      setIsEditingImage(false);
      showSuccess("프로필 이미지가 변경되었습니다.");
    } catch {
      setError("프로필 이미지 변경에 실패했습니다.");
    }
  };

  const handleImageCancel = () => {
    setImageUrlInput(profile.profileImageUrl || "");
    setIsEditingImage(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="mypage-card">
          <p className="loading-text">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="App">
        <div className="mypage-card">
          <p className="loading-text">{error || "프로필을 불러오는데 실패했습니다."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="mypage-card">
        <h1 className="title">마이페이지</h1>

        {/* 프로필 이미지 */}
        <div className="avatar-section">
          <img
            className="avatar-lg"
            src={profile.profileImageUrl || "https://placehold.co/96x96"}
            alt="프로필 이미지"
          />
          {!isEditingImage ? (
            <button
              className="btn-link"
              onClick={() => setIsEditingImage(true)}
            >
              이미지 URL 변경
            </button>
          ) : (
            <div className="edit-section">
              <input
                className="input"
                type="url"
                placeholder="이미지 URL을 입력하세요"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
              />
              <div className="btn-row">
                <button className="btn btn-sm" onClick={handleImageSave}>
                  저장
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleImageCancel}
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 프로필 정보 */}
        <div className="profile-info">
          {/* 닉네임 */}
          <div className="info-row">
            <span className="info-label">닉네임</span>
            {isEditingNickname ? (
              <div className="edit-section">
                <input
                  className="input"
                  type="text"
                  maxLength={30}
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                />
                <div className="btn-row">
                  <button className="btn btn-sm" onClick={handleNicknameSave}>
                    저장
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={handleNicknameCancel}
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-value-row">
                <span className="info-value">{profile.nickname}</span>
                <button
                  className="btn-link"
                  onClick={() => setIsEditingNickname(true)}
                >
                  수정
                </button>
              </div>
            )}
          </div>

          {/* 이메일 */}
          <div className="info-row">
            <span className="info-label">이메일</span>
            <span className="info-value">{profile.email}</span>
          </div>

          {/* 가입일 */}
          <div className="info-row">
            <span className="info-label">가입일</span>
            <span className="info-value">
              {new Date(profile.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>

        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}

        <button className="btn" onClick={() => onNavigate("friends")}>
          친구 관리
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MyPage;
