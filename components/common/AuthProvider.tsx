'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
    const tempPath = ['/login', '/logout', '/'];
    if (document.cookie.length === 0 && !tempPath.includes(pathname)) {
      router.push('/login');
    }
    setTimeout(() => {
      setLoggedIn(true);
    }, 300);
  }, []);

  if (!loggedIn) {
    return <>{'Loading...'}</>;
  }
  return <>{children}</>;
}

export default AuthProvider;
