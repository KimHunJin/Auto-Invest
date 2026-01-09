# Auto-Invest

Upbit 거래소를 활용한 코인 자동 투자 AI 프로그램 (pnpm Monorepo)

## 프로젝트 개요

이 프로젝트는 Upbit API를 사용하여 암호화폐 시장 데이터를 분석하고 자동으로 투자 전략을 실행하는 웹 기반 프로그램입니다.

### 주요 기능

- **웹 기반 UI**: React로 구현된 직관적인 사용자 인터페이스
- **실시간 데이터**: WebSocket을 통한 실시간 시세 정보 업데이트
- **Upbit API 연동**: 시세 조회, 계좌 관리, 주문 실행
- **투자 관리**: 코인 선택 및 투자 정보 입력
- **대시보드**: 계좌 정보 및 보유 자산 현황 확인
- **테스트 모드**: 실제 거래 없이 안전하게 테스트 가능

## 기술 스택

### Backend
- **런타임**: Node.js
- **프레임워크**: Express.js
- **WebSocket**: ws
- **API**: Upbit REST API
- **인증**: JWT

### Frontend
- **프레임워크**: React 18
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS
- **라우팅**: React Router
- **아이콘**: Lucide React

### Monorepo
- **패키지 관리**: pnpm workspaces
- **동시 실행**: concurrently

## 프로젝트 구조

```
Auto-Invest/
├── packages/
│   ├── backend/              # Express.js API 서버
│   │   ├── src/
│   │   │   ├── api/          # Upbit API 클라이언트
│   │   │   ├── routes/       # REST API 라우트
│   │   │   ├── websocket/    # WebSocket 서버
│   │   │   ├── middleware/   # Express 미들웨어
│   │   │   ├── config/       # 설정
│   │   │   ├── utils/        # 유틸리티
│   │   │   └── server.js     # 서버 진입점
│   │   └── package.json
│   └── frontend/             # React 프론트엔드
│       ├── src/
│       │   ├── components/   # React 컴포넌트
│       │   ├── pages/        # 페이지
│       │   ├── hooks/        # 커스텀 훅
│       │   ├── services/     # API 통신
│       │   └── App.jsx
│       └── package.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## 설치 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd Auto-Invest
```

### 2. pnpm 설치 (필요한 경우)

```bash
npm install -g pnpm
```

### 3. 의존성 설치

```bash
pnpm install
```

### 4. 환경 변수 설정

#### 백엔드 환경 변수

```bash
cp packages/backend/.env.example packages/backend/.env
```

`packages/backend/.env` 파일을 열어 Upbit API 키를 설정합니다:

```env
PORT=3001
NODE_ENV=development

# Upbit API 키 (https://upbit.com/mypage/open_api_management 에서 발급)
UPBIT_ACCESS_KEY=your_access_key_here
UPBIT_SECRET_KEY=your_secret_key_here

# CORS 설정
CORS_ORIGIN=http://localhost:5173

# 거래 설정
TRADE_MODE=test
```

#### 프론트엔드 환경 변수 (선택사항)

```bash
cp packages/frontend/.env.example packages/frontend/.env
```

## 실행 방법

### 개발 모드 (백엔드 + 프론트엔드 동시 실행)

```bash
pnpm dev
```

### 개별 실행

```bash
# 백엔드만 실행
pnpm dev:backend

# 프론트엔드만 실행
pnpm dev:frontend
```

### 접속

- **프론트엔드**: http://localhost:5173
- **백엔드 API**: http://localhost:3001/api
- **WebSocket**: ws://localhost:3001/ws

## API 키 발급 방법

1. [Upbit](https://upbit.com) 로그인
2. 마이페이지 > Open API 관리로 이동
3. Open API Key 발급
4. 필요한 권한 설정:
   - **자산 조회** (필수): 계좌 정보 확인
   - **주문 조회** (권장): 주문 내역 확인
   - **주문 하기** (거래 시 필수): 매수/매도 주문

⚠️ **주의**: 처음에는 조회 권한만 설정하고 테스트하는 것을 권장합니다.

## 주요 페이지

### 대시보드 (`/`)
- 계좌 정보 요약
- 총 자산 및 보유 자산 현황
- WebSocket 연결 상태 표시

### 시장 (`/market`)
- 코인 목록 및 현재가 정보 (구현 예정)
- 실시간 시세 업데이트

### 투자 (`/trading`)
- 코인 선택 UI (구현 예정)
- 투자 정보 입력 폼
- 주문 실행 및 내역 확인

### 설정 (`/settings`)
- 환경 설정 (구현 예정)

## API 엔드포인트

### 시장 정보
- `GET /api/markets` - 마켓 코드 목록
- `GET /api/markets/ticker` - 현재가 정보
- `GET /api/markets/orderbook` - 호가 정보
- `GET /api/markets/candles/:unit` - 캔들 데이터

### 계좌 정보 (인증 필요)
- `GET /api/accounts` - 계좌 정보
- `GET /api/accounts/order-chance` - 주문 가능 정보

### 주문 (인증 필요)
- `POST /api/orders` - 주문 생성
- `GET /api/orders` - 주문 목록
- `GET /api/orders/:uuid` - 개별 주문 조회
- `DELETE /api/orders/:uuid` - 주문 취소

## 보안 주의사항

⚠️ **투자 위험 경고**
- 이 프로그램은 교육 및 실험 목적으로 제작되었습니다
- 실제 거래 시 손실이 발생할 수 있습니다
- 반드시 테스트 모드에서 충분히 검증한 후 사용하세요
- 투자 결정은 본인의 책임입니다

⚠️ **보안 주의사항**
- API 키는 절대 공개하지 마세요
- `.env` 파일을 Git에 커밋하지 마세요
- API 키에 최소한의 권한만 부여하세요
- 정기적으로 API 키를 갱신하세요
- 테스트 모드(`TRADE_MODE=test`)에서는 실제 주문이 차단됩니다

## 개발 가이드

### 새로운 페이지 추가

1. `packages/frontend/src/pages/`에 새 페이지 컴포넌트 생성
2. `packages/frontend/src/App.jsx`에 라우트 추가

### 새로운 API 엔드포인트 추가

1. `packages/backend/src/routes/`에 라우트 파일 생성 또는 수정
2. `packages/backend/src/routes/index.js`에 라우트 등록

### 코드 스타일

- ES6+ 모듈 시스템 사용
- async/await 패턴 사용
- 에러 핸들링 필수
- 컴포넌트는 함수형으로 작성

## 문서

- [기술 문서](./docs/skill.md): 프로젝트 기술 스택 및 구조
- [개발 히스토리](./docs/claude.md): 개발 과정 및 변경 이력

## 라이센스

ISC

## 기여

버그 리포트나 기능 제안은 이슈로 등록해 주세요.

## 참고 자료

- [Upbit API 문서](https://docs.upbit.com/)
- [Upbit Developer Center](https://docs.upbit.com/reference)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [React 문서](https://react.dev/)
- [Vite 문서](https://vitejs.dev/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
