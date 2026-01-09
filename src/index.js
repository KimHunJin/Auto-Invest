import config from '../config/default.js';
import Logger from './utils/logger.js';
import UpbitClient from './api/upbit.js';
import { formatCurrency, formatDate } from './utils/helpers.js';

// 로거 초기화
const logger = new Logger(config.logging);

// Upbit 클라이언트 초기화
const upbit = new UpbitClient(
  config.upbit.accessKey,
  config.upbit.secretKey
);

/**
 * 프로그램 시작
 */
async function main() {
  logger.info('=================================================');
  logger.info('Auto-Invest 프로그램 시작');
  logger.info(`실행 시간: ${formatDate(new Date())}`);
  logger.info(`모드: ${config.trade.mode.toUpperCase()}`);
  logger.info('=================================================');

  try {
    // 1. 마켓 정보 확인
    logger.info('마켓 정보를 조회합니다...');
    const markets = await upbit.getMarkets();
    const krwMarkets = markets.filter((m) => m.market.startsWith('KRW-'));
    logger.info(`총 ${krwMarkets.length}개의 KRW 마켓을 찾았습니다.`);

    // 2. 타겟 마켓 현재가 조회
    logger.info(`타겟 마켓: ${config.investment.targetMarkets.join(', ')}`);
    const tickers = await upbit.getTicker(config.investment.targetMarkets);

    logger.info('\n현재가 정보:');
    tickers.forEach((ticker) => {
      logger.info(`${ticker.market}: ${formatCurrency(ticker.trade_price)}`);
      logger.info(
        `  - 변동률: ${(ticker.signed_change_rate * 100).toFixed(2)}%`
      );
      logger.info(`  - 거래량: ${ticker.acc_trade_volume_24h.toFixed(2)}`);
    });

    // 3. 계좌 정보 조회 (API 키가 설정된 경우)
    if (config.upbit.accessKey && config.upbit.secretKey) {
      logger.info('\n계좌 정보를 조회합니다...');
      const accounts = await upbit.getAccounts();

      logger.info(`총 ${accounts.length}개의 자산을 보유하고 있습니다:`);
      accounts.forEach((account) => {
        const balance = parseFloat(account.balance);
        if (balance > 0) {
          logger.info(
            `  - ${account.currency}: ${balance.toFixed(8)} (${formatCurrency(
              parseFloat(account.balance) * parseFloat(account.avg_buy_price)
            )})`
          );
        }
      });
    } else {
      logger.warn('\nAPI 키가 설정되지 않았습니다. 시세 조회만 가능합니다.');
      logger.warn('.env 파일을 생성하고 API 키를 설정해주세요.');
    }

    logger.info('\n=================================================');
    logger.info('초기 설정이 완료되었습니다.');
    logger.info('투자 전략을 구현하고 거래 로직을 추가하세요.');
    logger.info('=================================================');
  } catch (error) {
    logger.error('오류가 발생했습니다:', error.message);
    process.exit(1);
  }
}

// 프로그램 실행
main();
