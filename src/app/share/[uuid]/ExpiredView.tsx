import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, RefreshCw } from 'lucide-react';

export function ExpiredView() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
      <div className="bg-white p-8 rounded-full shadow-sm mb-6">
        <Clock className="w-16 h-16 text-slate-200" />
      </div>
      <h1 className="text-2xl font-bold mb-3">만료된 리포트입니다</h1>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
        보안 및 최신 정보 유지를 위해<br />
        공유 리포트의 유효기간이 지났습니다.
      </p>
      <Button asChild size="lg" className="w-full max-w-xs h-14 font-bold rounded-xl gap-2">
        <Link href="/diagnosis">
          <RefreshCw className="w-5 h-5" />
          다시 진단하기
        </Link>
      </Button>
      <Link href="/" className="mt-6 text-sm text-primary font-medium hover:underline">
        메인으로 돌아가기
      </Link>
    </div>
  );
}
