import { useEffect, useState } from 'react';
import { Avatar, Button, Chip, EmptyState, Icon, TopBar, Toast, Spinner } from '../../components/ui';
import { friendApi, type FriendItem, type FriendRequest } from '../../api/friendApi';
import { userApi, type UserSearchResult } from '../../api/userApi';
import './Friend.css';

type Tab = 'friends' | 'requests' | 'search';

const TABS: { key: Tab; label: string }[] = [
  { key: 'friends', label: '친구 목록' },
  { key: 'requests', label: '받은 요청' },
  { key: 'search', label: '친구 찾기' },
];

const Friend = () => {
  const [tab, setTab] = useState<Tab>('friends');
  const [friends, setFriends] = useState<FriendItem[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      friendApi.getFriends(),
      friendApi.getReceivedRequests(),
    ]).then(([f, r]) => {
      setFriends(f);
      setRequests(r);
    }).finally(() => setLoading(false));
  }, []);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const results = await userApi.search(q);
      setSearchResults(results);
    } finally {
      setSearching(false);
    }
  };

  const handleAccept = async (req: FriendRequest) => {
    await friendApi.accept(req.friendshipId);
    setRequests((prev) => prev.filter((r) => r.friendshipId !== req.friendshipId));
    const updated = await friendApi.getFriends();
    setFriends(updated);
    setToast(`${req.nickname}님과 친구가 되었어요 🎉`);
  };

  const handleReject = async (req: FriendRequest) => {
    await friendApi.reject(req.friendshipId);
    setRequests((prev) => prev.filter((r) => r.friendshipId !== req.friendshipId));
    setToast(`${req.nickname}님의 요청을 거절했어요`);
  };

  const handleRemoveFriend = async (f: FriendItem) => {
    await friendApi.remove(f.userId);
    setFriends((prev) => prev.filter((x) => x.userId !== f.userId));
    setToast(`${f.nickname}님을 친구에서 삭제했어요`);
  };

  const handleSendRequest = async (user: UserSearchResult) => {
    await friendApi.sendRequest(user.id);
    setSearchResults((prev) => prev.map((u) => u.id === user.id ? { ...u, friendshipStatus: 'SENT' as const } : u));
    setToast(`${user.nickname}님에게 친구 요청을 보냈어요`);
  };

  if (loading) return <div className="page"><Spinner /></div>;

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
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}

      {tab === 'friends' && (
        friends.length === 0 ? (
          <EmptyState icon={<Icon name="users" size={26} />} title="아직 친구가 없어요" description="친구를 찾아 함께 일기를 나눠보세요" />
        ) : (
          <ul className="friend-list">
            {friends.map((f) => (
              <li key={f.userId} className="friend-row fade-in">
                <Avatar src={f.profileImageUrl} name={f.nickname} size={48} />
                <div className="friend-row__info">
                  <p className="friend-row__name">{f.nickname}</p>
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
              <li key={r.friendshipId} className="friend-row fade-in">
                <Avatar src={r.profileImageUrl} name={r.nickname} size={48} />
                <div className="friend-row__info">
                  <p className="friend-row__name">{r.nickname}</p>
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
          <EmptyState icon={<Icon name="search" size={26} />} title="닉네임을 입력해보세요" />
        ) : searching ? (
          <Spinner />
        ) : searchResults.length === 0 ? (
          <EmptyState icon="🔎" title="검색 결과가 없어요" />
        ) : (
          <ul className="friend-list">
            {searchResults.map((u) => (
              <li key={u.id} className="friend-row fade-in">
                <Avatar src={u.profileImageUrl} name={u.nickname} size={48} />
                <div className="friend-row__info">
                  <p className="friend-row__name">{u.nickname}</p>
                </div>
                <div className="friend-row__actions">
                  {u.friendshipStatus === 'FRIEND' ? (
                    <Button size="sm" variant="ghost" disabled>친구</Button>
                  ) : u.friendshipStatus === 'SENT' ? (
                    <Button size="sm" variant="ghost" disabled>요청됨</Button>
                  ) : u.friendshipStatus === 'RECEIVED' ? (
                    <Button size="sm" variant="primary" onClick={() => handleAccept({ friendshipId: u.id, userId: u.id, nickname: u.nickname, profileImageUrl: u.profileImageUrl })}>수락</Button>
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
