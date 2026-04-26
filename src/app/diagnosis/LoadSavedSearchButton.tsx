'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw } from 'lucide-react';

interface SavedSearch {
  address1: string;
  address2?: string;
  mode: 'couple' | 'single';
}

export function LoadSavedSearchButton() {
  const { setValue } = useFormContext();
  const { toast } = useToast();
  const [savedData, setSavedData] = useState<SavedSearch | null>(null);

  useEffect(() => {
    // 50% 확률로 저장된 데이터가 있는 것처럼 시뮬레이션 (localStorage 미사용)
    const hasSaved = Math.random() > 0.5;
    if (hasSaved) {
      setSavedData({
        address1: '테헤란로 427',
        address2: '판교역로 166',
        mode: 'couple',
      });
    }
  }, []);

  const handleLoad = () => {
    if (!savedData) return;

    // 지오코딩 실패 시나리오 시뮬레이션 (특정 키워드 포함 시 에러)
    const isInvalid = savedData.address1.includes('실패') || (savedData.address2 && savedData.address2.includes('실패'));
    
    if (isInvalid) {
      toast({
        variant: 'destructive',
        title: '저장된 주소를 불러올 수 없습니다',
        description: '주소를 다시 입력해주세요.',
      });
      return;
    }

    // 폼 값 복원
    setValue('mode', savedData.mode);
    setValue('address1', savedData.address1);
    if (savedData.address2) {
      setValue('address2', savedData.address2);
    }

    toast({
      title: '이전 조건이 복원되었습니다',
      description: '입력된 정보를 확인하고 진단을 시작해보세요.',
    });
  };

  if (!savedData) return null;

  return (
    <div className="flex justify-end mb-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleLoad}
        className="text-xs h-9 gap-2 rounded-lg border-slate-200"
        aria-label="이전 진단 조건 불러오기"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        이전 조건 불러오기
      </Button>
    </div>
  );
}
