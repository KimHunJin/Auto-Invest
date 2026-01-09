import React from 'react';

function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}

export default Card;
