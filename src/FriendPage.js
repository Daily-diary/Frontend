import { useEffect, useState, useCallback } from "react";
import {
  getFriends,
  getReceivedRequests,
  getSentRequests,
  searchMembers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  removeFriend,
} from "./api";
import "./FriendPage.css";

const TABS = [
  { key: "friends", label: "친구 목록" },
  { key: "received", label: "받은 요청" },
  { key: "sent", label: "보낸 요청" },
  { key: "search", label: "회원 검색" },
];

function Avatar({ src, nickname }) {
  return (
    <img
      className="fp-avatar"
      src={src || "https://placehold.co/40x40"}
      alt={nickname}
    />
  );
}

function FriendPage({ onBack }) {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const loadTab = useCallback(async (tab) => {
    setLoading(true);
    try {
      if (tab === "friends") setFriends(await getFriends());
      else if (tab === "received") setReceived(await getReceivedRequests());
      else if (tab === "sent") setSent(await getSentRequests());
    } catch {
      showToast("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== "search") loadTab(activeTab);
  }, [activeTab, loadTab]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      setSearchResults(await searchMembers(searchQuery));
    } catch {
      showToast("검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (memberId) => {
    try {
      await sendFriendRequest(memberId);
      showToast("친구 요청을 보냈습니다.");
      setSearchResults((prev) =>
        prev.map((m) =>
          m.memberId === memberId ? { ...m, friendshipStatus: "SENT" } : m
        )
      );
    } catch (e) {
      showToast(parseError(e));
    }
  };

  const handleAccept = async (friendshipId) => {
    try {
      await acceptFriendRequest(friendshipId);
      showToast("친구 요청을 수락했습니다.");
      setReceived((prev) => prev.filter((r) => r.friendshipId !== friendshipId));
    } catch (e) {
      showToast(parseError(e));
    }
  };

  const handleReject = async (friendshipId) => {
    try {
      await rejectFriendRequest(friendshipId);
      showToast("친구 요청을 거절했습니다.");
      setReceived((prev) => prev.filter((r) => r.friendshipId !== friendshipId));
    } catch (e) {
      showToast(parseError(e));
    }
  };

  const handleCancel = async (friendshipId) => {
    try {
      await cancelFriendRequest(friendshipId);
      showToast("친구 요청을 취소했습니다.");
      setSent((prev) => prev.filter((r) => r.friendshipId !== friendshipId));
    } catch (e) {
      showToast(parseError(e));
    }
  };

  const handleRemoveFriend = async (memberId, friendshipId) => {
    if (!window.confirm("친구를 삭제하시겠습니까?")) return;
    try {
      await removeFriend(memberId);
      showToast("친구를 삭제했습니다.");
      setFriends((prev) => prev.filter((f) => f.friendshipId !== friendshipId));
    } catch (e) {
      showToast(parseError(e));
    }
  };

  return (
    <div className="App">
      <div className="fp-card">
        {/* 헤더 */}
        <div className="fp-header">
          <button className="fp-back-btn" onClick={onBack}>
            ← 뒤로
          </button>
          <h1 className="title">친구</h1>
        </div>

        {/* 탭 */}
        <div className="fp-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`fp-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
              {t.key === "received" && received.length > 0 && (
                <span className="fp-badge">{received.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="fp-content">
          {loading && <p className="fp-loading">불러오는 중...</p>}

          {/* 친구 목록 */}
          {!loading && activeTab === "friends" && (
            <>
              {friends.length === 0 ? (
                <p className="fp-empty">아직 친구가 없습니다.</p>
              ) : (
                <ul className="fp-list">
                  {friends.map((f) => (
                    <li key={f.friendshipId} className="fp-item">
                      <Avatar src={f.profileImageUrl} nickname={f.nickname} />
                      <div className="fp-info">
                        <span className="fp-name">{f.nickname}</span>
                        <span className="fp-email">{f.email}</span>
                      </div>
                      <button
                        className="fp-btn fp-btn-danger"
                        onClick={() => handleRemoveFriend(f.memberId, f.friendshipId)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* 받은 요청 */}
          {!loading && activeTab === "received" && (
            <>
              {received.length === 0 ? (
                <p className="fp-empty">받은 친구 요청이 없습니다.</p>
              ) : (
                <ul className="fp-list">
                  {received.map((r) => (
                    <li key={r.friendshipId} className="fp-item">
                      <Avatar src={r.profileImageUrl} nickname={r.nickname} />
                      <div className="fp-info">
                        <span className="fp-name">{r.nickname}</span>
                        <span className="fp-email">{r.email}</span>
                      </div>
                      <div className="fp-actions">
                        <button
                          className="fp-btn fp-btn-primary"
                          onClick={() => handleAccept(r.friendshipId)}
                        >
                          수락
                        </button>
                        <button
                          className="fp-btn fp-btn-secondary"
                          onClick={() => handleReject(r.friendshipId)}
                        >
                          거절
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* 보낸 요청 */}
          {!loading && activeTab === "sent" && (
            <>
              {sent.length === 0 ? (
                <p className="fp-empty">보낸 친구 요청이 없습니다.</p>
              ) : (
                <ul className="fp-list">
                  {sent.map((r) => (
                    <li key={r.friendshipId} className="fp-item">
                      <Avatar src={r.profileImageUrl} nickname={r.nickname} />
                      <div className="fp-info">
                        <span className="fp-name">{r.nickname}</span>
                        <span className="fp-email">{r.email}</span>
                      </div>
                      <button
                        className="fp-btn fp-btn-secondary"
                        onClick={() => handleCancel(r.friendshipId)}
                      >
                        취소
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* 회원 검색 */}
          {activeTab === "search" && (
            <>
              <form className="fp-search-form" onSubmit={handleSearch}>
                <input
                  className="fp-search-input"
                  type="text"
                  placeholder="닉네임 또는 이메일로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="fp-btn fp-btn-primary" type="submit">
                  검색
                </button>
              </form>

              {!loading && searchResults.length > 0 && (
                <ul className="fp-list">
                  {searchResults.map((m) => (
                    <li key={m.memberId} className="fp-item">
                      <Avatar src={m.profileImageUrl} nickname={m.nickname} />
                      <div className="fp-info">
                        <span className="fp-name">{m.nickname}</span>
                        <span className="fp-email">{m.email}</span>
                      </div>
                      <SearchAction
                        status={m.friendshipStatus}
                        onSend={() => handleSendRequest(m.memberId)}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {!loading && searchQuery && searchResults.length === 0 && (
                <p className="fp-empty">검색 결과가 없습니다.</p>
              )}
            </>
          )}
        </div>

        {toast && <div className="fp-toast">{toast}</div>}
      </div>
    </div>
  );
}

function SearchAction({ status, onSend }) {
  if (status === "FRIEND") return <span className="fp-status-tag friend">친구</span>;
  if (status === "SENT") return <span className="fp-status-tag sent">요청 중</span>;
  if (status === "RECEIVED") return <span className="fp-status-tag received">받은 요청</span>;
  return (
    <button className="fp-btn fp-btn-primary" onClick={onSend}>
      친구 요청
    </button>
  );
}

function parseError(e) {
  try {
    const body = JSON.parse(e.message);
    return body.message || "오류가 발생했습니다.";
  } catch {
    return e.message || "오류가 발생했습니다.";
  }
}

export default FriendPage;
