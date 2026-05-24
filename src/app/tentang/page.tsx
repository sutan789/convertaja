import React from 'react';
import Link from 'next/link';
import { Shield, Zap, Heart, Code2, Lock } from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami - ConvertAja',
  description: 'Pelajari misi dan cerita di balik ConvertAja.',
};

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-blue-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-50"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Mendefinisikan Ulang <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Manajemen File.</span>
          </h1>
          <p className="text-xl text-blue-100/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            ConvertAja lahir dari rasa frustrasi terhadap alat konversi online yang penuh iklan mengganggu, fitur yang dibatasi, dan tidak menghargai privasi data penggunanya.
          </p>
        </div>
      </section>

      {/* Cerita Kami & Filosofi */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Teks */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-full font-semibold text-sm mb-6 shadow-sm">
                <Heart size={16} className="text-blue-400" />
                <span>Misi Kami</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                Privasi adalah Hak Dasar, <br className="hidden sm:block"/> Bukan Fitur Premium.
              </h2>
              <p className="text-lg text-blue-100/70 mb-6 leading-relaxed">
                Hampir semua website pengelola PDF di internet mengharuskan Anda mengunggah dokumen penting—seperti KTP, kontrak kerja, hingga data finansial—ke server pihak ketiga. Bagi kami, itu adalah risiko keamanan yang sangat besar.
              </p>
              <p className="text-lg text-blue-100/70 leading-relaxed">
                Di <strong className="text-white">ConvertAja</strong>, kami menggunakan teknologi browser mutakhir untuk memastikan <span className="font-bold text-cyan-400">100% pemrosesan file terjadi langsung di dalam perangkat Anda</span>. Tidak ada satu byte pun dari file Anda yang pernah dikirim ke server kami. Anda mendapatkan privasi total, dengan kecepatan instan.
              </p>
            </div>
            
            {/* Kartu Fitur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-xl border border-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 bg-blue-900/50 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">100% Aman</h3>
                <p className="text-blue-200/70 leading-relaxed">Pemrosesan murni di sisi klien. File tidak pernah meninggalkan HP atau PC Anda.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-xl border border-white/10 mt-0 sm:mt-12 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 bg-blue-900/50 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Sangat Cepat</h3>
                <p className="text-blue-200/70 leading-relaxed">Tanpa delay karena proses upload/download. Konversi terjadi secara instan di browser.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Developer */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-blue-950 text-white relative overflow-hidden">
        {/* Modern Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-950/0 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/20 via-blue-950/0 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
        

        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Visual Column (Hologram Glass Design) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-center mt-10 lg:mt-0">
              <style>{`
                @keyframes orbit-float-1 {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-10px) rotate(3deg); }
                }
                @keyframes orbit-float-2 {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-12px) rotate(-4deg); }
                }
                @keyframes orbit-float-3 {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-8px) rotate(5deg); }
                }
              `}</style>

              <div className="relative group cursor-pointer pt-6 scale-90 sm:scale-100 transition-transform">
                
                {/* Orbiting Tech Badges */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {[
                    { name: "Next.js", size: "w-14 h-14", pos: "-left-14 top-[5%]", anim: "orbit-float-1", delay: "0s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true
                    },
                    { name: "React", size: "w-12 h-12", pos: "-left-8 top-[35%]", anim: "orbit-float-2", delay: "1s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                    },
                    { name: "Node.js", size: "w-12 h-12", pos: "-left-12 bottom-[25%]", anim: "orbit-float-3", delay: "0.5s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                    },
                    { name: "TypeScript", size: "w-12 h-12", pos: "left-[10%] -bottom-4", anim: "orbit-float-1", delay: "2s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", rounded: true
                    },
                    { name: "Python", size: "w-12 h-12", pos: "right-[10%] -bottom-4", anim: "orbit-float-3", delay: "1.5s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                    },
                    { name: "PHP", size: "w-14 h-14", pos: "-right-12 bottom-[25%]", anim: "orbit-float-2", delay: "3s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
                    },
                    { name: "Git", size: "w-12 h-12", pos: "-right-14 top-[40%]", anim: "orbit-float-1", delay: "2.5s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
                    },
                    { name: "JavaScript", size: "w-10 h-10", pos: "-right-8 top-[10%]", anim: "orbit-float-2", delay: "4s",
                      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", rounded: true
                    },
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className={`absolute ${item.pos} ${item.size} bg-[#0a1128]/80 border border-blue-400/20 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-110 hover:bg-[#0a1128] transition-all p-2.5 group/badge`}
                      style={{ animation: `${item.anim} ${4 + (i % 3) * 2}s ease-in-out infinite`, animationDelay: item.delay }}
                      title={item.name}
                    >
                      <div className="w-full h-full flex items-center justify-center transform group-hover/badge:scale-110 transition-transform">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.img} alt={item.name} className={`w-full h-full object-contain ${item.invert ? 'invert brightness-0' : ''} ${item.rounded ? 'rounded' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Glow Background */}
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[2.5rem] blur-lg opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-64 h-[24rem] bg-gradient-to-b from-blue-900/90 to-blue-950/90 backdrop-blur-2xl border border-blue-400/30 rounded-[2.5rem] p-3 shadow-2xl flex flex-col overflow-hidden group-hover:-translate-y-4 transition-transform duration-500 z-10">
                   {/* Inner light */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                   
                   {/* Photo container */}
                   <div className="w-full h-56 rounded-[2rem] overflow-hidden mb-4 relative z-10 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/profil.jpeg" alt="Foto Profil Sutandev" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
                   </div>
                   
                   {/* Info */}
                   <div className="px-4 text-center z-10 pb-4 mt-auto">
                      <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 tracking-tight">SUTANDEV</h3>
                      <p className="text-[11px] text-cyan-400 tracking-widest uppercase mt-2 font-bold">Indie Developer</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8 pl-0 lg:pl-10">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-full font-semibold text-sm mb-6">
                  <Code2 size={16} />
                  <span>Kreator & Inovator</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                  Dirancang Khusus <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">oleh Sutandev.</span>
                </h2>
                <p className="text-lg sm:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Saya membangun <strong className="text-white">ConvertAja</strong> dengan satu visi sederhana: menciptakan utilitas web yang sangat cepat, benar-benar gratis, dan tidak pernah mengorbankan privasi pengguna. Tanpa trik, tanpa unggah ke server, murni dari kekuatan browser Anda.
                </p>
              </div>

              {/* Stats/Highlights */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-blue-800/50 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-white mb-1">100%</span>
                  <span className="text-sm text-blue-300 font-medium">Client-Side Process</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-white mb-1">0</span>
                  <span className="text-sm text-blue-300 font-medium">Data Disimpan di Server</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
                <a 
                  href="https://github.com/sutandev" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-950 font-bold rounded-2xl hover:bg-blue-50 hover:scale-105 transition-all shadow-xl shadow-white/10 group"
                >
                  Lihat GitHub Saya
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform text-blue-950" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-cyan-500/50 text-cyan-200 font-bold rounded-2xl hover:bg-blue-800/50 hover:border-cyan-400 hover:text-white transition-all"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Call to Action Terakhir */}
      <section className="py-24 px-4 text-center bg-blue-950 relative overflow-hidden border-t border-blue-900/50">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-950/0 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-6 tracking-tight">Siap Mengelola File Anda?</h2>
          <p className="text-blue-200/80 mb-10 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Akses seluruh alat konversi dan utilitas file kami secara instan tanpa biaya, tanpa login, dan diproses <strong className="text-white">100% aman di perangkat Anda</strong>.
          </p>
          <Link href="/tools" className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all group w-full sm:w-auto">
            Buka Direktori Tools 
            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
