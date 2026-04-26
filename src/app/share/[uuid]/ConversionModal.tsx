'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Users, ShieldCheck, MapPin } from 'lucide-react';

interface ConversionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConversionModal({ open, onOpenChange }: ConversionModalProps) {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6 overflow-hidden">
        <DialogHeader className="items-center text-center space-y-4 pt-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-xl font-bold">
              전체 후보 동네 정보를 보고 싶으세요?
            </DialogTitle>
            <DialogDescription className="text-sm">
              간편 회원가입 후 두 사람의 라이프스타일에<br />
              꼭 맞는 모든 동네 분석 결과를 확인하실 수 있습니다.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <p className="font-bold">모든 추천 지역 상세 분석</p>
              <p>출퇴근 루트, 편의시설, 치안 정보를 한눈에</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <p className="font-bold">내 맞춤 필터 저장</p>
              <p>나중에 다시 봐도 내가 설정한 예산과 시간이 그대로</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
          <Button 
            onClick={handleSignup} 
            className="w-full h-12 text-md font-bold rounded-xl"
            aria-label="회원가입하기"
          >
            회원가입하기
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="w-full h-12 text-slate-400 font-medium"
            aria-label="나중에 하기"
          >
            나중에
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
