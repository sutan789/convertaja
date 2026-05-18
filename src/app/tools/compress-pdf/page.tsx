'use client';

import React, { useState } from 'react';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [compressionStats, setCompressionStats] = useState<{original: number, compressed: number} | null>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalSize = arrayBuffer.byteLength;
      
      // Load PDF
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Hapus metadata opsional untuk menghemat ukuran
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('ConvertAja Optimizer');
      pdfDoc.setCreator('ConvertAja');

      // Save dengan pengaturan kompresi objek (useObjectStreams)
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const compressedSize = pdfBytes.byteLength;
      
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      setCompressionStats({ original: originalSize, compressed: compressedSize });

    } catch (error: any) {
      console.error(error);
      alert('Error Compress PDF: ' + (error.message || String(error)));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToolHeader 
        title="Optimasi & Kompres PDF" 
        description="Kurangi ukuran file PDF Anda dengan mengoptimalkan struktur dan menghapus metadata yang tidak perlu."
      />

      {!pdfUrl ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start">
            <AlertCircle className="text-blue-500 mr-3 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">Catatan Fitur BETA</h4>
              <p className="text-sm text-blue-800/80">
                Karena berjalan murni di browser Anda, kompresi ini memfokuskan pada optimasi struktur PDF (Metadata & Streams). Jika PDF Anda berisi gambar beresolusi sangat tinggi, tingkat kompresinya mungkin tidak se-ekstrem server berbayar.
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
                  <><Loader2 className="animate-spin mr-2" /> Mengoptimalkan...</>
                ) : (
                  'Mulai Kompres'
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
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Optimasi Selesai!</h3>
          
          {compressionStats && (
            <div className="flex justify-center items-center space-x-6 my-8">
              <div className="text-right">
                <p className="text-sm text-slate-500 mb-1">Ukuran Awal</p>
                <p className="font-bold text-slate-700 text-lg">{formatBytes(compressionStats.original)}</p>
              </div>
              <div className="h-10 border-r-2 border-slate-200"></div>
              <div className="text-left">
                <p className="text-sm text-slate-500 mb-1">Ukuran Baru</p>
                <p className="font-bold text-green-600 text-xl">{formatBytes(compressionStats.compressed)}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-center space-x-4 mt-8">
            <a
              href={pdfUrl}
              download={file?.name.replace('.pdf', '_compressed.pdf')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all"
            >
              Unduh PDF
            </a>
            <button
              onClick={() => { setPdfUrl(null); setFile(null); setCompressionStats(null); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-semibold transition-all"
            >
              Kompres Lainnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
