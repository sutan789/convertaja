'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2 } from 'lucide-react';

export default function WordToPdf() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      // Import library secara dinamis untuk menghindari error SSR Next.js
      const mammoth = (await import('mammoth')).default || await import('mammoth');
      const html2pdf = (await import('html2pdf.js')).default || await import('html2pdf.js');

      // 1. Baca isi Word (DOCX) menjadi ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // 2. Konversi DOCX ke HTML dengan Mammoth
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;

      if (!htmlContent || !htmlContent.trim()) {
        throw new Error('Dokumen Word tampak kosong atau tidak bisa dibaca.');
      }

      // 3. Buat elemen pembungkus (TIDAK PERLU append ke body, html2pdf bisa menangani langsung)
      const wrapper = document.createElement('div');
      wrapper.innerHTML = htmlContent;
      // Berikan styling dasar agar PDF rapi
      wrapper.style.padding = '20px 40px';
      wrapper.style.fontFamily = 'Arial, sans-serif';
      wrapper.style.fontSize = '12pt';
      wrapper.style.lineHeight = '1.6';
      wrapper.style.color = '#000';
      wrapper.style.background = '#fff';

      // 4. Konversi HTML ke PDF dengan html2pdf.js
      const opt = {
        margin:      10,
        filename:    file.name.replace(/\.docx$/i, '.pdf'),
        image:       { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // Generate PDF
      // @ts-ignore
      const pdfBlob = await html2pdf().set(opt).from(wrapper).output('blob');

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
        title="Word ke PDF"
        description="Konversi isi teks dari dokumen Word (DOCX) Anda menjadi PDF secara instan."
      />

      {!pdfUrl ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

          {/* Warning Banner */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
            <svg className="text-blue-500 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">Catatan Keterbatasan (BETA)</h4>
              <p className="text-sm text-blue-800/80">
                Alat ini berjalan murni di dalam browser Anda (tanpa server). Hasil PDF mungkin tidak sepenuhnya mempertahankan tabel kompleks, gambar, atau warna dari dokumen Word aslinya.
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
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={18} /> Memproses...</>
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
              download={file?.name.replace(/\.docx$/i, '.pdf')}
              onClick={() => {
                setTimeout(() => {
                  router.push('/');
                }, 1000);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2"
            >
              <Download size={18} /> Unduh PDF
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
