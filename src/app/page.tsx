import Link from 'next/link';
import { FileUp, Cpu, Download, FileText, QrCode, FileImage, Layers, Scissors, FileArchive, CheckCircle2 } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import CursorGlow from '@/components/CursorGlow';

export default function Home() {
  const tools = [
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
      {/* Hero Section */}
      <section className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 text-center bg-slate-50 overflow-hidden">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>
        
        {/* Glowing Interactive Orbs */}
        <CursorGlow />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Kelola File & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">QR Code</span><br className="hidden sm:block" /> Lebih Cerdas
          </h1>
          <p className="mt-6 text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Platform modern untuk mengubah PDF, memisahkan halaman, hingga membuat QR Code. 
            Berjalan secepat kilat langsung di browser Anda. <span className="font-semibold text-gray-800">Aman & 100% Gratis.</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="#tools" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300">
              Mulai Konversi Sekarang
            </Link>
            <Link href="#tools" className="w-full sm:w-auto bg-white text-gray-700 hover:text-primary border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-300">
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
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:ring-2 hover:ring-primary/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-primary rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white shadow-sm transition-all duration-300 transform group-hover:scale-110">
                      <tool.icon size={28} />
                    </div>
                    {tool.isBeta && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20 shadow-sm">
                        BETA
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">Akses alat ini untuk memproses file Anda secara instan dan aman.</p>
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
            <div>
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/30">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Upload</h3>
              <p className="text-gray-500">Pilih file dari komputer atau tarik langsung ke area dropzone kami.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/30">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proses</h3>
              <p className="text-gray-500">Sistem kami akan memproses file Anda dalam hitungan detik dengan kualitas tinggi.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/30">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Download</h3>
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
