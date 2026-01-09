import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import corsMiddleware from './middleware/cors.js';
import loggerMiddleware from './middleware/logger.js';
import errorHandler from './middleware/error-handler.js';
import routes from './routes/index.js';
import { initWebSocketServer } from './websocket/ticker-stream.js';
import config from './config/default.js';
import Logger from './utils/logger.js';

const logger = new Logger(config.logging);
const app = express();
const server = http.createServer(app);

// 미들웨어 설정
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware(logger));

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API 라우트
app.use('/api', routes);

// 에러 핸들러 (마지막)
app.use(errorHandler(logger));

// WebSocket 서버 초기화
const wss = new WebSocketServer({ server, path: '/ws' });
initWebSocketServer(wss, logger);

// 서버 시작
const PORT = config.server.port || 3001;
server.listen(PORT, () => {
  logger.info('=================================================');
  logger.info(`Backend Server Started`);
  logger.info(`HTTP: http://localhost:${PORT}`);
  logger.info(`WebSocket: ws://localhost:${PORT}/ws`);
  logger.info(`Environment: ${config.server.env}`);
  logger.info('=================================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});
