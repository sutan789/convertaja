import React from 'react';
import Link from 'next/link';
import { Shield, Zap, Heart, Code2, Lock } from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami - ConvertAja',
  description: 'Pelajari misi dan cerita di balik ConvertAja.',
};

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-white overflow-hidden">
        {/* Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Mendefinisikan Ulang <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Manajemen File.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10">
            ConvertAja lahir dari rasa frustrasi terhadap alat konversi online yang penuh iklan mengganggu, fitur yang dibatasi, dan tidak menghargai privasi data penggunanya.
          </p>
        </div>
      </section>

      {/* Cerita Kami & Filosofi */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Teks */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
                <Heart size={16} className="fill-blue-700" />
                <span>Misi Kami</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Privasi adalah Hak Dasar, <br className="hidden sm:block"/> Bukan Fitur Premium.
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Hampir semua website pengelola PDF di internet mengharuskan Anda mengunggah dokumen penting—seperti KTP, kontrak kerja, hingga data finansial—ke server pihak ketiga. Bagi kami, itu adalah risiko keamanan yang sangat besar.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Di <strong>ConvertAja</strong>, kami menggunakan teknologi browser mutakhir untuk memastikan <span className="font-bold text-slate-800">100% pemrosesan file terjadi langsung di dalam perangkat Anda</span>. Tidak ada satu byte pun dari file Anda yang pernah dikirim ke server kami. Anda mendapatkan privasi total, dengan kecepatan instan.
              </p>
            </div>
            
            {/* Kartu Fitur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">100% Aman</h3>
                <p className="text-slate-600 leading-relaxed">Pemrosesan murni di sisi klien. File tidak pernah meninggalkan HP atau PC Anda.</p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-0 sm:mt-12 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Sangat Cepat</h3>
                <p className="text-slate-600 leading-relaxed">Tanpa delay karena proses upload/download. Konversi terjadi secara instan di browser.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Developer */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-blue-950 text-white relative overflow-hidden">
        {/* Pola Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-blue-900 border-4 border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Code2 size={40} className="text-blue-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Dirancang oleh Sutandev</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Seorang pengembang independen yang berdedikasi menciptakan perangkat lunak berkualitas tinggi yang bermanfaat bagi semua orang. ConvertAja adalah bentuk nyata dari komitmen untuk mewujudkan dunia web yang lebih aman, cepat, dan transparan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="https://github.com/sutandev" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-950 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-lg">
              Kunjungi GitHub Sutandev
            </a>
            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-300 font-bold rounded-xl hover:bg-blue-900 transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Terakhir */}
      <section className="py-20 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Siap Mengelola File Anda?</h2>
        <Link href="/tools/merge-pdf" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 transition-all">
          Coba Tools Sekarang <Lock size={18} className="ml-2" />
        </Link>
      </section>
    </div>
  );
}
