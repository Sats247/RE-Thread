import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface CarouselProps {
  children: React.ReactNode[];
  slideClassName?: string;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  'data-testid'?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slideClassName,
  className,
  showDots = true,
  showArrows = true,
  'data-testid': testId = 'product-carousel',
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn('relative w-full select-none', className)} data-testid={testId}>
      {showArrows && (
        <div className="hidden sm:flex items-center gap-2 absolute -top-12 right-0 z-10">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            data-testid={`${testId}-prev`}
            aria-label="Previous slide"
            className="p-1.5 border border-line bg-paper text-ink hover:bg-mist disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            data-testid={`${testId}-next`}
            aria-label="Next slide"
            className="p-1.5 border border-line bg-paper text-ink hover:bg-mist disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {children.map((child, idx) => (
            <div
              key={idx}
              className={cn('flex-[0_0_100%] min-w-0 pl-4', slideClassName)}
              data-testid={`${testId}-slide-${idx}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showDots && children.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {children.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              data-testid={`${testId}-dot-${idx}`}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                'h-1.5 transition-all duration-200 rounded-none focus-visible:outline-none',
                idx === selectedIndex ? 'w-6 bg-ink' : 'w-1.5 bg-line hover:bg-muted'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

