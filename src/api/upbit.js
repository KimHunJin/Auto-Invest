import axios from 'axios';
import { generateAuthToken, getAuthHeader } from './auth.js';

const UPBIT_API_BASE_URL = 'https://api.upbit.com/v1';

/**
 * Upbit API 클라이언트
 */
export class UpbitClient {
  constructor(accessKey = null, secretKey = null) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.client = axios.create({
      baseURL: UPBIT_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 인증이 필요한 요청
   */
  async authenticatedRequest(method, endpoint, params = {}) {
    if (!this.accessKey || !this.secretKey) {
      throw new Error('API 키가 설정되지 않았습니다.');
    }

    const token = generateAuthToken(this.accessKey, this.secretKey, params);
    const config = {
      method,
      url: endpoint,
      headers: {
        Authorization: getAuthHeader(token),
      },
    };

    if (method === 'GET' && Object.keys(params).length > 0) {
      config.params = params;
    } else if (method === 'POST') {
      config.data = params;
    }

    try {
      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 공개 API 요청 (인증 불필요)
   */
  async publicRequest(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 에러 처리
   */
  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Upbit API Error [${status}]: ${JSON.stringify(data)}`);
    } else if (error.request) {
      throw new Error('Upbit API 서버에 연결할 수 없습니다.');
    } else {
      throw new Error(`요청 중 오류 발생: ${error.message}`);
    }
  }

  // ============================================================
  // 시세 조회 API (공개)
  // ============================================================

  /**
   * 마켓 코드 조회
   * @returns {Promise<Array>} 마켓 코드 목록
   */
  async getMarkets() {
    return await this.publicRequest('/market/all', { isDetails: true });
  }

  /**
   * 현재가 정보 조회
   * @param {string|Array<string>} markets - 마켓 코드 (예: 'KRW-BTC' 또는 ['KRW-BTC', 'KRW-ETH'])
   * @returns {Promise<Array>} 현재가 정보
   */
  async getTicker(markets) {
    const marketString = Array.isArray(markets) ? markets.join(',') : markets;
    return await this.publicRequest('/ticker', { markets: marketString });
  }

  /**
   * 호가 정보 조회
   * @param {string|Array<string>} markets - 마켓 코드
   * @returns {Promise<Array>} 호가 정보
   */
  async getOrderbook(markets) {
    const marketString = Array.isArray(markets) ? markets.join(',') : markets;
    return await this.publicRequest('/orderbook', { markets: marketString });
  }

  /**
   * 캔들 데이터 조회 (분)
   * @param {number} unit - 분 단위 (1, 3, 5, 10, 15, 30, 60, 240)
   * @param {string} market - 마켓 코드
   * @param {number} count - 캔들 개수 (최대 200)
   * @returns {Promise<Array>} 캔들 데이터
   */
  async getCandlesMinutes(unit, market, count = 200) {
    return await this.publicRequest(`/candles/minutes/${unit}`, { market, count });
  }

  /**
   * 캔들 데이터 조회 (일)
   * @param {string} market - 마켓 코드
   * @param {number} count - 캔들 개수 (최대 200)
   * @returns {Promise<Array>} 캔들 데이터
   */
  async getCandlesDays(market, count = 200) {
    return await this.publicRequest('/candles/days', { market, count });
  }

  // ============================================================
  // 계정 관련 API (인증 필요)
  // ============================================================

  /**
   * 전체 계좌 조회
   * @returns {Promise<Array>} 계좌 정보
   */
  async getAccounts() {
    return await this.authenticatedRequest('GET', '/accounts');
  }

  /**
   * 주문 가능 정보 조회
   * @param {string} market - 마켓 코드
   * @returns {Promise<Object>} 주문 가능 정보
   */
  async getOrderChance(market) {
    return await this.authenticatedRequest('GET', '/orders/chance', { market });
  }

  // ============================================================
  // 주문 관련 API (인증 필요)
  // ============================================================

  /**
   * 주문하기
   * @param {Object} orderParams - 주문 파라미터
   * @returns {Promise<Object>} 주문 결과
   */
  async order(orderParams) {
    return await this.authenticatedRequest('POST', '/orders', orderParams);
  }

  /**
   * 주문 취소
   * @param {string} uuid - 주문 UUID
   * @returns {Promise<Object>} 취소 결과
   */
  async cancelOrder(uuid) {
    return await this.authenticatedRequest('DELETE', '/order', { uuid });
  }

  /**
   * 개별 주문 조회
   * @param {string} uuid - 주문 UUID
   * @returns {Promise<Object>} 주문 정보
   */
  async getOrder(uuid) {
    return await this.authenticatedRequest('GET', '/order', { uuid });
  }

  /**
   * 주문 리스트 조회
   * @param {Object} params - 조회 파라미터
   * @returns {Promise<Array>} 주문 리스트
   */
  async getOrders(params = {}) {
    return await this.authenticatedRequest('GET', '/orders', params);
  }
}

export default UpbitClient;
