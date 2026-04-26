'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  dDay: number;
  status: 'pending' | 'urgent' | 'completed';
}

interface TimelineCardProps {
  steps: TimelineStep[];
  className?: string;
}

export function TimelineCard({ steps, className }: TimelineCardProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-bold flex items-center gap-2 text-lg">
        <Clock className="w-5 h-5 text-primary" />
        이사 준비 타임라인
      </h3>
      <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100">
        {steps.map((step) => {
          const isUrgent = step.dDay <= 3 && step.dDay >= 0;
          return (
            <div key={step.id} className="relative flex items-start gap-6 group">
              <div className={cn(
                "mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white z-10 transition-colors",
                step.status === 'completed' ? "border-green-500 bg-green-50" : 
                isUrgent ? "border-destructive bg-destructive/5" : "border-slate-200"
              )}>
                {step.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : isUrgent ? (
                  <AlertCircle className="w-6 h-6 text-destructive animate-pulse" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <Card className={cn(
                "flex-1 border-none shadow-sm transition-all group-hover:shadow-md",
                isUrgent ? "bg-destructive/5" : "bg-white"
              )}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm">{step.title}</h4>
                    <Badge variant={isUrgent ? "destructive" : "outline"} className="shrink-0 text-[10px]">
                      {step.dDay === 0 ? "D-Day" : step.dDay > 0 ? `D-${step.dDay}` : `D+${Math.abs(step.dDay)}`}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  <div className="text-[10px] font-medium text-slate-400">
                    예정일: {step.dueDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
