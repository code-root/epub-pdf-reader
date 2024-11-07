import React, { useState } from 'react';
import { Document, Page, DocumentProps, PageProps } from 'react-pdf';
import { useReaderStore } from '../store/useReaderStore';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface ReaderProps {
  url: string;
}

export const Reader: React.FC<ReaderProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const { currentPage, settings, setCurrentPage } = useReaderStore();
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (err: Error) => {
    setError('Error loading PDF. Please try another file.');
    console.error('PDF load error:', err);
  };

  const documentProps: DocumentProps = {
    file: url,
    onLoadSuccess: onDocumentLoadSuccess,
    onLoadError: onDocumentLoadError,
    loading: (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    ),
    error: (
      <div className="text-red-500 text-center p-4">
        {error || 'Failed to load PDF'}
      </div>
    ),
  };

  const pageProps: PageProps = {
    pageNumber: currentPage,
    className: "mx-auto",
    scale: settings.fontSize / 16,
    loading: (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    ),
  };

  return (
    <div
      className={`mt-20 p-8 ${
        settings.language === 'ar' ? 'text-right' : 'text-left'
      }`}
      dir={settings.language === 'ar' ? 'rtl' : 'ltr'}
      style={{ color: settings.textColor }}
    >
      <Document {...documentProps}>
        <Page {...pageProps} />
      </Document>
      {numPages > 0 && (
        <div className="text-center mt-4 text-gray-600">
          Page {currentPage} of {numPages}
        </div>
      )}
    </div>
  );
};