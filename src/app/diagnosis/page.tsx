import { DiagnosisForm } from './DiagnosisForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-headline font-bold text-lg">동네 궁합 진단</h1>
      </header>

      <div className="flex-1 px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">어디로 출퇴근하시나요?</h2>
          <p className="text-muted-foreground text-sm">
            두 분의 직장 위치를 기반으로 가장 살기 좋은<br />
            중간 지점을 분석해 드릴게요.
          </p>
        </div>

        <DiagnosisForm />
      </div>
    </div>
  );
}
