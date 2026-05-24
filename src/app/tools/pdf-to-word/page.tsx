'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2, Info, ServerCrash } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export default function PdfToWord() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [docxName, setDocxName] = useState('');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setDocxUrl(null);
    setError(null);
    setProgress('Membaca file PDF...');

    try {
      // Import dinamis agar tidak dieksekusi saat SSR (mencegah error DOMMatrix)
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      // Baca file sebagai ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Load PDF dengan pdf.js
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      // Ekstrak teks dan bangun struktur paragraf yang lebih cerdas
      const docChildren: any[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgress(`Mengekstrak teks halaman ${i} dari ${totalPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1 });

        // Ambil semua item dengan teks tidak kosong
        const items = (textContent.items as any[]).filter(item => item.str && item.str.trim() !== '');
        if (items.length === 0) continue;

        // 1. Kelompokkan teks berdasarkan koordinat Y (baris) dengan toleransi dinamis
        const linesMap = new Map<number, any[]>();
        const Y_TOLERANCE = 1.0; // px, lebih ketat agar kolom/rotasi tidak ikut

        items.forEach(item => {
          const y = item.transform[5];
          let found = false;
          for (const key of linesMap.keys()) {
            if (Math.abs(key - y) < Y_TOLERANCE) {
              linesMap.get(key)!.push(item);
              found = true;
              break;
            }
          }
          if (!found) linesMap.set(y, [item]);
        });

        // Urutkan baris dari atas ke bawah (Y besar → kecil)
        const sortedY = Array.from(linesMap.keys()).sort((a, b) => b - a);
        const lineData: { text: string; y: number; fontSize: number }[] = [];

        sortedY.forEach(y => {
          const lineItems = linesMap.get(y)!;
          // Urutkan kiri → kanan (X)
          lineItems.sort((a, b) => a.transform[4] - b.transform[4]);

          // Ambil font size dari item pertama (biasanya seragam dalam satu baris)
          const fontSize = lineItems[0].height || 12;

          // Gabungkan teks
          const lineStr = lineItems.map(item => item.str).join(' ').replace(/\s+/g, ' ').trim();
          if (lineStr) {
            lineData.push({ text: lineStr, y, fontSize });
          }
        });

        if (lineData.length === 0) continue;

        // 2. Deteksi paragraf: jika jarak vertikal ≥ 1.8 * fontSize (baris sebelumnya) → paragraf baru
        const paragraphs: {text: string, fontSize: number}[] = [];
        let currentPara = lineData[0].text;
        let prevFontSize = lineData[0].fontSize;
        let prevY = lineData[0].y;
        let currentParaFontSize = prevFontSize;

        for (let j = 1; j < lineData.length; j++) {
          const { text, y, fontSize } = lineData[j];
          const dy = prevY - y; // selisih Y

          // Jika jarak > 1.8 kali tinggi huruf sebelumnya → paragraf baru
          if (dy > prevFontSize * 1.8) {
            paragraphs.push({ text: currentPara.trim(), fontSize: currentParaFontSize });
            currentPara = text;
            currentParaFontSize = fontSize;
          } else {
            // Masih dalam paragraf yang sama
            if (currentPara.endsWith('-')) {
              // pemenggalan kata
              currentPara = currentPara.slice(0, -1) + text;
            } else {
              currentPara += ' ' + text;
            }
          }
          prevY = y;
          prevFontSize = fontSize;
        }
        paragraphs.push({ text: currentPara.trim(), fontSize: currentParaFontSize }); // paragraf terakhir di halaman ini

        // 3. Ubah setiap paragraf menjadi elemen Word (deteksi heading berdasarkan font size)
        paragraphs.forEach(para => {
          const text = para.text;
          const fontSize = para.fontSize;
          
          // Anggap heading jika: teks ≤ 10 kata DAN fontSize > 14 (ukuran font bisa bervariasi tergantung PDF)
          const isHeading = text.split(' ').length <= 10 && fontSize > 14;

          // Library docx menggunakan half-points untuk font size (cth: ukuran 12pt = size 24)
          const docxFontSize = Math.round(fontSize * 2) || 24;

          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text,
                  size: docxFontSize, 
                  font: 'Arial',
                  bold: isHeading, 
                }),
              ],
              spacing: { after: isHeading ? 300 : 150 },
            })
          );
        });
      }

      // Bangun dokumen Word (.docx)
      setProgress('Menyusun dokumen Word...');
      const doc = new Document({
        sections: [
          {
            children: docChildren.length > 0 ? docChildren : [
              new Paragraph({ children: [new TextRun("Tidak ada teks yang terdeteksi.")] })
            ],
          },
        ],
      });

      // Generate blob dan buat URL untuk diunduh
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.pdf$/i, '.docx');

      setDocxUrl(url);
      setDocxName(name);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal mengkonversi. Pastikan PDF tidak rusak atau terproteksi.');
    } finally {
      setIsProcessing(false);
      setProgress('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToolHeader
        title="PDF ke Word"
        description="Konversi PDF ke Word (DOCX) langsung di browser — teks diekstrak tanpa server."
      />

      {!docxUrl ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          {/* Info Banner */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
            <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">Konversi Client-Side (Tanpa Server)</h4>
              <p className="text-sm text-blue-800/80">
                File diproses sepenuhnya di browser Anda — tidak diunggah ke server mana pun.
                Hasil berupa teks yang bisa diedit, namun <strong>gambar, tabel, dan layout kompleks tidak dipertahankan</strong>.
                Cocok untuk PDF berbasis teks (laporan, artikel, dll).
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
              <ServerCrash className="text-red-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-red-900 text-sm mb-1">Konversi Gagal</h4>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <FileUploader
            onFilesSelected={(f) => { setFile(f[0]); setError(null); }}
            accept={{ 'application/pdf': ['.pdf'] }}
            maxFiles={1}
            maxSizeMB={50}
          />

          {file && (
            <div className="mt-8 space-y-4">
              {/* Progress */}
              {isProcessing && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Loader2 className="animate-spin text-blue-500 shrink-0" size={20} />
                  <p className="text-sm text-blue-800 animate-pulse">{progress}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  {isProcessing
                    ? <><Loader2 className="animate-spin" size={18} /> Memproses...</>
                    : 'Konversi ke Word'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Konversi Berhasil!</h3>
          <p className="text-slate-500 mb-2">
            PDF berhasil dikonversi menjadi dokumen Word yang dapat diedit.
          </p>
          <p className="text-xs text-slate-400 mb-8">
            Menggunakan ekstraksi teks di browser. Buka dengan Microsoft Word atau Google Docs.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href={docxUrl}
              download={docxName}
              onClick={() => {
                setTimeout(() => {
                  router.push('/');
                }, 1000);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2"
            >
              <Download size={18} /> Unduh Word (DOCX)
            </a>
            <button
              onClick={() => { setDocxUrl(null); setFile(null); setError(null); }}
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
