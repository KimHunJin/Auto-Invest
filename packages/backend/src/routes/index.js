import express from 'express';
import marketsRouter from './markets.js';
import accountsRouter from './accounts.js';
import ordersRouter from './orders.js';
import strategiesRouter from './strategies.js';

const router = express.Router();

router.use('/markets', marketsRouter);
router.use('/accounts', accountsRouter);
router.use('/orders', ordersRouter);
router.use('/strategies', strategiesRouter);

export default router;
