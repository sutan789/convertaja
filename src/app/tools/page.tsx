import React from 'react';
import Link from 'next/link';
import { 
  FileText, FileUp, Scissors, Minimize2, 
  Image as ImageIcon, Layers, PenTool, QrCode, 
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Semua Fitur - ConvertAja',
  description: 'Jelajahi semua fitur dan alat PDF online gratis dari ConvertAja. Konversi, kompres, pisahkan, dan gabungkan PDF Anda dengan mudah.',
};

const tools = [
  {
    category: "Konversi PDF",
    items: [
      {
        title: "PDF ke Word",
        description: "Ubah file PDF menjadi dokumen Word (DOCX) yang dapat diedit dengan mudah.",
        icon: <FileText size={24} />,
        href: "/tools/pdf-to-word",
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Word ke PDF",
        description: "Ubah dokumen Word Anda menjadi format PDF yang rapi dan siap dicetak.",
        icon: <FileUp size={24} />,
        href: "/tools/word-to-pdf",
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Gambar ke PDF",
        description: "Konversi JPG, PNG, dan gambar lainnya menjadi dokumen PDF dengan cepat.",
        icon: <ImageIcon size={24} />,
        href: "/tools/image-to-pdf",
        color: "bg-blue-100 text-blue-600",
      }
    ]
  },
  {
    category: "Manajemen & Optimasi PDF",
    items: [
      {
        title: "Gabungkan PDF",
        description: "Gabungkan beberapa file PDF menjadi satu dokumen tunggal.",
        icon: <Layers size={24} />,
        href: "/tools/merge-pdf",
        color: "bg-emerald-100 text-emerald-600",
      },
      {
        title: "Pisahkan PDF",
        description: "Ekstrak halaman tertentu atau pisahkan setiap halaman menjadi file PDF terpisah.",
        icon: <Scissors size={24} />,
        href: "/tools/split-pdf",
        color: "bg-emerald-100 text-emerald-600",
      },
      {
        title: "Kompres PDF",
        description: "Kurangi ukuran file PDF Anda tanpa mengorbankan kualitas terlalu banyak.",
        icon: <Minimize2 size={24} />,
        href: "/tools/compress-pdf",
        color: "bg-emerald-100 text-emerald-600",
      }
    ]
  },
  {
    category: "Keamanan & Utilitas",
    items: [
      {
        title: "Tanda Tangan PDF",
        description: "Bubuhkan tanda tangan Anda secara langsung ke dalam halaman dokumen PDF.",
        icon: <PenTool size={24} />,
        href: "/tools/sign-pdf",
        color: "bg-purple-100 text-purple-600",
      },
      {
        title: "Buat Tanda Tangan Digital",
        description: "Buat tanda tangan digital Anda sendiri dan unduh sebagai gambar transparan (PNG).",
        icon: <PenTool size={24} />,
        href: "/tools/digital-signature",
        color: "bg-purple-100 text-purple-600",
      },
      {
        title: "Buat QR Code",
        description: "Ubah tautan URL atau teks Anda menjadi kode QR yang bisa dipindai secara instan.",
        icon: <QrCode size={24} />,
        href: "/tools/qr-code",
        color: "bg-purple-100 text-purple-600",
      }
    ]
  }
];

export default function ToolsPage() {
  return (
    <div className="flex-1 bg-slate-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Semua Fitur ConvertAja
          </h1>
          <p className="text-lg text-slate-600">
            Jelajahi berbagai fitur PDF dan utilitas gratis kami. 
            Semuanya diproses secara aman langsung di dalam browser Anda tanpa perlu mengunggah file ke server.
          </p>
        </div>

        {/* Tools Categories */}
        <div className="space-y-16">
          {tools.map((section, index) => (
            <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 150}ms` }}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-500 rounded-full inline-block"></span>
                {section.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((tool, idx) => (
                  <Link href={tool.href} key={idx} className="group block">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-4 rounded-2xl ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                          {tool.icon}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed flex-1">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 relative rounded-[2.5rem] p-10 md:p-16 text-center overflow-hidden border border-blue-500/20 shadow-2xl group">
          {/* Premium Background Effects */}
          <div className="absolute inset-0 bg-blue-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/30 via-blue-950/80 to-blue-950 group-hover:from-blue-500/40 transition-colors duration-700"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50"></div>

          <div className="relative z-10">
            <div className="inline-block bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-sm">
              Privacy First
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-6 tracking-tight">100% Gratis & Aman</h2>
            <p className="text-blue-200/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Semua file diproses menggunakan memori perangkat (Client-Side). 
              Tidak ada satu pun file Anda yang disimpan oleh sistem kami. <strong className="text-white">Privasi Anda adalah prioritas utama.</strong>
            </p>
            <Link href="/tools/pdf-to-word" className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
              Coba Fitur Sekarang
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
