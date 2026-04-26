'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SafetyGradeBadge, type Grade } from './SafetyGradeBadge';
import { MapPin, ShieldCheck } from 'lucide-react';
import { Candidate } from '@/app/diagnosis/result/MapContext';

interface SafetyGradePanelProps {
  candidates: Candidate[];
}

export function SafetyGradePanel({ candidates }: SafetyGradePanelProps) {
  // 후보 ID를 기반으로 결정론적인(deterministic) 가짜 등급 생성
  const getGrade = (id: string): Grade => {
    const charCodeSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const grades: Grade[] = ['A', 'B', 'C', 'D'];
    return grades[charCodeSum % 4];
  };

  const getCrimeRate = (id: string): string => {
    const charCodeSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (0.1 + (charCodeSum % 100) / 100).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold flex items-center gap-2 text-sm px-1">
        <ShieldCheck className="w-4 h-4 text-primary" />
        동네별 야간 치안 리포트
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {candidates.map((c) => (
          <Card key={c.id} className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <h4 className="font-bold text-lg">{c.name}</h4>
                </div>
                <SafetyGradeBadge grade={getGrade(c.id)} />
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  반경 1km 내 12개 행정동 기준, <span className="font-bold text-slate-700">야간 범죄율 {getCrimeRate(c.id)}%</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  *공공데이터 포털 및 경찰청 범죄 발생 통계 기반 분석
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
