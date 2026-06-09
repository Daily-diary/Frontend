import client from './client';

export interface FriendItem {
  friendshipId: string;
  userId: string;
  nickname: string;
  profileImageUrl: string | null;
  bio: string | null;
}

export interface FriendRequest {
  friendshipId: string;
  userId: string;
  nickname: string;
  profileImageUrl: string | null;
}

export const friendApi = {
  getFriends: () => client.get<FriendItem[]>('/api/friendships').then(r => r.data),
  getReceivedRequests: () => client.get<FriendRequest[]>('/api/friendships/requests/received').then(r => r.data),
  getSentRequests: () => client.get<FriendRequest[]>('/api/friendships/requests/sent').then(r => r.data),
  sendRequest: (memberId: string) => client.post(`/api/friendships/${memberId}`),
  accept: (friendshipId: string) => client.patch(`/api/friendships/${friendshipId}/accept`),
  reject: (friendshipId: string) => client.patch(`/api/friendships/${friendshipId}/reject`),
  cancel: (friendshipId: string) => client.delete(`/api/friendships/requests/${friendshipId}`),
  remove: (memberId: string) => client.delete(`/api/friendships/${memberId}`),
};
