'use client';

import React, { useState } from 'react';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2 } from 'lucide-react';

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      // Load library eksternal melalui CDN secara dinamis
      // Ini 100% mencegah error Webpack SSR dan modul yang hilang
      const loadScript = (src: string) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');

      // 1. Baca isi Word (DOCX) menjadi ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // 2. Konversi DOCX ke HTML dengan Mammoth
      // @ts-ignore
      const result = await window.mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;

      // 3. Masukkan HTML ke elemen sementara
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.padding = '40px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.lineHeight = '1.6';
      tempDiv.style.color = '#000';
      
      // 4. Konversi HTML ke PDF dengan html2pdf.js
      const opt = {
        margin:       10,
        filename:     file.name.replace('.docx', '.pdf'),
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // @ts-ignore
      const pdfBlob = await window.html2pdf().set(opt).from(tempDiv).output('blob');
      
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

    } catch (error: any) {
      console.error(error);
      alert('Error Word to PDF: ' + (error.message || String(error)));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToolHeader 
        title="Word Mentah ke PDF" 
        description="Konversi isi teks dari dokumen Word (DOCX) Anda menjadi PDF secara instan."
      />

      {!pdfUrl ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          
          {/* Warning Banner */}
          <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start">
            <svg className="text-orange-500 mr-3 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div>
              <h4 className="font-semibold text-orange-900 text-sm mb-1">Catatan Keterbatasan (BETA)</h4>
              <p className="text-sm text-orange-800/80">
                Alat ini berjalan murni di dalam browser Anda (tanpa server). Oleh karena itu, hasil PDF yang dibuat akan memiliki <strong>tata letak standar (polos)</strong> dan tidak sepenuhnya mempertahankan margin, tabel, warna, atau gambar dari dokumen Word aslinya.
              </p>
            </div>
          </div>

          <FileUploader 
            onFilesSelected={(selectedFiles) => setFile(selectedFiles[0])}
            maxFiles={1}
          />

          {file && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin mr-2" /> Memproses...</>
                ) : (
                  'Konversi ke PDF'
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Konversi Berhasil!</h3>
          <p className="text-slate-500 mb-8">Dokumen Word Anda telah berhasil dikonversi ke PDF.</p>
          
          <div className="flex justify-center space-x-4">
            <a
              href={pdfUrl}
              download={file?.name.replace('.docx', '.pdf')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all"
            >
              Unduh PDF
            </a>
            <button
              onClick={() => { setPdfUrl(null); setFile(null); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-semibold transition-all"
            >
              Konversi Lainnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
