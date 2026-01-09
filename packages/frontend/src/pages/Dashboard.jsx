import React, { useEffect, useState } from 'react';
import { accountApi } from '../services/account-api';
import { marketApi } from '../services/market-api';
import { useWebSocket } from '../hooks/useWebSocket';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isConnected, latestData } = useWebSocket();

  useEffect(() => {
    async function loadData() {
      try {
        const [accountData, marketData] = await Promise.all([
          accountApi.getAccounts().catch(() => ({ data: [] })),
          marketApi.getMarkets('KRW'),
        ]);

        setAccounts(accountData.data || []);
        setMarkets(marketData.data || []);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
          <span className="text-sm text-gray-600">
            {isConnected ? '연결됨' : '연결 끊김'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="총 자산">
          <p className="text-2xl font-bold text-gray-900">
            {accounts.length > 0
              ? accounts
                  .reduce((sum, acc) => {
                    const balance = parseFloat(acc.balance) || 0;
                    const price = parseFloat(acc.avg_buy_price) || 0;
                    return sum + balance * price;
                  }, 0)
                  .toLocaleString('ko-KR', {
                    style: 'currency',
                    currency: 'KRW',
                  })
              : '데이터 없음'}
          </p>
        </Card>

        <Card title="보유 자산">
          <p className="text-2xl font-bold text-gray-900">
            {accounts.filter((acc) => parseFloat(acc.balance) > 0).length}개
          </p>
        </Card>

        <Card title="KRW 마켓">
          <p className="text-2xl font-bold text-gray-900">{markets.length}개</p>
        </Card>
      </div>

      <Card title="보유 자산 목록">
        {accounts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            보유한 자산이 없습니다.
          </p>
        ) : (
          <div className="space-y-2">
            {accounts
              .filter((acc) => parseFloat(acc.balance) > 0)
              .map((acc) => (
                <div
                  key={acc.currency}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{acc.currency}</p>
                    <p className="text-sm text-gray-500">
                      보유량: {parseFloat(acc.balance).toFixed(8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {(
                        parseFloat(acc.balance) * parseFloat(acc.avg_buy_price)
                      ).toLocaleString('ko-KR', {
                        style: 'currency',
                        currency: 'KRW',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      평단: {parseFloat(acc.avg_buy_price).toLocaleString()}원
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
