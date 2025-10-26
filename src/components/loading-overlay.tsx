'use client';

import { Gamepad2 } from 'lucide-react';

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Gamepad2 className="h-16 w-16 text-primary animate-bounce" />
        <p className="text-xl font-semibold text-primary">加载中...</p>
      </div>
    </div>
  );
}
