import api from './api';

export const orderApi = {
  // 주문하기
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  // 주문 목록 조회
  getOrders: async (params = {}) => {
    return await api.get('/orders', { params });
  },

  // 개별 주문 조회
  getOrder: async (uuid) => {
    return await api.get(`/orders/${uuid}`);
  },

  // 주문 취소
  cancelOrder: async (uuid) => {
    return await api.delete(`/orders/${uuid}`);
  },
};
