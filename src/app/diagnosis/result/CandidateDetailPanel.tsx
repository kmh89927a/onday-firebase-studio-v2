
'use client';

import React from 'react';
import { useMapContext, useSelectedCandidate } from './MapContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, Car, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CandidateDetailPanel() {
  const selected = useSelectedCandidate();
  const { selectedId, setSelectedId, timeSlot } = useMapContext();
  const isMobile = useIsMobile();

  if (!selectedId) return null;

  const info = selected?.commuteInfo[timeSlot];
  if (!info) return null;

  const content = (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Badge variant="secondary" className="mb-2">추천 후보지</Badge>
          <h2 className="text-2xl font-bold">{selected?.name}</h2>
          <p className="text-muted-foreground text-sm mt-1">예상 주거 비용: {(selected?.price || 0).toLocaleString()}만원</p>
        </div>
        {!isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setSelectedId(null)}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <CommuteCard title="내 직장" detail={info.partner1} />
        <CommuteCard title="배우자 직장" detail={info.partner2} />
      </div>

      <Button className="w-full h-12 font-bold mt-4" size="lg">
        매물 보러가기
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-10">
          <SheetHeader className="sr-only">
            <SheetTitle>후보지 상세</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-[400px] border-l bg-white p-6 overflow-y-auto shadow-2xl z-20">
      {content}
    </div>
  );
}

function CommuteCard({ title, detail }: { title: string; detail: any }) {
  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <span className="text-sm font-bold text-muted-foreground">{title}</span>
        <div className="flex items-center gap-1 text-primary">
          {detail.mode === 'bus' ? <Bus className="w-4 h-4" /> : <Car className="w-4 h-4" />}
          <span className="text-xs font-medium">{detail.mode === 'bus' ? '대중교통' : '자차'}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{detail.duration}</span>
          <span className="text-sm font-medium text-muted-foreground">분</span>
        </div>
        {detail.transfers > 0 && (
          <Badge variant="outline" className="text-[10px] py-0">환승 {detail.transfers}회</Badge>
        )}
      </CardContent>
    </Card>
  );
}
