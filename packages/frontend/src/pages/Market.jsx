import React from 'react';
import Card from '../components/common/Card';

function Market() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">시장</h1>
      <Card>
        <p className="text-gray-500">시장 페이지 - 코인 목록 및 현재가 정보를 여기에 표시합니다.</p>
      </Card>
    </div>
  );
}

export default Market;
