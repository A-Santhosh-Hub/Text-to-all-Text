export type SupportedFileFormat = 'txt' | 'md' | 'json' | 'html' | 'css' | 'js' | 'xml' | 'csv';

export interface FileStats {
  chars: number;
  words: number;
  lines: number;
  sizeBytes: number;
}

export enum TransformationType {
  BEAUTIFY = 'BEAUTIFY',
  MINIFY = 'MINIFY',
  UPPERCASE = 'UPPERCASE',
  LOWERCASE = 'LOWERCASE',
  TITLECASE = 'TITLECASE',
  CAMELCASE = 'CAMELCASE',
  SNAKECASE = 'SNAKECASE',
  BASE64_ENCODE = 'BASE64_ENCODE',
  BASE64_DECODE = 'BASE64_DECODE',
  REMOVE_EXTRA_SPACES = 'REMOVE_EXTRA_SPACES',
}

export interface ProcessingResult {
  content: string;
  success: boolean;
  message?: string;
}
