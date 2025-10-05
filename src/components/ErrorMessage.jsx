import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center py-10 bg-red-100 border-4 border-red-500 rounded-md">
      <div className="text-red-600 mb-4">
        <AlertCircle className="h-16 w-16 mx-auto" />
      </div>
      <h3 className="text-2xl font-bold text-black mb-4 uppercase">ERROR! SOMETHING WENT WRONG!</h3>
      <p className="text-black font-bold mb-6 text-lg">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 border-2 border-red-700 text-lg font-bold rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <RefreshCw className="h-6 w-6 mr-2" />
          TRY AGAIN
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
