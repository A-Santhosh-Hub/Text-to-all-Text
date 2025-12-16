import React, { useState, useEffect, useCallback } from 'react';
import { Terminal, Settings, Download, RefreshCw, Cpu, Code2, Play } from 'lucide-react';
import { CyberButton } from './components/CyberButton';
import { EditorPanel } from './components/EditorPanel';
import { processText, getStats, downloadFile } from './services/textProcessor';
import { TransformationType, SupportedFileFormat } from './types';

function App() {
  const [inputContent, setInputContent] = useState<string>('');
  const [outputContent, setOutputContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputLanguage, setInputLanguage] = useState<SupportedFileFormat>('txt');
  const [statusMessage, setStatusMessage] = useState<string>('SYSTEM READY');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Selected Operations
  const [selectedOp, setSelectedOp] = useState<TransformationType | null>(null);

  // Stats
  const inputStats = getStats(inputContent);
  const outputStats = getStats(outputContent);

  // Typing animation for status
  useEffect(() => {
    if (isProcessing) {
      setStatusMessage("PROCESSING DATA STREAM...");
    }
  }, [isProcessing]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatusMessage(`LOADING: ${file.name}`);
    
    // Determine type roughly by extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (['json', 'js', 'ts', 'html', 'css', 'xml', 'md', 'txt', 'py', 'java', 'c', 'cpp'].includes(ext || '')) {
      setInputLanguage((ext as SupportedFileFormat) || 'txt');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputContent(text);
      setStatusMessage("FILE LOADED SUCCESSFULLY");
      setTimeout(() => setStatusMessage("SYSTEM READY"), 2000);
    };
    reader.readAsText(file);
  };

  const runOperation = useCallback(() => {
    if (!inputContent) {
      setStatusMessage("ERROR: NO INPUT DETECTED");
      return;
    }
    if (!selectedOp) {
      setStatusMessage("ERROR: NO OPERATION SELECTED");
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time for "Game Feel"
    setTimeout(() => {
      const result = processText(inputContent, selectedOp, inputLanguage);
      
      if (result.success) {
        setOutputContent(result.content);
        setStatusMessage("MISSION COMPLETE");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setStatusMessage(`ERROR: ${result.message}`);
      }
      setIsProcessing(false);
    }, 600);
  }, [inputContent, selectedOp, inputLanguage]);

  const handleDownload = () => {
    if (!outputContent) return;
    const ext = inputLanguage === 'txt' ? 'txt' : inputLanguage;
    downloadFile(outputContent, `santext-export.${ext}`, 'text/plain');
    setStatusMessage("FILE SAVED TO DISK");
  };

  const handleReset = () => {
    setInputContent('');
    setOutputContent('');
    setStatusMessage("SYSTEM RESET COMPLETE");
    setSelectedOp(null);
  };

  return (
    <div className="min-h-screen text-slate-300 font-mono selection:bg-green-500/30 pb-12">
      
      {/* Background Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-[-1]" 
           style={{
             backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, rgba(0,0,0,0) 50%)'
           }}>
      </div>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 pt-6 flex flex-col h-screen">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-2 border border-green-500 rounded bg-green-500/10 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
              <Terminal className="text-green-500" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tighter font-tech glitch-hover cursor-default">
                SanText<span className="text-green-500">Engine</span>
              </h1>
              <p className="text-xs text-green-500/70 tracking-[0.2em] uppercase">Multi-Format Text Processor v1.0</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">System Status</div>
              <div className={`text-sm font-bold tracking-wider ${isProcessing ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
                {statusMessage}
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Grid */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-0 mb-6">
          
          {/* Input Section */}
          <section className="lg:col-span-5 h-[500px] lg:h-auto flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Input Source</label>
              <select 
                value={inputLanguage}
                onChange={(e) => setInputLanguage(e.target.value as SupportedFileFormat)}
                className="bg-slate-900 border border-slate-700 text-xs text-green-400 rounded px-2 py-1 focus:outline-none focus:border-green-500"
              >
                <option value="txt">Plain Text (.txt)</option>
                <option value="json">JSON (.json)</option>
                <option value="html">HTML (.html)</option>
                <option value="xml">XML (.xml)</option>
                <option value="md">Markdown (.md)</option>
                <option value="css">CSS (.css)</option>
                <option value="js">JavaScript (.js)</option>
              </select>
            </div>
            <EditorPanel 
              title="RAW_DATA_INPUT" 
              value={inputContent} 
              onChange={setInputContent}
              stats={inputStats}
              onFileUpload={handleFileUpload}
              language={inputLanguage}
              placeholder="// Paste code, drag file, or start typing..."
            />
          </section>

          {/* Operations Center (Middle) */}
          <section className="lg:col-span-2 flex flex-col gap-4 justify-center">
            
            <div className="p-4 border border-slate-800 bg-slate-950/50 rounded-lg cyber-glass">
              <div className="flex items-center gap-2 mb-4 text-slate-400 pb-2 border-b border-slate-800">
                <Settings size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">Modules</span>
              </div>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
                <p className="text-[10px] text-slate-600 uppercase mb-1">Formatting</p>
                <OpButton 
                  active={selectedOp === TransformationType.BEAUTIFY} 
                  onClick={() => setSelectedOp(TransformationType.BEAUTIFY)} 
                  label="Beautify / Fmt" 
                />
                <OpButton 
                  active={selectedOp === TransformationType.MINIFY} 
                  onClick={() => setSelectedOp(TransformationType.MINIFY)} 
                  label="Minify" 
                />
                <OpButton 
                  active={selectedOp === TransformationType.REMOVE_EXTRA_SPACES} 
                  onClick={() => setSelectedOp(TransformationType.REMOVE_EXTRA_SPACES)} 
                  label="Trim Spaces" 
                />

                <p className="text-[10px] text-slate-600 uppercase mb-1 mt-3">Text Case</p>
                <OpButton 
                  active={selectedOp === TransformationType.UPPERCASE} 
                  onClick={() => setSelectedOp(TransformationType.UPPERCASE)} 
                  label="UPPERCASE" 
                />
                <OpButton 
                  active={selectedOp === TransformationType.LOWERCASE} 
                  onClick={() => setSelectedOp(TransformationType.LOWERCASE)} 
                  label="lowercase" 
                />
                <OpButton 
                  active={selectedOp === TransformationType.TITLECASE} 
                  onClick={() => setSelectedOp(TransformationType.TITLECASE)} 
                  label="Title Case" 
                />
                <OpButton 
                  active={selectedOp === TransformationType.CAMELCASE} 
                  onClick={() => setSelectedOp(TransformationType.CAMELCASE)} 
                  label="camelCase" 
                />
                 <OpButton 
                  active={selectedOp === TransformationType.SNAKECASE} 
                  onClick={() => setSelectedOp(TransformationType.SNAKECASE)} 
                  label="snake_case" 
                />

                <p className="text-[10px] text-slate-600 uppercase mb-1 mt-3">Encoding</p>
                <OpButton 
                  active={selectedOp === TransformationType.BASE64_ENCODE} 
                  onClick={() => setSelectedOp(TransformationType.BASE64_ENCODE)} 
                  label="Base64 Encode" 
                />
                <OpButton 
                  active={selectedOp === TransformationType.BASE64_DECODE} 
                  onClick={() => setSelectedOp(TransformationType.BASE64_DECODE)} 
                  label="Base64 Decode" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <CyberButton 
                variant="primary" 
                label={isProcessing ? "RUNNING..." : "▶ RUN"} 
                onClick={runOperation}
                disabled={isProcessing || !inputContent}
                className="w-full"
              />
              <CyberButton 
                variant="secondary" 
                label="⟲ RESET" 
                onClick={handleReset}
                className="w-full"
              />
            </div>

          </section>

          {/* Output Section */}
          <section className="lg:col-span-5 h-[500px] lg:h-auto flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider text-cyan-500 font-bold">Processed Output</label>
              {outputContent && (
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-1 text-[10px] bg-cyan-900/30 border border-cyan-800 text-cyan-400 px-2 py-1 rounded hover:bg-cyan-800/50 transition-colors uppercase"
                >
                  <Download size={12} /> Save File
                </button>
              )}
            </div>
            <div className="relative flex-1">
              <EditorPanel 
                title="COMPILED_RESULT" 
                value={outputContent} 
                readOnly={true}
                stats={outputStats}
                language={inputLanguage}
              />
              
              {/* Success Overlay */}
              {showSuccess && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 animate-in fade-in duration-300">
                    <div className="border border-green-500 bg-black p-6 shadow-[0_0_30px_rgba(0,255,0,0.3)] text-center transform scale-110">
                       <div className="text-4xl mb-2">✅</div>
                       <h3 className="text-xl font-bold text-white font-tech tracking-widest mb-1">MISSION COMPLETE</h3>
                       <p className="text-xs text-green-500 uppercase">Data processed successfully</p>
                    </div>
                 </div>
              )}
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-slate-600 font-mono">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
             <div className="w-2 h-2 rounded-full bg-green-900 animate-pulse"></div>
             <span>SECURE CONNECTION: Data never leaves your device</span>
          </div>
          
          <div className="text-center md:text-right">
            <p>Developed by <span className="text-slate-400">Santhosh</span> | <span className="text-green-600 font-bold">SanStudio</span></p>
            <a 
              href="https://sanstudio.neocities.org/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block mt-1 hover:text-green-400 transition-colors group"
            >
              <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">👉 sanstudio.neocities.org</span>
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}

// Small helper component for Operation Buttons
const OpButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-[11px] font-mono border transition-all duration-200 flex items-center justify-between group
      ${active 
        ? 'bg-green-900/20 border-green-500 text-green-400 shadow-[0_0_10px_rgba(0,255,0,0.1)]' 
        : 'bg-transparent border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
      }`}
  >
    <span>{label}</span>
    {active && <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#0f0]"></span>}
  </button>
);

export default App;
