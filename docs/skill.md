# Auto-Invest Skills & Technologies

## 프로젝트 개요
Upbit 거래소를 활용한 코인 자동 투자 AI 프로그램

## 기술 스택

### 백엔드
- **언어**: JavaScript (Node.js)
- **런타임**: Node.js v18+
- **패키지 관리**: npm

### 주요 라이브러리
- **axios**: HTTP 클라이언트 (Upbit API 통신)
- **dotenv**: 환경 변수 관리
- **jsonwebtoken**: JWT 토큰 생성 (Upbit API 인증)
- **uuid**: UUID 생성 (API 요청 고유 식별자)

## 프로젝트 구조

```
Auto-Invest/
├── src/
│   ├── api/              # Upbit API 관련 코드
│   │   ├── upbit.js      # Upbit API 클라이언트
│   │   └── auth.js       # 인증 관련 기능
│   ├── services/         # 비즈니스 로직
│   │   ├── market.js     # 시장 데이터 분석
│   │   └── trader.js     # 거래 실행 로직
│   ├── strategies/       # 투자 전략
│   │   ├── base.js       # 기본 전략 인터페이스
│   │   └── simple.js     # 간단한 투자 전략
│   ├── utils/            # 유틸리티 함수
│   │   ├── logger.js     # 로깅
│   │   └── helpers.js    # 헬퍼 함수
│   └── index.js          # 진입점
├── config/               # 설정 파일
│   └── default.js        # 기본 설정
├── docs/                 # 문서
│   ├── skill.md          # 기술 스택 및 구조
│   └── claude.md         # 개발 히스토리
├── logs/                 # 로그 파일
└── .env.example          # 환경 변수 예제
```

## Upbit API 주요 기능

### 1. 시세 조회
- 현재가 정보 조회
- 호가 정보 조회
- 체결 내역 조회
- 캔들 데이터 조회

### 2. 계정 관리
- 자산 조회
- 주문 가능 정보 조회

### 3. 주문
- 지정가 매수/매도
- 시장가 매수/매도
- 주문 취소
- 주문 조회

## 보안 고려사항
- API 키는 환경 변수로 관리
- .env 파일은 .gitignore에 추가
- API 키는 절대 코드에 하드코딩하지 않음
- JWT 토큰 기반 인증 사용

## 개발 가이드라인
- ES6+ 모듈 시스템 사용 (import/export)
- async/await 패턴 사용
- 에러 핸들링 필수
- 로깅을 통한 디버깅 및 모니터링

## 향후 확장 계획
- [ ] AI 기반 시장 분석 추가
- [ ] 다양한 투자 전략 구현
- [ ] 백테스팅 기능
- [ ] 웹 대시보드
- [ ] 알림 시스템 (텔레그램, 이메일)
