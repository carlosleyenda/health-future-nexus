
import React from 'react';

export default function ConnectionStatus() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-full text-sm shadow-lg">
        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        Conectado
      </div>
    </div>
  );
}
