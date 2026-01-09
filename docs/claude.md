# Auto-Invest 개발 히스토리

## 프로젝트 정보
- **프로젝트명**: Auto-Invest
- **목적**: Upbit 코인 자동 투자 AI 프로그램
- **시작일**: 2026-01-09
- **개발 언어**: JavaScript (Node.js)

---

## 개발 히스토리

### 2026-01-09 - 프로젝트 초기 설정

#### 작업 내용
1. **프로젝트 구조 확인**
   - 빈 프로젝트 상태 확인 (README.md만 존재)
   - Git 리포지토리 초기화 완료

2. **package.json 생성**
   - Node.js 프로젝트 초기화
   - ES6 모듈 시스템 설정 (`"type": "module"`)
   - 필수 의존성 추가:
     - `axios`: Upbit API HTTP 통신
     - `dotenv`: 환경 변수 관리
     - `jsonwebtoken`: Upbit API 인증용 JWT
     - `uuid`: API 요청 고유 식별자

3. **프로젝트 폴더 구조 생성**
   ```
   src/
   ├── api/          # Upbit API 클라이언트
   ├── services/     # 비즈니스 로직
   ├── strategies/   # 투자 전략
   └── utils/        # 유틸리티
   config/           # 설정 파일
   docs/             # 문서
   logs/             # 로그 파일
   ```

4. **문서 작성**
   - `docs/skill.md`: 기술 스택 및 프로젝트 구조 문서화
   - `docs/claude.md`: 개발 히스토리 문서 (현재 문서)

5. **Upbit API 클라이언트 구현**
   - `src/api/auth.js`: JWT 토큰 생성 및 인증 헤더 관리
   - `src/api/upbit.js`: Upbit API 클라이언트 클래스
     - 공개 API (시세 조회): 마켓 코드, 현재가, 호가, 캔들 데이터
     - 인증 API (계좌 관리): 계좌 조회, 주문 가능 정보
     - 인증 API (주문): 주문 생성, 취소, 조회

6. **환경 변수 및 설정**
   - `.env.example`: 환경 변수 템플릿 작성
     - Upbit API 키 설정
     - 거래 설정 (모드, 간격, 투자 금액)
     - 로깅 설정
   - `config/default.js`: 애플리케이션 설정 파일
     - 환경 변수를 읽어 설정 객체로 변환

7. **유틸리티 구현**
   - `src/utils/logger.js`: 커스텀 로거 클래스
     - 콘솔 및 파일 로깅 지원
     - 로그 레벨 (debug, info, warn, error)
     - 색상 출력 및 타임스탬프
   - `src/utils/helpers.js`: 헬퍼 함수
     - 통화 포맷팅
     - 변화율 계산
     - 날짜 포맷팅
     - 에러 처리

8. **메인 애플리케이션**
   - `src/index.js`: 프로그램 진입점
     - 마켓 정보 조회
     - 현재가 정보 표시
     - 계좌 정보 조회 (API 키 설정 시)
     - 초기 설정 검증

9. **문서화**
   - `README.md`: 상세한 프로젝트 문서 작성
     - 설치 방법
     - 사용 방법
     - API 키 발급 가이드
     - 환경 변수 설명
     - 보안 주의사항

10. **Git 설정**
    - `.gitignore` 업데이트
      - Node.js 관련 파일 (node_modules, package-lock.json)
      - 환경 변수 (.env)
      - 로그 파일 (logs/)
      - IDE 설정 (.idea/, .vscode/)

11. **의존성 설치**
    - `npm install` 실행 완료
    - 67개 패키지 설치 완료
    - 보안 취약점 0개

#### 프로젝트 초기 설정 완료 ✅

모든 기본 설정이 완료되었습니다. 이제 다음 단계로 진행할 수 있습니다:

#### 다음 단계
- [ ] 투자 전략 구현 (src/strategies/)
- [ ] 시장 데이터 분석 서비스 구현 (src/services/market.js)
- [ ] 거래 실행 서비스 구현 (src/services/trader.js)
- [ ] 백테스팅 기능 추가
- [ ] AI 기반 시장 분석 기능 추가
- [ ] 웹 대시보드 구현

