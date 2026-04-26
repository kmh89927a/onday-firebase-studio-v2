import React from 'react';
import { Metadata } from 'next';
import { ShareReportView } from './ShareReportView';
import { ExpiredView } from './ExpiredView';
import { PasswordPromptView } from './PasswordPromptView';

interface SharePageProps {
  params: {
    uuid: string;
  };
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  return {
    title: '내집 코디 | 맞벌이 부부 맞춤 진단 결과',
    description: '우리의 라이프스타일에 딱 맞는 최적의 동네를 찾아냈어요! 지금 결과를 확인해보세요.',
    openGraph: {
      title: '내집 코디 | 맞벌이 부부 맞춤 진단 결과',
      description: '우리의 라이프스타일에 딱 맞는 최적의 동네를 찾아냈어요! 지금 결과를 확인해보세요.',
      images: ['https://picsum.photos/seed/codi_share/1200/630'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: '내집 코디 | 맞벌이 부부 맞춤 진단 결과',
      description: '우리의 라이프스타일에 딱 맞는 최적의 동네를 찾아냈어요! 지금 결과를 확인해보세요.',
      images: ['https://picsum.photos/seed/codi_share/1200/630'],
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { uuid } = params;

  // 더미 로직: 만료되거나 로그인이 필요한 경우 시뮬레이션
  // OAuth 전용 정책에 따라 비밀번호(pw) 접두사는 '로그인 필요' 의미로 사용
  const isExpired = uuid.startsWith('exp');
  const isAuthRequired = uuid.startsWith('pw') || uuid.startsWith('auth');

  if (isExpired) {
    return <ExpiredView />;
  }

  if (isAuthRequired) {
    return <PasswordPromptView uuid={uuid} />;
  }

  return <ShareReportView uuid={uuid} />;
}
