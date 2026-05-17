'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // We log to console, but could also send to an analytics/logging service
    console.error('Core application crash:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-amber-500 font-mono p-4">
      <div className="max-w-2xl w-full border border-red-500/50 bg-red-900/10 p-8 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,0,0.05)_2px,rgba(255,0,0,0.05)_4px)] pointer-events-none" />
        
        <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-[0.2em] text-red-500 uppercase flex items-center gap-4">
          <span className="w-4 h-4 bg-red-500 animate-pulse" />
          SYSTEM_FAILURE
        </h2>
        
        <p className="text-amber-500/70 mb-6 text-sm md:text-base leading-relaxed tracking-wider border-l-2 border-red-500/30 pl-4 py-2">
          A critical exception occurred initializing the neuro-link interface. 
          The connection was unexpectedly terminated.
          <br /><br />
          <span className="text-red-500/70 block break-all">ERR_DETAILS: {error.message || 'unknown_exception'}</span>
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => reset()}
            className="px-6 py-3 border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500 transition-all uppercase tracking-widest text-xs md:text-sm font-bold bg-black/50"
          >
            [ REBOOT_SYSTEM ]
          </button>
          
          <Link href="/">
            <button className="px-6 py-3 border border-white/10 text-white/50 hover:bg-white/5 hover:border-white/30 hover:text-white transition-all uppercase tracking-widest text-xs md:text-sm bg-black/50">
              [ RETURN_TO_NEXUS ]
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
