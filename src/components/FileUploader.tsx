'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle2 } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  label?: string;
  subLabel?: string;
  maxSizeMB?: number;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function FileUploader({
  onFilesSelected,
  accept,
  maxFiles = 0,
  label = "Pilih File Anda",
  subLabel = "atau tarik dan lepaskan file di sini",
  maxSizeMB = 20
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rejectedMsg, setRejectedMsg] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setRejectedMsg(null);

    if (rejectedFiles.length > 0) {
      const reasons = rejectedFiles[0].errors.map((e: any) => e.message).join(', ');
      setRejectedMsg(`File ditolak: ${reasons}`);
      return;
    }

    setSelectedFiles(acceptedFiles);
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const maxSize = maxSizeMB * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles > 0 ? maxFiles : undefined,
    maxSize
  });

  return (
    <div className="w-full">
      {/* Drop Zone — sembunyikan jika sudah ada file (single file mode) */}
      {(selectedFiles.length === 0 || (maxFiles !== 1)) && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive
              ? 'border-blue-500 bg-blue-50 scale-[1.01]'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`p-4 rounded-full transition-colors ${isDragActive ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-500'}`}>
              <Upload size={32} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {isDragActive ? 'Lepaskan file di sini!' : label}
              </p>
              {!isDragActive && (
                <p className="text-gray-500 mt-1">{subLabel}</p>
              )}
            </div>
            {!isDragActive && (
              <button
                type="button"
                className="mt-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Pilih File
              </button>
            )}
            <p className="text-xs text-gray-400">
              Maksimal ukuran hingga {maxSizeMB}MB per file.
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {rejectedMsg && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
          <X size={16} className="shrink-0" />
          {rejectedMsg}
        </div>
      )}

      {/* Daftar file yang sudah dipilih */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-green-100 rounded-lg shrink-0">
                  <File size={20} className="text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 text-sm truncate">{f.name}</p>
                  <p className="text-xs text-slate-500">{formatBytes(f.size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <CheckCircle2 size={18} className="text-green-500" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="p-1 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                  title="Hapus file"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Tombol ganti file (jika single file mode) */}
          {maxFiles === 1 && (
            <div
              {...getRootProps()}
              className="text-center mt-2"
            >
              <input {...getInputProps()} />
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium"
              >
                Ganti file
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
