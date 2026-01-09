/**
 * 전략 관련 API 라우트
 */
import express from 'express';
import {
  STRATEGIES,
  STRATEGY_CATEGORIES,
  RISK_LEVELS,
  getStrategyById,
  getStrategiesByCategory,
  getStrategiesByDifficulty
} from '../strategies/strategy-definitions.js';

const router = express.Router();

/**
 * GET /api/strategies
 * 모든 전략 목록 조회
 */
router.get('/', (req, res) => {
  try {
    const { category, difficulty, riskLevel } = req.query;

    let strategies = STRATEGIES;

    // 카테고리 필터링
    if (category) {
      strategies = getStrategiesByCategory(category);
    }

    // 난이도 필터링
    if (difficulty) {
      strategies = strategies.filter(s => s.difficulty === difficulty);
    }

    // 리스크 레벨 필터링
    if (riskLevel) {
      strategies = strategies.filter(s => s.riskLevel === riskLevel);
    }

    res.json({
      success: true,
      data: strategies,
      meta: {
        total: strategies.length,
        categories: STRATEGY_CATEGORIES,
        riskLevels: RISK_LEVELS
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: '전략 목록 조회 중 오류가 발생했습니다.',
        details: error.message
      }
    });
  }
});

/**
 * GET /api/strategies/:id
 * 특정 전략 상세 정보 조회
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const strategy = getStrategyById(id);

    if (!strategy) {
      return res.status(404).json({
        success: false,
        error: {
          message: '해당 전략을 찾을 수 없습니다.',
          strategyId: id
        }
      });
    }

    res.json({
      success: true,
      data: strategy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: '전략 조회 중 오류가 발생했습니다.',
        details: error.message
      }
    });
  }
});

/**
 * GET /api/strategies/categories/list
 * 전략 카테고리 목록 조회
 */
router.get('/categories/list', (req, res) => {
  try {
    res.json({
      success: true,
      data: STRATEGY_CATEGORIES
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: '카테고리 목록 조회 중 오류가 발생했습니다.',
        details: error.message
      }
    });
  }
});

/**
 * POST /api/strategies/:id/validate
 * 전략 설정값 유효성 검증
 */
router.post('/:id/validate', (req, res) => {
  try {
    const { id } = req.params;
    const settings = req.body;

    const strategy = getStrategyById(id);

    if (!strategy) {
      return res.status(404).json({
        success: false,
        error: {
          message: '해당 전략을 찾을 수 없습니다.',
          strategyId: id
        }
      });
    }

    // 파라미터 유효성 검증
    const errors = [];

    strategy.parameters.forEach(param => {
      const value = settings[param.key];

      // 필수 값 체크
      if (value === undefined || value === null) {
        errors.push({
          parameter: param.key,
          message: `${param.label}는 필수 항목입니다.`
        });
        return;
      }

      // 숫자 타입 검증
      if (param.type === 'number') {
        if (typeof value !== 'number') {
          errors.push({
            parameter: param.key,
            message: `${param.label}는 숫자여야 합니다.`
          });
        } else {
          // 범위 체크
          if (param.min !== undefined && value < param.min) {
            errors.push({
              parameter: param.key,
              message: `${param.label}는 최소 ${param.min} 이상이어야 합니다.`
            });
          }
          if (param.max !== undefined && value > param.max) {
            errors.push({
              parameter: param.key,
              message: `${param.label}는 최대 ${param.max} 이하여야 합니다.`
            });
          }
        }
      }

      // 배열 타입 검증
      if (param.type === 'multiselect') {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push({
            parameter: param.key,
            message: `${param.label}를 최소 1개 이상 선택해야 합니다.`
          });
        }
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: '설정값 검증에 실패했습니다.',
          validationErrors: errors
        }
      });
    }

    res.json({
      success: true,
      message: '설정값이 유효합니다.',
      data: settings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: '설정값 검증 중 오류가 발생했습니다.',
        details: error.message
      }
    });
  }
});

/**
 * GET /api/strategies/recommended/:userLevel
 * 사용자 레벨에 따른 추천 전략
 */
router.get('/recommended/:userLevel', (req, res) => {
  try {
    const { userLevel } = req.params; // beginner, intermediate, advanced

    let recommended;

    switch (userLevel) {
      case 'beginner':
        recommended = STRATEGIES.filter(s =>
          s.difficulty === 'beginner' ||
          s.riskLevel === 'low' ||
          s.riskLevel === 'low-medium'
        );
        break;
      case 'intermediate':
        recommended = STRATEGIES.filter(s =>
          s.difficulty === 'intermediate' ||
          s.riskLevel === 'medium'
        );
        break;
      case 'advanced':
        recommended = STRATEGIES.filter(s =>
          s.difficulty === 'advanced' ||
          s.riskLevel === 'medium-high' ||
          s.riskLevel === 'high'
        );
        break;
      default:
        recommended = STRATEGIES.filter(s => s.difficulty === 'beginner');
    }

    res.json({
      success: true,
      data: recommended,
      meta: {
        userLevel,
        count: recommended.length
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: '추천 전략 조회 중 오류가 발생했습니다.',
        details: error.message
      }
    });
  }
});

export default router;
