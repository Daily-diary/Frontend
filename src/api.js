import { auth } from "./firebase";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

async function apiCall(path, options = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export function getMyProfile() {
  return apiCall("/api/members/me");
}

export function updateMyProfile(nickname) {
  return apiCall("/api/members/me", {
    method: "PATCH",
    body: JSON.stringify({ nickname }),
  });
}

export function updateMyProfileImage(profileImageUrl) {
  return apiCall("/api/members/me/profile-image", {
    method: "PATCH",
    body: JSON.stringify({ profileImageUrl }),
  });
}

export function deleteMyAccount() {
  return apiCall("/api/members/me", { method: "DELETE" });
}

// 회원 검색
export function searchMembers(q) {
  return apiCall(`/api/members/search?q=${encodeURIComponent(q)}`);
}

// 친구 목록 조회
export function getFriends() {
  return apiCall("/api/friendships");
}

// 받은 친구 요청 목록
export function getReceivedRequests() {
  return apiCall("/api/friendships/requests/received");
}

// 보낸 친구 요청 목록
export function getSentRequests() {
  return apiCall("/api/friendships/requests/sent");
}

// 친구 요청 보내기
export function sendFriendRequest(memberId) {
  return apiCall(`/api/friendships/${memberId}`, { method: "POST" });
}

// 친구 요청 수락
export function acceptFriendRequest(friendshipId) {
  return apiCall(`/api/friendships/${friendshipId}/accept`, { method: "PATCH" });
}

// 친구 요청 거절
export function rejectFriendRequest(friendshipId) {
  return apiCall(`/api/friendships/${friendshipId}/reject`, { method: "PATCH" });
}

// 친구 요청 취소 (내가 보낸 요청)
export function cancelFriendRequest(friendshipId) {
  return apiCall(`/api/friendships/requests/${friendshipId}`, { method: "DELETE" });
}

// 친구 삭제
export function removeFriend(memberId) {
  return apiCall(`/api/friendships/${memberId}`, { method: "DELETE" });
}
