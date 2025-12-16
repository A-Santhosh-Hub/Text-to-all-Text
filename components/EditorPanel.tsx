import React from 'react';
import { Copy, FileText, Upload } from 'lucide-react';
import { FileStats } from '../types';

interface EditorPanelProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  stats?: FileStats;
  onFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  language?: string;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ 
  title, 
  value, 
  onChange, 
  readOnly, 
  stats, 
  onFileUpload,
  placeholder,
  language
}) => {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative group overflow-hidden cyber-glass">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${readOnly ? 'bg-cyan-500 box-shadow-[0_0_5px_#0ff]' : 'bg-green-500 box-shadow-[0_0_5px_#0f0]'}`}></div>
          <span className="text-xs font-bold tracking-wider text-slate-300 uppercase font-tech">{title}</span>
          {language && <span className="ml-2 text-[10px] px-1.5 py-0.5 border border-slate-600 rounded text-slate-400">{language.toUpperCase()}</span>}
        </div>
        
        <div className="flex gap-2">
           {!readOnly && onFileUpload && (
            <label className="cursor-pointer p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-green-400 transition-colors" title="Upload File">
              <Upload size={14} />
              <input type="file" className="hidden" onChange={onFileUpload} />
            </label>
          )}
          <button onClick={handleCopy} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-cyan-400 transition-colors" title="Copy to Clipboard">
            <Copy size={14} />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          className={`w-full h-full bg-transparent p-4 text-sm font-mono resize-none focus:outline-none scrollbar-thin
            ${readOnly ? 'text-cyan-100/90' : 'text-green-100/90'} placeholder-slate-600`}
          spellCheck={false}
          placeholder={placeholder || "// Awaiting input stream..."}
        />
        
        {/* Decorative Grid Overlay (Subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
        <div className="flex gap-4">
          <span>LN: {stats?.lines || 0}</span>
          <span>CH: {stats?.chars || 0}</span>
          <span>WD: {stats?.words || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText size={10} />
          <span>{stats?.sizeBytes ? (stats.sizeBytes / 1024).toFixed(2) + ' KB' : '0 KB'}</span>
        </div>
      </div>
      
      {/* Corner Accents */}
      <div className={`absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-r-[10px] 
        ${readOnly ? 'border-b-cyan-500/50 border-r-cyan-500/50' : 'border-b-green-500/50 border-r-green-500/50'}
        border-t-transparent border-l-transparent`}></div>
    </div>
  );
};
