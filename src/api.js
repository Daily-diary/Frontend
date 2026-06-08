import { auth } from "./firebase";

const API_BASE = "http://localhost:8080";

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
