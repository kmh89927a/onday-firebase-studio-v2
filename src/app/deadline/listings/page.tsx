'use client';

import React, { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, Filter, Bell, Search, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { SummaryCard, SummaryInfo } from './SummaryCard';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapProvider } from '../../diagnosis/result/MapContext';
import { selectCandidates } from '@/lib/mocks/candidate-selector';

const MapView = dynamic(() => import('../../../app/diagnosis/result/MapView'), { 
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />
});

function DeadlineListingsContent() {
  const [email, setEmail] = useState('');
  const [candidates, setCandidates] = useState<SummaryInfo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // selectCandidates() 결과를 기반으로 SummaryInfo 생성
    const rawCandidates = selectCandidates('서울시청');
    const formatted: SummaryInfo[] = rawCandidates.slice(0, 3).map((c, idx) => ({
      id: c.id,
      rank: (idx + 1) as 1 | 2 | 3,
      name: c.name,
      price: `약 ${Math.floor(c.price / 10000)}억대`,
      commuteA: `${c.commuteInfo['08:00'].partner1.duration}분`,
      commuteB: `${c.commuteInfo['08:00'].partner2.duration}분`,
      amenityScore: 85 + Math.floor(Math.random() * 10),
      reason: `${c.name}은(는) 교통이 매우 편리하며 직장인들을 위한 생활 인프라가 잘 갖춰져 있어 맞벌이 부부에게 추천합니다.`,
      schoolInfo: idx === 0 ? '인근 초등학교 도보권' : undefined
    }));
    setCandidates(formatted);
  }, []);

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "이메일 확인",
        description: "올바른 이메일 형식을 입력해주세요.",
      });
      return;
    }
    toast({
      title: "구독 완료",
      description: "해당 지역의 신규 매물 알림을 보내드릴게요.",
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 overflow-hidden">
      {/* Sidebar: Listings */}
      <div className="w-full md:w-[450px] flex flex-col h-full border-r bg-white shrink-0 overflow-y-auto z-20">
        <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white z-30">
          <Link href="/deadline" className="p-2 hover:bg-slate-100 rounded-full" aria-label="이전 페이지로 이동">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-bold">최적 후보지 분석</h1>
        </header>

        <div className="p-6 space-y-8 pb-32">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                추천 TOP 3 요약
              </h2>
              <Badge variant="outline" className="text-[10px] gap-1 px-2">
                <Info className="w-3 h-3" />
                AI 매칭 결과
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {candidates.map(info => (
                <SummaryCard key={info.id} info={info} />
              ))}
            </div>
          </section>

          <section className="bg-primary/5 rounded-2xl p-6 border border-primary/10 space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-bold">신규 매물 알림</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              원하는 조건의 매물이 나오면 즉시 알려드릴까요?<br />
              급매/추천 매물만 엄선하여 전송합니다.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="이메일 주소" 
                className="bg-white border-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="알림 받을 이메일 주소 입력"
              />
              <Button onClick={handleSubscribe} aria-label="알림 서비스 구독하기">구독하기</Button>
            </div>
          </section>

          {candidates.length === 0 && (
            <div className="py-20 text-center space-y-6">
              <div className="bg-slate-100 p-8 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl">조건에 맞는 동네가 없습니다</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  필터 조건을 조금만 완화해보세요.<br />
                  다음 방법을 제안해 드립니다.
                </p>
              </div>
              <div className="space-y-3 px-4">
                <div className="p-4 bg-white rounded-xl border border-slate-100 text-left text-xs flex gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg h-fit">1</div>
                  <p>통근 허용 시간을 <strong>10분</strong>만 늘려보세요.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-100 text-left text-xs flex gap-3">
                  <div className="bg-green-50 text-green-600 p-2 rounded-lg h-fit">2</div>
                  <p>인근 <strong>행정동 반경</strong>을 더 넓게 설정해보세요.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map: Visual View */}
      <div className="flex-1 relative h-[40vh] md:h-screen">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <MapView />
        </Suspense>
        
        <div className="absolute top-4 right-4 z-10">
          <Button size="icon" className="rounded-full shadow-xl bg-white text-slate-600 hover:bg-slate-50" aria-label="지도 필터 열기">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DeadlineListingsPage() {
  return (
    <MapProvider>
      <DeadlineListingsContent />
    </MapProvider>
  );
}
