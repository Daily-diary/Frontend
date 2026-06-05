# 📔 Daily Diary

> 하루의 감정과 일상을 기록하고 친구들과 공유하는 소셜 다이어리 서비스

---

# 🚀 프로젝트 실행

## 패키지 설치

```bash
npm install
```

## 개발 서버 실행

```bash
npm run dev
```

---

# 📂 프로젝트 구조

```text
src
├── api              # API 통신
├── assets           # 이미지, 아이콘 등 정적 파일
├── components       # 공통 컴포넌트
├── layouts          # 공통 레이아웃
├── pages            # 페이지 단위 컴포넌트
│   ├── Login
│   ├── Register
│   ├── MyPage
│   ├── Friend
│   ├── Diary
│   └── Feed
├── routes           # 라우팅 설정
├── styles           # 전역 스타일
├── hooks            # 커스텀 훅
├── App.jsx
└── main.jsx
```

---

# 🌱 브랜치 전략

```text
main
 └── develop
      ├── feature/login
      ├── feature/register
      ├── feature/mypage
      ├── feature/friend
      ├── feature/diary
      └── feature/feed
```

### main

- 배포 가능한 안정 버전

### develop

- 개발 통합 브랜치

### feature

- 기능 개발용 브랜치
- 모든 작업은 feature 브랜치에서 진행

예시

```bash
feature/login
feature/mypage
feature/feed
```

---

# 🔄 Git 작업 순서

## 1. develop 최신화

```bash
git checkout develop
git pull origin develop
```

## 2. 기능 브랜치 생성

```bash
git checkout -b feature/login
```

## 3. 개발 진행

코드 작성

## 4. Commit

```bash
git add .
git commit -m "feat: 로그인 기능 구현"
```

## 5. Push

```bash
git push origin feature/login
```

## 6. Pull Request 생성

```text
feature/login → develop
```

GitHub에서 PR 생성 후 리뷰 요청

---

# 📝 Commit Convention

```text
feat    : 기능 추가
fix     : 버그 수정
design  : UI 수정
refactor: 코드 개선
docs    : 문서 수정
chore   : 설정 수정
```

예시

```bash
git commit -m "feat: 친구 검색 기능 구현"
git commit -m "fix: 로그인 오류 수정"
git commit -m "design: 피드 페이지 UI 수정"
```

---

# 🤝 협업 규칙

## 반드시 지켜주세요

### 작업 전

```bash
git checkout develop
git pull origin develop
```

최신 코드 먼저 받아오기

---

### 작업 중

- 자신의 feature 브랜치에서만 작업
- 다른 사람 브랜치 수정 금지
- 공통 컴포넌트 수정 시 팀원에게 공유

---

### 작업 후

- develop 직접 push 금지
- main 직접 push 금지
- 반드시 Pull Request 생성
- Merge 전 코드 리뷰 받기

---

# 📌 담당 기능

### Auth

- 로그인
- 회원가입

### User

- 마이페이지
- 프로필 수정

### Friend

- 친구 검색
- 친구 요청 및 관리

### Diary

- 일기 작성
- 감정 선택
- 이미지 업로드

### Feed

- 친구 피드 조회

---

# ⚠️ 자주 하는 실수

❌ develop에서 바로 작업하기

❌ main에 직접 push하기

❌ pull 안 받고 작업 시작하기

❌ 기능 여러 개를 한 브랜치에서 작업하기

❌ 커밋 메시지를 "수정", "완성", "ㅇㅇ"로 작성하기

---

### 좋은 예시

```bash
feat: 일기 작성 기능 구현
fix: 친구 요청 오류 수정
design: 로그인 페이지 UI 개선 
```

Happy Coding 🚀