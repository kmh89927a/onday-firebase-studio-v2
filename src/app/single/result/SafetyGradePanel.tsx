'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SafetyGradeBadge, type Grade } from './SafetyGradeBadge';
import { MapPin, Shield } from 'lucide-react';

interface NeighborhoodSafety {
  id: string;
  name: string;
  grade: Grade;
  stats: string;
}

const MOCK_DATA: NeighborhoodSafety[] = [
  {
    id: '1',
    name: '관악구 봉천동',
    grade: 'B',
    stats: '반경 1km 내 12개 동 기준, 야간 범죄율 0.42%'
  },
  {
    id: '2',
    name: '마포구 연남동',
    grade: 'A',
    stats: '반경 1km 내 8개 동 기준, 야간 범죄율 0.15%'
  },
  {
    id: '3',
    name: '강남구 역삼동',
    grade: 'C',
    stats: '반경 1km 내 15개 동 기준, 야간 범죄율 0.88%'
  }
];

export function SafetyGradePanel() {
  return (
    <div className="space-y-4">
      <h3 className="font-bold flex items-center gap-2 text-sm px-1">
        <Shield className="w-4 h-4 text-primary" />
        동네별 야간 치안 리포트
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {MOCK_DATA.map((item) => (
          <Card key={item.id} className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <h4 className="font-bold text-base">{item.name}</h4>
                </div>
                <SafetyGradeBadge grade={item.grade} />
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed bg-slate-50 p-2 rounded-lg">
                {item.stats}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
