/**
 * 전략 설정 폼 컴포넌트
 * 선택한 전략의 파라미터를 설정합니다.
 */
import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Info } from 'lucide-react';
import { validateStrategySettings } from '../../services/strategy-api.js';

export default function StrategySettings({ strategy, onSave, onCancel }) {
  const [settings, setSettings] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [availableCoins, setAvailableCoins] = useState([
    'KRW-BTC', 'KRW-ETH', 'KRW-XRP', 'KRW-ADA', 'KRW-SOL',
    'KRW-DOGE', 'KRW-MATIC', 'KRW-DOT', 'KRW-AVAX', 'KRW-LINK'
  ]);

  // 기본값 설정
  useEffect(() => {
    const defaultSettings = {};
    strategy.parameters.forEach(param => {
      defaultSettings[param.key] = param.default;
    });
    setSettings(defaultSettings);
  }, [strategy]);

  // 입력값 변경 핸들러
  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // 에러 초기화
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // multiselect 핸들러
  const handleMultiSelectChange = (key, coin) => {
    setSettings(prev => {
      const currentValues = prev[key] || [];
      const newValues = currentValues.includes(coin)
        ? currentValues.filter(c => c !== coin)
        : [...currentValues, coin];

      return {
        ...prev,
        [key]: newValues
      };
    });
  };

  // 저장 핸들러
  const handleSave = async () => {
    try {
      setIsValidating(true);
      setErrors({});

      // 백엔드에서 유효성 검증
      const result = await validateStrategySettings(strategy.id, settings);

      if (result.success) {
        onSave({
          strategyId: strategy.id,
          strategyName: strategy.name,
          settings
        });
      }
    } catch (error) {
      // 유효성 검증 실패
      if (error.response?.data?.error?.validationErrors) {
        const validationErrors = {};
        error.response.data.error.validationErrors.forEach(err => {
          validationErrors[err.parameter] = err.message;
        });
        setErrors(validationErrors);
      } else {
        alert('설정 저장 중 오류가 발생했습니다.');
      }
    } finally {
      setIsValidating(false);
    }
  };

  // 파라미터 렌더링
  const renderParameter = (param) => {
    const value = settings[param.key];
    const error = errors[param.key];

    switch (param.type) {
      case 'number':
        return (
          <div key={param.key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {param.label}
            </label>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleChange(param.key, parseFloat(e.target.value))}
              min={param.min}
              max={param.max}
              step={param.step}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary-500'
                }
              `}
            />
            {param.description && (
              <p className="mt-1 text-xs text-gray-500 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{param.description}</span>
              </p>
            )}
            {error && (
              <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={param.key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {param.label}
            </label>
            <select
              value={value || ''}
              onChange={(e) => handleChange(param.key, e.target.value)}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary-500'
                }
              `}
            >
              {param.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {param.description && (
              <p className="mt-1 text-xs text-gray-500 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{param.description}</span>
              </p>
            )}
            {error && (
              <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      case 'time':
        return (
          <div key={param.key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {param.label}
            </label>
            <input
              type="time"
              value={value || ''}
              onChange={(e) => handleChange(param.key, e.target.value)}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary-500'
                }
              `}
            />
            {param.description && (
              <p className="mt-1 text-xs text-gray-500 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{param.description}</span>
              </p>
            )}
            {error && (
              <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      case 'multiselect':
        return (
          <div key={param.key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {param.label}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableCoins.map(coin => (
                <label
                  key={coin}
                  className={`
                    flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition-colors
                    ${(value || []).includes(coin)
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={(value || []).includes(coin)}
                    onChange={() => handleMultiSelectChange(param.key, coin)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium">{coin}</span>
                </label>
              ))}
            </div>
            {param.description && (
              <p className="mt-1 text-xs text-gray-500 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{param.description}</span>
              </p>
            )}
            {error && (
              <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">{strategy.icon}</span>
          {strategy.name} 설정
        </h2>
        <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
      </div>

      {/* 파라미터 폼 */}
      <div className="space-y-4">
        {strategy.parameters.map(param => renderParameter(param))}
      </div>

      {/* 버튼 */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          disabled={isValidating}
          className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isValidating ? '검증 중...' : '저장하고 시작'}
        </button>
        <button
          onClick={onCancel}
          disabled={isValidating}
          className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          취소
        </button>
      </div>
    </div>
  );
}
