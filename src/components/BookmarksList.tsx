import React from 'react';
import { Bookmark as BookmarkIcon, X } from 'lucide-react';
import { useReaderStore } from '../store/useReaderStore';

export const BookmarksList: React.FC = () => {
  const { bookmarks, removeBookmark, setCurrentPage } = useReaderStore();

  return (
    <div className="fixed right-0 top-20 bottom-0 w-64 bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <BookmarkIcon className="w-5 h-5 mr-2" />
        Bookmarks
      </h2>
      <div className="space-y-3">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.timestamp}
            className="flex items-start justify-between p-2 hover:bg-gray-50 rounded"
          >
            <button
              onClick={() => setCurrentPage(bookmark.page)}
              className="text-left flex-1"
            >
              <div className="text-sm font-medium">Page {bookmark.page}</div>
              <div className="text-xs text-gray-500">{bookmark.text}</div>
            </button>
            <button
              onClick={() => removeBookmark(bookmark.timestamp)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};