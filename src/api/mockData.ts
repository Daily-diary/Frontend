import type { Diary, Friendship, User } from '../types/models';

/**
 * 백엔드 API 연동 전 화면 작업을 위한 mock 데이터.
 * 실제 연동 시 이 파일을 axios 호출로 교체하면 됩니다. (api 명세서 참고)
 */

export const ME: User = {
  id: 'u-me',
  username: '석현',
  email: 'a010naver@gmail.com',
  profileImageUrl: null,
  bio: '오늘 하루도 잔잔하게 기록 중 🌙',
};

export const MOCK_USERS: User[] = [
  { id: 'u-1', username: '상민', profileImageUrl: null, email: 'sangmin@example.com', bio: '커피와 코드 ☕️' },
  { id: 'u-2', username: '성우', profileImageUrl: null, email: 'sungwoo@example.com', bio: '오늘도 달리는 중 🏃' },
  { id: 'u-3', username: '성민', profileImageUrl: null, email: 'sungmin@example.com', bio: '밤 산책 좋아함 🌃' },
  { id: 'u-4', username: '하늘', profileImageUrl: null, email: 'haneul@example.com', bio: '그림 그리는 중 🎨' },
];

export const MOCK_DIARIES: Diary[] = [
  {
    id: 'd-1',
    userId: 'u-1',
    title: '오랜만의 햇살',
    content: '오늘은 날씨가 너무 좋아서 점심에 산책을 했다. 작은 꽃집에서 튤립을 샀는데 방이 환해진 기분 🌷',
    mood: 'happy',
    isPublic: true,
    diaryDate: '2026-06-07',
    createdAt: '2026-06-07T10:20:00',
    images: [
      { id: 'i-1', diaryId: 'd-1', imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=60', orderIndex: 0 },
      { id: 'i-2', diaryId: 'd-1', imageUrl: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800&q=60', orderIndex: 1 },
    ],
    author: { id: 'u-1', username: '상민', profileImageUrl: null },
  },
  {
    id: 'd-2',
    userId: 'u-2',
    title: '비 오는 저녁',
    content: '퇴근길에 비를 쫄딱 맞았지만, 집에 와서 마신 따뜻한 차 한 잔이 위로가 됐다.',
    mood: 'calm',
    isPublic: true,
    diaryDate: '2026-06-06',
    createdAt: '2026-06-06T21:40:00',
    images: [
      { id: 'i-3', diaryId: 'd-2', imageUrl: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?w=800&q=60', orderIndex: 0 },
    ],
    author: { id: 'u-2', username: '성우', profileImageUrl: null },
  },
  {
    id: 'd-3',
    userId: 'u-3',
    title: '밤 산책 일기',
    content: '야근 후 동네 한 바퀴. 노래 하나 듣고 오니 기분이 한결 가벼워졌다 🎧',
    mood: 'tired',
    isPublic: true,
    diaryDate: '2026-06-05',
    createdAt: '2026-06-05T23:05:00',
    images: [],
    author: { id: 'u-3', username: '성민', profileImageUrl: null },
  },
  {
    id: 'd-4',
    userId: 'u-4',
    title: '작업실 정리한 날',
    content: '미뤄뒀던 작업실 정리를 끝냈다. 빈 책상을 보니 마음까지 깨끗해진 느낌!',
    mood: 'love',
    isPublic: true,
    diaryDate: '2026-06-04',
    createdAt: '2026-06-04T18:00:00',
    images: [
      { id: 'i-4', diaryId: 'd-4', imageUrl: 'https://images.unsplash.com/photo-1505855265463-e60ee64d3a07?w=800&q=60', orderIndex: 0 },
      { id: 'i-5', diaryId: 'd-4', imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=60', orderIndex: 1 },
    ],
    author: { id: 'u-4', username: '하늘', profileImageUrl: null },
  },
];

export const MY_DIARIES: Diary[] = [
  {
    id: 'd-me-1',
    userId: ME.id,
    title: '세팅 끝!',
    content: '드디어 프로젝트 초기 세팅을 끝냈다. 뿌듯한 하루 ✨',
    mood: 'happy',
    isPublic: true,
    diaryDate: '2026-06-05',
    createdAt: '2026-06-05T20:00:00',
    images: [{ id: 'i-me-1', diaryId: 'd-me-1', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=60', orderIndex: 0 }],
    author: { id: ME.id, username: ME.username, profileImageUrl: ME.profileImageUrl },
  },
  {
    id: 'd-me-2',
    userId: ME.id,
    title: '카페 투어',
    content: '동네 새 카페 발견! 라벤더 라떼가 인생 음료가 될 것 같다 🌿',
    mood: 'love',
    isPublic: false,
    diaryDate: '2026-06-03',
    createdAt: '2026-06-03T15:00:00',
    images: [],
    author: { id: ME.id, username: ME.username, profileImageUrl: ME.profileImageUrl },
  },
  {
    id: 'd-me-3',
    userId: ME.id,
    title: '조용한 일요일',
    content: '아무 약속 없이 책 한 권 다 읽었다. 가끔은 이런 하루도 필요해.',
    mood: 'calm',
    isPublic: true,
    diaryDate: '2026-06-01',
    createdAt: '2026-06-01T11:00:00',
    images: [],
    author: { id: ME.id, username: ME.username, profileImageUrl: ME.profileImageUrl },
  },
];

export const MOCK_FRIENDSHIPS: Friendship[] = [
  { id: 'f-1', requesterId: ME.id, receiverId: 'u-1', status: 'ACCEPTED', user: MOCK_USERS[0] },
  { id: 'f-2', requesterId: ME.id, receiverId: 'u-2', status: 'ACCEPTED', user: MOCK_USERS[1] },
  { id: 'f-3', requesterId: 'u-3', receiverId: ME.id, status: 'ACCEPTED', user: MOCK_USERS[2] },
];

export const MOCK_FRIEND_REQUESTS: Friendship[] = [
  { id: 'f-4', requesterId: 'u-4', receiverId: ME.id, status: 'PENDING', user: MOCK_USERS[3] },
];
