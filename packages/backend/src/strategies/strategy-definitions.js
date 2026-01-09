/**
 * 투자 전략 정의
 * 각 전략의 메타데이터, 설명, 파라미터 등을 정의합니다.
 */

export const STRATEGIES = [
  {
    id: 'dca',
    name: 'DCA (정액 분할 매수)',
    category: 'safe',
    difficulty: 'beginner',
    description: '일정 금액을 정기적으로 매수하여 평균 매수가를 낮추는 전략',
    detailedDescription: `
Dollar Cost Averaging (정액 분할 매수)는 가장 안전하고 검증된 투자 전략 중 하나입니다.
시장 타이밍을 예측하지 않고, 정해진 시간마다 일정 금액을 자동으로 투자합니다.

가격이 낮을 때는 더 많은 수량을 매수하고, 가격이 높을 때는 적은 수량을 매수하여
자연스럽게 평균 매수가를 낮추는 효과가 있습니다.
    `,
    pros: [
      '시장 타이밍 리스크 최소화',
      '감정적 거래 방지',
      '초보자도 쉽게 실행 가능',
      '장기 투자에 매우 유리',
      '급등락에 대한 심리적 부담 감소'
    ],
    cons: [
      '단기간 큰 수익 기대 어려움',
      '하락장에서도 계속 매수하여 손실 확대 가능',
      '횡보장에서 수익률 낮음'
    ],
    recommendedFor: [
      '장기 투자자',
      '초보 투자자',
      '바쁜 직장인',
      '감정적 거래를 피하고 싶은 투자자'
    ],
    parameters: [
      {
        key: 'amount',
        label: '투자 금액 (KRW)',
        type: 'number',
        default: 10000,
        min: 5000,
        max: 10000000,
        step: 1000,
        description: '매 주기마다 투자할 금액'
      },
      {
        key: 'interval',
        label: '투자 주기',
        type: 'select',
        default: 'daily',
        options: [
          { value: 'hourly', label: '매시간' },
          { value: 'daily', label: '매일' },
          { value: 'weekly', label: '매주' },
          { value: 'monthly', label: '매월' }
        ],
        description: '얼마나 자주 매수할지 설정'
      },
      {
        key: 'coins',
        label: '투자 코인',
        type: 'multiselect',
        default: ['KRW-BTC', 'KRW-ETH'],
        description: '투자할 코인 선택 (여러 개 선택 가능)'
      }
    ],
    riskLevel: 'low',
    expectedReturn: 'low-medium',
    timeHorizon: 'long-term',
    icon: '💰'
  },
  {
    id: 'volatility-breakout',
    name: '변동성 돌파 전략',
    category: 'technical',
    difficulty: 'intermediate',
    description: '전날 변동폭을 기준으로 일정 비율 상승 시 매수하는 전략',
    detailedDescription: `
Larry Williams가 개발한 검증된 전략으로, 전날의 가격 변동폭을 기준으로
당일 목표가를 계산하여 돌파 시 매수합니다.

목표가 = 당일 시가 + (전일 고가 - 전일 저가) × K값

K값은 백테스팅을 통해 최적화할 수 있으며, 일반적으로 0.3~0.5 사이 값을 사용합니다.
다음날 시가에 자동 매도하여 단기 수익을 실현합니다.
    `,
    pros: [
      '백테스팅으로 검증 가능',
      '명확한 진입/청산 규칙',
      '상승 추세 조기 포착',
      '단기 수익 실현 가능',
      '감정 배제 가능'
    ],
    cons: [
      '횡보장에서 손실 발생',
      '슬리피지(체결가 차이) 발생 가능',
      '빈번한 거래로 수수료 부담',
      '갑작스런 변동성에 취약'
    ],
    recommendedFor: [
      '단기 트레이더',
      '기술적 분석에 익숙한 투자자',
      '적극적 매매를 원하는 투자자'
    ],
    parameters: [
      {
        key: 'k_value',
        label: 'K 값',
        type: 'number',
        default: 0.5,
        min: 0.1,
        max: 1.0,
        step: 0.1,
        description: '변동폭 비율 (0.5 = 전일 변동폭의 50%)'
      },
      {
        key: 'investment_ratio',
        label: '투자 비율 (%)',
        type: 'number',
        default: 10,
        min: 5,
        max: 100,
        step: 5,
        description: '총 자산 대비 투자 비율'
      },
      {
        key: 'sell_time',
        label: '매도 시각',
        type: 'time',
        default: '09:00',
        description: '다음날 자동 매도할 시각'
      },
      {
        key: 'coins',
        label: '투자 코인',
        type: 'multiselect',
        default: ['KRW-BTC'],
        description: '전략을 적용할 코인'
      }
    ],
    riskLevel: 'medium',
    expectedReturn: 'medium',
    timeHorizon: 'short-term',
    icon: '📈'
  },
  {
    id: 'rsi',
    name: 'RSI 기반 전략',
    category: 'technical',
    difficulty: 'intermediate',
    description: 'RSI 지표로 과매도/과매수 구간을 판단하여 매매하는 전략',
    detailedDescription: `
RSI (Relative Strength Index)는 가격의 상승/하락 강도를 0~100 사이 값으로 나타냅니다.

일반적으로:
- RSI < 30: 과매도 구간 → 매수 신호
- RSI > 70: 과매수 구간 → 매도 신호

역추세 매매 전략으로, 가격이 지나치게 하락했을 때 매수하고
지나치게 상승했을 때 매도합니다.
    `,
    pros: [
      '과매도 구간에서 저가 매수 가능',
      '객관적인 수치 기반 판단',
      '횡보장에서 효과적',
      '다른 지표와 조합 가능'
    ],
    cons: [
      '강한 추세장에서 잘못된 신호',
      '지표 후행성으로 타이밍 놓침',
      'RSI만으로는 부족할 수 있음'
    ],
    recommendedFor: [
      '기술적 분석 경험자',
      '역추세 매매 선호 투자자',
      '횡보장 대응 전략 원하는 투자자'
    ],
    parameters: [
      {
        key: 'period',
        label: 'RSI 기간',
        type: 'number',
        default: 14,
        min: 5,
        max: 30,
        step: 1,
        description: 'RSI 계산에 사용할 기간 (일반적으로 14)'
      },
      {
        key: 'oversold',
        label: '과매도 기준',
        type: 'number',
        default: 30,
        min: 10,
        max: 40,
        step: 5,
        description: 'RSI가 이 값 이하일 때 매수'
      },
      {
        key: 'overbought',
        label: '과매수 기준',
        type: 'number',
        default: 70,
        min: 60,
        max: 90,
        step: 5,
        description: 'RSI가 이 값 이상일 때 매도'
      },
      {
        key: 'amount_per_trade',
        label: '거래당 금액 (KRW)',
        type: 'number',
        default: 50000,
        min: 10000,
        max: 10000000,
        step: 10000,
        description: '1회 매수/매도 금액'
      },
      {
        key: 'coins',
        label: '투자 코인',
        type: 'multiselect',
        default: ['KRW-BTC', 'KRW-ETH'],
        description: '전략을 적용할 코인'
      }
    ],
    riskLevel: 'medium',
    expectedReturn: 'medium',
    timeHorizon: 'short-medium',
    icon: '📊'
  },
  {
    id: 'ma-crossover',
    name: '이동평균선 크로스오버',
    category: 'technical',
    difficulty: 'beginner',
    description: '단기/장기 이동평균선의 교차로 추세를 파악하는 전략',
    detailedDescription: `
이동평균선(Moving Average)의 교차를 이용한 가장 기본적인 기술적 분석 전략입니다.

골든 크로스: 단기 이동평균선이 장기 이동평균선을 상향 돌파 → 매수
데드 크로스: 단기 이동평균선이 장기 이동평균선을 하향 돌파 → 매도

예: 5일 이동평균선이 20일 이동평균선을 돌파하면 상승 추세 시작으로 판단
    `,
    pros: [
      '추세 파악이 쉬움',
      '오랜 기간 검증된 전략',
      '이해하기 쉬움',
      '추세장에서 큰 수익 가능'
    ],
    cons: [
      '후행성 지표로 진입 타이밍 늦음',
      '횡보장에서 잦은 손실',
      '급격한 추세 전환 시 대응 느림'
    ],
    recommendedFor: [
      '초보 투자자',
      '추세 추종 투자자',
      '중장기 투자자'
    ],
    parameters: [
      {
        key: 'short_period',
        label: '단기 이평선 기간',
        type: 'number',
        default: 5,
        min: 3,
        max: 20,
        step: 1,
        description: '단기 이동평균 계산 기간 (일반적으로 5일)'
      },
      {
        key: 'long_period',
        label: '장기 이평선 기간',
        type: 'number',
        default: 20,
        min: 10,
        max: 200,
        step: 5,
        description: '장기 이동평균 계산 기간 (일반적으로 20일)'
      },
      {
        key: 'investment_ratio',
        label: '투자 비율 (%)',
        type: 'number',
        default: 20,
        min: 10,
        max: 100,
        step: 10,
        description: '총 자산 대비 투자 비율'
      },
      {
        key: 'coins',
        label: '투자 코인',
        type: 'multiselect',
        default: ['KRW-BTC'],
        description: '전략을 적용할 코인'
      }
    ],
    riskLevel: 'low-medium',
    expectedReturn: 'medium',
    timeHorizon: 'medium-term',
    icon: '〰️'
  },
  {
    id: 'grid-trading',
    name: '그리드 트레이딩',
    category: 'automated',
    difficulty: 'advanced',
    description: '일정 가격 간격으로 매수/매도 주문을 자동 배치하는 전략',
    detailedDescription: `
그리드 트레이딩은 현재 가격을 중심으로 일정 간격(그리드)으로
매수/매도 주문을 미리 배치해두는 전략입니다.

예: 현재가 100만원일 때
- 98만원: 매수 주문
- 96만원: 매수 주문
- 102만원: 매도 주문
- 104만원: 매도 주문

가격이 등락을 반복할 때마다 자동으로 익절/손절이 반복되어
횡보장에서 효과적입니다.
    `,
    pros: [
      '횡보장에서 지속적 수익',
      '완전 자동화 가능',
      '감정 배제',
      '작은 수익 누적'
    ],
    cons: [
      '강한 추세장에서 큰 손실',
      '초기 자금 많이 필요',
      '그리드 설정 복잡',
      '급등/급락 시 대응 어려움'
    ],
    recommendedFor: [
      '횡보장 대응 원하는 투자자',
      '충분한 자금 보유자',
      '완전 자동화 원하는 투자자'
    ],
    parameters: [
      {
        key: 'grid_count',
        label: '그리드 개수',
        type: 'number',
        default: 10,
        min: 5,
        max: 50,
        step: 1,
        description: '매수/매도 주문을 배치할 그리드 개수'
      },
      {
        key: 'grid_interval',
        label: '그리드 간격 (%)',
        type: 'number',
        default: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: '각 그리드 사이의 가격 간격 비율'
      },
      {
        key: 'total_investment',
        label: '총 투자 금액 (KRW)',
        type: 'number',
        default: 1000000,
        min: 100000,
        max: 100000000,
        step: 100000,
        description: '그리드 트레이딩에 사용할 총 금액'
      },
      {
        key: 'coins',
        label: '투자 코인',
        type: 'multiselect',
        default: ['KRW-BTC'],
        description: '전략을 적용할 코인'
      }
    ],
    riskLevel: 'medium-high',
    expectedReturn: 'medium',
    timeHorizon: 'short-medium',
    icon: '🎯'
  },
  {
    id: 'bollinger-bands',
    name: '볼린저 밴드 전략',
    category: 'technical',
    difficulty: 'intermediate',
    description: '통계적 가격 범위를 이용한 매매 전략',
    detailedDescription: `
볼린저 밴드는 이동평균선을 중심으로 표준편차를 이용해
상단 밴드와 하단 밴드를 그립니다.

가격이 하단 밴드에 근접하면 과매도 → 매수
가격이 상단 밴드에 근접하면 과매수 → 매도

밴드의 폭이 좁아지면 변동성이 낮은 상태(스퀴즈),
넓어지면 변동성이 높은 상태로 판단합니다.
    `,
    pros: [
      '변동성을 고려한 매매',
      '시각적으로 명확',
      '지지/저항 파악 용이',
      '다른 지표와 조합 우수'
    ],
    cons: [
      '추세장에서 빈번한 손절',
      '밴드 이탈 후 재진입 어려움',
      '설정값에 따라 결과 차이 큼'
    ],
    recommendedFor: [
      '변동성 트레이딩 선호자',
      '기술적 분석 경험자',
      '평균 회귀 전략 선호자'
    ],
    parameters: [
      {
        key: 'period',
        label: '기간',
        type: 'number',
        default: 20,
        min: 10,
        max: 50,
        step: 5,
        description: '이동평균 계산 기간'
      },
      {
        key: 'std_dev',
        label: '표준편차 배수',
        type: 'number',
        default: 2,
        min: 1,
        max: 3,
        step: 0.5,
        description: '밴드 폭 결정 (일반적으로 2)'
      },
      {
        key: 'buy_threshold',
        label: '매수 기준 (%)',
        type: 'number',
        default: 5,
        min: 0,
        max: 20,
        step: 5,
        description: '하단 밴드로부터 몇 % 이내일 때 매수'
      },
      {
        key: 'sell_threshold',
        label: '매도 기준 (%)',
        type: 'number',
        default: 5,
        min: 0,
        max: 20,
        step: 5,
        description: '상단 밴드로부터 몇 % 이내일 때 매도'
      },
      {
        key: 'amount_per_trade',
        label: '거래당 금액 (KRW)',
        type: 'number',
        default: 100000,
        min: 10000,
        max: 10000000,
        step: 10000,
        description: '1회 매수/매도 금액'
      },
      {
        key: 'coins',
        label: '투자 코인',
        type: 'multiselect',
        default: ['KRW-BTC', 'KRW-ETH'],
        description: '전략을 적용할 코인'
      }
    ],
    riskLevel: 'medium',
    expectedReturn: 'medium',
    timeHorizon: 'short-medium',
    icon: '📉'
  },
  {
    id: 'momentum',
    name: '모멘텀 전략',
    category: 'trend',
    difficulty: 'intermediate',
    description: '최근 상승세가 강한 코인에 투자하는 전략',
    detailedDescription: `
모멘텀 전략은 "상승하는 것은 계속 상승하고, 하락하는 것은 계속 하락한다"는
관성의 법칙에 기반한 전략입니다.

최근 24시간 또는 7일 기준 상승률이 높은 상위 N개 코인을 선정하여
포트폴리오를 구성하고, 정기적으로 재조정합니다.

단기 수익을 추구하며, 시장의 상승 모멘텀을 따라가는 전략입니다.
    `,
    pros: [
      '강한 상승장에서 높은 수익',
      '시장 흐름 추종',
      '단기 수익 가능',
      '객관적 선정 기준'
    ],
    cons: [
      '고점 매수 위험',
      '변동성 큰 코인 선택 가능',
      '급반전 시 큰 손실',
      '빈번한 재조정 필요'
    ],
    recommendedFor: [
      '공격적 투자자',
      '단기 트레이더',
      '상승장 대응 원하는 투자자'
    ],
    parameters: [
      {
        key: 'top_n',
        label: '상위 코인 개수',
        type: 'number',
        default: 5,
        min: 3,
        max: 20,
        step: 1,
        description: '몇 개 코인에 투자할지 설정'
      },
      {
        key: 'lookback_period',
        label: '모멘텀 측정 기간',
        type: 'select',
        default: '24h',
        options: [
          { value: '24h', label: '24시간' },
          { value: '7d', label: '7일' },
          { value: '30d', label: '30일' }
        ],
        description: '상승률 측정 기간'
      },
      {
        key: 'rebalance_interval',
        label: '재조정 주기',
        type: 'select',
        default: 'daily',
        options: [
          { value: 'daily', label: '매일' },
          { value: 'weekly', label: '매주' },
          { value: 'monthly', label: '매월' }
        ],
        description: '포트폴리오 재조정 주기'
      },
      {
        key: 'total_investment',
        label: '총 투자 금액 (KRW)',
        type: 'number',
        default: 500000,
        min: 50000,
        max: 50000000,
        step: 50000,
        description: '전체 포트폴리오 금액'
      },
      {
        key: 'min_volume',
        label: '최소 거래량 (KRW)',
        type: 'number',
        default: 1000000000,
        min: 100000000,
        max: 10000000000,
        step: 100000000,
        description: '선정 대상 코인의 최소 거래량 (유동성 확보)'
      }
    ],
    riskLevel: 'high',
    expectedReturn: 'high',
    timeHorizon: 'short-term',
    icon: '🚀'
  },
  {
    id: 'mean-reversion',
    name: '평균 회귀 전략',
    category: 'statistical',
    difficulty: 'intermediate',
    description: '가격이 평균으로 회귀한다는 가정에 기반한 전략',
    detailedDescription: `
평균 회귀 전략은 가격이 평균에서 멀어지면 결국 다시 평균으로
돌아온다는 통계적 원리를 이용합니다.

현재가가 이동평균선에서 크게 이탈했을 때:
- 평균 이하로 급락: 매수 (곧 상승 예상)
- 평균 이상으로 급등: 매도 (곧 하락 예상)

횡보장이나 박스권에서 효과적이며, Z-score를 이용해
이탈 정도를 수치화합니다.
    `,
    pros: [
      '횡보장/박스권에서 유리',
      '통계적 근거 명확',
      '과도한 움직임 포착',
      '리스크 관리 용이'
    ],
    cons: [
      '강한 추세장에서 큰 손실',
      '평균 계산 기준에 따라 결과 차이',
      '이탈 후 복귀 보장 없음'
    ],
    recommendedFor: [
      '횡보장 대응 원하는 투자자',
      '통계적 접근 선호자',
      '중립적 시장 전망 투자자'
    ],
    parameters: [
      {
        key: 'period',
        label: '평균 계산 기간',
        type: 'number',
        default: 20,
        min: 10,
        max: 100,
        step: 5,
        description: '이동평균 계산에 사용할 기간'
      },
      {
        key: 'z_score_threshold',
        label: 'Z-Score 기준',
        type: 'number',
        default: 2,
        min: 1,
        max: 3,
        step: 0.5,
        description: '평균에서 표준편차 몇 배 이탈 시 거래'
      },
      {
        key: 'investment_ratio',
        label: '투자 비율 (%)',
        type: 'number',
        default: 15,
        min: 5,
        max: 50,
        step: 5,
        description: '총 자산 대비 투자 비율'
      },
      {
        key: 'coins',
        label: '투자 코인',
        type: 'multiselect',
        default: ['KRW-BTC', 'KRW-ETH'],
        description: '전략을 적용할 코인'
      }
    ],
    riskLevel: 'medium',
    expectedReturn: 'medium',
    timeHorizon: 'short-medium',
    icon: '⚖️'
  }
];

