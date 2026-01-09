import UpbitClient from '../api/upbit.js';
import config from '../config/default.js';

const upbit = new UpbitClient(config.upbit.accessKey, config.upbit.secretKey);

/**
 * WebSocket 서버 초기화
 */
export function initWebSocketServer(wss, logger) {
  logger.info('WebSocket Server initialized');

  wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    logger.info(`WebSocket client connected: ${clientIp}`);

    // 클라이언트별 구독 마켓 목록
    let subscribedMarkets = [];

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'subscribe') {
          subscribedMarkets = data.markets || [];
          logger.debug(`Client subscribed to markets: ${subscribedMarkets.join(', ')}`);

          ws.send(JSON.stringify({
            type: 'subscribed',
            markets: subscribedMarkets,
          }));
        } else if (data.type === 'unsubscribe') {
          subscribedMarkets = [];
          logger.debug('Client unsubscribed from all markets');
        }
      } catch (error) {
        logger.error('WebSocket message error:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: error.message,
        }));
      }
    });

    // 주기적으로 시세 전송
    const interval = setInterval(async () => {
      if (subscribedMarkets.length === 0 || ws.readyState !== ws.OPEN) {
        return;
      }

      try {
        const tickers = await upbit.getTicker(subscribedMarkets);

        ws.send(JSON.stringify({
          type: 'ticker',
          data: tickers,
          timestamp: new Date().toISOString(),
        }));
      } catch (error) {
        logger.error('Ticker fetch error:', error);
      }
    }, config.websocket.tickerInterval);

    ws.on('close', () => {
      clearInterval(interval);
      logger.info(`WebSocket client disconnected: ${clientIp}`);
    });

    ws.on('error', (error) => {
      logger.error('WebSocket error:', error);
      clearInterval(interval);
    });
  });
}
