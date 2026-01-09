/**
 * 전략 카드 컴포넌트
 * 각 투자 전략을 카드 형태로 표시합니다.
 */
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const RISK_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-300',
  'low-medium': 'bg-lime-100 text-lime-800 border-lime-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'medium-high': 'bg-orange-100 text-orange-800 border-orange-300',
  high: 'bg-red-100 text-red-800 border-red-300'
};

const DIFFICULTY_LABELS = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급'
};

const RETURN_LABELS = {
  'low-medium': '낮음-중간',
  medium: '중간',
  high: '높음'
};

const TIME_HORIZON_LABELS = {
  'short-term': '단기',
  'short-medium': '단기-중기',
  'medium-term': '중기',
  'long-term': '장기'
};

export default function StrategyCard({ strategy, onSelect, isSelected }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = () => {
    onSelect(strategy);
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
        border-2 ${isSelected ? 'border-primary-500' : 'border-gray-200'}
        overflow-hidden
      `}
    >
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{strategy.icon}</span>
              <h3 className="text-lg font-bold text-gray-900">{strategy.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>

            {/* 배지들 */}
            <div className="flex flex-wrap gap-2">
              {/* 리스크 레벨 */}
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${RISK_COLORS[strategy.riskLevel]}`}>
                리스크: {strategy.riskLevel.replace('-', ' ')}
              </span>

              {/* 난이도 */}
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300">
                {DIFFICULTY_LABELS[strategy.difficulty]}
              </span>

              {/* 기대 수익률 */}
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300">
                수익: {RETURN_LABELS[strategy.expectedReturn] || strategy.expectedReturn}
              </span>

              {/* 투자 기간 */}
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                {TIME_HORIZON_LABELS[strategy.timeHorizon] || strategy.timeHorizon}
              </span>
            </div>
          </div>

          {/* 선택 버튼 */}
          <button
            onClick={handleSelect}
            className={`
              ml-4 px-4 py-2 rounded-lg font-medium transition-colors
              ${isSelected
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {isSelected ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              '선택'
            )}
          </button>
        </div>
      </div>

      {/* 상세 정보 토글 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-center gap-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        {isExpanded ? (
          <>
            <span>상세 정보 숨기기</span>
            <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            <span>상세 정보 보기</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>

      {/* 확장 영역 */}
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {/* 상세 설명 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">전략 상세 설명</h4>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {strategy.detailedDescription}
            </p>
          </div>

          {/* 장점 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              장점
            </h4>
            <ul className="space-y-1">
              {strategy.pros.map((pro, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 단점 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              단점
            </h4>
            <ul className="space-y-1">
              {strategy.cons.map((con, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">!</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 추천 대상 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              추천 대상
            </h4>
            <ul className="space-y-1">
              {strategy.recommendedFor.map((target, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
