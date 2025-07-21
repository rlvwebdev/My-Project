'use client';

import React, { useState } from 'react';
import { cn } from '@/utils';

export interface AccordionItem {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultActiveKeys?: string[];
  activeKeys?: string[];
  expandIconPosition?: 'left' | 'right';
  expandIcon?: (props: { isActive: boolean; disabled: boolean }) => React.ReactNode;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ghost?: boolean;
  collapsible?: 'header' | 'icon' | 'disabled';
  accordion?: boolean; // Only one panel can be open at a time
  onChange?: (activeKeys: string[]) => void;
  className?: string;
  itemClassName?: string;
}

const defaultExpandIcon = ({ isActive, disabled }: { isActive: boolean; disabled: boolean }) => (
  <svg
    className={cn(
      "w-4 h-4 transition-transform duration-200",
      isActive && "rotate-180",
      disabled && "opacity-50"
    )}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultActiveKeys = [],
  activeKeys: controlledActiveKeys,
  expandIconPosition = 'right',
  expandIcon = defaultExpandIcon,
  bordered = true,
  size = 'md',
  ghost = false,
  collapsible = 'header',
  accordion = false,
  onChange,
  className,
  itemClassName,
}) => {
  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(defaultActiveKeys);
  
  const activeKeys = controlledActiveKeys !== undefined ? controlledActiveKeys : internalActiveKeys;
  
  const isControlled = controlledActiveKeys !== undefined;

  const handleToggle = (key: string) => {
    if (collapsible === 'disabled') return;

    let newActiveKeys: string[];

    if (accordion) {
      // In accordion mode, only one panel can be open
      newActiveKeys = activeKeys.includes(key) ? [] : [key];
    } else {
      // In regular mode, multiple panels can be open
      newActiveKeys = activeKeys.includes(key)
        ? activeKeys.filter(k => k !== key)
        : [...activeKeys, key];
    }

    if (!isControlled) {
      setInternalActiveKeys(newActiveKeys);
    }
    
    onChange?.(newActiveKeys);
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  return (
    <div className={cn(
      "divide-y divide-gray-200",
      {
        'border border-gray-200 rounded-lg': bordered && !ghost,
        'bg-white': !ghost,
      },
      className
    )}>
      {items.map((item) => {
        const isActive = activeKeys.includes(item.key);
        const isDisabled = item.disabled || collapsible === 'disabled';
        const canToggle = collapsible !== 'disabled' && !item.disabled;

        return (
          <div
            key={item.key}
            className={cn(
              {
                'first:rounded-t-lg last:rounded-b-lg': bordered && !ghost,
              },
              itemClassName
            )}
          >
            {/* Header */}
            <div
              className={cn(
                "flex items-center transition-colors",
                sizeClasses[size],
                {
                  'cursor-pointer hover:bg-gray-50': canToggle && collapsible === 'header',
                  'cursor-not-allowed opacity-50': isDisabled,
                  'bg-gray-50': isActive && !ghost,
                }
              )}
              onClick={() => collapsible === 'header' && canToggle && handleToggle(item.key)}
              role="button"
              aria-expanded={isActive ? 'true' : 'false'}
              aria-disabled={isDisabled ? 'true' : 'false'}
              tabIndex={canToggle && collapsible === 'header' ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && collapsible === 'header' && canToggle) {
                  e.preventDefault();
                  handleToggle(item.key);
                }
              }}
            >
              {/* Left expand icon */}
              {expandIconPosition === 'left' && (
                <div className="mr-3">
                  {collapsible === 'icon' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (canToggle) {
                          handleToggle(item.key);
                        }
                      }}
                      className={cn(
                        "p-1 rounded hover:bg-gray-200 transition-colors",
                        isDisabled && "cursor-not-allowed hover:bg-transparent"
                      )}
                      disabled={isDisabled}
                      aria-label={isActive ? 'Collapse' : 'Expand'}
                    >
                      {expandIcon({ isActive, disabled: isDisabled })}
                    </button>
                  ) : (
                    expandIcon({ isActive, disabled: isDisabled })
                  )}
                </div>
              )}

              {/* Icon */}
              {item.icon && (
                <div className={cn("mr-3", expandIconPosition === 'left' && 'ml-0')}>
                  {item.icon}
                </div>
              )}

              {/* Title */}
              <div className="flex-1 font-medium text-gray-900">
                {item.title}
              </div>

              {/* Extra content */}
              {item.extra && (
                <div className="ml-3">
                  {item.extra}
                </div>
              )}

              {/* Right expand icon */}
              {expandIconPosition === 'right' && (
                <div className="ml-3">
                  {collapsible === 'icon' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (canToggle) {
                          handleToggle(item.key);
                        }
                      }}
                      className={cn(
                        "p-1 rounded hover:bg-gray-200 transition-colors",
                        isDisabled && "cursor-not-allowed hover:bg-transparent"
                      )}
                      disabled={isDisabled}
                      aria-label={isActive ? 'Collapse' : 'Expand'}
                    >
                      {expandIcon({ isActive, disabled: isDisabled })}
                    </button>
                  ) : (
                    expandIcon({ isActive, disabled: isDisabled })
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            {isActive && (
              <div
                className={cn(
                  "text-gray-700 border-t border-gray-200",
                  sizeClasses[size],
                  {
                    'bg-gray-50/50': !ghost,
                  }
                )}
                role="region"
                aria-labelledby={`accordion-header-${item.key}`}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export interface CollapseProps {
  children: React.ReactNode;
  isOpen: boolean;
  title?: React.ReactNode;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ghost?: boolean;
  expandIcon?: React.ReactNode;
  onToggle?: () => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const Collapse: React.FC<CollapseProps> = ({
  children,
  isOpen,
  title,
  bordered = true,
  size = 'md',
  ghost = false,
  expandIcon,
  onToggle,
  className,
  headerClassName,
  contentClassName,
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  const defaultIcon = (
    <svg
      className={cn(
        "w-4 h-4 transition-transform duration-200",
        isOpen && "rotate-180"
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className={cn(
      {
        'border border-gray-200 rounded-lg': bordered && !ghost,
        'bg-white': !ghost,
      },
      className
    )}>
      {title && (
        <div
          className={cn(
            "flex items-center justify-between cursor-pointer transition-colors",
            sizeClasses[size],
            {
              'hover:bg-gray-50': onToggle,
              'bg-gray-50': isOpen && !ghost,
            },
            headerClassName
          )}
          onClick={onToggle}
          role="button"
          aria-expanded={isOpen ? 'true' : 'false'}
          tabIndex={onToggle ? 0 : -1}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && onToggle) {
              e.preventDefault();
              onToggle();
            }
          }}
        >
          <div className="font-medium text-gray-900">
            {title}
          </div>
          {(expandIcon || onToggle) && (
            <div className="ml-3">
              {expandIcon || defaultIcon}
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div
          className={cn(
            "text-gray-700",
            title && "border-t border-gray-200",
            sizeClasses[size],
            {
              'bg-gray-50/50': !ghost && title,
            },
            contentClassName
          )}
          role="region"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { Accordion, Collapse };
