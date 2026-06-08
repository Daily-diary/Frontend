import client from './client';

export interface DiaryItem {
  id: string;
  title: string;
  content: string;
  mood: string;
  isPublic: boolean;
  diaryDate: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DiaryRequest {
  title: string;
  content: string;
  mood: string;
  isPublic: boolean;
  diaryDate?: string;
  imageUrls?: string[];
}

export const diaryApi = {
  create: (data: DiaryRequest) => client.post<DiaryItem>('/api/diaries', data).then(r => r.data),
  getMyDiaries: () => client.get<DiaryItem[]>('/api/diaries').then(r => r.data),
  getOne: (id: string) => client.get<DiaryItem>(`/api/diaries/${id}`).then(r => r.data),
  update: (id: string, data: DiaryRequest) => client.put<DiaryItem>(`/api/diaries/${id}`, data).then(r => r.data),
  delete: (id: string) => client.delete(`/api/diaries/${id}`),
};