---

## 참고 자료
- [Upbit API 문서](https://docs.upbit.com/)
- [Upbit Open API GitHub](https://github.com/uJhin/upbit-client)

## 메모
- Upbit API는 JWT 기반 인증 사용
- API 키와 시크릿 키는 반드시 .env 파일로 관리
- 거래소 API 사용 시 rate limit 주의 필요
- 실제 거래 전 테스트넷에서 충분한 테스트 필요

---

## 작업 로그

### 생성된 파일 (2026-01-09)
- `/package.json` - Node.js 프로젝트 설정
- `/src/api/auth.js` - JWT 인증 모듈
- `/src/api/upbit.js` - Upbit API 클라이언트
- `/src/utils/logger.js` - 로깅 유틸리티
- `/src/utils/helpers.js` - 헬퍼 함수
- `/src/index.js` - 메인 애플리케이션
- `/config/default.js` - 애플리케이션 설정
- `/.env.example` - 환경 변수 템플릿
- `/docs/skill.md` - 기술 문서
- `/docs/claude.md` - 히스토리 문서
- `/README.md` - 프로젝트 문서 (업데이트)
- `/.gitignore` - Git 제외 파일 (업데이트)

### 생성된 폴더
- `/src/api/` - API 클라이언트
- `/src/services/` - 비즈니스 로직
- `/src/strategies/` - 투자 전략
- `/src/utils/` - 유틸리티
- `/config/` - 설정
- `/docs/` - 문서
- `/logs/` - 로그

### 설치된 패키지
- axios@1.6.5
- dotenv@16.3.1
- jsonwebtoken@9.0.2
- uuid@9.0.1
- nodemon@3.0.2 (dev)

총 67개 패키지 설치 완료

---

### 2026-01-09 - 모노레포 전환 및 React UI 추가

#### 작업 내용

1. **모노레포 구조 변경**
   - pnpm workspaces 기반 모노레포로 전환
   - `pnpm-workspace.yaml` 생성
   - 루트 `package.json`을 모노레포용으로 업데이트
   - concurrently를 사용한 동시 실행 스크립트 추가

2. **백엔드 패키지 구성 (packages/backend)**
   - 기존 Upbit API 클라이언트 코드 이동
   - Express.js 기반 REST API 서버 구현
   - WebSocket 서버 구현 (실시간 시세 전송)
   - 미들웨어 구현:
     - CORS 설정
     - 에러 핸들러
     - HTTP 로거 (morgan)
   - API 라우트 구현:
     - `/api/markets` - 마켓 정보
     - `/api/accounts` - 계좌 정보
     - `/api/orders` - 주문 관리
   - 환경 변수 기반 설정 시스템
   - 테스트 모드 지원 (실제 주문 차단)

3. **프론트엔드 패키지 구성 (packages/frontend)**
   - Vite + React 18 프로젝트 생성
   - Tailwind CSS 통합
   - React Router 설정
   - API 통신 레이어:
     - Axios 기반 API 클라이언트
     - market-api, account-api, order-api
   - WebSocket 훅 (useWebSocket):
     - 실시간 연결 관리
     - 자동 재연결
     - 마켓 구독/구독 해제
   - 레이아웃 컴포넌트:
     - Header - 로고 및 날짜 표시
     - Sidebar - 네비게이션 메뉴
     - Layout - 전체 레이아웃
   - 공통 컴포넌트:
     - Card - 재사용 가능한 카드
     - Loading - 로딩 스피너
   - 페이지 컴포넌트:
     - Dashboard - 계좌 정보 및 보유 자산
     - Market - 시장 페이지 (기본 구조)
     - Trading - 투자 페이지 (기본 구조)
     - Settings - 설정 페이지 (기본 구조)

4. **프로젝트 설정**
   - `.gitignore` 업데이트 (모노레포 관련 항목 추가)
   - `README.md` 전면 업데이트 (모노레포 구조 설명)
   - 환경 변수 템플릿 파일 생성

#### 기술 스택

**Backend**
- Express.js 4.18
- ws (WebSocket) 8.16
- cors, helmet, compression, morgan
- 기존 의존성 (axios, dotenv, jwt, uuid) 유지

**Frontend**
- React 18.2
- Vite 5.0
- Tailwind CSS 3.4
- React Router 6.21
- Axios 1.6
- Lucide React (아이콘)

**Monorepo**
- pnpm workspaces
- concurrently

#### 프로젝트 구조

```
Auto-Invest/
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── api/ (기존 코드)
│   │   │   ├── routes/
│   │   │   ├── websocket/
│   │   │   ├── middleware/
│   │   │   ├── config/
│   │   │   ├── utils/ (기존 코드)
│   │   │   └── server.js
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── hooks/
│       │   ├── services/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── index.html
│       ├── vite.config.js
│       ├── tailwind.config.js
│       └── package.json
├── pnpm-workspace.yaml
└── package.json (루트)
```

#### API 엔드포인트

**시장 정보 (공개)**
- `GET /api/markets` - 마켓 코드 목록 조회
- `GET /api/markets/ticker?markets=` - 현재가 정보
- `GET /api/markets/orderbook?markets=` - 호가 정보
- `GET /api/markets/candles/:unit?market=` - 캔들 데이터

**계좌 정보 (인증 필요)**
- `GET /api/accounts` - 계좌 정보 조회
- `GET /api/accounts/order-chance?market=` - 주문 가능 정보

**주문 (인증 필요)**
- `POST /api/orders` - 주문 생성 (테스트 모드 체크)
- `GET /api/orders` - 주문 목록 조회
- `GET /api/orders/:uuid` - 개별 주문 조회
- `DELETE /api/orders/:uuid` - 주문 취소

**WebSocket**
- `ws://localhost:3001/ws` - 실시간 시세 스트리밍
- 메시지 타입: subscribe, unsubscribe, ticker

#### 실행 방법

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
cp packages/backend/.env.example packages/backend/.env
# .env 파일에 Upbit API 키 입력

# 개발 서버 실행 (백엔드 + 프론트엔드 동시)
pnpm dev

# 또는 개별 실행
pnpm dev:backend   # 백엔드만
pnpm dev:frontend  # 프론트엔드만
```

#### 접속 URL
- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:3001/api
- WebSocket: ws://localhost:3001/ws

#### 다음 단계
- [ ] Market 페이지 코인 목록 및 실시간 시세 구현
- [ ] Trading 페이지 투자 폼 구현
- [ ] 차트 컴포넌트 추가 (recharts)
- [ ] 주문 내역 페이지
- [ ] 알림 시스템
- [ ] 다크 모드 지원

#### 주의사항
- API 키는 백엔드 환경변수에만 보관
- 프론트엔드는 백엔드 API를 통해서만 Upbit과 통신
- 테스트 모드(`TRADE_MODE=test`)에서는 실제 주문 차단
- CORS 설정으로 허용된 origin만 접근 가능

---

### 생성된 파일 (2026-01-09 모노레포 전환)

**루트**
- `/pnpm-workspace.yaml`
- `/package.json` (업데이트)
- `/.gitignore` (업데이트)
- `/README.md` (전면 업데이트)

**Backend (packages/backend/)**
- `package.json`
- `src/server.js`
- `src/config/default.js`
- `src/middleware/cors.js`
- `src/middleware/error-handler.js`
- `src/middleware/logger.js`
- `src/routes/index.js`
- `src/routes/markets.js`
- `src/routes/accounts.js`
- `src/routes/orders.js`
- `src/websocket/ticker-stream.js`
- `.env.example`

**Frontend (packages/frontend/)**
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- `src/main.jsx`
- `src/App.jsx`
- `src/index.css`
- `src/services/api.js`
- `src/services/market-api.js`
- `src/services/account-api.js`
- `src/services/order-api.js`
- `src/hooks/useWebSocket.js`
- `src/components/layout/Header.jsx`
- `src/components/layout/Sidebar.jsx`
- `src/components/layout/Layout.jsx`
- `src/components/common/Card.jsx`
- `src/components/common/Loading.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/Market.jsx`
- `src/pages/Trading.jsx`
- `src/pages/Settings.jsx`
- `.env.example`

총 파일: 40개 이상 생성/수정
