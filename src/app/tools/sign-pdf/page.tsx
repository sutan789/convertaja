'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2, ArrowRight, ArrowLeft, Upload, Check, PenTool } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function SignPdf() {
  const router = useRouter();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<string | null>(null); // Data URL
  const [isProcessing, setIsProcessing] = useState(false);
  const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // PDF Viewer states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pdfJsDoc, setPdfJsDoc] = useState<any>(null);

  // Signature placement state (relative percentages 0 to 1)
  const [sigPos, setSigPos] = useState({ x: 0.5, y: 0.5 });
  const [sigWidthPct, setSigWidthPct] = useState(0.2); // 20% of page width
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF.js dynamically and render page
  useEffect(() => {
    if (!pdfFile) return;

    const loadPdf = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const arrayBuffer = await pdfFile.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const doc = await loadingTask.promise;
        setPdfJsDoc(doc);
        setTotalPages(doc.numPages);
        setCurrentPage(1);
        renderPage(doc, 1, pdfjsLib);
      } catch (err: any) {
        setError("Gagal memuat PDF: " + err.message);
      }
    };
    loadPdf();
  }, [pdfFile]);

  const renderPage = async (doc: any, pageNum: number, pdfjsLib?: any) => {
    try {
      const page = await doc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 }); // Hi-res rendering
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: ctx, viewport }).promise;
      setPageImage(canvas.toDataURL());
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || !pdfJsDoc) return;
    setCurrentPage(newPage);
    
    const pdfjsLib = await import('pdfjs-dist');
    renderPage(pdfJsDoc, newPage, pdfjsLib);
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSignatureFile(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setSigPos({ x, y });
  };

  const handleApplySignature = async () => {
    if (!pdfFile || !signatureFile) return;
    setIsProcessing(true);
    setError(null);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const page = pages[currentPage - 1]; // 0-indexed

      const { width, height } = page.getSize();

      // Embed signature image
      let sigImage;
      if (signatureFile.startsWith('data:image/png')) {
        sigImage = await pdfDoc.embedPng(signatureFile);
      } else {
        sigImage = await pdfDoc.embedJpg(signatureFile);
      }

      const sigDims = sigImage.scale(1);
      const targetWidth = width * sigWidthPct;
      const targetHeight = (targetWidth / sigDims.width) * sigDims.height;

      // In pdf-lib, (0,0) is bottom-left. 
      // In web browser UI, (0,0) is top-left.
      // We calculate the center of the signature image to match the click
      const drawX = (width * sigPos.x) - (targetWidth / 2);
      // invert Y for pdf-lib
      const drawY = (height * (1 - sigPos.y)) - (targetHeight / 2);

      page.drawImage(sigImage, {
        x: drawX,
        y: drawY,
        width: targetWidth,
        height: targetHeight,
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(modifiedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSignedPdfUrl(url);

    } catch (err: any) {
      console.error(err);
      setError("Gagal membubuhkan tanda tangan. Pastikan file PDF tidak terproteksi sandi.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <ToolHeader
        title="Tanda Tangan PDF"
        description="Bubuhkan gambar tanda tangan Anda langsung ke halaman dokumen PDF pilihan Anda. 100% diproses di browser tanpa diunggah."
      />

      {!signedPdfUrl ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {!pdfFile ? (
            <FileUploader
              onFilesSelected={(f) => setPdfFile(f[0])}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={1}
              maxSizeMB={50}
            />
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              
              {/* Step 1: Signature Input */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
                <h3 className="font-extrabold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md shadow-blue-500/30">1</span> 
                  Pilih Gambar Tanda Tangan
                </h3>
                
                {!signatureFile ? (
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                    <label className="flex-1 bg-white border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/50 transition-all group">
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">Unggah Gambar TTD</span>
                      <span className="text-xs text-slate-400 mt-1">Format PNG transparan sangat disarankan</span>
                      <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleSignatureUpload} />
                    </label>
                    
                    <div className="flex items-center justify-center px-2">
                      <span className="text-slate-300 font-bold text-sm bg-slate-50 px-2">ATAU</span>
                    </div>

                    <button 
                      onClick={() => window.open('/tools/digital-signature', '_blank')}
                      className="flex-1 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
                    >
                      <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <PenTool size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">Buat Tanda Tangan Baru</span>
                      <span className="text-xs text-slate-400 mt-1">Gunakan pad digital kami secara gratis</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-2xl border border-emerald-200 shadow-sm">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={signatureFile} alt="Signature" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
                          <Check className="text-emerald-500 w-5 h-5 bg-emerald-100 rounded-full p-0.5"/> 
                          Gambar Siap Digunakan
                        </span>
                        <p className="text-xs text-slate-500">Lanjutkan ke langkah 2 untuk memposisikan.</p>
                      </div>
                    </div>
                    <button onClick={() => setSignatureFile(null)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                      Ganti Gambar
                    </button>
                  </div>
                )}
              </div>

              {/* Step 2: Placement */}
              {signatureFile && pageImage && (
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="font-extrabold text-slate-800 mb-2 flex items-center gap-3 text-lg">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md shadow-blue-500/30">2</span> 
                    Posisikan Tanda Tangan
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 ml-11">Pilih halaman lalu klik area manapun di atas dokumen untuk memindahkan tanda tangan.</p>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* PDF Viewer */}
                    <div className="flex-1 flex flex-col items-center bg-slate-300 p-6 rounded-2xl border border-slate-300 shadow-inner overflow-hidden relative">
                      
                      {/* Pagination */}
                      <div className="absolute top-4 z-20 flex items-center gap-4 bg-white/90 backdrop-blur px-5 py-2 rounded-full shadow-md border border-slate-200">
                        <button disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-30"><ArrowLeft size={18}/></button>
                        <span className="text-sm font-bold text-slate-700 w-24 text-center">Hal {currentPage} / {totalPages}</span>
                        <button disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-30"><ArrowRight size={18}/></button>
                      </div>

                      {/* Interactive Canvas container */}
                      <div 
                        ref={containerRef}
                        onClick={handleContainerClick}
                        className="relative bg-white shadow-xl cursor-crosshair mt-14"
                        style={{ width: '100%', maxWidth: '500px', aspectRatio: '1/1.414' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pageImage} alt="PDF Page" className="w-full h-full object-contain pointer-events-none" />
                        
                        {/* Signature overlay */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={signatureFile} 
                          alt="Signature" 
                          className="absolute pointer-events-none drop-shadow-md border border-blue-400 bg-blue-500/10"
                          style={{
                            left: `${sigPos.x * 100}%`,
                            top: `${sigPos.y * 100}%`,
                            width: `${sigWidthPct * 100}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Size Controls */}
                    <div className="lg:w-72 flex flex-col justify-center space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-4">Ubah Ukuran TTD</label>
                        <input 
                          type="range" 
                          min="0.05" max="0.6" step="0.01" 
                          value={sigWidthPct} 
                          onChange={(e) => setSigWidthPct(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mt-3">
                          <span>Kecil</span>
                          <span>Besar</span>
                        </div>
                      </div>

                      <button
                        onClick={handleApplySignature}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white py-4 rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2"><Loader2 className="animate-spin" size={20}/> <span>Menyimpan...</span></div>
                        ) : (
                          <>
                            <span className="text-lg flex items-center gap-2"><Check size={20}/> Bubuhkan Sekarang</span>
                            <span className="text-xs text-emerald-100 font-normal">Selesai & Unduh PDF</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30">
            <Check size={40} />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Dokumen Berhasil Ditandatangani!</h3>
          <p className="text-slate-500 mb-10 text-lg">
            Tanda tangan telah permanen tertempel di dalam PDF Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={signedPdfUrl}
              download={`Signed_${pdfFile?.name || 'document.pdf'}`}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1"
            >
              <Download size={20} /> Unduh PDF Final
            </a>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1"
            >
              Proses File Lainnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
