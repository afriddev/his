'use client';

import React, { useEffect, useState } from 'react';

interface AppSpinnerProps {
  isPending: boolean;
  message?: string;
}

const AppSpinner: React.FC<AppSpinnerProps> = ({ isPending, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isPending) {
      setTimeout(() => setVisible(true), 0);
    } else {
      timeoutId = setTimeout(() => setVisible(false), 300);
    }

    return () => clearTimeout(timeoutId);
  }, [isPending]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin shadow-xl" />
        {message && <p className="text-white text-sm font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default AppSpinner;
