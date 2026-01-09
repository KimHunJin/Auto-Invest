import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Auto-Invest
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString('ko-KR')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
