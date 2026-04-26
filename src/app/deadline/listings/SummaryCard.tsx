'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, Clock, Star, ExternalLink, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SummaryInfo {
  id: string;
  rank: 1 | 2 | 3;
  name: string;
  price: string;
  commuteA: string;
  commuteB: string;
  amenityScore: number;
  reason: string;
  schoolInfo?: string;
}

interface SummaryCardProps {
  info: SummaryInfo;
}

export function SummaryCard({ info }: SummaryCardProps) {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-amber-500";
      case 2: return "bg-slate-400";
      case 3: return "bg-orange-700";
      default: return "bg-primary";
    }
  };

  const naverSearchUrl = `https://fin.land.naver.com/search?q=${encodeURIComponent(info.name + " 아파트")}`;

  return (
    <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
      <CardHeader className="p-0">
        <div className={cn("h-12 flex items-center px-4 gap-2 text-white font-bold", getMedalColor(info.rank))}>
          <Trophy className="w-5 h-5" />
          <span>추천 {info.rank}순위</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col gap-6">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{info.name}</h3>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none">
              점수 {info.amenityScore}/100
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>서울 주요 입지</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl space-y-1 border border-slate-100">
            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 예상 시세
            </p>
            <p className="font-bold text-sm">{info.price}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl space-y-1 border border-slate-100">
            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> 생활 편의
            </p>
            <p className="font-bold text-sm">최상급</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl space-y-1 border border-slate-100">
            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" /> 배우자 1 통근
            </p>
            <p className="font-bold text-sm text-primary">{info.commuteA}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl space-y-1 border border-slate-100">
            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" /> 배우자 2 통근
            </p>
            <p className="font-bold text-sm text-primary">{info.commuteB}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-600">추천 이유</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {info.reason}
          </p>
        </div>

        {info.schoolInfo && (
          <div className="pt-2 border-t border-dashed">
            <p className="text-[10px] font-bold text-slate-500">학군 정보: {info.schoolInfo}</p>
          </div>
        )}

        <Button 
          onClick={() => window.open(naverSearchUrl, '_blank')}
          className="w-full h-12 mt-auto font-bold gap-2"
          aria-label={`${info.name} 매물 네이버 부동산에서 보기`}
        >
          네이버에서 매물 보기
          <ExternalLink className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
