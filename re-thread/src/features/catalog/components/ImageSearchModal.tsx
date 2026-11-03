import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { catalog } from '@/services';
import type { Listing } from '@/shared/types';
import { Modal, Button, Price } from '@/shared/ui';
import { Camera, Upload, Sparkles, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/routes';

interface ImageSearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const ImageSearchModal: React.FC<ImageSearchModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<Listing[]>([]);

  const handleFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setAnalyzing(true);
    setResults([]);

    try {
      await new Promise((r) => setTimeout(r, 1500));
      const matches = await catalog.similarByImage(file);
      setResults(matches);
    } catch {
      // ignore
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSample = (sampleName: string) => {
    const fakeFile = new File(['mock'], `${sampleName}.jpg`, { type: 'image/jpeg' });
    handleFile(fakeFile);
  };

  const reset = () => {
    setPreview(null);
    setResults([]);
    setAnalyzing(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onOpenChange={(o) => { if (!o) handleClose(); }} title="VISUAL GARMENT SEARCH">
      <div className="space-y-6 pt-2">
        {!preview ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-line p-8 sm:p-12 text-center bg-mist/30 hover:bg-mist/50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-paper border border-line flex items-center justify-center">
              <Camera className="w-6 h-6 text-muted" />
            </div>
            <h4 className="text-sm uppercase tracking-wider font-medium text-ink mb-1">
              Drag and drop an image or upload
            </h4>
            <p className="text-xs text-muted mb-4 max-w-sm mx-auto">
              Match thrifted garments, colors, silhouettes, or runway styles from photos.
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept="image/*"
                data-testid="image-search-input"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider bg-ink text-paper hover:bg-muted font-medium transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" /> Choose Photo
              </span>
            </label>
            <div className="mt-6 pt-4 border-t border-line/60">
              <p className="text-[11px] text-muted uppercase tracking-wider mb-2">Or try a sample look:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['linen-shirt', 'floral-dress', 'tuxedo', 'silk-saree'].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    data-testid={`image-search-sample-${sample}`}
                    onClick={() => handleSample(sample)}
                    className="text-xs px-2.5 py-1 bg-paper border border-line hover:border-ink transition-colors capitalize text-muted hover:text-ink"
                  >
                    {sample.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-3 bg-mist/40 border border-line">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-line/40 border border-line overflow-hidden shrink-0">
                  <img src={preview} alt="Searched garment" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-ink">Image Uploaded</div>
                  <div className="text-[11px] text-muted">
                    {analyzing ? 'Scanning garment features...' : `${results.length} matches found`}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={reset} data-testid="image-search-new-btn">
                Change Image
              </Button>
            </div>

            {analyzing && (
              <div className="py-12 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-ink animate-spin mx-auto stroke-1" />
                <p className="text-xs uppercase tracking-widest text-ink font-medium">
                  Analysing garment & matching catalog...
                </p>
                <p className="text-[11px] text-muted">Searching through 70+ Bengaluru seller listings</p>
              </div>
            )}

            {!analyzing && results.length > 0 && (
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-muted font-medium">
                  Visual Matches in Bengaluru
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      data-testid={`image-search-result-${item.id}`}
                      onClick={() => {
                        handleClose();
                        navigate(`${ROUTES.BROWSE}?q=${encodeURIComponent(item.brand)}`);
                      }}
                      className="group p-2 border border-line hover:border-ink cursor-pointer bg-paper transition-all"
                    >
                      <div className="aspect-[3/4] bg-mist overflow-hidden mb-2">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-muted">
                        {item.brand}
                      </div>
                      <h5 className="text-xs text-ink font-medium truncate mb-1">{item.title}</h5>
                      <Price amount={item.price} size="sm" />
                    </div>
                  ))}
                </div>
                <div className="text-center pt-2">
                  <Button
                    variant="primary"
                    data-testid="image-search-view-all"
                    onClick={() => {
                      handleClose();
                      navigate(ROUTES.BROWSE);
                    }}
                    className="w-full"
                  >
                    <span>View in Full Catalog</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

