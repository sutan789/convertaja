'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { Download, Loader2, ArrowRight, ArrowLeft, Upload, Check, PenTool, Trash2, Move } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface DrawingPoint { x: number; y: number; }

export default function SignPdf() {
  const router = useRouter();
  
  // File & State
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

  // Signature positioning (Drag and Drop)
  const containerRef = useRef<HTMLDivElement>(null);
  const [sigPos, setSigPos] = useState({ x: 0.5, y: 0.5 });
  const [sigWidthPct, setSigWidthPct] = useState(0.25);
  const [isDragging, setIsDragging] = useState(false);

  // Inline Drawing Pad States
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isPenDown, setIsPenDown] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // ===================== PDF VIEWER LOGIC =====================
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
      const viewport = page.getViewport({ scale: 1.5 });
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

  // ===================== SIGNATURE INPUT LOGIC =====================
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureFile(e.target?.result as string);
        setIsDrawingMode(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // ===================== DRAWING PAD LOGIC =====================
  useEffect(() => {
    if (isDrawingMode && drawCanvasRef.current) {
      const canvas = drawCanvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2; // Hi-DPI
      canvas.height = rect.height * 2;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
      }
      setHasDrawn(false);
    }
  }, [isDrawingMode]);

  const getDrawCoordinates = (e: React.MouseEvent | React.TouchEvent): DrawingPoint => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPenDown(true);
    setHasDrawn(true);
    const ctx = drawCanvasRef.current?.getContext('2d');
    const coords = getDrawCoordinates(e);
    ctx?.beginPath();
    ctx?.moveTo(coords.x, coords.y);
  };

  const doDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPenDown) return;
    if ('touches' in e) e.preventDefault();
    const ctx = drawCanvasRef.current?.getContext('2d');
    const coords = getDrawCoordinates(e);
    ctx?.lineTo(coords.x, coords.y);
    ctx?.stroke();
  };

  const endDraw = () => setIsPenDown(false);

  const clearDrawing = () => {
    const canvas = drawCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  const saveDrawing = () => {
    if (drawCanvasRef.current && hasDrawn) {
      setSignatureFile(drawCanvasRef.current.toDataURL('image/png'));
      setIsDrawingMode(false);
    }
  };

  // ===================== DRAG AND DROP LOGIC =====================
  const updateSignaturePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = (clientX - rect.left) / rect.width;
    let y = (clientY - rect.top) / rect.height;
    
    // Batasi agar tidak keluar kotak
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    
    setSigPos({ x, y });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSignaturePosition(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateSignaturePosition(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // ===================== APPLY SIGNATURE =====================
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

      let sigImage;
      if (signatureFile.startsWith('data:image/png')) {
        sigImage = await pdfDoc.embedPng(signatureFile);
      } else {
        sigImage = await pdfDoc.embedJpg(signatureFile);
      }

      const sigDims = sigImage.scale(1);
      const targetWidth = width * sigWidthPct;
      const targetHeight = (targetWidth / sigDims.width) * sigDims.height;

      // In pdf-lib, (0,0) is bottom-left. In browser UI, (0,0) is top-left.
      const drawX = (width * sigPos.x) - (targetWidth / 2);
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
        title="Pembubuhan Tanda Tangan PDF"
        description="Pilih PDF, gambar atau unggah tanda tangan Anda, lalu geser ke posisi yang diinginkan."
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
                  Sediakan Tanda Tangan
                </h3>
                
                {!signatureFile && !isDrawingMode && (
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                    <label className="flex-1 bg-white border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/50 transition-all group">
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">Unggah Gambar TTD</span>
                      <span className="text-xs text-slate-400 mt-1">Format PNG / JPG</span>
                      <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleSignatureUpload} />
                    </label>
                    
                    <div className="flex items-center justify-center px-2">
                      <span className="text-slate-400 font-bold text-sm">ATAU</span>
                    </div>

                    <button 
                      onClick={() => setIsDrawingMode(true)}
                      className="flex-1 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
                    >
                      <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <PenTool size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">Gambar TTD Langsung</span>
                      <span className="text-xs text-slate-400 mt-1">Gunakan pad digital di sini</span>
                    </button>
                  </div>
                )}

                {isDrawingMode && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm animate-in zoom-in-95">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-slate-700">Gambar Tanda Tangan Anda di Bawah</span>
                      <button onClick={() => setIsDrawingMode(false)} className="text-xs text-slate-500 hover:text-slate-700">Batal</button>
                    </div>
                    
                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl h-48 bg-slate-50 overflow-hidden mb-4">
                      <canvas
                        ref={drawCanvasRef}
                        onMouseDown={startDraw} onMouseMove={doDraw} onMouseUp={endDraw} onMouseLeave={endDraw}
                        onTouchStart={startDraw} onTouchMove={doDraw} onTouchEnd={endDraw}
                        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                      />
                      {!hasDrawn && <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-300 font-medium">Gambar di sini...</div>}
                    </div>

                    <div className="flex justify-between items-center">
                      <button onClick={clearDrawing} className="text-red-500 text-sm font-bold flex items-center gap-1 hover:underline"><Trash2 size={16}/> Hapus</button>
                      <button onClick={saveDrawing} disabled={!hasDrawn} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50">Simpan & Gunakan</button>
                    </div>
                  </div>
                )}

                {signatureFile && !isDrawingMode && (
                  <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-2xl border border-blue-200 shadow-sm">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={signatureFile} alt="Signature" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
                          <Check className="text-blue-500 w-5 h-5 bg-blue-100 rounded-full p-0.5"/> 
                          Tanda Tangan Siap
                        </span>
                        <p className="text-xs text-slate-500">Lanjutkan ke langkah 2 di bawah.</p>
                      </div>
                    </div>
                    <button onClick={() => setSignatureFile(null)} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                      Ganti TTD
                    </button>
                  </div>
                )}
              </div>

              {/* Step 2: Placement */}
              {signatureFile && pageImage && (
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-extrabold text-slate-800 mb-2 flex items-center gap-3 text-lg">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md shadow-blue-500/30">2</span> 
                        Geser (Drag) Tanda Tangan ke Posisi yang Pas
                      </h3>
                      <p className="text-sm text-slate-500 ml-11">Sentuh dan geser gambar tanda tangan di atas PDF, dan atur ukurannya.</p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* PDF Viewer */}
                    <div className="flex-1 flex flex-col items-center bg-slate-300 p-4 sm:p-6 rounded-2xl border border-slate-300 shadow-inner overflow-hidden relative">
                      
                      {/* Pagination */}
                      <div className="absolute top-4 z-20 flex items-center gap-4 bg-white/90 backdrop-blur px-5 py-2 rounded-full shadow-md border border-slate-200">
                        <button disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-30"><ArrowLeft size={18}/></button>
                        <span className="text-sm font-bold text-slate-700 w-24 text-center">Hal {currentPage} / {totalPages}</span>
                        <button disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-30"><ArrowRight size={18}/></button>
                      </div>

                      {/* Interactive Canvas container (Drag Area) */}
                      <div 
                        ref={containerRef}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                        className="relative bg-white shadow-xl cursor-crosshair mt-14 touch-none select-none"
                        style={{ width: '100%', maxWidth: '600px', aspectRatio: '1/1.414' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pageImage} alt="PDF Page" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                        
                        {/* Draggable Signature Overlay */}
                        <div 
                          className={`absolute flex flex-col items-center justify-center transition-opacity duration-150 ${isDragging ? 'opacity-80 scale-105' : 'opacity-100'} border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-transparent hover:border-slate-400'}`}
                          style={{
                            left: `${sigPos.x * 100}%`,
                            top: `${sigPos.y * 100}%`,
                            width: `${sigWidthPct * 100}%`,
                            transform: 'translate(-50%, -50%)',
                            cursor: isDragging ? 'grabbing' : 'grab'
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={signatureFile} 
                            alt="Signature" 
                            className="w-full h-auto object-contain pointer-events-none drop-shadow-md"
                            draggable={false}
                          />
                          {!isDragging && (
                            <div className="absolute -bottom-6 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                              <Move size={10} /> Geser
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Size Controls & Submit */}
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
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-blue-500/30 transform hover:-translate-y-1"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2"><Loader2 className="animate-spin" size={20}/> <span>Menyimpan...</span></div>
                        ) : (
                          <>
                            <span className="text-lg flex items-center gap-2"><Check size={20}/> Bubuhkan & Unduh</span>
                            <span className="text-xs text-blue-200 font-normal">Selesai Permanen</span>
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
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/30">
            <Check size={40} />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">PDF Berhasil Ditandatangani!</h3>
          <p className="text-slate-500 mb-10 text-lg">
            Tanda tangan telah permanen dibubuhkan ke koordinat PDF Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={signedPdfUrl}
              download={`Signed_${pdfFile?.name || 'document.pdf'}`}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1"
            >
              <Download size={20} /> Unduh PDF Akhir
            </a>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1"
            >
              Proses File Lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
