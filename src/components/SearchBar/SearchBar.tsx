'use client';

import React from 'react';
import { cn } from '@/utils';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  suggestions?: string[];
  showSuggestions?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  clearable?: boolean;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ 
    className,
    onSearch,
    onClear,
    suggestions = [],
    showSuggestions = false,
    isLoading = false,
    variant = 'default',
    size = 'md',
    icon,
    clearable = true,
    placeholder = 'Search...',
    value,
    onChange,
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState(value || '');
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(String(value));
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(showSuggestions && suggestions.length > 0);
      setHighlightedIndex(-1);
      
      if (onChange) {
        onChange(e);
      }
    };

    const handleSearch = () => {
      if (onSearch) {
        onSearch(String(inputValue));
      }
      setIsOpen(false);
    };

    const handleClear = () => {
      setInputValue('');
      setIsOpen(false);
      setHighlightedIndex(-1);
      
      if (onClear) {
        onClear();
      }
      
      if (onChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || suggestions.length === 0) {
        if (e.key === 'Enter') {
          handleSearch();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            setInputValue(suggestions[highlightedIndex]);
            if (onSearch) {
              onSearch(suggestions[highlightedIndex]);
            }
          } else {
            handleSearch();
          }
          setIsOpen(false);
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      setInputValue(suggestion);
      if (onSearch) {
        onSearch(suggestion);
      }
      setIsOpen(false);
      inputRef.current?.focus();
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={containerRef} className="relative w-full">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon || (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(showSuggestions && suggestions.length > 0)}
            placeholder={placeholder}
            className={cn(
              // Base styles
              "w-full rounded-md border border-input bg-background text-sm ring-offset-background transition-colors",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Icon padding
              "pl-10",
              // Clear button padding
              clearable && inputValue && "pr-10",
              !clearable && "pr-3",
              // Sizes
              {
                'h-8 text-xs': size === 'sm',
                'h-10 text-sm': size === 'md',
                'h-12 text-base': size === 'lg',
              },
              // Variants
              {
                'border-input': variant === 'default',
                'border-transparent bg-muted': variant === 'filled',
              },
              className
            )}
            {...props}
          />

          {/* Clear button */}
          {clearable && inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        {/* Suggestions dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors",
                  highlightedIndex === index && "bg-muted"
                )}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
