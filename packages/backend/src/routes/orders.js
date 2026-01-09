import express from 'express';
import UpbitClient from '../api/upbit.js';
import config from '../config/default.js';

const router = express.Router();

/**
 * POST /api/orders
 * 주문하기 (매수/매도)
 */
router.post('/', async (req, res, next) => {
  try {
    if (!config.upbit.accessKey || !config.upbit.secretKey) {
      return res.status(401).json({
        success: false,
        error: { message: 'API 키가 설정되지 않았습니다.' },
      });
    }

    // 테스트 모드 체크
    if (config.trade.mode === 'test') {
      return res.status(403).json({
        success: false,
        error: {
          message: '테스트 모드에서는 실제 주문을 할 수 없습니다.',
          mode: 'test'
        },
      });
    }

    const upbit = new UpbitClient(config.upbit.accessKey, config.upbit.secretKey);
    const orderResult = await upbit.order(req.body);

    res.json({
      success: true,
      data: orderResult,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/orders
 * 주문 목록 조회
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
    const orders = await upbit.getOrders(req.query);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/orders/:uuid
 * 개별 주문 조회
 */
router.get('/:uuid', async (req, res, next) => {
  try {
    if (!config.upbit.accessKey || !config.upbit.secretKey) {
      return res.status(401).json({
        success: false,
        error: { message: 'API 키가 설정되지 않았습니다.' },
      });
    }

    const upbit = new UpbitClient(config.upbit.accessKey, config.upbit.secretKey);
    const order = await upbit.getOrder(req.params.uuid);

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/orders/:uuid
 * 주문 취소
 */
router.delete('/:uuid', async (req, res, next) => {
  try {
    if (!config.upbit.accessKey || !config.upbit.secretKey) {
      return res.status(401).json({
        success: false,
        error: { message: 'API 키가 설정되지 않았습니다.' },
      });
    }

    const upbit = new UpbitClient(config.upbit.accessKey, config.upbit.secretKey);
    const cancelResult = await upbit.cancelOrder(req.params.uuid);

    res.json({
      success: true,
      data: cancelResult,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
