import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useReaderStore } from '../store/useReaderStore';
import { LoadingOverlay } from './LoadingOverlay';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFReaderProps {
  url: string;
}

export const PDFReader: React.FC<PDFReaderProps> = ({ url }) => {
  const { settings, currentPage, viewMode, setLoading, isLoading } = useReaderStore();
  const [numPages, setNumPages] = useState(1);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const renderPages = () => {
    if (viewMode === 'scroll') {
      return Array.from(new Array(numPages), (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          scale={settings.fontSize / 16}
          className="mx-auto mb-8"
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      ));
    }

    return (
      <Page
        pageNumber={currentPage}
        scale={settings.fontSize / 16}
        className="mx-auto"
        renderTextLayer={true}
        renderAnnotationLayer={true}
      />
    );
  };

  return (
    <div 
      className={`mt-20 p-8 ${settings.language === 'ar' ? 'rtl' : 'ltr'}`}
      dir={settings.language === 'ar' ? 'rtl' : 'ltr'}
    >
      {isLoading && <LoadingOverlay />}
      <Document 
        file={url}
        onLoadSuccess={onLoadSuccess}
        onLoadProgress={() => setLoading(true)}
        loading={<LoadingOverlay />}
      >
        {renderPages()}
      </Document>
      {viewMode === 'book' && (
        <div className="text-center mt-4">
          Page {currentPage} of {numPages}
        </div>
      )}
    </div>
  );
};