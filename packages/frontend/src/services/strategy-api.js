/**
 * 전략 관련 API 서비스
 */
import api from './api.js';

/**
 * 모든 전략 목록 조회
 * @param {Object} filters - 필터 옵션 (category, difficulty, riskLevel)
 * @returns {Promise} 전략 목록
 */
export async function getStrategies(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category) params.append('category', filters.category);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.riskLevel) params.append('riskLevel', filters.riskLevel);

  const queryString = params.toString();
  const url = queryString ? `/strategies?${queryString}` : '/strategies';

  return api.get(url);
}

/**
 * 특정 전략 상세 정보 조회
 * @param {string} strategyId - 전략 ID
 * @returns {Promise} 전략 상세 정보
 */
export async function getStrategy(strategyId) {
  return api.get(`/strategies/${strategyId}`);
}

/**
 * 전략 카테고리 목록 조회
 * @returns {Promise} 카테고리 목록
 */
export async function getStrategyCategories() {
  return api.get('/strategies/categories/list');
}

/**
 * 전략 설정값 유효성 검증
 * @param {string} strategyId - 전략 ID
 * @param {Object} settings - 전략 설정값
 * @returns {Promise} 검증 결과
 */
export async function validateStrategySettings(strategyId, settings) {
  return api.post(`/strategies/${strategyId}/validate`, settings);
}

/**
 * 사용자 레벨에 맞는 추천 전략 조회
 * @param {string} userLevel - 사용자 레벨 (beginner, intermediate, advanced)
 * @returns {Promise} 추천 전략 목록
 */
export async function getRecommendedStrategies(userLevel = 'beginner') {
  return api.get(`/strategies/recommended/${userLevel}`);
}
