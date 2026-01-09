/**
 * Trading 페이지
 * 투자 전략을 선택하고 설정하는 페이지
 */
import React, { useState, useEffect } from 'react';
import { Filter, Search, TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import StrategyCard from '../components/strategy/StrategyCard';
import StrategySettings from '../components/strategy/StrategySettings';
import { getStrategies } from '../services/strategy-api';

function Trading() {
  const [strategies, setStrategies] = useState([]);
  const [filteredStrategies, setFilteredStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 필터 상태
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    difficulty: 'all',
    riskLevel: 'all'
  });

  // 전략 목록 로드
  useEffect(() => {
    loadStrategies();
  }, []);

  // 필터링
  useEffect(() => {
    let filtered = strategies;

    // 검색어 필터
    if (filters.search) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // 카테고리 필터
    if (filters.category !== 'all') {
      filtered = filtered.filter(s => s.category === filters.category);
    }

    // 난이도 필터
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(s => s.difficulty === filters.difficulty);
    }

    // 리스크 레벨 필터
    if (filters.riskLevel !== 'all') {
      filtered = filtered.filter(s => s.riskLevel === filters.riskLevel);
    }

    setFilteredStrategies(filtered);
  }, [strategies, filters]);

  const loadStrategies = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getStrategies();
      setStrategies(result.data);
      setFilteredStrategies(result.data);
    } catch (err) {
      console.error('전략 로드 실패:', err);
      setError('전략 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStrategy = (strategy) => {
    setSelectedStrategy(strategy);
    setIsConfiguring(false);
  };

  const handleConfigureStrategy = () => {
    setIsConfiguring(true);
  };

  const handleSaveSettings = (config) => {
    console.log('전략 설정 저장:', config);
    alert(`${config.strategyName} 전략이 설정되었습니다!\n\n테스트 모드에서는 실제 거래가 실행되지 않습니다.`);
    // 실제로는 여기서 백엔드에 설정을 저장하고 전략을 시작합니다
    setIsConfiguring(false);
  };

  const handleCancelSettings = () => {
    setIsConfiguring(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">투자 전략</h1>
        <Card>
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
            <button
              onClick={loadStrategies}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              다시 시도
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">투자 전략</h1>
        <p className="text-gray-600 mt-2">
          투자 전략을 선택하고 설정하세요. 각 전략의 상세 정보를 확인하고 최적의 전략을 찾아보세요.
        </p>
      </div>

      {/* 테스트 모드 경고 */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">테스트 모드</h3>
            <p className="text-sm text-yellow-700 mt-1">
              현재 테스트 모드로 실행 중입니다. 실제 주문은 실행되지 않으며, 전략 시뮬레이션만 수행됩니다.
            </p>
          </div>
        </div>
      </Card>

      {/* 설정 화면 */}
      {isConfiguring && selectedStrategy ? (
        <StrategySettings
          strategy={selectedStrategy}
          onSave={handleSaveSettings}
          onCancel={handleCancelSettings}
        />
      ) : (
        <>
          {/* 선택된 전략 */}
          {selectedStrategy && !isConfiguring && (
            <Card className="bg-primary-50 border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">{selectedStrategy.icon}</span>
                    {selectedStrategy.name} 선택됨
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedStrategy.description}</p>
                </div>
                <button
                  onClick={handleConfigureStrategy}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  설정 및 시작
                </button>
              </div>
            </Card>
          )}

          {/* 필터 */}
          <Card>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="w-5 h-5" />
                <span className="font-medium">필터:</span>
              </div>

              {/* 검색 */}
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="전략 검색..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* 카테고리 */}
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">모든 카테고리</option>
                <option value="safe">안전 중심</option>
                <option value="technical">기술적 분석</option>
                <option value="automated">자동화</option>
                <option value="trend">추세 추종</option>
                <option value="statistical">통계적</option>
              </select>

              {/* 난이도 */}
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">모든 난이도</option>
                <option value="beginner">초급</option>
                <option value="intermediate">중급</option>
                <option value="advanced">고급</option>
              </select>

              {/* 리스크 */}
              <select
                value={filters.riskLevel}
                onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">모든 리스크</option>
                <option value="low">낮음</option>
                <option value="low-medium">낮음-중간</option>
                <option value="medium">중간</option>
                <option value="medium-high">중간-높음</option>
                <option value="high">높음</option>
              </select>
            </div>
          </Card>

          {/* 전략 목록 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                전략 목록 ({filteredStrategies.length}개)
              </h2>
            </div>

            {filteredStrategies.length === 0 ? (
              <Card>
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">필터 조건에 맞는 전략이 없습니다.</p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredStrategies.map(strategy => (
                  <StrategyCard
                    key={strategy.id}
                    strategy={strategy}
                    onSelect={handleSelectStrategy}
                    isSelected={selectedStrategy?.id === strategy.id}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Trading;
