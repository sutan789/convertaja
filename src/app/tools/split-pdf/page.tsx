'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToolHeader from '@/components/ToolHeader';
import FileUploader from '@/components/FileUploader';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { Scissors, FileText, X } from 'lucide-react';

export default function SplitPdf() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitOption, setSplitOption] = useState<'all' | 'custom'>('all');
  const [customRange, setCustomRange] = useState('');

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]); // Only take the first file
    }
  };

  const parseRange = (rangeStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(',').map(p => p.trim());
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end) && start > 0 && start <= end && end <= maxPages) {
          for (let i = start; i <= end; i++) {
            pages.add(i);
          }
        }
      } else {
        const num = Number(part);
        if (!isNaN(num) && num > 0 && num <= maxPages) {
          pages.add(num);
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      if (splitOption === 'all') {
        // Extract all pages into a ZIP
        const zip = new JSZip();
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
          const pdfBytes = await newPdf.save();
          zip.file(`page_${i + 1}.pdf`, pdfBytes);
        }
        
        const zipContent = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipContent);
        const a = document.createElement('a');
        a.href = url;
        a.download = `split_${file.name}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => router.push('/'), 1000);

      } else {
        // Custom range into a single PDF
        const pagesToExtract = parseRange(customRange, totalPages);
        if (pagesToExtract.length === 0) {
          alert('Format rentang halaman tidak valid.');
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        // PDF-lib indices are 0-based, our input is 1-based
        const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract.map(p => p - 1));
        copiedPages.forEach((page) => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extracted_${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Terjadi kesalahan saat memisahkan PDF. Pastikan file valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      <ToolHeader 
        title="Pisahkan PDF" 
        description="Ekstrak halaman dari file PDF Anda atau pisahkan setiap halaman menjadi file PDF terpisah dengan kualitas tinggi."
      />

      {!file ? (
        <FileUploader 
          onFilesSelected={handleFilesSelected} 
          accept={{ 'application/pdf': ['.pdf'] }}
          maxFiles={1}
          label="Pilih File PDF"
        />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* File Info Panel */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <FileText size={80} className="text-primary" />
                <button 
                  onClick={() => setFile(null)}
                  className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                >
                  <X size={16} />
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 truncate w-full">{file.name}</h3>
              <p className="text-gray-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            {/* Split Options Panel */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-6 flex items-center">
                <Scissors size={20} className="mr-2 text-primary" /> Opsi Pemisahan
              </h3>

              <div className="space-y-4 mb-8">
                <label className={`block border rounded-lg p-4 cursor-pointer transition-colors ${splitOption === 'all' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <div className="flex items-start">
                    <input 
                      type="radio" 
                      name="splitOption" 
                      value="all" 
                      checked={splitOption === 'all'} 
                      onChange={() => setSplitOption('all')}
                      className="mt-1"
                    />
                    <div className="ml-3">
                      <span className="block font-medium text-gray-900">Ekstrak Semua Halaman</span>
                      <span className="block text-sm text-gray-500">Pisahkan setiap halaman menjadi file PDF tersendiri (Didownload sebagai .ZIP).</span>
                    </div>
                  </div>
                </label>

                <label className={`block border rounded-lg p-4 cursor-pointer transition-colors ${splitOption === 'custom' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <div className="flex items-start">
                    <input 
                      type="radio" 
                      name="splitOption" 
                      value="custom" 
                      checked={splitOption === 'custom'} 
                      onChange={() => setSplitOption('custom')}
                      className="mt-1"
                    />
                    <div className="ml-3 w-full">
                      <span className="block font-medium text-gray-900">Tentukan Rentang</span>
                      <span className="block text-sm text-gray-500 mb-2">Pilih halaman tertentu untuk diekstrak jadi satu file.</span>
                      <input 
                        type="text" 
                        value={customRange}
                        onChange={(e) => setCustomRange(e.target.value)}
                        placeholder="Misal: 1-5, 8, 11-13" 
                        disabled={splitOption !== 'custom'}
                        className="w-full p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </label>
              </div>

              <button 
                onClick={handleSplit}
                disabled={isProcessing || (splitOption === 'custom' && !customRange)}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${isProcessing || (splitOption === 'custom' && !customRange) ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}`}
              >
                <Scissors size={18} className="mr-2" />
                {isProcessing ? 'Memproses...' : 'Pisahkan Sekarang'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
