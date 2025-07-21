'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils';

export interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
  alt?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  pauseOnHover?: boolean;
  adaptiveHeight?: boolean;
  centerMode?: boolean;
  fade?: boolean;
  vertical?: boolean;
  rtl?: boolean;
  lazyLoad?: boolean;
  className?: string;
  dotPosition?: 'top' | 'bottom' | 'left' | 'right';
  effect?: 'slide' | 'fade' | 'scrollx';
  beforeChange?: (current: number, next: number) => void;
  afterChange?: (current: number) => void;
  customPaging?: (index: number) => React.ReactNode;
  prevArrow?: React.ReactNode;
  nextArrow?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoplay = false,
  autoplaySpeed = 3000,
  dots = true,
  arrows = true,
  infinite = true,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  pauseOnHover = true,
  adaptiveHeight = false,
  fade = false,
  vertical = false,
  rtl = false,
  lazyLoad = false,
  className,
  dotPosition = 'bottom',
  beforeChange,
  afterChange,
  customPaging,
  prevArrow,
  nextArrow,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = items.length;
  const maxSlide = infinite ? totalSlides : totalSlides - slidesToShow;

  const startAutoplay = useCallback(() => {
    if (autoplay && !isPaused && totalSlides > 1) {
      autoplayRef.current = setTimeout(() => {
        setCurrentSlide(prev => {
          let next = prev + slidesToScroll;
          if (infinite) {
            if (next >= totalSlides) next = 0;
          } else {
            next = Math.min(next, totalSlides - slidesToShow);
          }
          return next;
        });
      }, autoplaySpeed);
    }
  }, [autoplay, isPaused, totalSlides, autoplaySpeed, slidesToScroll, infinite, slidesToShow]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay, currentSlide]);

  const goToSlide = useCallback((slideIndex: number) => {
    if (isTransitioning) return;

    let nextSlide = slideIndex;
    
    if (infinite) {
      if (slideIndex < 0) {
        nextSlide = totalSlides - 1;
      } else if (slideIndex >= totalSlides) {
        nextSlide = 0;
      }
    } else {
      nextSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    }

    if (nextSlide === currentSlide) return;

    beforeChange?.(currentSlide, nextSlide);
    
    setIsTransitioning(true);
    setCurrentSlide(nextSlide);

    setTimeout(() => {
      setIsTransitioning(false);
      afterChange?.(nextSlide);
    }, speed);
  }, [currentSlide, isTransitioning, infinite, totalSlides, maxSlide, beforeChange, afterChange, speed]);

  const goToNext = useCallback(() => {
    goToSlide(currentSlide + slidesToScroll);
  }, [currentSlide, slidesToScroll, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentSlide - slidesToScroll);
  }, [currentSlide, slidesToScroll, goToSlide]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (rtl) {
          goToNext();
        } else {
          goToPrev();
        }
        break;
      case 'ArrowRight':
        if (rtl) {
          goToPrev();
        } else {
          goToNext();
        }
        break;
      case 'ArrowUp':
        if (vertical) goToPrev();
        break;
      case 'ArrowDown':
        if (vertical) goToNext();
        break;
      case 'Home':
        goToSlide(0);
        break;
      case 'End':
        goToSlide(totalSlides - 1);
        break;
    }
  }, [goToNext, goToPrev, goToSlide, rtl, vertical, totalSlides]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      stopAutoplay();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const renderDots = () => {
    if (!dots) return null;

    const dotCount = Math.ceil(totalSlides / slidesToShow);
    
    return (
      <div
        className={cn(
          "flex gap-2",
          {
            'justify-center': dotPosition === 'top' || dotPosition === 'bottom',
            'flex-col items-center': dotPosition === 'left' || dotPosition === 'right',
          }
        )}
        role="tablist"
        aria-label="Carousel pagination"
      >
        {Array.from({ length: dotCount }).map((_, index) => {
          const slideIndex = index * slidesToShow;
          const isActive = Math.floor(currentSlide / slidesToShow) === index;
          
          return (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                {
                  'bg-blue-600': isActive,
                  'bg-gray-300 hover:bg-gray-400': !isActive,
                }
              )}
              onClick={() => goToSlide(slideIndex)}
              role="tab"
              aria-selected={isActive ? 'true' : 'false'}
              aria-controls={`slide-${slideIndex}`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {customPaging?.(index) || <span className="sr-only">Slide {index + 1}</span>}
            </button>
          );
        })}
      </div>
    );
  };

  const renderArrows = () => {
    if (!arrows) return null;

    const prevDisabled = !infinite && currentSlide === 0;
    const nextDisabled = !infinite && currentSlide >= maxSlide;

    return (
      <>
        {/* Previous Arrow */}
        <button
          className={cn(
            "absolute z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              'top-1/2 -translate-y-1/2 left-4': !vertical,
              'left-1/2 -translate-x-1/2 top-4': vertical,
              'opacity-50 cursor-not-allowed': prevDisabled,
            }
          )}
          onClick={goToPrev}
          disabled={prevDisabled}
          aria-label="Previous slide"
        >
          {prevArrow || (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={vertical ? "M5 15l7-7 7 7" : rtl ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} 
              />
            </svg>
          )}
        </button>

        {/* Next Arrow */}
        <button
          className={cn(
            "absolute z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              'top-1/2 -translate-y-1/2 right-4': !vertical,
              'left-1/2 -translate-x-1/2 bottom-4': vertical,
              'opacity-50 cursor-not-allowed': nextDisabled,
            }
          )}
          onClick={goToNext}
          disabled={nextDisabled}
          aria-label="Next slide"
        >
          {nextArrow || (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={vertical ? "M19 9l-7 7-7-7" : rtl ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
              />
            </svg>
          )}
        </button>
      </>
    );
  };

  return (
    <div className={cn("relative", className)}>
      {/* Dots - Top */}
      {dots && dotPosition === 'top' && (
        <div className="mb-4">
          {renderDots()}
        </div>
      )}

      <div className="flex">
        {/* Dots - Left */}
        {dots && dotPosition === 'left' && (
          <div className="mr-4 flex items-center">
            {renderDots()}
          </div>
        )}

        {/* Main Carousel */}
        <div
          ref={carouselRef}
          className={cn(
            "relative overflow-hidden rounded-lg",
            {
              'h-auto': adaptiveHeight,
              'flex-1': dotPosition === 'left' || dotPosition === 'right',
            }
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-live="polite"
          aria-label="Image carousel"
        >
          <div
            className={cn(
              "flex transition-transform ease-in-out duration-500",
              {
                'flex-col': vertical,
                'h-full': vertical,
              }
            )}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "flex-shrink-0 relative w-full",
                  {
                    'opacity-0': fade && index !== currentSlide,
                    'opacity-100': fade && index === currentSlide,
                  }
                )}
                role="tabpanel"
                aria-hidden={index !== currentSlide ? 'true' : 'false'}
                id={`slide-${index}`}
              >
                {(!lazyLoad || Math.abs(index - currentSlide) <= 1) && item.content}
              </div>
            ))}
          </div>

          {renderArrows()}
        </div>

        {/* Dots - Right */}
        {dots && dotPosition === 'right' && (
          <div className="ml-4 flex items-center">
            {renderDots()}
          </div>
        )}
      </div>

      {/* Dots - Bottom */}
      {dots && dotPosition === 'bottom' && (
        <div className="mt-4">
          {renderDots()}
        </div>
      )}
    </div>
  );
};

export { Carousel };
