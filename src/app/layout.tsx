import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { LayoutProvider } from '@/components/layout-provider';

export const metadata: Metadata = {
  title: '游戏宇宙中心',
  description: '您的手机游戏终极下载站。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LayoutProvider>
          {children}
        </LayoutProvider>
        <Toaster />
      </body>
    </html>
  );
}
