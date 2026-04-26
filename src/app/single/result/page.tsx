'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SafetyGradePanel } from './SafetyGradePanel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Printer, Share2, FileText, Info } from 'lucide-react';
import Link from 'next/link';
import { selectCandidates } from '@/lib/mocks/candidate-selector';
import { Candidate } from '@/app/diagnosis/result/MapContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

function SingleResultContent() {
  const searchParams = useSearchParams();
  const addrA = searchParams.get('addrA') || '서울시청';
  const addrB = searchParams.get('addrB') || '강남역';
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
    
    setIsLoading(true);
    const results = selectCandidates(addrA, addrB);
    setCandidates(results);
    
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [addrA, addrB]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Print-only Header */}
      <div className="print-only hidden p-10 text-center border-b-4 border-slate-900 mb-10 bg-white">
        <h1 className="text-4xl font-black mb-4">1인 가구 최적 거주지 진단 리포트</h1>
        <div className="flex justify-center gap-6 text-slate-500 font-medium">
          <p>발행처: 내집 코디 AI 진단 센터</p>
          <p>분석일시: {currentDate}</p>
        </div>
        <div className="mt-8 p-4 bg-slate-50 rounded-xl text-left text-sm space-y-1">
          <p><strong>직장:</strong> {addrA}</p>
          <p><strong>여가 거점:</strong> {addrB}</p>
        </div>
      </div>

      <header className="no-print p-4 border-b bg-white flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/single" className="p-2 hover:bg-slate-100 rounded-full transition-colors" aria-label="이전 페이지로">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex flex-col">
            <span className="font-bold text-sm">진단 결과 리포트</span>
            <span className="text-[10px] text-muted-foreground">{currentDate} 기준</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="결과 공유하기">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 pb-32 max-w-2xl mx-auto w-full">
        <section className="space-y-3 text-center">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-4 py-1 gap-2">
            <FileText className="w-3 h-3" />
            AI 라이프스타일 리포트
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">나의 생활권 분석 결과</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            입력하신 직장 동선과 여가 패턴을 바탕으로<br />
            가장 쾌적하고 안전한 동네를 엄선했습니다.
          </p>
        </section>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        ) : (
          <>
            <SafetyGradePanel candidates={candidates.slice(0, 5)} />
            
            <div className="no-print space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="w-5 h-5" />
                  <h4 className="font-bold">전문가 분석 가이드</h4>
                </div>
                <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                  <p>
                    1. <strong>도보 안전성:</strong> 등급이 높은 동네일수록 지하철역으로부터 주거지까지의 가로등 밀도가 높고 CCTV 통합 관제 센터와의 연동률이 우수합니다.
                  </p>
                  <p>
                    2. <strong>편의 인프라:</strong> 선정된 후보지들은 모두 반경 500m 이내에 24시 편의점과 코인세탁소 3개소 이상이 위치한 곳입니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handlePrint}
                  className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl gap-2 shadow-lg"
                  aria-label="리포트 PDF로 저장하기"
                >
                  <Printer className="w-5 h-5" />
                  리포트 PDF로 저장하기
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">
                  PDF 저장 시 인쇄 레이아웃에 최적화된 리포트가 생성됩니다.
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="no-print p-8 text-center text-[10px] text-slate-400 border-t bg-white">
        본 리포트는 공공 데이터 및 자체 분석 알고리즘을 바탕으로 작성되었으며,<br />
        실제 거주 시 현장 답사를 반드시 병행하시길 권장합니다.
      </footer>
    </div>
  );
}

export default function SingleResultPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">데이터 로딩 중...</div>}>
      <SingleResultContent />
    </Suspense>
  );
}
