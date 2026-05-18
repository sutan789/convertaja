import React from 'react';

// Meskipun namanya CursorGlow (dari versi sebelumnya), sekarang komponen ini 
// menangani animasi background otomatis yang bergerak sendiri (self-animating).
export default function CursorGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Orb Biru */}
      <div 
        className="absolute top-0 -left-10 w-[500px] h-[500px] bg-blue-400/40 rounded-full mix-blend-multiply blur-[120px] animate-blob"
      />
      {/* Orb Ungu */}
      <div 
        className="absolute top-20 -right-10 w-[450px] h-[450px] bg-purple-400/40 rounded-full mix-blend-multiply blur-[120px] animate-blob animation-delay-2000"
      />
      {/* Orb Nila/Indigo */}
      <div 
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-400/30 rounded-full mix-blend-multiply blur-[120px] animate-blob animation-delay-4000"
      />
    </div>
  );
}
