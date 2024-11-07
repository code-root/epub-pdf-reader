import React from 'react';
import { useReaderStore } from '../store/useReaderStore';
import { 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  HighlighterIcon,
  Book,
  ScrollText
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    currentPage, 
    setCurrentPage,
    viewMode,
    setViewMode,
    addBookmark
  } = useReaderStore();

  const handleAddBookmark = () => {
    addBookmark({
      page: currentPage,
      text: `Bookmark at page ${currentPage}`,
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 rounded hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddBookmark}
              className="p-2 rounded hover:bg-gray-100"
              title="Add bookmark"
            >
              <Bookmark className="w-5 h-5" />
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'book' ? 'scroll' : 'book')}
              className="p-2 rounded hover:bg-gray-100"
              title="Toggle view mode"
            >
              {viewMode === 'book' ? (
                <ScrollText className="w-5 h-5" />
              ) : (
                <Book className="w-5 h-5" />
              )}
            </button>

            <select
              value={settings.fontSize}
              onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
              className="border rounded px-2 py-1"
            >
              {[12, 14, 16, 18, 20, 22, 24].map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
            
            <input
              type="color"
              value={settings.textColor}
              onChange={(e) => updateSettings({ textColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer"
            />
            
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value as 'en' | 'ar' })}
              className="border rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};