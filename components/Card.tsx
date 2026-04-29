
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', fullHeight = false }) => {
  const heightClass = fullHeight ? 'h-full' : '';
  return (
    <div className={`bg-white shadow-sm rounded-lg p-4 sm:p-6 ${heightClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
