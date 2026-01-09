import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upbit API 인증 토큰 생성
 * @param {string} accessKey - Upbit Access Key
 * @param {string} secretKey - Upbit Secret Key
 * @param {Object} queryParams - 쿼리 파라미터 (선택)
 * @returns {string} JWT 토큰
 */
export function generateAuthToken(accessKey, secretKey, queryParams = null) {
  const payload = {
    access_key: accessKey,
    nonce: uuidv4(),
  };

  // 쿼리 파라미터가 있는 경우 (주문 등의 요청)
  if (queryParams) {
    const query = new URLSearchParams(queryParams).toString();
    const hash = crypto.createHash('sha512');
    const queryHash = hash.update(query, 'utf-8').digest('hex');

    payload.query_hash = queryHash;
    payload.query_hash_alg = 'SHA512';
  }

  // JWT 토큰 생성
  const token = jwt.sign(payload, secretKey);
  return token;
}

/**
 * Authorization 헤더 생성
 * @param {string} token - JWT 토큰
 * @returns {string} Authorization 헤더 값
 */
export function getAuthHeader(token) {
  return `Bearer ${token}`;
}
