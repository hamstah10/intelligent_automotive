import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, FileText, X, Eye, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { t, surface } from './themeUtils';

const PURPLE = '#c084fc';

const DropZone = ({ accept, icon: Icon, title, description, onFile, file, onClear, testId }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div data-testid={testId}
      className="rounded-xl p-5 transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: dragOver ? `${PURPLE}08` : 'var(--d-surface-alt)',
        border: `2px dashed ${dragOver ? PURPLE : 'var(--d-border-sub)'}`,
      }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}>
      <input ref={inputRef} type="file" accept={accept} className="hidden"
        onChange={(e) => { if (e.target.files[0]) onFile(e.target.files[0]); }} />

      {file ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PURPLE}15` }}>
              <Icon className="w-5 h-5" style={{ color: PURPLE }} />
            </div>
            <div>
              <p className="text-xs font-medium truncate max-w-[180px]" style={{ color: t.text }}>{file.name}</p>
              <p className="text-[10px]" style={{ color: t.textDim }}>{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" disabled className="h-8 px-3 rounded-lg text-[10px] font-semibold gap-1.5 opacity-60" style={{ backgroundColor: PURPLE, color: '#000' }}
              data-testid={`${testId}-analyze-btn`}>
              <Eye className="w-3 h-3" /> Analysieren
            </Button>
            <button onClick={(e) => { e.stopPropagation(); onClear(); }} className="p-1.5 rounded-lg hover:bg-white/5">
              <X className="w-3.5 h-3.5" style={{ color: t.textMut }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${PURPLE}10` }}>
            <Icon className="w-6 h-6" style={{ color: `${PURPLE}80` }} />
          </div>
          <p className="text-xs font-medium mb-1" style={{ color: t.textSec }}>{title}</p>
          <p className="text-[10px]" style={{ color: t.textDim }}>{description}</p>
        </div>
      )}
    </div>
  );
};

export const CodingUploads = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [document, setDocument] = useState(null);

  const handleFile = (file, type) => {
    if (type === 'image') setScreenshot(file);
    else setDocument(file);
    toast.success(`${file.name} hochgeladen`);
  };

  return (
    <div data-testid="coding-uploads">
      <div className="flex items-center gap-2 mb-3">
        <Upload className="w-4 h-4" style={{ color: PURPLE }} />
        <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>Upload & Analyse</h3>
        <span className="text-[9px] px-1.5 py-0.5 rounded-md font-medium" style={{ backgroundColor: '#facc1515', color: '#facc15', border: '1px solid #facc1525' }}>Bald verfügbar</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DropZone accept="image/*" icon={Image} title="Screenshot hochladen"
          description="Bild vom Steuergerät oder VCDS-Screenshot"
          onFile={(f) => handleFile(f, 'image')} file={screenshot} onClear={() => setScreenshot(null)}
          testId="upload-screenshot" />
        <DropZone accept=".pdf,.doc,.docx,.txt,.csv" icon={FileText} title="Dokument hochladen"
          description="PDF, Coding-Liste oder Log-Datei"
          onFile={(f) => handleFile(f, 'document')} file={document} onClear={() => setDocument(null)}
          testId="upload-document" />
      </div>
    </div>
  );
};
