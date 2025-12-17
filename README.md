# Task Manager

Firebase와 Next.js를 활용한 개인 작업 관리 애플리케이션

## 📌 프로젝트 개요

- **제작 기간**: 10시간
- **배포 방식**: Vercel을 통한 자동 배포
- **배포 URL**: [`dadaeun7-task-manager.vercel.app`](https://dadaeun7-task-manager.vercel.app/)

## 🛠 기술 스택

### Frontend
- **Next.js 15** - App Router 기반 React 프레임워크
- **TypeScript** - 타입 안정성 확보
- **React Hooks** - 상태 관리 (useState, useEffect, useContext)

### Backend & Database
- **Firebase Authentication** - 이메일/비밀번호 기반 사용자 인증
- **Cloud Firestore** - NoSQL 실시간 데이터베이스
- **Firebase SDK 11.x** - Firebase 클라이언트 라이브러리

### Deployment
- **Vercel** - CI/CD 자동화 및 호스팅

## ✨ 주요 기능

### 1. 사용자 인증 및 개인화
- Firebase Authentication을 통한 회원가입/로그인 구현
- Context API를 활용한 전역 사용자 상태 관리
- 로그인한 사용자별 독립적인 작업 목록 제공
- Firestore `where` 쿼리로 사용자 데이터 필터링

### 2. 작업 관리 (CRUD)
- 작업 추가 시 제목 및 마감일 설정
- 작업 상태 변경 (Todo → In Progress → Done)
- 마감일 수정 기능
- 작업 삭제 기능
- 실시간 데이터 동기화 (Firestore 연동)

### 3. 고급 필터링 시스템
- **다중 상태 필터**: 체크박스를 통한 복수 상태 선택 가능
- **누적 필터링**: 기존 필터 조건에 새로운 조건을 추가하여 점진적으로 결과 축소
- **검색 기능**: 작업 제목 기반 실시간 검색 (대소문자 구분 없음)
- **Enter 키 지원**: 검색창에서 Enter로 검색, ESC로 초기화

### 4. 정렬 기능
- 제목 기준 오름차순/내림차순 (가나다순/하바파순)
- 마감일 기준 오름차순/내림차순 (가까운순/먼순)
- `localeCompare`를 활용한 한글 정렬 최적화

### 5. 반응형 UI
- Flexbox 기반 레이아웃으로 다양한 화면 크기 대응
- 모바일부터 데스크톱까지 일관된 사용자 경험 제공
- 가로폭 축소 시에도 레이아웃 유지


## 📂 프로젝트 구조
```
task-manager/
├── app/
│   ├── page.tsx              # 메인 페이지 (Task 목록)
│   ├── login/
│   │   └── page.tsx          # 로그인/회원가입
│   ├── task/
│   │   └── page.tsx          # task 메인
│   │   └── TaskAdd.tsx       # task 추가
│   │   └── TaskDrop.tsx      # task status dropbox
│   │   └── TaskFilter.tsx    # task filter
│   │   └── TaskList.tsx      # task list
│   ├── auth/
│   │   └── AuthProvider.tsx  # 인증 Context
│   │   └── AuthHeader.tsx    # 현재 사용자 정보/로그아웃
│   ├── type/
│   │   └── task.tsx          # TypeScript 타입 정의
│   └── layout.tsx            # 전역 레이아웃
├── lib/
│   ├── firebase.ts           # Firebase 설정
│   └── taskService.ts        # Firestore CRUD 로직
```

## 🚀 로컬 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/dadaeun7/task-manager.git
cd task-manager
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일 생성 후 Firebase 설정 추가:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 💡 회고 및 개선 방향

### 과제 진행 시 집중한 부분

1. **Firebase 통합의 완성도**
   - Authentication과 Firestore를 유기적으로 연결
   - 사용자별 데이터 격리 및 보안 규칙 적용
   - `where` 쿼리와 `Timestamp` 활용한 효율적인 데이터 처리

2. **고급 필터링 시스템 구현**
   - 누적 필터링 방식 도입
   - 기존 필터 상태를 유지하면서 추가 조건 적용 가능
   - 검색, 상태 필터, 정렬을 동시에 처리하는 복합 로직

3. **Context API를 활용한 상태 관리**
   - 전역 인증 상태를 효율적으로 관리
   - 커스텀 Hook(`useAuth`)으로 재사용성 확보

4. **실시간 데이터 동기화**
   - 작업 생성/수정 후 즉각적인 UI 업데이트
   - Firestore 쿼리 재실행을 통한 최신 데이터 보장

5. **사용자 경험(UX) 개선**
   - 검색창에서 Enter/ESC 키보드 단축키 지원
   - 반응형 디자인으로 모바일 환경 대응

### 시간이 더 있었다면 개선하고 싶었던 부분

1. **시각적 차별화 디자인**
   - 마감일 임박 Task에 대한 경고 표시 (D-1, D-3 등)
   - 상태별 색상 코드 적용 (Todo: 회색, In Progress: 파랑, Done: 초록)
   - 완료된 Task에 취소선 효과

2. **대시보드 기능**
   - 각 상태별 Task 개수를 한눈에 보여주는 통계 카드
   - 진행률 Progress Bar (완료율 시각화)
   - 오늘/이번 주 마감 작업 하이라이트

3. **추가 기능**
   - 작업 우선순위 설정 (High, Medium, Low)
   - 작업 카테고리/태그 기능
   - 작업 상세 설명(Memo) 추가

4. **성능 최적화**
   - React.memo를 활용한 불필요한 리렌더링 방지
   - 페이지네이션 또는 무한 스크롤 적용
---

### 제출 후 개선 사항(10분 소요)

과제 요구사항을 재검토하던 중 **"간단한 비동기 처리(로딩 상태)"** 구현이 누락된 것을 발견했습니다. 
빠르게 다음 사항들을 추가했습니다.

- ✅ 비동기 처리 로딩 상태 UI (과제 필수 요구사항)
- ✅ Context API 성능 최적화 (`useMemo`, `useCallback`)

### 필터링 로직 버그 수정 (추가 개선)

**문제 발견:**
1. 필터링된 상태에서 Task 상태 변경 시, 조건에 맞지 않음에도 목록에서 사라지지 않음
2. 변경된 Task 상태의 필터를 추가해도 해당 Task가 목록에 나타나지 않음

**원인 분석:**
- 필터링된 데이터(`filterList`)에서 재필터링하여 데이터가 점점 손실됨
- 원본 데이터(`tasks`)와 필터링된 데이터 간 동기화 문제

**해결 내용:**
- 필터 로직: 항상 원본 데이터(`tasks`)에서 필터링하도록 수정
- Drop 로직: 상태 변경 시 원본과 필터링된 목록 모두 즉시 반영
- 데이터 일관성 보장 및 필터 조건 정확히 적용

**개선 효과:**
- ✅ Task 상태 변경 시 필터 조건에 따라 즉시 목록에서 제외
- ✅ 필터 추가 시 변경된 Task가 올바르게 목록에 표시
- ✅ 원본 데이터와 UI 상태 완벽한 동기화

#### 개선 과정에서 배운 점

- **요구사항 체크리스트의 중요성**: 구현 전 체크리스트 작성으로 누락 방지
- **빠른 피드백과 즉각적 문제 해결**: 제출 후에도 지속적인 코드 검토
- **데이터 흐름의 명확성**: SSOT 원칙 적용
- **사용자 경험(UX) 고민**: 로딩 상태 표시로 더 나은 사용자 경험 제공


**개발자**: [dadaeun7]
**GitHub**: [[저장소 링크](https://github.com/dadaeun7/task-manager.git)]  
**배포 URL**: [\[Vercel 배포 링크\]](https://dadaeun7-task-manager.vercel.app/)