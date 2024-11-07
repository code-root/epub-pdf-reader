import React, { useState } from 'react';
import { PDFReader } from './components/PDFReader';
import { EpubReader } from './components/EpubReader';
import { Toolbar } from './components/Toolbar';
import { FileUpload } from './components/FileUpload';
import { useReaderStore } from './store/useReaderStore';
import { FileType } from './types';

function App() {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { setFileType, fileType } = useReaderStore();

  const handleFileSelect = (url: string, type: FileType) => {
    setFileUrl(url);
    setFileType(type);
    setError('');
  };

  if (!fileUrl) {
    return <FileUpload onFileSelect={handleFileSelect} onError={setError} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar />
      {fileType === 'pdf' ? (
        <PDFReader url={fileUrl} />
      ) : (
        <EpubReader url={fileUrl} />
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;