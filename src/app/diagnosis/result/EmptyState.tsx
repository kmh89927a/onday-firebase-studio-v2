
'use client';

import React from 'react';
import { SearchX, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMapContext } from './MapContext';

export function EmptyState() {
  const { resetFilters } = useMapContext();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-slate-50">
      <div className="bg-white p-6 rounded-full shadow-sm mb-6">
        <SearchX className="w-12 h-12 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold mb-2">조건을 만족하는 동네가 없습니다</h3>
      <p className="text-muted-foreground text-sm mb-8">
        필터 조건을 조금 완화해 보시는 건 어떨까요?
      </p>

      <div className="w-full max-w-xs space-y-3 mb-8">
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100 text-left">
          <HelpCircle className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground">통근 시간을 10분 정도만 늘려보세요.</p>
        </div>
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100 text-left">
          <HelpCircle className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground">예산 범위를 조금 더 넓게 설정해보세요.</p>
        </div>
      </div>

      <Button onClick={resetFilters} className="w-full max-w-xs h-12 font-bold">
        필터 초기화하기
      </Button>
    </div>
  );
}
