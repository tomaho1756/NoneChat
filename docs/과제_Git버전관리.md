# IT 기술지원 중간 수행평가 - Git 버전 관리

**과제 제출자**: [이름]
**프로젝트명**: NoneChat
**GitHub**: https://github.com/tomaho1756/NoneChat
**제출일**: 2024-11-24

---

## 1. 프로젝트 개요

### 프로젝트 설명
- React Native 기반 실시간 채팅 애플리케이션
- 워크스페이스 기반 팀 커뮤니케이션 서비스
- 로그인/회원가입, 채팅방, 워크스페이스 관리 기능 포함

### 기술 스택
- React Native 0.74.0
- TypeScript
- Zustand (상태관리)
- React Navigation
- Axios

---

## 2. Git 브랜치 전략

### 브랜치 구조
```
main (프로덕션)
  └── develop (개발)
      ├── feature/* (새 기능)
      ├── bugfix/* (버그 수정)
      └── experimental/* (실험적 기능)
```

### 브랜치 명명 규칙

| 브랜치 타입 | 형식 | 예시 |
|-----------|------|------|
| 기능 개발 | `feature/기능명` | `feature/chat-room` |
| 버그 수정 | `bugfix/버그명` | `bugfix/login-error` |
| 실험 기능 | `experimental/기능명` | `experimental/dark-mode` |

---

## 3. 커밋 메시지 컨벤션

### Gitmoji 활용

| 이모지 | 타입 | 용도 |
|--------|------|------|
| ✨ | Create/Add | 새 기능/파일 추가 |
| 💄 | Change | UI/스타일 변경 |
| 🚑 | Fix | 버그 수정 |
| 🔨 | Refactor | 리팩토링 |
| 📚 | Docs | 문서 작성 |

### 커밋 메시지 형식
```
{emoji}{Type} : {Subject}

예시:
✨Create : Add WorkSpaceActions
💄Change : Change LogIn View styles
🚑Fix : Fix navigation error
```

---

## 4. 프로젝트 커밋 히스토리

### 전체 커밋 요약 (15개 커밋)

| 순서 | 커밋 메시지 | 설명 |
|-----|-----------|------|
| 1 | Initial commit | 프로젝트 초기 설정 |
| 2 | ⚡Create : Create Views and connect with ReactNavigations | 네비게이션 구조 생성 |
| 3~4 | ✨Add : Add Details on LoginScreen | 로그인 화면 상세 구현 |
| 5 | ✨Add : Apply the Navigation Different on App | 네비게이션 적용 |
| 6 | ✨Create : Add LogIn Action with fetch | 로그인 API 연동 |
| 7 | ✨Create : Connect LogIn And Add SignInActions | 로그인 액션 연결 |
| 8 | ✨Create : Connect And Make SignUpScreen | 회원가입 화면 생성 |
| 9 | ✨Create : Add Store Types | Store 타입 정의 |
| 10 | ✨Create : Add Global Types navigation, response | 전역 타입 추가 |
| 11 | ✨Create : Add SignUp and AuthActions | 회원가입 액션 구현 |
| 12 | ✨Create : Add Navigation Action Details | 네비게이션 액션 |
| 13~14 | 💄Change : Change LogIn View styles | 로그인 UI 개선 |
| 15 | ✨Create : Add WorkSpaceActions | 워크스페이스 기능 |

### 개발 단계별 정리

#### Phase 1: 프로젝트 초기화
- React Native 프로젝트 생성
- 기본 구조 설정

#### Phase 2: 네비게이션 구축
- Stack, Drawer, BottomTab Navigation 구현
- 화면 간 라우팅 설정

#### Phase 3: 인증 시스템
- 로그인/회원가입 UI 구현
- API 통신 연동
- 인증 상태 관리

#### Phase 4: 상태 관리
- Zustand Store 구현
- TypeScript 타입 정의
- 전역 상태 관리 구조

#### Phase 5: 워크스페이스 기능
- 워크스페이스 생성/조회
- 워크스페이스 참가 기능

