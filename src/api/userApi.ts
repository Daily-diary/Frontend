import client from './client';

export interface UserProfile {
  id: string;
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  bio: string | null;
}

export interface UserSearchResult {
  id: string;
  nickname: string;
  profileImageUrl: string | null;
  bio?: string | null;
  friendshipStatus: 'FRIEND' | 'SENT' | 'RECEIVED' | 'NONE';
}

export const userApi = {
  getMe: () => client.get<UserProfile>('/api/members/me').then(r => r.data),
  updateProfile: (nickname: string, bio: string) => client.patch<UserProfile>('/api/members/me', { nickname, bio }).then(r => r.data),
  updateProfileImage: (profileImageUrl: string) => client.patch<UserProfile>('/api/members/me/profile-image', { profileImageUrl }).then(r => r.data),
  deleteMe: () => client.delete('/api/members/me'),
  search: (q: string) => client.get<UserSearchResult[]>(`/api/members/search?q=${encodeURIComponent(q)}`).then(r => r.data),
};
