import api from './api';

export const marketApi = {
  // 마켓 목록 조회
  getMarkets: async (currency = 'KRW') => {
    return await api.get('/markets', { params: { currency } });
  },

  // 현재가 조회
  getTicker: async (markets) => {
    const marketString = Array.isArray(markets) ? markets.join(',') : markets;
    return await api.get('/markets/ticker', { params: { markets: marketString } });
  },

  // 호가 정보 조회
  getOrderbook: async (markets) => {
    const marketString = Array.isArray(markets) ? markets.join(',') : markets;
    return await api.get('/markets/orderbook', { params: { markets: marketString } });
  },

  // 캔들 데이터 조회
  getCandles: async (unit, market, count = 200) => {
    return await api.get(`/markets/candles/${unit}`, {
      params: { market, count },
    });
  },
};
