
import type {Metadata, Viewport} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '내집 코디 | 맞벌이 부부 맞춤 동네 궁합',
  description: '두 직장 주소를 기반으로 최적의 거주지 교집합을 찾아드리는 프롭테크 서비스',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || 'your_fallback_key'}&autoload=false`}
          strategy="beforeInteractive"
        />
        <main className="max-w-[768px] mx-auto min-h-screen bg-white shadow-sm md:shadow-xl">
          {children}
        </main>
      </body>
    </html>
  );
}
