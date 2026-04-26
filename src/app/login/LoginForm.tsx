'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageCircle } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();

  const handleSocialLogin = (provider: 'kakao' | 'naver') => {
    // In a real implementation, this would trigger Supabase Auth OAuth flow
    console.log(`Logging in with ${provider}`);
    router.push('/diagnosis');
  };

  const handleGuestEntry = () => {
    router.push('/diagnosis');
  };

  return (
    <div className="w-full space-y-4">
      <Button
        onClick={() => handleSocialLogin('kakao')}
        className="w-full h-14 bg-kakao hover:bg-kakao/90 text-[#191919] font-bold rounded-xl border-none flex gap-3"
        aria-label="카카오로 시작하기"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        카카오로 시작하기
      </Button>

      <Button
        onClick={() => handleSocialLogin('naver')}
        className="w-full h-14 bg-naver hover:bg-naver/90 text-white font-bold rounded-xl border-none flex gap-3"
        aria-label="네이버로 시작하기"
      >
        <div className="w-5 h-5 flex items-center justify-center font-black text-lg">N</div>
        네이버로 시작하기
      </Button>

      <div className="flex items-center gap-4 py-4">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground font-medium">또는</span>
        <Separator className="flex-1" />
      </div>

      <Button
        variant="outline"
        onClick={handleGuestEntry}
        className="w-full h-14 rounded-xl font-medium border-slate-200 hover:bg-slate-50"
        aria-label="로그인 없이 체험하기"
      >
        로그인 없이 체험하기
      </Button>
    </div>
  );
}
