'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ShareButton() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleShare = async () => {
    const dummyUuid = Math.random().toString(36).substring(2, 15);
    const shareUrl = `${window.location.origin}/share/${dummyUuid}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      toast({
        title: "공유 링크가 복사되었습니다",
        description: "원하는 곳에 붙여넣어 결과를 공유해보세요.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "링크 복사에 실패했습니다",
        description: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size={copied ? "default" : "icon"}
      onClick={handleShare}
      className={`transition-all duration-300 ${copied ? 'gap-2 px-3 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700' : ''}`}
      aria-label="진단 결과 공유 링크 생성"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          <span className="text-xs font-bold" role="status">복사됨!</span>
        </>
      ) : (
        <Share2 className="w-5 h-5" />
      )}
    </Button>
  );
}
