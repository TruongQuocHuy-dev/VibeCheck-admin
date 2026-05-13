import React from 'react';
import type { ColorType } from '../types';

interface ColorBadgeProps {
  type: ColorType;
}

const ColorBadge: React.FC<ColorBadgeProps> = ({ type }) => {
  const styles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[type]}`}>
      {type.toUpperCase()}
    </span>
  );
};

export default ColorBadge;
