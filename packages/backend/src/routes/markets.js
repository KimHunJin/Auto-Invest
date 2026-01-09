import express from 'express';
import UpbitClient from '../api/upbit.js';
import config from '../config/default.js';

const router = express.Router();
const upbit = new UpbitClient(config.upbit.accessKey, config.upbit.secretKey);

/**
 * GET /api/markets
 * 마켓 코드 목록 조회
 */
router.get('/', async (req, res, next) => {
  try {
    const markets = await upbit.getMarkets();

    // KRW 마켓만 필터링 (옵션)
    const krwMarkets = req.query.currency === 'KRW'
      ? markets.filter(m => m.market.startsWith('KRW-'))
      : markets;

    res.json({
      success: true,
      data: krwMarkets,
      count: krwMarkets.length,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/markets/ticker
 * 현재가 정보 조회
 * Query: markets (쉼표로 구분된 마켓 코드)
 */
router.get('/ticker', async (req, res, next) => {
  try {
    const { markets } = req.query;

    if (!markets) {
      return res.status(400).json({
        success: false,
        error: { message: 'markets 파라미터가 필요합니다.' },
      });
    }

    const marketList = markets.split(',');
    const tickers = await upbit.getTicker(marketList);

    res.json({
      success: true,
      data: tickers,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/markets/orderbook
 * 호가 정보 조회
 */
router.get('/orderbook', async (req, res, next) => {
  try {
    const { markets } = req.query;

    if (!markets) {
      return res.status(400).json({
        success: false,
        error: { message: 'markets 파라미터가 필요합니다.' },
      });
    }

    const orderbook = await upbit.getOrderbook(markets);

    res.json({
      success: true,
      data: orderbook,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/markets/candles/:unit
 * 캔들 데이터 조회
 */
router.get('/candles/:unit', async (req, res, next) => {
  try {
    const { unit } = req.params;
    const { market, count = 200 } = req.query;

    if (!market) {
      return res.status(400).json({
        success: false,
        error: { message: 'market 파라미터가 필요합니다.' },
      });
    }

    let candles;
    if (unit === 'days') {
      candles = await upbit.getCandlesDays(market, parseInt(count));
    } else {
      candles = await upbit.getCandlesMinutes(parseInt(unit), market, parseInt(count));
    }

    res.json({
      success: true,
      data: candles,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