#### Phase 6: UI/UX 개선
- 로그인 화면 스타일 개선
- 사용자 경험 향상

---

## 5. 주요 기능별 파일 구조

```
src/
├── component/action/
│   ├── AuthAction.tsx          # 인증 관련 액션
│   └── WorkSpaceAction.tsx     # 워크스페이스 액션
├── navigation/
│   ├── RootNavigation.tsx      # 루트 네비게이션
│   ├── StackNavigation.tsx     # Stack 네비게이션
│   ├── DrawerNavigation.tsx    # Drawer 네비게이션
│   └── BottomTabNavigation.tsx # BottomTab 네비게이션
├── screen/
│   ├── auth/                   # 인증 화면
│   │   ├── LogInScreen.tsx
│   │   └── SignUpScreen.tsx
│   └── view/                   # 메인 화면
│       ├── chat/               # 채팅 관련
│       └── user/               # 사용자 관련
├── state/
│   └── store.ts                # Zustand 전역 상태
└── type/
    └── global/                 # 전역 타입 정의
```

---

## 6. Git 워크플로우 예시

### 새 기능 개발 시
```bash
# 1. develop에서 feature 브랜치 생성
git checkout develop
git checkout -b feature/new-feature

# 2. 작업 후 커밋
git add .
git commit -m "✨Create : Add new feature"

# 3. 원격 저장소에 푸시
git push origin feature/new-feature

# 4. Pull Request 생성 후 develop에 병합
```

### 버그 수정 시
```bash
# 1. bugfix 브랜치 생성
git checkout -b bugfix/fix-error

# 2. 수정 후 커밋
git commit -m "🚑Fix : Fix login error"

# 3. 푸시 및 병합
git push origin bugfix/fix-error
```

---

## 7. 브랜치 관리 규칙

### 규칙
1. **main**: 프로덕션 배포 코드만 포함
2. **develop**: 개발 중인 최신 코드
3. **feature**: develop에서 분기, 완료 후 develop에 병합
4. **bugfix**: 버그 발견 시 즉시 생성하여 수정
5. **experimental**: 실험적 기능, 성공 시 feature로 전환

### 병합 전 체크리스트
- [ ] 코드가 정상 작동하는가?
- [ ] 커밋 메시지가 명확한가?
- [ ] 테스트가 통과하는가?
- [ ] 코드 리뷰가 완료되었는가?

---

## 8. 커밋 메시지 작성 원칙

### ✅ 좋은 예시
```
✨Create : Add WorkSpaceActions
💄Change : Change LogIn View styles
🚑Fix : Fix navigation stack error
📚Docs : Update README with setup guide
```

### ❌ 나쁜 예시
```
update                    # 너무 추상적
Fixed bug                 # 과거형, 이모지 없음
add login                 # 첫 글자 소문자
changed some files        # 변경 내용 불명확
```

### 작성 규칙
- 최대 50글자 이내
- 영문은 동사 원형으로 시작
- 과거형 사용 금지
- 구체적인 변경 사항 명시

---

## 9. 프로젝트 개발 일정

```
Week 1-2: 프로젝트 초기 설정 및 네비게이션 구축
Week 3-4: 인증 시스템 구현
Week 5: 상태 관리 및 타입 시스템
Week 6: 워크스페이스 기능 개발
Week 7: UI/UX 개선
```

---

## 10. 향후 개발 계획

### 단기 (1-2개월)
- 실시간 채팅 기능
- 파일 공유
- 알림 시스템

### 중기 (3-6개월)
- 음성/영상 통화
- 검색 기능
- 성능 최적화

### 장기 (6개월 이상)
- 웹/데스크톱 버전
- AI 기반 기능
- 엔터프라이즈 기능

---

## 참고 자료
- GitHub Repository: https://github.com/tomaho1756/NoneChat
- Gitmoji: https://gitmoji.dev/
- Git Documentation: https://git-scm.com/doc
