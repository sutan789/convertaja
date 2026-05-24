'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2, AlertCircle, TrendingDown } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function CompressPdf() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; original: number; compressed: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const getSavingPercent = (original: number, compressed: number) => {
    if (original === 0) return 0;
    return Math.round(((original - compressed) / original) * 100);
  };

  const handleFileSelect = (selectedFiles: File[]) => {
    setError(null);
    setResult(null);
    const selected = selectedFiles[0];

    // Validasi: pastikan file adalah PDF
    if (selected && selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setError('File yang diunggah bukan PDF. Harap upload file dengan format .pdf');
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalSize = arrayBuffer.byteLength;

      // Load PDF — tangkap error jika PDF rusak atau diproteksi
      let pdfDoc: PDFDocument;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
      } catch {
        throw new Error('File PDF tidak dapat dibuka. Pastikan file tidak terenkripsi/diproteksi password.');
      }

      // Bersihkan metadata untuk menghemat ukuran
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('ConvertAja');
      pdfDoc.setCreator('ConvertAja');

      // Simpan dengan Object Streams diaktifkan (kompresi struktur PDF)
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const compressedSize = pdfBytes.byteLength;

      // Jika hasil kompresi malah lebih besar, tetap gunakan hasil (ini bisa terjadi pada PDF yang sudah terkompresi)
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult({ url, original: originalSize, compressed: compressedSize });

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat mengkompresi PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const savingPercent = result ? getSavingPercent(result.original, result.compressed) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <ToolHeader
        title="Kompres PDF"
        description="Kurangi ukuran file PDF Anda dengan mengoptimalkan struktur dan menghapus metadata yang tidak perlu."
      />

      {!result ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start">
            <AlertCircle className="text-blue-500 mr-3 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">Catatan Fitur BETA</h4>
              <p className="text-sm text-blue-800/80">
                Kompresi berjalan di browser Anda. Efektif untuk PDF dengan banyak teks dan metadata. PDF yang sudah terkompresi atau berisi banyak gambar mungkin tidak berkurang signifikan.
              </p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start">
              <AlertCircle className="text-red-500 mr-3 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <FileUploader
            onFilesSelected={handleFileSelect}
            maxFiles={1}
          />

          {file && !error && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleCompress}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={18} /> Mengoptimalkan...</>
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
            <TrendingDown size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Optimasi Selesai!</h3>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 my-8">
            <div className="text-right">
              <p className="text-sm text-slate-500 mb-1">Ukuran Awal</p>
              <p className="font-bold text-slate-700 text-lg">{formatBytes(result.original)}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-px w-12 bg-slate-300"></div>
              <span className={`text-xs font-bold mt-1 px-2 py-1 rounded-full ${
                savingPercent > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {savingPercent > 0 ? `-${savingPercent}%` : 'Optimal'}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-500 mb-1">Ukuran Baru</p>
              <p className={`font-bold text-xl ${savingPercent > 0 ? 'text-green-600' : 'text-slate-700'}`}>
                {formatBytes(result.compressed)}
              </p>
            </div>
          </div>

          {savingPercent <= 0 && (
            <p className="text-sm text-slate-400 mb-4">
              PDF ini sudah sangat optimal. Tidak ada pengurangan ukuran yang signifikan.
            </p>
          )}

          <div className="flex justify-center space-x-4 mt-4">
            <a
              href={result.url}
              download={file?.name.replace(/\.pdf$/i, '_compressed.pdf')}
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
              onClick={() => { setResult(null); setFile(null); setError(null); }}
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
