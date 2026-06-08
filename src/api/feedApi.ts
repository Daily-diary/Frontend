import client from './client';

export interface FeedItem {
  id: string;
  title: string;
  content: string;
  mood: string;
  diaryDate: string;
  imageUrls: string[];
  createdAt: string;
  authorId: string;
  authorName: string;
  authorProfileImageUrl: string | null;
}

export const feedApi = {
  getFeed: () => client.get<FeedItem[]>('/api/feed').then(r => r.data),
  getFriendFeed: (userId: string) => client.get<FeedItem[]>(`/api/feed/users/${userId}`).then(r => r.data),
  getFeedDetail: (diaryId: string) => client.get<FeedItem>(`/api/feed/${diaryId}`).then(r => r.data),
};
