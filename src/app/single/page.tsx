import { SingleForm } from './SingleForm';
import { ChevronLeft, User } from 'lucide-react';
import Link from 'next/link';

export default function SinglePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="p-4 border-b flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-headline font-bold text-lg">1인 가구 동네 진단</h1>
      </header>

      <div className="flex-1 px-6 py-8">
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center justify-center bg-blue-50 p-2 rounded-lg mb-2">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">나만의 라이프스타일 찾기</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            학군이나 가족 인프라보다는<br />
            치안, 편의성, 여가 동선을 최우선으로 분석합니다.
          </p>
        </div>

        <SingleForm />
      </div>
    </div>
  );
}
