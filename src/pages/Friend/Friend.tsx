import { useMemo, useState } from 'react';
import { Avatar, Button, Chip, EmptyState, Icon, TopBar, Toast } from '../../components/ui';
import { MOCK_FRIENDSHIPS, MOCK_FRIEND_REQUESTS, MOCK_USERS, ME } from '../../api/mockData';
import type { Friendship, User } from '../../types/models';
import './Friend.css';

type Tab = 'friends' | 'requests' | 'search';

const TABS: { key: Tab; label: string }[] = [
  { key: 'friends', label: '친구 목록' },
  { key: 'requests', label: '받은 요청' },
  { key: 'search', label: '친구 찾기' },
];

/**
 * 친구 페이지 — 목록 / 받은 요청 / 검색 탭으로 구성.
 * GET /api/friends, GET /api/friends/requests, GET /api/users/search?q=
 * PATCH /api/friends/{id}/accept | reject, POST /api/friends/request, DELETE /api/friends/{id}
 */
const Friend = () => {
  const [tab, setTab] = useState<Tab>('friends');
  const [friends, setFriends] = useState<Friendship[]>(MOCK_FRIENDSHIPS);
  const [requests, setRequests] = useState<Friendship[]>(MOCK_FRIEND_REQUESTS);
  const [query, setQuery] = useState('');
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const friendIds = new Set(friends.map((f) => f.user.id));
    return MOCK_USERS.filter(
      (u) => u.username.includes(query.trim()) && u.id !== ME.id && !friendIds.has(u.id)
    );
  }, [query, friends]);

  const handleAccept = (req: Friendship) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setFriends((prev) => [...prev, { ...req, status: 'ACCEPTED' }]);
    setToast(`${req.user.username}님과 친구가 되었어요 🎉`);
  };

  const handleReject = (req: Friendship) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setToast(`${req.user.username}님의 요청을 거절했어요`);
  };

  const handleRemoveFriend = (friendship: Friendship) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendship.id));
    setToast(`${friendship.user.username}님을 친구에서 삭제했어요`);
  };

  const handleSendRequest = (user: User) => {
    setSentRequests((prev) => new Set(prev).add(user.id));
    setToast(`${user.username}님에게 친구 요청을 보냈어요`);
  };

  return (
    <div className="page">
      <TopBar title="친구" />

      <div className="friend-tabs">
        {TABS.map((t) => (
          <Chip key={t.key} active={tab === t.key} onClick={() => setTab(t.key)}>
            {t.label}
            {t.key === 'requests' && requests.length > 0 && ` (${requests.length})`}
          </Chip>
        ))}
      </div>

      {tab === 'search' && (
        <div className="friend-search">
          <Icon name="search" size={18} />
          <input
            placeholder="닉네임으로 친구를 찾아보세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      {tab === 'friends' && (
        friends.length === 0 ? (
          <EmptyState icon={<Icon name="users" size={26} />} title="아직 친구가 없어요" description="친구를 찾아 함께 일기를 나눠보세요" />
        ) : (
          <ul className="friend-list">
            {friends.map((f) => (
              <li key={f.id} className="friend-row fade-in">
                <Avatar src={f.user.profileImageUrl} name={f.user.username} size={48} />
                <div className="friend-row__info">
                  <p className="friend-row__name">{f.user.username}</p>
                  <p className="friend-row__bio">{f.user.bio}</p>
                </div>
                <div className="friend-row__actions">
                  <Button size="sm" variant="ghost" onClick={() => handleRemoveFriend(f)}>삭제</Button>
                </div>
              </li>
            ))}
          </ul>
        )
      )}

      {tab === 'requests' && (
        requests.length === 0 ? (
          <EmptyState icon={<Icon name="bell" size={26} />} title="받은 친구 요청이 없어요" />
        ) : (
          <ul className="friend-list">
            {requests.map((r) => (
              <li key={r.id} className="friend-row fade-in">
                <Avatar src={r.user.profileImageUrl} name={r.user.username} size={48} />
                <div className="friend-row__info">
                  <p className="friend-row__name">{r.user.username}</p>
                  <p className="friend-row__bio">친구 요청을 보냈어요</p>
                </div>
                <div className="friend-row__actions">
                  <Button size="sm" variant="primary" onClick={() => handleAccept(r)}>수락</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleReject(r)}>거절</Button>
                </div>
              </li>
            ))}
          </ul>
        )
      )}

      {tab === 'search' && (
        query.trim() === '' ? (
          <EmptyState icon={<Icon name="search" size={26} />} title="닉네임을 입력해보세요" description="새로운 친구를 찾아 일기를 함께 나눌 수 있어요" />
        ) : searchResults.length === 0 ? (
          <EmptyState icon="🔎" title="검색 결과가 없어요" />
        ) : (
          <ul className="friend-list">
            {searchResults.map((u) => (
              <li key={u.id} className="friend-row fade-in">
                <Avatar src={u.profileImageUrl} name={u.username} size={48} />
                <div className="friend-row__info">
                  <p className="friend-row__name">{u.username}</p>
                  <p className="friend-row__bio">{u.bio}</p>
                </div>
                <div className="friend-row__actions">
                  {sentRequests.has(u.id) ? (
                    <Button size="sm" variant="ghost" disabled>요청됨</Button>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => handleSendRequest(u)}>친구 요청</Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Friend;
