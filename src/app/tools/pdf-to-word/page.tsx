'use client';

import React, { useState } from 'react';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2 } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [docxUrl, setDocxUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      // Import pdfjs-dist secara dinamis untuk menghindari error SSR (DOMMatrix is not defined)
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      
      // 1. Baca PDF dengan pdf.js
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      // 2. Ekstrak teks halaman per halaman
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        // @ts-ignore
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + "\n\n";
      }

      if (!fullText.trim()) {
        throw new Error('Tidak ada teks yang dapat diekstrak. Mungkin PDF ini berisi gambar yang di-scan.');
      }

      // 3. Buat dokumen Word dengan docx
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: fullText.split('\n').map(text => 
              new Paragraph({
                children: [new TextRun(text)],
              })
            ),
          },
        ],
      });

      // 4. Export ke Blob
      const docxBlob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(docxBlob);
      setDocxUrl(url);

    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Terjadi kesalahan saat mengkonversi PDF. Pastikan file tidak diproteksi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToolHeader 
        title="Ekstrak Teks PDF ke Word" 
        description="Ambil teks mentah dari dokumen PDF Anda ke format Word (DOCX) secara offline."
      />

      {!docxUrl ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          
          {/* Warning Banner */}
          <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start">
            <svg className="text-orange-500 mr-3 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div>
              <h4 className="font-semibold text-orange-900 text-sm mb-1">Catatan Keterbatasan (BETA)</h4>
              <p className="text-sm text-orange-800/80">
                Alat ini berjalan murni di dalam browser Anda (tanpa server). Oleh karena itu, <strong>hanya teks mentah yang dapat diekstrak</strong>. Tata letak, font, tabel, dan gambar dari PDF asli <strong>tidak akan dipertahankan</strong> pada hasil Word-nya.
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
                  'Ekstrak Teks ke Word'
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
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ekstraksi Berhasil!</h3>
          <p className="text-slate-500 mb-8">Teks dari PDF Anda telah berhasil diekstrak ke dalam file Word.</p>
          
          <div className="flex justify-center space-x-4">
            <a
              href={docxUrl}
              download={file?.name.replace('.pdf', '.docx')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all"
            >
              Unduh Word (DOCX)
            </a>
            <button
              onClick={() => { setDocxUrl(null); setFile(null); }}
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
