import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Database, Calendar } from 'lucide-react';

interface DataSourceBadgeProps {
  source: 'official' | 'aggregated';
  date: string;
}

export function DataSourceBadge({ source, date }: DataSourceBadgeProps) {
  const isOfficial = source === 'official';
  
  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="outline" 
        className={`text-[10px] font-medium py-0 h-6 gap-1 px-2 border-none ${
          isOfficial 
            ? 'bg-green-50 text-green-700' 
            : 'bg-blue-50 text-blue-700'
        }`}
      >
        <Database className="w-3 h-3" />
        {isOfficial ? '카카오 모빌리티 공식 데이터' : '통합 데이터베이스'}
      </Badge>
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-slate-100 px-2 h-6 rounded-full">
        <Calendar className="w-3 h-3" />
        <span>최종 업데이트 {date}</span>
      </div>
    </div>
  );
}
