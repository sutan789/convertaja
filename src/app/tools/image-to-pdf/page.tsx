'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { X, FileImage, Settings, ArrowRight } from 'lucide-react';

export default function ImageToPdf() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<'none' | 'small' | 'large'>('small');

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        
        let image;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          continue; // Skip unsupported
        }

        const dims = image.scale(1);
        
        // A4 format as standard
        let pageWidth = PageSizes.A4[0];
        let pageHeight = PageSizes.A4[1];

        if (orientation === 'landscape') {
          pageWidth = PageSizes.A4[1];
          pageHeight = PageSizes.A4[0];
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        let marginValue = 0;
        if (margin === 'small') marginValue = 20;
        if (margin === 'large') marginValue = 50;

        const maxWidth = pageWidth - (marginValue * 2);
        const maxHeight = pageHeight - (marginValue * 2);

        let drawWidth = dims.width;
        let drawHeight = dims.height;

        // Scale down if image is larger than page (minus margin)
        if (drawWidth > maxWidth || drawHeight > maxHeight) {
          const widthRatio = maxWidth / drawWidth;
          const heightRatio = maxHeight / drawHeight;
          const ratio = Math.min(widthRatio, heightRatio);
          
          drawWidth = drawWidth * ratio;
          drawHeight = drawHeight * ratio;
        }

        const x = (pageWidth - drawWidth) / 2;
        const y = (pageHeight - drawHeight) / 2;

        page.drawImage(image, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images_convertaja.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => router.push('/'), 1000);

    } catch (error) {
      console.error("Error converting images to PDF:", error);
      alert("Terjadi kesalahan saat mengonversi gambar.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      <ToolHeader 
        title="Ubah Gambar ke PDF" 
        description="Konversi JPG, PNG, dan GIF ke file PDF secara instan. Atur urutan gambar dan buat dokumen PDF profesional dalam hitungan detik."
      />

      {files.length === 0 ? (
        <FileUploader 
          onFilesSelected={handleFilesSelected} 
          accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
          label="Pilih Gambar Anda"
          subLabel="Mendukung JPG, PNG"
        />
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Images Panel */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Pratinjau Gambar ({files.length})</h2>
                <label className="cursor-pointer text-primary font-medium text-sm hover:text-blue-700 flex items-center">
                  <input type="file" className="hidden" multiple accept="image/jpeg, image/png" onChange={(e) => {
                    if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                  }} />
                  + Tambah Lainnya
                </label>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`preview ${index}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => removeFile(index)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow">
                      {index + 1}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white p-2 text-xs truncate border-t border-gray-100">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center">
                  <Settings size={20} className="mr-2 text-gray-500" /> Pengaturan PDF
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Orientasi Halaman</label>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setOrientation('portrait')}
                      className={`flex-1 py-2 px-3 border rounded-lg text-sm font-medium flex justify-center items-center ${orientation === 'portrait' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <div className="w-3 h-4 border-2 border-current rounded-sm mr-2"></div>
                      Potret
                    </button>
                    <button 
                      onClick={() => setOrientation('landscape')}
                      className={`flex-1 py-2 px-3 border rounded-lg text-sm font-medium flex justify-center items-center ${orientation === 'landscape' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      <div className="w-4 h-3 border-2 border-current rounded-sm mr-2"></div>
                      Lanskap
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Margin</label>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setMargin('none')}
                      className={`flex-1 py-2 border rounded-lg text-sm font-medium ${margin === 'none' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      Tanpa
                    </button>
                    <button 
                      onClick={() => setMargin('small')}
                      className={`flex-1 py-2 border rounded-lg text-sm font-medium ${margin === 'small' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      Kecil
                    </button>
                    <button 
                      onClick={() => setMargin('large')}
                      className={`flex-1 py-2 border rounded-lg text-sm font-medium ${margin === 'large' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      Besar
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${isProcessing ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}`}
                >
                  <FileImage size={18} className="mr-2" />
                  {isProcessing ? 'Memproses...' : 'Generate PDF'} <ArrowRight size={18} className="ml-2" />
                </button>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex items-start">
                <div className="bg-white p-1 rounded-full text-primary mr-3 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Privasi Terjamin</h4>
                  <p className="text-xs text-gray-600">File Anda diproses secara lokal di browser dan tidak pernah diunggah ke server kami.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
