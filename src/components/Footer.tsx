import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100 border-t border-blue-900 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-full">
        
        {/* Top Part: Tagline & Links (Antigravity Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 md:mb-16">
          {/* Tagline */}
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
              Kelola PDF Tanpa Ribet
            </h2>
            <p className="text-blue-200/70 text-sm max-w-sm leading-relaxed">
              Platform modern untuk mengelola dokumen PDF dan membuat QR Code dengan cepat, aman, dan 100% gratis langsung dari browser Anda.
            </p>
          </div>
          
          {/* Links Group 1: Tools */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <Link href="/tools/merge-pdf" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Gabung PDF</Link>
            <Link href="/tools/split-pdf" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Pisahkan PDF</Link>
            <Link href="/tools/image-to-pdf" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Gambar ke PDF</Link>
            <Link href="/tools/compress-pdf" className="text-blue-200 hover:text-white transition-colors text-sm font-medium flex items-center">
              Kompres PDF <span className="ml-2 text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">BETA</span>
            </Link>
            <Link href="/tools/pdf-to-word" className="text-blue-200 hover:text-white transition-colors text-sm font-medium flex items-center">
              PDF ke Word <span className="ml-2 text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">BETA</span>
            </Link>
            <Link href="/tools/digital-signature" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Tanda Tangan Digital</Link>
          </div>

          {/* Links Group 2: Company */}
          <div className="md:col-span-3 flex flex-col space-y-3 mt-8 md:mt-0">
            <Link href="/tentang" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Tentang Kami</Link>
            <Link href="/contact" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Hubungi Kami</Link>
            <Link href="/privacy" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Kebijakan Privasi</Link>
            <Link href="/terms" className="text-blue-200 hover:text-white transition-colors text-sm font-medium">Syarat Penggunaan</Link>
            <Link href="/tools/qr-code" className="text-blue-200 hover:text-white transition-colors text-sm font-medium mt-4">QR Code Generator</Link>
          </div>
        </div>

        {/* Middle Part: Giant Text Logo (Perfectly Scaled with SVG) */}
        <div className="w-full mt-auto mb-10 select-none pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 1000 180" className="w-full h-auto opacity-90 mix-blend-overlay">
            <text 
              x="50%" 
              y="55%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              className="font-extrabold fill-white tracking-tighter" 
              style={{ fontSize: '170px', fontFamily: 'inherit' }}
            >
              ConvertAja
            </text>
          </svg>
        </div>

        {/* Bottom Part: Copyright & Maker */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-blue-900/50">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-white font-bold text-lg flex items-center mr-6">
              <span className="text-blue-500 mr-2 bg-white/10 p-1.5 rounded-md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
              </span>
              ConvertAja
            </span>
            <span className="text-sm text-blue-300/60 hidden md:inline-block">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-blue-200/80">
            <span className="flex items-center">
              Developed with <Heart size={14} className="mx-1.5 text-red-500 fill-red-500 animate-pulse" /> by 
              <a href="https://github.com/sutandev" target="_blank" rel="noreferrer" className="font-bold text-white ml-1.5 hover:text-blue-300 transition-colors">
                Sutandev
              </a>
            </span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
