'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type Grade = 'A' | 'B' | 'C' | 'D';

interface SafetyGradeBadgeProps {
  grade: Grade;
  className?: string;
}

const GRADE_MAP = {
  A: {
    color: 'bg-green-500',
    text: '매우 안전',
    description: '야간 안전 A등급 — 매우 안전'
  },
  B: {
    color: 'bg-blue-500',
    text: '안전함',
    description: '야간 안전 B등급 — 안전함'
  },
  C: {
    color: 'bg-yellow-500',
    text: '보통',
    description: '야간 안전 C등급 — 보통'
  },
  D: {
    color: 'bg-red-500',
    text: '주의 필요',
    description: '야간 안전 D등급 — 주의 필요'
  }
};

export function SafetyGradeBadge({ grade, className }: SafetyGradeBadgeProps) {
  const config = GRADE_MAP[grade];

  return (
    <div 
      className={cn(
        "grade-badge inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-white text-[10px] font-bold",
        config.color,
        className
      )}
      role="status"
      aria-label={config.description}
    >
      <span>등급 {grade}</span>
      <span className="w-0.5 h-2 bg-white/30" aria-hidden="true" />
      <span>{config.text}</span>
    </div>
  );
}
