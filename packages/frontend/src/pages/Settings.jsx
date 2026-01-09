import React from 'react';
import Card from '../components/common/Card';

function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">설정</h1>
      <Card>
        <p className="text-gray-500">설정 페이지 - 환경 설정을 여기에 표시합니다.</p>
      </Card>
    </div>
  );
}

export default Settings;
