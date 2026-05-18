'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  label?: string;
  subLabel?: string;
  maxSizeMB?: number;
}

export default function FileUploader({
  onFilesSelected,
  accept,
  maxFiles = 0, // 0 means unlimited
  label = "Pilih File Anda",
  subLabel = "atau tarik dan lepaskan file di sini",
  maxSizeMB = 20
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const maxSize = maxSizeMB * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles > 0 ? maxFiles : undefined,
    maxSize
  });

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary-soft/50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-blue-50 rounded-full text-primary">
            <Upload size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{label}</p>
            <p className="text-gray-500 mt-1">{subLabel}</p>
          </div>
          <button type="button" className="mt-4 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Pilih File
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Maksimal ukuran hingga {maxSizeMB}MB per file.
          </p>
        </div>
      </div>
    </div>
  );
}
