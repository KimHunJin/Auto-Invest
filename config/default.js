import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

const config = {
  // Upbit API 설정
  upbit: {
    accessKey: process.env.UPBIT_ACCESS_KEY,
    secretKey: process.env.UPBIT_SECRET_KEY,
  },

  // 거래 설정
  trade: {
    mode: process.env.TRADE_MODE || 'test', // test 또는 live
    interval: parseInt(process.env.TRADE_INTERVAL) || 60000, // 60초
  },

  // 투자 설정
  investment: {
    amount: parseInt(process.env.INVESTMENT_AMOUNT) || 10000, // 10,000 KRW
    targetMarkets: process.env.TARGET_MARKETS
      ? process.env.TARGET_MARKETS.split(',')
      : ['KRW-BTC', 'KRW-ETH'],
  },

  // 로깅 설정
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    toFile: process.env.LOG_TO_FILE === 'true',
  },

  // 전략 설정
  strategy: {
    name: process.env.STRATEGY || 'simple',
  },
};

export default config;
