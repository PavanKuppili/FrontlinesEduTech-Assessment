import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-blue-100 border-2 border-blue-300 rounded-md">
      <Loader2 className="h-16 w-16 animate-spin text-blue-700" />
      <p className="mt-4 text-xl font-bold text-black uppercase">LOADING COMPANIES...</p>
      <p className="text-black">Please wait while we fetch the data!</p>
    </div>
  );
};

export default LoadingSpinner;
