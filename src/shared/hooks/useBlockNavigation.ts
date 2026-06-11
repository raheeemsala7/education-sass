'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function useBlockNavigation(shouldBlock: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (!shouldBlock) {
      lastPath.current = pathname;
      return;
    }

    if (pathname !== lastPath.current) {
      router.push(lastPath.current);
      alert('🚨 يتم رفع الفيديو حاليًا، برجاء عدم مغادرة الصفحة');
    }
  }, [pathname, shouldBlock, router]);
}
