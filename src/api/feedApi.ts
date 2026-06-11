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
  likeCount: number;
  liked: boolean;
  commentCount: number;
}

export interface CommentItem {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorProfileImageUrl: string | null;
  createdAt: string;
}

export const feedApi = {
  getFeed: () => client.get<FeedItem[]>('/api/feed').then(r => r.data),
  getFriendFeed: (userId: string) => client.get<FeedItem[]>(`/api/feed/users/${userId}`).then(r => r.data),
  getFeedDetail: (diaryId: string) => client.get<FeedItem>(`/api/feed/${diaryId}`).then(r => r.data),
  toggleLike: (diaryId: string) => client.post<{ liked: boolean }>(`/api/feed/${diaryId}/like`).then(r => r.data),
  getComments: (diaryId: string) => client.get<CommentItem[]>(`/api/feed/${diaryId}/comments`).then(r => r.data),
  addComment: (diaryId: string, content: string) =>
    client.post<CommentItem>(`/api/feed/${diaryId}/comments`, { content }).then(r => r.data),
  deleteComment: (diaryId: string, commentId: string) =>
    client.delete(`/api/feed/${diaryId}/comments/${commentId}`),
};
