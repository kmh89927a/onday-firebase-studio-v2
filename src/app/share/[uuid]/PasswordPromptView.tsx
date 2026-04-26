'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight } from 'lucide-react';

export function PasswordPromptView({ uuid }: { uuid: string }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 검증 후 리디렉션 또는 상태 업데이트
    alert('실제 구현 시 비밀번호 검증이 수행됩니다.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">비밀번호가 필요합니다</h1>
          <p className="text-sm text-muted-foreground">
            이 리포트는 비밀번호로 보호되어 있습니다.<br />
            공유하신 분께 문의해주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="비밀번호 입력"
            className="h-14 rounded-xl text-center text-lg tracking-widest border-slate-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full h-14 font-bold rounded-xl gap-2">
            리포트 보기
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
