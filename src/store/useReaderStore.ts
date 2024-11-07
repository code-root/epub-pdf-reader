import { create } from 'zustand';
import { FileType, Bookmark, Highlight, ReaderSettings } from '../types';
import { persist } from 'zustand/middleware';

interface ReaderStore {
  currentPage: number;
  fileType: FileType | null;
  settings: ReaderSettings;
  bookmarks: Bookmark[];
  highlights: Highlight[];
  isLoading: boolean;
  viewMode: 'scroll' | 'book';
  setCurrentPage: (page: number) => void;
  setFileType: (type: FileType | null) => void;
  updateSettings: (settings: Partial<ReaderSettings>) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'timestamp'>) => void;
  removeBookmark: (timestamp: number) => void;
  addHighlight: (highlight: Omit<Highlight, 'id'>) => void;
  removeHighlight: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setViewMode: (mode: 'scroll' | 'book') => void;
}

export const useReaderStore = create<ReaderStore>()(
  persist(
    (set) => ({
      currentPage: 1,
      fileType: null,
      settings: {
        fontSize: 16,
        textColor: '#000000',
        language: 'en',
      },
      bookmarks: [],
      highlights: [],
      isLoading: false,
      viewMode: 'book',
      setCurrentPage: (page) => set({ currentPage: page }),
      setFileType: (type) => set({ fileType: type }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [
            ...state.bookmarks,
            { ...bookmark, timestamp: Date.now() },
          ],
        })),
      removeBookmark: (timestamp) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.timestamp !== timestamp),
        })),
      addHighlight: (highlight) =>
        set((state) => ({
          highlights: [
            ...state.highlights,
            { ...highlight, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      removeHighlight: (id) =>
        set((state) => ({
          highlights: state.highlights.filter((h) => h.id !== id),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'reader-store',
    }
  )
);