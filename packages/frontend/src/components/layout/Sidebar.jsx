import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, ShoppingCart, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: '대시보드' },
  { path: '/market', icon: TrendingUp, label: '시장' },
  { path: '/trading', icon: ShoppingCart, label: '투자' },
  { path: '/settings', icon: Settings, label: '설정' },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