/**
 * 전략 카테고리 정의
 */
export const STRATEGY_CATEGORIES = {
  safe: { label: '안전 중심', color: 'green' },
  technical: { label: '기술적 분석', color: 'blue' },
  automated: { label: '자동화', color: 'purple' },
  trend: { label: '추세 추종', color: 'orange' },
  statistical: { label: '통계적', color: 'indigo' }
};

/**
 * 리스크 레벨 정의
 */
export const RISK_LEVELS = {
  low: { label: '낮음', color: 'green', icon: '🟢' },
  'low-medium': { label: '낮음-중간', color: 'lime', icon: '🟡' },
  medium: { label: '중간', color: 'yellow', icon: '🟡' },
  'medium-high': { label: '중간-높음', color: 'orange', icon: '🟠' },
  high: { label: '높음', color: 'red', icon: '🔴' }
};

/**
 * ID로 전략 찾기
 */
export function getStrategyById(id) {
  return STRATEGIES.find(strategy => strategy.id === id);
}

/**
 * 카테고리로 전략 필터링
 */
export function getStrategiesByCategory(category) {
  return STRATEGIES.filter(strategy => strategy.category === category);
}

/**
 * 난이도로 전략 필터링
 */
export function getStrategiesByDifficulty(difficulty) {
  return STRATEGIES.filter(strategy => strategy.difficulty === difficulty);
}
