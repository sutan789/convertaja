'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { loginWithEmail } from '@/app/actions/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Mohon isi email dan password Anda.');
      return;
    }
    
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = await loginWithEmail(formData);

      if (result.error) {
        setErrorMessage(result.error);
        setIsLoading(false);
      } else if (result.success) {
        router.push('/tools/merge-pdf');
        router.refresh(); 
      }
    } catch (error) {
      setErrorMessage('Gagal menghubungi server.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
      {/* Kolom Kiri: Form Login */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-12 relative z-10">
        <div className="max-w-md w-full mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo1.png" alt="ConvertAja" className="h-12 w-auto object-contain mix-blend-multiply scale-[1.5]" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Selamat Datang
            </h1>
            <p className="text-slate-500 text-sm">
              Masuk untuk melanjutkan ke dashboard manajemen file Anda.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 flex items-center animate-in fade-in slide-in-from-top-2">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" 
                  placeholder="nama@email.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kata Sandi</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" />
                <label htmlFor="remember" className="ml-2 block text-sm text-slate-600 cursor-pointer">Ingat Saya</label>
              </div>
              <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Lupa sandi?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full mt-4 flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white transition-all transform hover:-translate-y-0.5
                ${isLoading ? 'bg-blue-400 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <>Masuk ke Dashboard <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <a href="#" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Daftar Sekarang
            </a>
          </p>
        </div>
      </div>

      {/* Kolom Kanan: Banner Image / Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-950 border-l border-blue-800">
        {/* Abstract Background Animation */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>

        {/* Konten Banner */}
        <div className="relative z-10 flex flex-col justify-center h-full p-16 lg:p-24 w-full">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl">
            <div className="bg-gradient-to-br from-white/20 to-white/5 w-16 h-16 flex items-center justify-center rounded-2xl mb-8 shadow-lg shadow-blue-500/30 border border-white/10">
              <ShieldCheck className="text-white h-8 w-8" />
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Keamanan File Anda<br/>Adalah Prioritas Kami.
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-10">
              ConvertAja memproses file Anda sepenuhnya di dalam memori browser, tanpa perlu diunggah ke server. Sangat cepat, aman, dan tanpa jejak digital.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-blue-900 bg-blue-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-blue-900 bg-cyan-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-blue-900 bg-indigo-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-blue-900 bg-blue-800 flex items-center justify-center text-xs text-white font-bold">+2k</div>
              </div>
              <p className="text-sm font-medium text-blue-200">Pengguna Aktif Bulan Ini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
