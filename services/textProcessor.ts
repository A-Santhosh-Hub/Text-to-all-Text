import { TransformationType, ProcessingResult } from '../types';

export const processText = (text: string, type: TransformationType, language: string = 'text'): ProcessingResult => {
  try {
    let result = text;

    switch (type) {
      case TransformationType.UPPERCASE:
        result = text.toUpperCase();
        break;
      case TransformationType.LOWERCASE:
        result = text.toLowerCase();
        break;
      case TransformationType.TITLECASE:
        result = text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );
        break;
      case TransformationType.CAMELCASE:
        result = text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, '');
        break;
      case TransformationType.SNAKECASE:
        result = text
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('_') || text;
        break;
      case TransformationType.REMOVE_EXTRA_SPACES:
        result = text.replace(/\s+/g, ' ').trim();
        break;
      case TransformationType.BASE64_ENCODE:
        result = btoa(unescape(encodeURIComponent(text)));
        break;
      case TransformationType.BASE64_DECODE:
        result = decodeURIComponent(escape(atob(text)));
        break;
      case TransformationType.MINIFY:
        if (language === 'json') {
          result = JSON.stringify(JSON.parse(text));
        } else if (language === 'html' || language === 'xml') {
          result = text.replace(/>\s+</g, '><').trim();
        } else {
          // Generic simple minifier
          result = text.replace(/\s+/g, ' ').trim();
        }
        break;
      case TransformationType.BEAUTIFY:
        if (language === 'json') {
          result = JSON.stringify(JSON.parse(text), null, 2);
        } else if (language === 'html' || language === 'xml') {
          // Simple indenter for HTML/XML
          let formatted = '';
          const reg = /(>)(<)(\/*)/g;
          const xml = text.replace(reg, '$1\r\n$2$3');
          let pad = 0;
          xml.split('\r\n').forEach(function(node) {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
              indent = 0;
            } else if (node.match(/^<\/\w/)) {
              if (pad !== 0) {
                pad -= 1;
              }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
              indent = 1;
            } else {
              indent = 0;
            }
            let padding = '';
            for (let i = 0; i < pad; i++) {
              padding += '  ';
            }
            formatted += padding + node + '\r\n';
            pad += indent;
          });
          result = formatted.trim();
        } else {
          // Fallback - just trim
           result = text.trim();
        }
        break;
      default:
        break;
    }

    return { content: result, success: true };
  } catch (error: any) {
    return { 
      content: text, 
      success: false, 
      message: error.message || 'Operation failed' 
    };
  }
};

export const getStats = (text: string) => {
  return {
    chars: text.length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    lines: text.split(/\r\n|\r|\n/).length,
    sizeBytes: new Blob([text]).size
  };
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
