
'use client';

import React from 'react';
import { useMapContext } from './MapContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RotateCcw, Clock, CircleDollarSign } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function FilterPanel() {
  const { 
    maxCommute, setMaxCommute, 
    budgetRange, setBudgetRange, 
    resetFilters,
    timeSlot, setTimeSlot
  } = useMapContext();

  return (
    <div className="p-4 bg-white/80 backdrop-blur-md border-b sticky top-0 z-30 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          출근 시간대 설정
        </h3>
        <Tabs value={timeSlot} onValueChange={setTimeSlot} className="w-auto">
          <TabsList className="h-8 p-1">
            {['07:00', '08:00', '09:00', '10:00'].map(t => (
              <TabsTrigger key={t} value={t} className="text-[10px] px-2 h-6">{t}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <label className="font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              최대 통근 시간
            </label>
            <span className="text-primary font-bold">{maxCommute}분 이내</span>
          </div>
          <Slider 
            value={[maxCommute]} 
            min={10} 
            max={120} 
            step={5} 
            onValueChange={(vals) => setMaxCommute(vals[0])}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <label className="font-bold flex items-center gap-2">
              <CircleDollarSign className="w-4 h-4 text-slate-400" />
              예산 범위 (만원)
            </label>
            <span className="text-primary font-bold">
              {budgetRange[0].toLocaleString()} - {budgetRange[1].toLocaleString()}
            </span>
          </div>
          <Slider 
            value={budgetRange} 
            min={1000} 
            max={30000} 
            step={500} 
            onValueChange={(vals) => setBudgetRange(vals as [number, number])}
          />
        </div>
      </div>

      <Button variant="ghost" size="sm" className="w-full text-xs gap-2 text-muted-foreground" onClick={resetFilters}>
        <RotateCcw className="w-3 h-3" />
        필터 초기화
      </Button>
    </div>
  );
}
