'use client';

import dynamic from 'next/dynamic';
import { MapProvider, useMapContext } from './MapContext';
import { FilterPanel } from './FilterPanel';
import { CandidateDetailPanel } from './CandidateDetailPanel';
import { EmptyState } from './EmptyState';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { ShareButton } from './ShareButton';

const MapView = dynamic(() => import('./MapView'), { 
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />
});

function ResultContent() {
  const { filteredCandidates, isLoading, selectedId, setSelectedId, timeSlot } = useMapContext();

  return (
    <div className="flex flex-col h-screen md:flex-row overflow-hidden">
      <div className="w-full md:w-[360px] flex flex-col h-full border-r bg-white shrink-0 overflow-y-auto z-40">
        <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-white z-50">
          <Link href="/diagnosis" className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="font-bold">진단 결과</span>
          <ShareButton />
        </header>
        
        <FilterPanel />

        {!isLoading && filteredCandidates.length === 0 && <EmptyState />}
        
        <div className="flex-1 p-4 space-y-4">
          <h4 className="font-bold text-sm px-1">추천 동네 리스트 ({filteredCandidates.length})</h4>
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
          ) : (
            filteredCandidates.map(c => <CandidateCard key={c.id} candidate={c} />)
          )}
        </div>
      </div>

      <div className="flex-1 relative h-[60vh] md:h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-bold text-slate-600">최적의 위치를 계산 중입니다...</p>
            </div>
          </div>
        )}
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <MapView />
        </Suspense>
        <CandidateDetailPanel />
      </div>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: any }) {
  const { setSelectedId, selectedId, timeSlot } = useMapContext();
  const info = candidate.commuteInfo[timeSlot];
  
  return (
    <Card 
      className={`cursor-pointer transition-all border-2 ${selectedId === candidate.id ? 'border-primary shadow-md' : 'border-transparent shadow-sm'}`}
      onClick={() => setSelectedId(candidate.id)}
    >
      <div className="p-4">
        <h5 className="font-bold text-lg mb-2">{candidate.name}</h5>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 p-2 rounded-lg">
            <p className="text-muted-foreground mb-1">내 통근</p>
            <p className="font-bold text-primary">{info.partner1.duration}분</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg">
            <p className="text-muted-foreground mb-1">배우자 통근</p>
            <p className="font-bold text-primary">{info.partner2.duration}분</p>
          </div>
        </div>
        <div className="mt-3 text-right">
          <span className="text-sm font-bold">{Math.floor(candidate.price).toLocaleString()}만원</span>
        </div>
      </div>
    </Card>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <MapProvider>
        <ResultContent />
      </MapProvider>
    </Suspense>
  );
}
