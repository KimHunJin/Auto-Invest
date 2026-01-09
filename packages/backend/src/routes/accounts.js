import express from 'express';
import UpbitClient from '../api/upbit.js';
import config from '../config/default.js';

const router = express.Router();

/**
 * GET /api/accounts
 * 계좌 정보 조회 (인증 필요)
 */
router.get('/', async (req, res, next) => {
  try {
    if (!config.upbit.accessKey || !config.upbit.secretKey) {
      return res.status(401).json({
        success: false,
        error: { message: 'API 키가 설정되지 않았습니다.' },
      });
    }

    const upbit = new UpbitClient(config.upbit.accessKey, config.upbit.secretKey);
    const accounts = await upbit.getAccounts();

    res.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accounts/order-chance
 * 주문 가능 정보 조회
 */
router.get('/order-chance', async (req, res, next) => {
  try {
    const { market } = req.query;

    if (!market) {
      return res.status(400).json({
        success: false,
        error: { message: 'market 파라미터가 필요합니다.' },
      });
    }

    if (!config.upbit.accessKey || !config.upbit.secretKey) {
      return res.status(401).json({
        success: false,
        error: { message: 'API 키가 설정되지 않았습니다.' },
      });
    }

    const upbit = new UpbitClient(config.upbit.accessKey, config.upbit.secretKey);
    const orderChance = await upbit.getOrderChance(market);

    res.json({
      success: true,
      data: orderChance,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
