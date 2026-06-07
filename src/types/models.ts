/**
 * ERD 기준 도메인 타입 정의.
 * 백엔드 연동 전까지는 mock 데이터에서 동일한 모양으로 사용합니다.
 */

export interface User {
  id: string;
  username: string;
  email: string;
  profileImageUrl?: string | null;
  bio?: string;
}

export interface DiaryImage {
  id: string;
  diaryId: string;
  imageUrl: string;
  orderIndex: number;
}

export interface Diary {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: string;
  isPublic: boolean;
  diaryDate: string; // YYYY-MM-DD
  createdAt: string;
  images: DiaryImage[];
  // 화면 표시 편의를 위한 작성자 정보 (피드 조회 시 join 되어 내려온다고 가정)
  author: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
}

export type FriendshipStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Friendship {
  id: string;
  requesterId: string;
  receiverId: string;
  status: FriendshipStatus;
  user: Pick<User, 'id' | 'username' | 'profileImageUrl' | 'bio'>;
}
