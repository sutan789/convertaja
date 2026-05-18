'use client';

import React, { useState } from 'react';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import { X, ArrowUp, ArrowDown, FileText, Layers } from 'lucide-react';

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === files.length - 1) return;
    
    const newFiles = [...files];
    const temp = newFiles[index];
    if (direction === 'up') {
      newFiles[index] = newFiles[index - 1];
      newFiles[index - 1] = temp;
    } else {
      newFiles[index] = newFiles[index + 1];
      newFiles[index + 1] = temp;
    }
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged_convertaja.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Terjadi kesalahan saat menggabungkan PDF. Pastikan file tidak rusak.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      <ToolHeader 
        title="Gabungkan PDF" 
        description="Gabungkan beberapa file PDF menjadi satu dokumen dalam hitungan detik. Tarik dan lepas file Anda, atur urutannya, dan unduh hasilnya."
      />

      {files.length === 0 ? (
        <FileUploader 
          onFilesSelected={handleFilesSelected} 
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Pilih File PDF"
        />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">File yang Diunggah ({files.length})</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50">
                Urutkan Nama
              </button>
              <button 
                onClick={() => setFiles([])}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Hapus Semua
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center border border-gray-100 group">
                <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  {index + 1}
                </span>
                <button 
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                >
                  <X size={16} />
                </button>
                <FileText size={48} className="text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-900 text-center truncate w-full px-2">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                
                <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveFile(index, 'up')} className="p-1 bg-white border border-gray-200 rounded text-gray-500 hover:text-primary">
                    <ArrowUp size={14} />
                  </button>
                  <button onClick={() => moveFile(index, 'down')} className="p-1 bg-white border border-gray-200 rounded text-gray-500 hover:text-primary">
                    <ArrowDown size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add More Files Box */}
            <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-primary transition-colors cursor-pointer text-center">
              <label className="cursor-pointer flex flex-col items-center w-full h-full">
                <input type="file" className="hidden" multiple accept="application/pdf" onChange={(e) => {
                  if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                }} />
                <span className="text-3xl font-light text-gray-400 mb-2">+</span>
                <span className="text-sm font-medium text-gray-600">Tambah File</span>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg mr-4">
                <Layers size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Output: Gabungan_PDF_ConvertAja.pdf</p>
                <p className="text-sm text-gray-500">Total: {files.length} File • Estimasi Ukuran: {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            
            <button 
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${files.length < 2 || isProcessing ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}`}
            >
              {isProcessing ? 'Memproses...' : 'Gabungkan Sekarang'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
