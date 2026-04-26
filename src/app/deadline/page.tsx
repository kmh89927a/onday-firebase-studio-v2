'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CalendarIcon, Send } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { TimelineCard, TimelineStep } from './TimelineCard';
import { useRouter } from 'next/navigation';

export default function DeadlinePage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeline, setTimeline] = useState<TimelineStep[] | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleCalculate = () => {
    if (!date) return;

    const diff = differenceInDays(date, new Date());
    
    if (diff < 7) {
      toast({
        variant: "destructive",
        title: "이사일 설정 오류",
        description: "이사일은 7일 이후로 선택해주세요.",
      });
      return;
    }

    // 더미 타임라인 생성
    const steps: TimelineStep[] = [
      {
        id: '1',
        title: '매물 탐색 및 방문 예약',
        description: '후보지 리스트를 바탕으로 실시간 매물을 탐색하고 주말 방문 일정을 잡습니다.',
        dueDate: addDays(date, -30),
        dDay: 30,
        status: 'pending'
      },
      {
        id: '2',
        title: '현장 방문 및 가계약',
        description: '집 상태를 최종 확인하고 마음에 드는 매물에 가계약금을 입금하여 홀딩합니다.',
        dueDate: addDays(date, -21),
        dDay: 21,
        status: 'pending'
      },
      {
        id: '3',
        title: '본계약 및 계약금 납부',
        description: '공인중개사무소에서 임대차 계약서를 작성하고 계약금 10%를 완납합니다.',
        dueDate: addDays(date, -14),
        dDay: 14,
        status: 'pending'
      },
      {
        id: '4',
        title: '잔금 준비 및 서류 체크',
        description: '대출 실행 확인 및 잔금을 준비하고, 확정일자 부여 등 행정 처리를 미리 체크합니다.',
        dueDate: addDays(date, -7),
        dDay: 7,
        status: 'urgent'
      },
      {
        id: '5',
        title: '이사 및 잔금 지급',
        description: '이사 당일 잔금을 입금하고 입주를 완료합니다. 즉시 전입신고를 진행하세요.',
        dueDate: date,
        dDay: 0,
        status: 'urgent'
      }
    ];

    setTimeline(steps);
    
    toast({
      title: "타임라인 생성 완료",
      description: "데드라인에 맞춘 준비 일정이 계산되었습니다.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="p-4 border-b flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors" aria-label="홈으로 이동">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-headline font-bold text-lg">긴급 이사 데드라인</h1>
      </header>

      <div className="flex-1 px-6 py-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">언제까지 이사해야 하나요?</h2>
          <p className="text-muted-foreground text-sm">
            이사 데드라인을 입력하시면 거꾸로 계산한<br />
            준비에 최적의 스케줄을 짜서 드릴게요.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary" />
              희망 이사 날짜
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-14 justify-start text-left font-normal rounded-xl border-slate-200",
                    !date && "text-muted-foreground"
                  )}
                  aria-label="이사 날짜 선택"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy년 MM월 dd일", { locale: ko }) : <span>날짜를 선택하세요</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < addDays(new Date(), 0)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            onClick={handleCalculate}
            className="w-full h-14 text-lg font-bold rounded-xl"
            disabled={!date}
            aria-label="이사 타임라인 생성하기"
          >
            타임라인 생성하기
          </Button>
        </div>

        {timeline && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TimelineCard steps={timeline} className="mb-8" />
            <Button 
              onClick={() => router.push('/deadline/listings')}
              className="w-full h-14 bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-none font-bold rounded-xl gap-2"
              aria-label="추천 동네 매물 보러가기"
            >
              추천 동네 매물 보러가기
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
