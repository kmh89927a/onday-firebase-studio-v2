'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, MessageCircle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PasswordPromptView({ uuid }: { uuid: string }) {
  const router = useRouter();

  const handleLogin = (provider: 'kakao' | 'naver') => {
    // 실제 구현 시 Firebase Auth OAuth 팝업/리디렉션 트리거
    console.log(`${provider} 로그인을 통한 리포트 접근`);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">로그인이 필요한 리포트입니다</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            이 리포트는 보안을 위해 작성자 및 허용된 사용자만<br />
            확인할 수 있습니다. 계속하려면 로그인해 주세요.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => handleLogin('kakao')}
            className="w-full h-14 bg-kakao hover:bg-kakao/90 text-[#191919] font-bold rounded-xl border-none flex gap-3"
            aria-label="카카오로 로그인하여 리포트 보기"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            카카오로 시작하기
          </Button>

          <Button
            onClick={() => handleLogin('naver')}
            className="w-full h-14 bg-naver hover:bg-naver/90 text-white font-bold rounded-xl border-none flex gap-3"
            aria-label="네이버로 로그인하여 리포트 보기"
          >
            <div className="w-5 h-5 flex items-center justify-center font-black text-lg">N</div>
            네이버로 시작하기
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="w-full h-12 text-slate-400 font-medium gap-2"
            aria-label="메인 페이지로 돌아가기"
          >
            메인으로 돌아가기
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
