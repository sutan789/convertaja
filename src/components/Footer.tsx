import Link from 'next/link';
import { Code, Mail, Briefcase, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-white flex items-center">
                <span className="text-blue-500 mr-2 bg-white/10 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                </span>
                ConvertAja
              </span>
            </Link>
            <p className="text-sm text-blue-200/70 leading-relaxed mb-6">
              Platform modern untuk mengelola dokumen PDF dan membuat QR Code dengan cepat, aman, dan 100% gratis langsung dari browser Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 hover:bg-blue-600 hover:text-white transition-all"><Code size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 hover:bg-blue-400 hover:text-white transition-all"><Mail size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 hover:bg-blue-700 hover:text-white transition-all"><Briefcase size={18} /></a>
            </div>
          </div>

          {/* Column 2: Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Tools Utama</h3>
            <ul className="space-y-4">
              <li><Link href="/tools/merge-pdf" className="text-sm text-blue-200/80 hover:text-white hover:translate-x-1 inline-block transition-transform">Gabung PDF</Link></li>
              <li><Link href="/tools/split-pdf" className="text-sm text-blue-200/80 hover:text-white hover:translate-x-1 inline-block transition-transform">Pisahkan PDF</Link></li>
              <li><Link href="/tools/image-to-pdf" className="text-sm text-blue-200/80 hover:text-white hover:translate-x-1 inline-block transition-transform">Gambar ke PDF</Link></li>
              <li><Link href="/tools/qr-code" className="text-sm text-blue-200/80 hover:text-white hover:translate-x-1 inline-block transition-transform">QR Code Generator</Link></li>
            </ul>
          </div>

          {/* Column 3: Tools Beta */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Segera Hadir</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/tools/compress-pdf" className="text-sm text-blue-200/80 hover:text-white transition-colors flex items-center">
                  Kompres PDF <span className="ml-2 text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">BETA</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-word" className="text-sm text-blue-200/80 hover:text-white transition-colors flex items-center">
                  PDF ke Word <span className="ml-2 text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">BETA</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/word-to-pdf" className="text-sm text-blue-200/80 hover:text-white transition-colors flex items-center">
                  Word ke PDF <span className="ml-2 text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">BETA</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Perusahaan</h3>
            <ul className="space-y-4">
              <li><Link href="/tentang" className="text-sm text-blue-200/80 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-sm text-blue-200/80 hover:text-white transition-colors">Hubungi Kami</Link></li>
              <li><Link href="/privacy" className="text-sm text-blue-200/80 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="text-sm text-blue-200/80 hover:text-white transition-colors">Syarat Penggunaan</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-blue-900/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-blue-300/60">
            &copy; {new Date().getFullYear()} ConvertAja. All rights reserved.
          </p>
          <div className="text-sm text-blue-200/80 flex items-center bg-blue-900/40 px-4 py-2 rounded-full border border-blue-800/50">
            Developed with <Heart size={14} className="mx-1.5 text-red-500 fill-red-500 animate-pulse" /> by 
            <a href="https://github.com/sutandev" target="_blank" rel="noreferrer" className="font-bold text-white ml-1.5 hover:text-blue-300 transition-colors">
              Sutandev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
