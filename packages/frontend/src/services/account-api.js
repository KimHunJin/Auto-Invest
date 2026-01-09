import api from './api';

export const accountApi = {
  // 계좌 정보 조회
  getAccounts: async () => {
    return await api.get('/accounts');
  },

  // 주문 가능 정보 조회
  getOrderChance: async (market) => {
    return await api.get('/accounts/order-chance', { params: { market } });
  },
};
