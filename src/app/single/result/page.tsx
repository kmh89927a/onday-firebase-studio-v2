'use client';

import React from 'react';
import { SafetyGradePanel } from './SafetyGradePanel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Printer, Share2, Download } from 'lucide-react';
import Link from 'next/link';

export default function SingleResultPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Print Only Header */}
      <div className="print-only p-8 text-center border-b-2 border-black mb-8">
        <h1 className="text-3xl font-bold">1인 가구 최적 거주지 진단 리포트</h1>
        <p className="mt-2 text-slate-600">발행일: {new Date().toLocaleDateString()}</p>
      </div>

      <header className="no-print p-4 border-b bg-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/single" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="font-bold">진단 리포트</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 pb-24">
        <section className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">나의 생활권 분석 결과</h2>
          <p className="text-sm text-muted-foreground">입력하신 직장과 여가 동선을 바탕으로 도출된 결과입니다.</p>
        </section>

        <SafetyGradePanel />

        <div className="no-print space-y-4">
          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 space-y-3">
            <h4 className="font-bold text-sm text-primary">💡 전문가 팁</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              1인 가구의 경우 지하철역 출구로부터의 <strong>도보 동선 내 가로등 밝기</strong>와 <strong>24시 편의점 위치</strong>가 야간 체감 안전도에 가장 큰 영향을 미칩니다.
            </p>
          </div>

          <Button 
            onClick={handlePrint}
            className="w-full h-14 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl gap-2 shadow-sm"
          >
            <Printer className="w-5 h-5" />
            리포트 PDF로 저장하기
          </Button>
        </div>
      </main>

      <footer className="no-print p-6 text-center text-[10px] text-slate-400 border-t bg-white">
        본 리포트는 공공 데이터 및 자체 분석 알고리즘을 바탕으로 작성되었습니다.
      </footer>
    </div>
  );
}
