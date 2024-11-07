import React, { useCallback } from 'react';
import { FileType } from '../types';
import { useReaderStore } from '../store/useReaderStore';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (url: string, type: FileType) => void;
  onError: (message: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, onError }) => {
  const { setLoading } = useReaderStore();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      let fileType: FileType | null = null;

      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'pdf') {
        fileType = 'pdf';
      } else if (fileExtension === 'epub') {
        fileType = 'epub';
      }

      if (fileType) {
        const url = URL.createObjectURL(file);
        onFileSelect(url, fileType);
      } else {
        onError('Please select a valid PDF or EPUB file');
      }
      setLoading(false);
    }
  }, [onFileSelect, onError, setLoading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Document Reader
        </h1>
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 text-gray-400 mb-3" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF or EPUB files</p>
            </div>
            <input
              type="file"
              accept=".pdf,.epub"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};