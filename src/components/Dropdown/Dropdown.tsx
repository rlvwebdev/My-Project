'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils';

export interface DropdownItem {
  key: string;
  label: React.ReactNode;
  value?: unknown;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  divider?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger: React.ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  disabled?: boolean;
  onSelect?: (item: DropdownItem) => void;
  className?: string;
  overlayClassName?: string;
  arrow?: boolean;
  destroyOnHide?: boolean;
}

export interface SelectProps {
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  onChange?: (value: string | number | Array<string | number>) => void;
  onSearch?: (searchText: string) => void;
  className?: string;
  dropdownClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  trigger,
  placement = 'bottom-start',
  disabled = false,
  onSelect,
  className,
  overlayClassName,
  arrow = true,
  destroyOnHide = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          const item = items[focusedIndex];
          if (!item.disabled && !item.divider) {
            onSelect?.(item);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
        }
        event.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex < items.length ? nextIndex : prev;
          });
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (isOpen) {
          setFocusedIndex((prev) => {
            const nextIndex = prev - 1;
            return nextIndex >= 0 ? nextIndex : 0;
          });
          event.preventDefault();
        }
        break;
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled || item.divider) return;
    
    onSelect?.(item);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const getPlacementClasses = () => {
    switch (placement) {
      case 'top-start':
        return 'bottom-full left-0 mb-1';
      case 'top-end':
        return 'bottom-full right-0 mb-1';
      case 'bottom-end':
        return 'top-full right-0 mt-1';
      default:
        return 'top-full left-0 mt-1';
    }
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="menu"
      >
        {trigger}
      </div>

      {(isOpen || !destroyOnHide) && (
        <div
          ref={overlayRef}
          className={cn(
            "absolute z-50 min-w-[160px] bg-white border border-gray-200 rounded-md shadow-lg",
            getPlacementClasses(),
            !isOpen && "hidden",
            overlayClassName
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {arrow && (
            <div
              className={cn(
                "absolute w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45",
                placement.startsWith('top') 
                  ? "top-full -mt-1" 
                  : "bottom-full -mb-1",
                placement.endsWith('start') 
                  ? "left-3" 
                  : "right-3"
              )}
            />
          )}
          <div className="py-1">
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={item.key}
                    className="my-1 border-t border-gray-200"
                    role="separator"
                  />
                );
              }

              return (
                <div
                  key={item.key}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors",
                    {
                      'text-gray-400 cursor-not-allowed': item.disabled,
                      'text-red-600': item.danger && !item.disabled,
                      'bg-gray-50': focusedIndex === index && !item.disabled,
                      'hover:bg-gray-50': !item.disabled,
                    }
                  )}
                  onClick={() => handleItemClick(item)}
                  role="menuitem"
                  aria-disabled={item.disabled ? 'true' : 'false'}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder = 'Select an option',
  disabled = false,
  size = 'md',
  multiple = false,
  searchable = false,
  clearable = false,
  loading = false,
  onChange,
  onSearch,
  className,
  dropdownClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedValues, setSelectedValues] = useState<Array<string | number>>(
    multiple ? [] : value !== undefined ? [value] : defaultValue !== undefined ? [defaultValue] : []
  );

  const filteredOptions = searchable && searchText
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string | number) => {
    let newValues: Array<string | number>;
    
    if (multiple) {
      newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
    } else {
      newValues = [optionValue];
      setIsOpen(false);
    }
    
    setSelectedValues(newValues);
    onChange?.(multiple ? newValues : newValues[0]);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.(multiple ? [] : '');
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    
    if (multiple) {
      return `${selectedValues.length} selected`;
    }
    
    const selectedOption = options.find(opt => opt.value === selectedValues[0]);
    return selectedOption?.label || '';
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <Dropdown
      trigger={
        <div
          className={cn(
            "flex items-center justify-between bg-white border border-gray-300 rounded-md cursor-pointer transition-colors",
            sizeClasses[size],
            {
              'border-blue-500 ring-1 ring-blue-500': isOpen,
              'bg-gray-50 cursor-not-allowed': disabled,
            },
            className
          )}
        >
          <div className="flex-1 truncate">
            {searchable && isOpen ? (
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  onSearch?.(e.target.value);
                }}
                className="w-full bg-transparent outline-none"
                placeholder={placeholder}
                autoFocus
              />
            ) : (
              <span className={cn(
                selectedValues.length === 0 && "text-gray-500"
              )}>
                {getDisplayText()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            )}
            {clearable && selectedValues.length > 0 && !loading && (
              <button
                onClick={handleClear}
                className="p-1 hover:bg-gray-200 rounded"
                type="button"
                title="Clear selection"
                aria-label="Clear selection"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg 
              className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      }
      items={filteredOptions.map(option => ({
        key: String(option.value),
        label: (
          <div className="flex items-center justify-between w-full">
            <span>{option.label}</span>
            {multiple && selectedValues.includes(option.value) && (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        ),
        value: option.value,
        disabled: option.disabled,
      }))}
      onSelect={(item) => handleSelect(item.value as string | number)}
      disabled={disabled}
      overlayClassName={dropdownClassName}
    />
  );
};

export { Dropdown, Select };
