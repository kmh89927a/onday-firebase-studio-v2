'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bus, Car, Lock, ChevronRight, Home } from 'lucide-react';
import { DataSourceBadge } from './DataSourceBadge';
import { ConversionModal } from './ConversionModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Candidate } from '@/app/diagnosis/result/MapContext';

interface ShareReportViewProps {
  uuid: string;
  candidates: Candidate[];
}

export function ShareReportView({ uuid, candidates }: ShareReportViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="p-4 bg-white border-b sticky top-0 z-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="메인 페이지로 이동">
          <div className="bg-primary p-1.5 rounded-lg">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-primary">내집 코디</span>
        </Link>
        <DataSourceBadge source="aggregated" date="2024.11.20" />
      </header>

      <main className="flex-1 p-6 space-y-8 pb-32">
        <section className="text-center space-y-2">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1">진단 리포트</Badge>
          <h1 className="text-2xl font-bold">맞벌이 부부를 위한<br />최적의 동네 후보</h1>
          <p className="text-sm text-muted-foreground">두 사람의 동선을 고려한 시뮬레이션 결과입니다.</p>
        </section>

        <div className="space-y-4">
          {candidates.map((c, index) => {
            const isBlurred = !isLoggedIn && index > 0;
            const commute = c.commuteInfo['08:00'];
            
            return (
              <Card 
                key={c.id} 
                className={`relative overflow-hidden transition-all border-none shadow-sm ${isBlurred ? 'cursor-pointer hover:shadow-md' : ''}`}
                onClick={() => isBlurred && setIsModalOpen(true)}
              >
                <CardContent className={`p-5 space-y-4 ${isBlurred ? 'filter blur-[10px] opacity-60 pointer-events-none select-none' : ''}`}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{c.name}</h3>
                    <span className="text-primary font-bold">예상 {Math.floor(c.price / 10000)}억대</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl space-y-1 border border-slate-100">
                      <p className="text-[10px] text-muted-foreground font-medium">배우자 1</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{commute.partner1.duration}분</span>
                        {commute.partner1.mode === 'bus' ? <Bus className="w-3.5 h-3.5 text-slate-400" /> : <Car className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl space-y-1 border border-slate-100">
                      <p className="text-[10px] text-muted-foreground font-medium">배우자 2</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{commute.partner2.duration}분</span>
                        {commute.partner2.mode === 'bus' ? <Bus className="w-3.5 h-3.5 text-slate-400" /> : <Car className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['직주근접', '교통요지', '인프라우수'].map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] font-normal bg-slate-100 text-slate-600 border-none">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>

                {isBlurred && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px]">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg border border-slate-100 mb-2">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 bg-white/80 px-3 py-1 rounded-full">로그인 후 전체 보기</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </main>

      {!isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t flex justify-center z-50">
          <div className="w-full max-w-[768px]">
            <Button 
              onClick={() => router.push('/login')} 
              className="w-full h-14 text-lg font-bold rounded-xl shadow-xl shadow-primary/20 gap-2"
              aria-label="회원가입하여 전체 후보 동네 보기"
            >
              회원가입하고 전체 후보 보기
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      <ConversionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
