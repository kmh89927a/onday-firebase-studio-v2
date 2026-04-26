import React from 'react';
import { Metadata } from 'next';
import { ShareReportView } from './ShareReportView';
import { ExpiredView } from './ExpiredView';
import { PasswordPromptView } from './PasswordPromptView';
import { selectCandidates } from '@/lib/mocks/candidate-selector';

interface SharePageProps {
  params: Promise<{
    uuid: string;
  }>;
  searchParams: Promise<{
    addrA?: string;
    addrB?: string;
    mode?: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: SharePageProps): Promise<Metadata> {
  const { addrA, addrB } = await searchParams;
  const description = addrA && addrB 
    ? `${addrA}와 ${addrB} 사이의 최적 거주지 진단 결과입니다.`
    : '우리 부부의 라이프스타일에 딱 맞는 최적의 동네를 찾아냈어요!';

  return {
    title: '내집 코디 | 맞벌이 부부 맞춤 진단 결과',
    description,
    openGraph: {
      title: '내집 코디 | 맞벌이 부부 맞춤 진단 결과',
      description,
      images: ['https://picsum.photos/seed/codi_share/1200/630'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: '내집 코디 | 맞벌이 부부 맞춤 진단 결과',
      description,
      images: ['https://picsum.photos/seed/codi_share/1200/630'],
    },
  };
}

export default async function SharePage({ params, searchParams }: SharePageProps) {
  const { uuid } = await params;
  const { addrA, addrB } = await searchParams;

  // 더미 로직: 만료되거나 로그인이 필요한 경우 시뮬레이션
  const isExpired = uuid.startsWith('exp');
  const isAuthRequired = uuid.startsWith('auth');

  if (isExpired) {
    return <ExpiredView />;
  }

  if (isAuthRequired) {
    return <PasswordPromptView uuid={uuid} />;
  }

  // 실시간 데이터 생성 (Mock)
  const candidates = selectCandidates(addrA || '서울시청', addrB);

  return <ShareReportView uuid={uuid} candidates={candidates} />;
}
