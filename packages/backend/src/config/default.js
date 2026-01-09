import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 로드 (packages/backend/.env)
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  // 서버 설정
  server: {
    port: parseInt(process.env.PORT) || 3001,
    env: process.env.NODE_ENV || 'development',
  },

  // Upbit API 설정
  upbit: {
    accessKey: process.env.UPBIT_ACCESS_KEY,
    secretKey: process.env.UPBIT_SECRET_KEY,
  },

  // CORS 설정
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },

  // 거래 설정
  trade: {
    mode: process.env.TRADE_MODE || 'test',
    interval: parseInt(process.env.TRADE_INTERVAL) || 60000,
  },

  // 투자 설정
  investment: {
    amount: parseInt(process.env.INVESTMENT_AMOUNT) || 10000,
    targetMarkets: process.env.TARGET_MARKETS
      ? process.env.TARGET_MARKETS.split(',')
      : ['KRW-BTC', 'KRW-ETH'],
  },

  // 로깅 설정
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    toFile: process.env.LOG_TO_FILE === 'true',
  },

  // WebSocket 설정
  websocket: {
    tickerInterval: parseInt(process.env.WS_TICKER_INTERVAL) || 1000, // 1초
  },
};

export default config;
