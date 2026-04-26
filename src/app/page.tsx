import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Share2, Clock, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">내집 코디</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col px-6 py-12 gap-12">
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold leading-tight">
              3040 맞벌이 부부를 위한<br />
              <span className="text-primary text-4xl">완벽한 동네 궁합</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              서로 다른 두 직장, 한정된 이사 데드라인.<br />
              동선을 고려한 최적의 거주지를 데이터로 진단해 드립니다.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
              <Link href="/login">지금 바로 진단하기</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 text-lg font-bold rounded-xl border-primary text-primary hover:bg-primary/5 gap-2">
              <Link href="/deadline">
                <Zap className="w-5 h-5 fill-current" />
                긴급 이사 모드 (데드라인)
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
            <div className="bg-blue-100 p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">동선 교집합 분석</h3>
              <p className="text-sm text-muted-foreground mt-1">두 사람의 출퇴근 시간을 고려해 최적의 후보지를 제안합니다.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">데드라인 타임라인</h3>
              <p className="text-sm text-muted-foreground mt-1">이사 날짜를 입력하면 역순으로 준비 일정을 관리해 드립니다.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
            <div className="bg-green-100 p-3 rounded-xl">
              <Share2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">결과 공유</h3>
              <p className="text-sm text-muted-foreground mt-1">분석 리포트를 배우자에게 즉시 공유하고 함께 고민하세요.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="p-6 text-center text-xs text-muted-foreground border-t bg-slate-50">
        © 2024 내집 코디. All rights reserved.
      </footer>
    </div>
  );
}
