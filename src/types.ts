export type FileType = 'pdf' | 'epub';

export interface Bookmark {
  page: number;
  text: string;
  timestamp: number;
}

export interface Highlight {
  page: number;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
  text: string;
}

export interface ReaderSettings {
  fontSize: number;
  textColor: string;
  language: 'en' | 'ar';
}