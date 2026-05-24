import Link from 'next/link';
import type { Metadata } from 'next';
import { FileUp, Cpu, Download, FileText, QrCode, FileImage, Layers, Scissors, FileArchive, CheckCircle2, PenTool } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import CursorGlow from '@/components/CursorGlow';

export const metadata: Metadata = {
  title: "ConvertAja — Konversi PDF, Word, QR Code Online Gratis",
  description: "Tools online gratis untuk konversi PDF ke Word, Word ke PDF, Merge PDF, Split PDF, kompres PDF, buat QR Code, dan tanda tangan digital. Cepat dan aman.",
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ConvertAja',
  url: 'https://convertaja.vercel.app',
  description: 'Tools online gratis untuk konversi PDF, Word, dan buat QR Code',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://convertaja.vercel.app/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  const tools = [
    { name: 'Tanda Tangan PDF', href: '/tools/sign-pdf', icon: PenTool, isBeta: false },
    { name: 'Tanda Tangan Digital', href: '/tools/digital-signature', icon: PenTool, isBeta: false },
    { name: 'Link to QR Code', href: '/tools/qr-code', icon: QrCode, isBeta: false },
    { name: 'Merge PDF', href: '/tools/merge-pdf', icon: Layers, isBeta: false },
    { name: 'Split PDF', href: '/tools/split-pdf', icon: Scissors, isBeta: false },
    { name: 'Image to PDF', href: '/tools/image-to-pdf', icon: FileImage, isBeta: false },
    { name: 'Compress PDF', href: '/tools/compress-pdf', icon: FileArchive, isBeta: true },
    { name: 'PDF to Word', href: '/tools/pdf-to-word', icon: FileText, isBeta: true },
    { name: 'Word to PDF', href: '/tools/word-to-pdf', icon: FileText, isBeta: true },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* JSON-LD Structured Data untuk Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}

      <section className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 text-center bg-slate-50 overflow-hidden">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>
        
        {/* Glowing Interactive Orbs */}
        <CursorGlow />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Kelola File & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse">QR Code</span><br className="hidden sm:block" /> Lebih Cerdas
          </h1>
          <p className="mt-6 text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Platform modern untuk mengubah PDF, memisahkan halaman, hingga membuat QR Code. 
            Berjalan secepat kilat langsung di browser Anda. <span className="font-semibold text-gray-800">Aman & 100% Gratis.</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in zoom-in-95 duration-700 delay-300">
            <Link href="#tools" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              Mulai Konversi Sekarang
            </Link>
            <Link href="#tools" className="w-full sm:w-auto bg-white text-gray-700 hover:text-blue-600 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              Lihat Semua Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tools Unggulan Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, idx) => (
              <Link key={tool.name} href={tool.href} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:ring-4 hover:ring-blue-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-0"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 group-hover:rotate-6 transition-all duration-300 transform group-hover:scale-110">
                      <tool.icon size={28} />
                    </div>
                    {tool.isBeta && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[10px] uppercase font-extrabold text-amber-700 ring-1 ring-inset ring-amber-600/20 shadow-sm group-hover:bg-amber-100 transition-colors">
                        BETA
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{tool.name}</h3>
                  <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Akses alat ini untuk memproses file Anda secara instan dan aman.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Bagaimana Cara Kerjanya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group cursor-default">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl rotate-3 group-hover:rotate-0 flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Upload</h3>
              <p className="text-gray-500">Pilih file dari komputer atau tarik langsung ke area dropzone kami.</p>
            </div>
            <div className="group cursor-default">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl -rotate-3 group-hover:rotate-0 flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Proses</h3>
              <p className="text-gray-500">Sistem kami akan memproses file Anda dalam hitungan detik dengan kualitas tinggi.</p>
            </div>
            <div className="group cursor-default">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl rotate-3 group-hover:rotate-0 flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Download</h3>
              <p className="text-gray-500">Simpan hasil konversi langsung ke perangkat Anda dengan aman.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Cpu} 
              title="Sangat Cepat" 
              description="Server berkecepatan tinggi memproses file per detik." 
            />
            <FeatureCard 
              icon={CheckCircle2} 
              title="Sederhana" 
              description="Antarmuka minimalis yang didesain untuk kemudahan penggunaan." 
            />
            <FeatureCard 
              icon={FileUp} 
              title="Tanpa Akun" 
              description="Gunakan semua fitur kami tanpa perlu melakukan registrasi." 
            />
            <FeatureCard 
              icon={Download} 
              title="Aman & Terpercaya" 
              description="File akan dihapus permanen dari server kami setelah 1 jam." 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
