import React, { useState } from 'react';
import { Shirt } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'portrait' | 'square' | 'wide' | 'tile';
  'data-testid'?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Product image',
  aspectRatio = 'portrait',
  className,
  'data-testid': testId = 'image-with-fallback',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ratios = {
    portrait: 'aspect-[3/4]',
    tile: 'aspect-[4/5]',
    square: 'aspect-square',
    wide: 'aspect-[16/9]',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-mist flex items-center justify-center select-none',
        ratios[aspectRatio],
        className
      )}
      data-testid={testId}
    >
      {!error && src ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setError(true)}
            onLoad={() => setLoaded(true)}
            className={cn(
              'w-full h-full object-cover object-center transition-opacity duration-300',
              loaded ? 'opacity-100' : 'opacity-0'
            )}
            {...props}
          />
          {!loaded && (
            <div className="absolute inset-0 bg-mist animate-pulse" aria-hidden="true" />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-muted/60 p-4">
          <Shirt className="h-8 w-8 stroke-[1.25] mb-1" />
          <span className="text-[10px] uppercase tracking-wider">RE-thread</span>
        </div>
      )}
    </div>
  );
};

