import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import { useReaderStore } from '../store/useReaderStore';

interface EpubReaderProps {
  url: string;
}

export const EpubReader: React.FC<EpubReaderProps> = ({ url }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [book, setBook] = useState<any>(null);
  const { settings, currentPage, setCurrentPage } = useReaderStore();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!viewerRef.current) return;

    const book = ePub(url);
    setBook(book);

    const rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%',
      spread: 'none',
      flow: 'paginated',
    });

    rendition.display();

    book.ready.then(() => {
      book.locations.generate(1024).then((locations) => {
        setTotalPages(locations.length);
      });
    });

    return () => {
      book.destroy();
    };
  }, [url]);

  useEffect(() => {
    if (!book) return;

    book.rendition.themes.fontSize(`${settings.fontSize}px`);
    book.rendition.themes.default({
      body: {
        color: settings.textColor,
        direction: settings.language === 'ar' ? 'rtl' : 'ltr',
      },
    });
  }, [settings, book]);

  useEffect(() => {
    if (!book) return;
    book.rendition.display(currentPage - 1);
  }, [currentPage, book]);

  return (
    <div className="mt-20 p-8">
      <div 
        ref={viewerRef} 
        className="w-full"
        style={{ height: 'calc(100vh - 200px)' }}
      />
      {totalPages > 0 && (
        <div className="text-center mt-4 text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
};