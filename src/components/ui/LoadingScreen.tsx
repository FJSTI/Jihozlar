import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Yuklanmoqda...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;