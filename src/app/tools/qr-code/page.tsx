'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Download, Info } from 'lucide-react';

export default function QrCodeGenerator() {
  const router = useRouter();
  const [url, setUrl] = useState('https://convertaja.com');
  const [size, setSize] = useState(512);
  const [level, setLevel] = useState('M');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownloadPNG = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode_convertaja.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setTimeout(() => router.push('/'), 1000);
    }
  };

  const handleDownloadSVG = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'qrcode_convertaja.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setTimeout(() => router.push('/'), 1000);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      <ToolHeader 
        title="Buat QR Code" 
        description="Ubah URL, teks, atau informasi kontak Anda menjadi kode QR yang elegan dan fungsional secara instan."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Settings Panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                URL atau Teks
              </label>
              <textarea 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary resize-none"
                rows={4}
                placeholder="Masukkan URL atau teks di sini..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ukuran (px)</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value={256}>256 × 256</option>
                  <option value={512}>512 × 512</option>
                  <option value={1024}>1024 × 1024</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Koreksi Kesalahan</label>
                <select 
                  value={level} 
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Warna</button>
                <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Logo</button>
              </div>
              <span>Perubahan disimpan otomatis</span>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-full aspect-square bg-gray-50 rounded-xl mb-6 flex items-center justify-center p-8 border border-gray-100">
                <div ref={qrRef} className="relative">
                  {/* Canvas is used for PNG download */}
                  <div className="hidden">
                    <QRCodeCanvas value={url || 'https://convertaja.com'} size={size} level={level as any} />
                  </div>
                  {/* SVG is displayed and used for SVG download */}
                  <QRCodeSVG value={url || 'https://convertaja.com'} size={200} level={level as any} />
                </div>
              </div>
              
              <button 
                onClick={handleDownloadPNG}
                className="w-full bg-primary text-white hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mb-3"
              >
                <Download size={18} className="mr-2" /> Unduh PNG
              </button>
              
              <button 
                onClick={handleDownloadSVG}
                className="w-full bg-white text-primary hover:bg-blue-50 border border-primary py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Download size={18} className="mr-2" /> Unduh SVG
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                QR Code ini akan tetap aktif selamanya tanpa batas pemindaian.
              </p>
            </div>

            <div className="bg-blue-600 rounded-xl p-5 text-white shadow-sm">
              <div className="flex items-center font-medium mb-2">
                <Info size={18} className="mr-2" /> Tips Cepat
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Gunakan tingkat koreksi 'High' jika Anda berencana mencetak kode QR dalam ukuran yang sangat kecil atau pada permukaan yang melengkung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
