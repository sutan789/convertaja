'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import { Trash2, Undo, Download, Info, Check, Grid, Settings } from 'lucide-react';

interface DrawingPoint {
  x: number;
  y: number;
}

export default function DigitalSignature() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#0f172a'); // Navy Black default
  const [lineWidth, setLineWidth] = useState(4);
  const [showGrid, setShowGrid] = useState(true);
  const [showBaseLine, setShowBaseLine] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  
  // History stack for Undo feature
  const [history, setHistory] = useState<string[]>([]);

  // Premium pre-selected colors
  const presetColors = [
    { name: 'Hitam', value: '#0f172a' },
    { name: 'Biru Kerajaan', value: '#2563eb' },
    { name: 'Merah Coral', value: '#dc2626' },
    { name: 'Hijau Hutan', value: '#16a34a' }
  ];

  // Set up high DPI canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Scale backing store
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    // Save initial empty canvas state in history
    saveState();

    // Resize handler
    const handleResize = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      
      const currentRect = currentCanvas.getBoundingClientRect();
      // Keep drawn data if possible or re-scale
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = currentCanvas.width;
      tempCanvas.height = currentCanvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(currentCanvas, 0, 0);
      }
      
      currentCanvas.width = currentRect.width * dpr;
      currentCanvas.height = currentRect.height * dpr;
      
      const currentCtx = currentCanvas.getContext('2d');
      if (currentCtx) {
        currentCtx.scale(dpr, dpr);
        currentCtx.lineCap = 'round';
        currentCtx.lineJoin = 'round';
        currentCtx.drawImage(tempCanvas, 0, 0, currentRect.width, currentRect.height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => [...prev, dataUrl]);
  };

  // Coordinates helper
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): DrawingPoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  // Drawing logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent scrolling on mobile touch
    if ('touches' in e) {
      e.preventDefault();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = lineWidth;
    
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    if ('touches' in e) {
      e.preventDefault();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  // Clear Canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    // Reset history to just the initial empty screen
    const emptyState = canvas.toDataURL();
    setHistory([emptyState]);
  };

  // Undo Action
  const handleUndo = () => {
    if (history.length <= 1) {
      handleClear();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pop current state
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

    const prevStateUrl = newHistory[newHistory.length - 1];
    
    const img = new Image();
    img.src = prevStateUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rect = canvas.getBoundingClientRect();
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };
  };

  // Export & Download
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;

    // Create a temporary canvas to save ONLY the signature drawing (transparent)
    // Next.js canvas is already transparent, so we can export directly!
    const dataUrl = canvas.toDataURL('image/png');
    
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'tanda_tangan_convertaja.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => router.push('/'), 1000);
  };

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      <ToolHeader 
        title="Tanda Tangan Digital" 
        description="Gambar dan buat tanda tangan digital Anda sendiri secara instan. Unduh sebagai file gambar PNG transparan berkualitas tinggi yang siap ditempelkan di dokumen mana pun."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri & Tengah: Pad Tanda Tangan */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            
            {/* Box Drawing Canvas */}
            <div className="relative bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 p-6 flex flex-col h-[420px] overflow-hidden group">
              
              {/* Canvas Guideline Grid Lines (Drawn behind HTML) */}
              <div className="absolute inset-0 pointer-events-none p-6 z-0 flex flex-col justify-between">
                
                {/* Horizontal grid lines */}
                {showGrid && (
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:100%_24px] opacity-75 m-6"></div>
                )}

                {/* Main signature baseline */}
                {showBaseLine && (
                  <div className="absolute left-6 right-6 bottom-24 border-b-2 border-dashed border-blue-200 flex justify-between">
                    <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase bg-white px-2 -translate-y-1/2">
                      Garis Batas Tanda Tangan
                    </span>
                  </div>
                )}
              </div>

              {/* Status & Label */}
              <div className="relative z-10 flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-slate-500">Pad Tanda Tangan</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${hasDrawn ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {hasDrawn ? 'Sudah Digambar' : 'Kosong'}
                </span>
              </div>

              {/* Real Interactive Canvas */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="flex-1 w-full bg-transparent relative z-10 cursor-crosshair rounded-2xl border border-slate-100 touch-none focus:outline-none"
              />

              {/* Action Buttons under Canvas */}
              <div className="relative z-10 flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={handleUndo}
                  disabled={!hasDrawn}
                  className="flex items-center space-x-1.5 px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Undo size={16} />
                  <span>Kembali (Undo)</span>
                </button>

                <button
                  onClick={handleClear}
                  disabled={!hasDrawn}
                  className="flex items-center space-x-1.5 px-4 py-2 text-sm font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-50 disabled:hover:text-red-600"
                >
                  <Trash2 size={16} />
                  <span>Bersihkan Canvas</span>
                </button>
              </div>
            </div>

            {/* Privasi Alert */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start space-x-3">
              <Info className="text-blue-500 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-900">Keamanan & Privasi Terjamin</h4>
                <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                  Semua goresan tanda tangan diproses secara lokal di browser Anda. Kami **tidak pernah mengunggah** gambar tanda tangan Anda ke server mana pun untuk melindungi kerahasiaan identitas Anda secara mutlak.
                </p>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Pengaturan & Opsi Ekspor */}
          <div className="flex flex-col space-y-6">
            
            {/* Card Pengaturan */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 p-6 flex flex-col space-y-6">
              
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
                <Settings className="text-blue-600 w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">Pengaturan Tinta</h3>
              </div>

              {/* Warna Tinta */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">Warna Tinta</label>
                <div className="flex items-center space-x-3">
                  {presetColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setPenColor(color.value)}
                      style={{ backgroundColor: color.value }}
                      className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center
                        ${penColor === color.value ? 'ring-2 ring-blue-500 ring-offset-2 scale-110 border-white' : 'border-slate-200 hover:scale-105'}`}
                      title={color.name}
                    >
                      {penColor === color.value && (
                        <Check size={14} className="text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}

                  {/* Custom color picker */}
                  <div className="relative group">
                    <input
                      type="color"
                      value={penColor}
                      onChange={(e) => setPenColor(e.target.value)}
                      className="absolute inset-0 opacity-0 w-9 h-9 cursor-pointer"
                    />
                    <div 
                      style={{ backgroundColor: penColor }}
                      className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center hover:scale-105 transition-all"
                      title="Warna Kustom"
                    >
                      {!presetColors.some(c => c.value === penColor) && (
                        <Check size={14} className="text-white drop-shadow-md" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ketebalan Goresan */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                  <span>Ketebalan Goresan</span>
                  <span className="text-blue-600">{lineWidth}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Tipis</span>
                  <span>Sedang</span>
                  <span>Tebal</span>
                </div>
              </div>

              {/* Tampilan Panduan */}
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-semibold text-slate-700">Panduan Menggambar</label>
                <div className="space-y-2.5">
                  
                  {/* Grid Lines Toggle */}
                  <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <span className="text-xs font-semibold text-slate-600">Garis Bantu Grid (Kotak)</span>
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="w-4.5 h-4.5 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                    />
                  </label>

                  {/* Baseline Toggle */}
                  <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <span className="text-xs font-semibold text-slate-600">Garis Dasar Pembatas</span>
                    <input
                      type="checkbox"
                      checked={showBaseLine}
                      onChange={(e) => setShowBaseLine(e.target.checked)}
                      className="w-4.5 h-4.5 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                    />
                  </label>

                </div>
              </div>

            </div>

            {/* Box Download */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 p-6 flex flex-col">
              <button
                onClick={handleDownload}
                disabled={!hasDrawn}
                className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl shadow-lg font-bold text-white transition-all transform hover:-translate-y-0.5
                  ${hasDrawn 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
              >
                <Download size={20} />
                <span>Unduh Tanda Tangan (PNG)</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-3 font-semibold uppercase tracking-wider">
                Format: Transparent PNG • Resolusi Tinggi
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
