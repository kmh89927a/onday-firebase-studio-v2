# 🏠 내집 코디 (Naejib Cody)

> **3040 맞벌이 부부를 위한 데이터 기반 동네 궁합 진단 서비스**
>
> 서로 다른 두 직장, 한정된 이사 데드라인 — 동선을 고려한 최적의 거주지를 데이터로 진단해 드립니다.

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [핵심 기능](#-핵심-기능)
- [기술 스택](#-기술-스택)
- [시작하기 (Quick Start)](#-시작하기-quick-start)
- [환경 변수 설정](#-환경-변수-설정)
- [사용 가능한 스크립트](#-사용-가능한-스크립트)
- [프로젝트 구조](#-프로젝트-구조)
- [페이지 라우트](#-페이지-라우트)
- [디자인 시스템](#-디자인-시스템)
- [AI 기능 (Genkit)](#-ai-기능-genkit)
- [배포](#-배포)
- [트러블슈팅](#-트러블슈팅)

---

## 🎯 프로젝트 개요

**내집 코디**는 맞벌이 부부(또는 1인 가구)가 두 직장 주소를 입력하면, 출퇴근 동선·생활 인프라·안전 등급 등을 분석하여 최적의 거주 후보 동네를 추천하는 프롭테크(PropTech) 웹 서비스입니다.

| 항목 | 내용 |
| --- | --- |
| **앱 이름** | 내집 코디 |
| **타겟 유저** | 30–40대 맞벌이 부부, 1인 가구 |
| **핵심 가치** | 데이터 기반 동네 궁합 + AI 요약 |
| **플랫폼** | 모바일-퍼스트 웹 (PWA-ready) |

---

## ✨ 핵심 기능

| 기능 | 설명 |
| --- | --- |
| 🔐 **간편 로그인** | 카카오/네이버 OAuth + 게스트 체험 모드 |
| 📍 **커플 진단** | 두 직장 주소 기반 출퇴근 동선 교집합 분석 |
| 👤 **싱글 진단** | 1인 가구 맞춤 최적 동네 추천 |
| 🗺️ **지도 시각화** | 카카오맵 위 후보 동네·경로 오버레이 |
| 🤖 **AI 요약 분석** | Gemini 기반 동네별 장·단점 자동 분석 |
| ⏰ **데드라인 관리** | 이사 날짜 역산 타임라인 + 매물 연동 |
| 🔗 **결과 공유** | 고유 URL 발급 → 카카오톡 공유 |
| 🛡️ **안전 등급** | 동네별 치안 등급(A–D) 시각화 |

---

## 🛠 기술 스택

### Core Framework

| 기술 | 버전 | 용도 |
| --- | --- | --- |
| **Next.js** | 15.5.9 | App Router (RSC) + Turbopack |
| **React** | 19.2.1 | UI 라이브러리 |
| **TypeScript** | 5.x | 타입 안전 |

### Styling & UI

| 기술 | 용도 |
| --- | --- |
| **Tailwind CSS** 3.4.x | 유틸리티 퍼스트 스타일링 |
| **shadcn/ui** (Radix) | 35+ 프리미엄 UI 컴포넌트 |
| **Lucide React** | 아이콘 시스템 |
| **Pretendard** | 한글 최적 폰트 |
| **tailwindcss-animate** | 컴포넌트 애니메이션 |

### AI & Data

| 기술 | 용도 |
| --- | --- |
| **Firebase Genkit** 1.28+ | AI 워크플로우 프레임워크 |
| **Google Gemini** (gemini-2.5-flash) | 동네 분석 AI 모델 |
| **Zod** | 입출력 스키마 검증 |

### Map & Visualization

| 기술 | 용도 |
| --- | --- |
| **Kakao Maps SDK** | 지도 렌더링 + 마커 |
| **react-kakao-maps-sdk** | React 카카오맵 래퍼 |
| **Recharts** | 차트/그래프 시각화 |

### Utilities

| 기술 | 용도 |
| --- | --- |
| **React Hook Form** + **Zod** | 폼 관리 + 유효성 검증 |
| **date-fns** | 날짜 처리 |
| **embla-carousel-react** | 캐러셀 UI |
| **class-variance-authority** | 컴포넌트 variants |

---

## 🚀 시작하기 (Quick Start)

### 사전 요구사항

- **Node.js** >= 18.x (현재: v24.14.0 확인됨)
- **npm** >= 9.x (현재: v11.9.0 확인됨)

### 1단계: 의존성 설치

```bash
npm install
```

### 2단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다:

```bash
cp .env.example .env.local   # 또는 아래 내용으로 직접 생성
```

```env
# ──────────────────────────────────────
# 카카오맵 API (필수 — 지도 기능)
# https://developers.kakao.com 에서 JavaScript 키 발급
# ──────────────────────────────────────
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_javascript_key

# ──────────────────────────────────────
# Google AI (선택 — AI 분석 기능 사용 시)
# https://aistudio.google.com/apikey 에서 발급
# ──────────────────────────────────────
GOOGLE_GENAI_API_KEY=your_google_ai_api_key
```

> **💡 팁:** 카카오맵 API 키 없이도 앱이 실행됩니다. 지도 외의 UI/UX를 먼저 확인하고 싶다면 키 설정을 나중에 해도 됩니다.

### 3단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 **http://localhost:9002** 접속 🎉

---

## 🔑 환경 변수 설정

| 변수명 | 필수 | 설명 |
| --- | --- | --- |
| `NEXT_PUBLIC_KAKAO_MAP_API_KEY` | 선택* | 카카오맵 JavaScript 앱 키 |
| `GOOGLE_GENAI_API_KEY` | 선택 | Google AI Studio API 키 (Genkit AI 기능용) |

> *카카오맵 키가 없으면 지도 렌더링이 안 되지만, 나머지 앱 기능은 정상 동작합니다.

### 카카오맵 API 키 발급 방법

1. [Kakao Developers](https://developers.kakao.com) 접속 → 로그인
2. **내 애플리케이션** → **애플리케이션 추가하기**
3. 생성된 앱의 **앱 키** → **JavaScript 키** 복사
4. **플랫폼** → **Web 플랫폼 등록** → `http://localhost:9002` 추가

### Google AI API 키 발급 방법

1. [Google AI Studio](https://aistudio.google.com/apikey) 접속
2. **Create API Key** 클릭
3. 발급된 키를 `.env.local`에 입력

---

## 📜 사용 가능한 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (Turbopack, port 9002) |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 린트 검사 |
| `npm run typecheck` | TypeScript 타입 체크 |
| `npm run genkit:dev` | Genkit AI 개발 서버 실행 |
| `npm run genkit:watch` | Genkit AI 개발 서버 (파일 변경 감시) |

---

## 📁 프로젝트 구조

```
onday-firebase-studio-v2/
├── docs/
│   └── blueprint.md              # 앱 기획 원문 (기능/디자인 가이드)
├── src/
│   ├── ai/                        # 🤖 AI 모듈 (Firebase Genkit)
│   │   ├── genkit.ts              #   Genkit 인스턴스 초기화 (Gemini 2.5 Flash)
│   │   ├── dev.ts                 #   Genkit 개발 서버 엔트리
│   │   └── flows/
│   │       └── summarize-neighborhood-analysis.ts  # 동네 분석 AI Flow
│   │
│   ├── app/                       # 📄 Next.js App Router 페이지
│   │   ├── layout.tsx             #   루트 레이아웃 (Pretendard 폰트, 카카오맵 SDK)
│   │   ├── globals.css            #   전역 CSS (디자인 토큰, 다크모드)
│   │   ├── page.tsx               #   🏠 랜딩 페이지
│   │   ├── login/                 #   🔐 로그인 페이지
│   │   │   ├── page.tsx
│   │   │   └── LoginForm.tsx
│   │   ├── diagnosis/             #   📍 커플 진단 (두 직장 입력)
│   │   │   ├── page.tsx
│   │   │   ├── DiagnosisForm.tsx
│   │   │   ├── LoadSavedSearchButton.tsx
│   │   │   └── result/            #   📊 진단 결과 (지도 + 후보지)
│   │   │       ├── page.tsx
│   │   │       ├── MapView.tsx
│   │   │       ├── MapContext.tsx
│   │   │       ├── FilterPanel.tsx
│   │   │       ├── CandidateDetailPanel.tsx
│   │   │       ├── ShareButton.tsx
│   │   │       └── EmptyState.tsx
│   │   ├── single/                #   👤 싱글 진단 (1인 가구)
│   │   │   ├── page.tsx
│   │   │   ├── SingleForm.tsx
│   │   │   └── result/
│   │   │       ├── page.tsx
│   │   │       ├── SafetyGradeBadge.tsx
│   │   │       └── SafetyGradePanel.tsx
│   │   ├── deadline/              #   ⏰ 데드라인 관리
│   │   │   ├── page.tsx
│   │   │   ├── TimelineCard.tsx
│   │   │   └── listings/
│   │   │       ├── page.tsx
│   │   │       └── SummaryCard.tsx
│   │   └── share/                 #   🔗 공유 링크
│   │       └── [uuid]/
│   │           ├── page.tsx
│   │           ├── ShareReportView.tsx
│   │           ├── ConversionModal.tsx
│   │           ├── DataSourceBadge.tsx
│   │           ├── ExpiredView.tsx
│   │           └── PasswordPromptView.tsx
│   │
│   ├── components/                # 🧩 UI 컴포넌트
│   │   └── ui/                    #   shadcn/ui 컴포넌트 (35개)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── toast.tsx
│   │       └── ... (31개 추가 컴포넌트)
│   │
│   ├── hooks/                     # 🪝 커스텀 훅
│   │   ├── use-mobile.tsx         #   모바일 감지
│   │   └── use-toast.ts           #   토스트 알림
│   │
│   └── lib/                       # 📚 유틸리티 & 데이터
│       ├── utils.ts               #   cn() 클래스 병합 유틸
│       ├── placeholder-images.ts  #   플레이스홀더 이미지
│       └── mocks/                 #   Mock 데이터
│           ├── candidate-pool.ts  #   후보 동네 32곳 (서울/경기/인천)
│           └── candidate-selector.ts  # 후보 선별 로직
│
├── apphosting.yaml                # Firebase App Hosting 설정
├── components.json                # shadcn/ui 설정
├── next.config.ts                 # Next.js 설정 (이미지 도메인 허용)
├── tailwind.config.ts             # Tailwind CSS 설정 (커스텀 테마)
├── tsconfig.json                  # TypeScript 설정
├── postcss.config.mjs             # PostCSS 설정
├── package.json                   # 프로젝트 의존성
└── package-lock.json              # 의존성 잠금 파일
```

---

## 🗺 페이지 라우트

| 경로 | 설명 | 주요 컴포넌트 |
| --- | --- | --- |
| `/` | 랜딩 페이지 | 서비스 소개, CTA 버튼 |
| `/login` | 로그인 | 카카오/네이버 OAuth, 게스트 |
| `/diagnosis` | 커플 진단 입력 | 두 직장 주소 입력 폼 |
| `/diagnosis/result` | 커플 진단 결과 | 카카오맵 + 후보지 패널 |
| `/single` | 싱글 진단 입력 | 1인 가구 주소 입력 폼 |
| `/single/result` | 싱글 진단 결과 | 안전 등급 + 추천 동네 |
| `/deadline` | 데드라인 관리 | 이사 타임라인 |
| `/deadline/listings` | 매물 리스트 | 매물 카드 + 필터 |
| `/share/[uuid]` | 공유 결과 보기 | 비밀번호·만료 처리 |

---

## 🎨 디자인 시스템

### 색상 팔레트

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `--primary` | `hsl(206, 54%, 49%)` · **#3985C0** | 메인 브랜드 컬러 |
| `--secondary` | `hsl(170, 62%, 62%)` · **#63DBC6** | 포인트/액센트 |
| `--background` | `hsl(195, 20%, 97%)` · **#F4F7F8** | 페이지 배경 |
| `--kakao` | **#FEE500** | 카카오 버튼 |
| `--naver` | **#03C75A** | 네이버 버튼 |

### 타이포그래피

- **본문**: Pretendard → Inter → system sans-serif
- **헤드라인**: Pretendard (Bold 700)
- **코드**: monospace

### 반응형 기준

- **모바일**: 375px+ (기본)
- **태블릿**: 768px+ (사이드 패널 레이아웃)
- **최대 너비**: 768px 컨테이너 (모바일-앱 느낌)

---

## 🤖 AI 기능 (Genkit)

### 개요

Firebase Genkit + Google Gemini 2.5 Flash를 사용한 **동네 분석 AI 요약** 기능을 제공합니다.

### AI Flow: `summarizeNeighborhoodAnalysis`

- **입력**: 후보 동네 리스트 (출퇴근 정보 + 편의시설)
- **출력**: 동네별 장점/단점/종합 요약 (한국어)
- **모델**: `googleai/gemini-2.5-flash`

### Genkit 개발 서버 실행

```bash
# Google AI API 키 필요
export GOOGLE_GENAI_API_KEY=your_key
npm run genkit:dev
```

Genkit UI: **http://localhost:4000** 에서 Flow 테스트 가능

---

## 🚢 배포

### Firebase App Hosting

```yaml
# apphosting.yaml
runConfig:
  maxInstances: 1
```

Firebase App Hosting 을 통해 자동 배포됩니다.

### 환경 변수 (프로덕션)

Firebase Console 또는 CLI에서 환경 변수를 설정하세요:

```bash
firebase apphosting:secrets:set GOOGLE_GENAI_API_KEY
```

---

## 🔧 트러블슈팅

### 자주 발생하는 문제

<details>
<summary><strong>❌ "Module not found" 에러</strong></summary>

```bash
rm -rf node_modules .next
npm install
npm run dev
```
</details>

<details>
<summary><strong>❌ 카카오맵이 로드되지 않음</strong></summary>

1. `.env.local`에 `NEXT_PUBLIC_KAKAO_MAP_API_KEY` 설정 확인
2. [Kakao Developers](https://developers.kakao.com) → 플랫폼 설정에 `http://localhost:9002` 등록 확인
3. JavaScript 키 (REST API 키 아님) 사용 확인
</details>

<details>
<summary><strong>❌ Genkit AI 기능 오류</strong></summary>

1. `.env.local`에 `GOOGLE_GENAI_API_KEY` 설정 확인
2. API 키 할당량 확인 ([Google AI Studio](https://aistudio.google.com))
3. 로그 확인: `npm run genkit:dev` 실행 후 터미널 출력 확인
</details>

<details>
<summary><strong>❌ 포트 9002가 이미 사용 중</strong></summary>

```bash
# 사용 중인 프로세스 확인 및 종료
lsof -i :9002
kill -9 <PID>
```
</details>

<details>
<summary><strong>❌ Turbopack 관련 오류</strong></summary>

`package.json`의 dev 스크립트에서 `--turbopack` 플래그를 제거 후 재실행:

```json
"dev": "next dev -p 9002"
```
</details>

---

## 📄 라이선스

Private — All rights reserved.

---

<p align="center">
  <strong>내집 코디</strong> — 데이터가 찾아주는 우리 동네 궁합 💙
</p>
