/**
 * 숫자를 통화 형식으로 포맷팅
 * @param {number} value - 숫자 값
 * @param {string} currency - 통화 단위 (기본: KRW)
 * @returns {string} 포맷팅된 문자열
 */
export function formatCurrency(value, currency = 'KRW') {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: currency,
  }).format(value);
}

/**
 * 퍼센트 변화율 계산
 * @param {number} current - 현재 가격
 * @param {number} previous - 이전 가격
 * @returns {number} 변화율 (%)
 */
export function calculateChangeRate(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * 지연 함수 (sleep)
 * @param {number} ms - 밀리초
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 날짜를 포맷팅
 * @param {Date} date - 날짜 객체
 * @returns {string} 포맷팅된 날짜 문자열
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

/**
 * 에러 메시지 추출
 * @param {Error} error - 에러 객체
 * @returns {string} 에러 메시지
 */
export function extractErrorMessage(error) {
  if (error.response) {
    return `API Error: ${JSON.stringify(error.response.data)}`;
  } else if (error.request) {
    return 'Network Error: 서버에 연결할 수 없습니다.';
  } else {
    return `Error: ${error.message}`;
  }
}

/**
 * 안전한 JSON 파싱
 * @param {string} jsonString - JSON 문자열
 * @param {*} defaultValue - 파싱 실패 시 기본값
 * @returns {*} 파싱된 객체 또는 기본값
 */
export function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * 소수점 자릿수 조정
 * @param {number} value - 숫자 값
 * @param {number} decimals - 소수점 자릿수
 * @returns {number} 조정된 값
 */
export function roundDecimal(value, decimals = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
