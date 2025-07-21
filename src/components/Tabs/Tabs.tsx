'use client';

import React, { useState } from 'react';
import { cn } from '@/utils';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  type?: 'line' | 'card' | 'editable-card';
  centered?: boolean;
  tabBarGutter?: number;
  hideAdd?: boolean;
  destroyInactiveTabPane?: boolean;
  onChange?: (activeKey: string) => void;
  onEdit?: (targetKey: string, action: 'add' | 'remove') => void;
  onTabClick?: (key: string, event: React.MouseEvent) => void;
  className?: string;
  tabBarClassName?: string;
  contentClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  position = 'top',
  size = 'md',
  type = 'line',
  centered = false,
  tabBarGutter = 0,
  hideAdd = false,
  destroyInactiveTabPane = false,
  onChange,
  onEdit,
  onTabClick,
  className,
  tabBarClassName,
  contentClassName,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    defaultActiveKey || items[0]?.key || ''
  );

  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;
  const isControlled = controlledActiveKey !== undefined;

  const handleTabClick = (key: string, event: React.MouseEvent) => {
    const item = items.find(item => item.key === key);
    if (item?.disabled) return;

    if (!isControlled) {
      setInternalActiveKey(key);
    }

    onChange?.(key);
    onTabClick?.(key, event);
  };

  const handleClose = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit?.(key, 'remove');
  };

  const handleAdd = () => {
    onEdit?.('', 'add');
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const getTabBarPosition = () => {
    switch (position) {
      case 'bottom':
        return 'flex-col-reverse';
      case 'left':
        return 'flex-row';
      case 'right':
        return 'flex-row-reverse';
      default:
        return 'flex-col';
    }
  };

  const getTabListOrientation = () => {
    return position === 'left' || position === 'right' ? 'flex-col' : 'flex-row';
  };

  const getTabListAlignment = () => {
    if (position === 'left' || position === 'right') {
      return centered ? 'items-center' : 'items-start';
    }
    return centered ? 'justify-center' : 'justify-start';
  };

  const activeItem = items.find(item => item.key === activeKey);

  return (
    <div className={cn("w-full", getTabBarPosition(), className)}>
      {/* Tab Bar */}
      <ul
        className={cn(
          "flex border-gray-200",
          getTabListOrientation(),
          getTabListAlignment(),
          {
            'border-b': position === 'top' && type !== 'card',
            'border-t': position === 'bottom' && type !== 'card',
            'border-r': position === 'left' && type !== 'card',
            'border-l': position === 'right' && type !== 'card',
            'bg-gray-50 p-1 rounded-lg': type === 'card',
            'w-48': position === 'left' || position === 'right',
          },
          tabBarGutter > 0 && position === 'top' && `gap-${tabBarGutter}`,
          tabBarClassName
        )}
        role="tablist"
      >
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <li key={item.key} role="presentation">
              <button
                className={cn(
                  "relative flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  sizeClasses[size],
                  {
                    // Line type styles
                    'hover:text-blue-600 border-b-2 border-transparent hover:border-blue-300':
                      type === 'line' && !isActive && !item.disabled,
                    'text-blue-600 border-b-2 border-blue-600':
                      type === 'line' && isActive,
                    
                    // Card type styles
                    'rounded-md hover:bg-white hover:shadow-sm':
                      type === 'card' && !isActive && !item.disabled,
                    'bg-white shadow-sm rounded-md':
                      type === 'card' && isActive,
                    
                    // Editable card type styles
                    'rounded-t-md border border-gray-200 border-b-0 bg-white ml-px':
                      type === 'editable-card' && isActive,
                    'rounded-t-md border border-transparent hover:border-gray-200 hover:border-b-0 ml-px':
                      type === 'editable-card' && !isActive && !item.disabled,
                    
                    // Disabled styles
                    'cursor-not-allowed text-gray-400': item.disabled,
                    'cursor-pointer': !item.disabled,
                    
                    // Vertical orientation adjustments
                    'justify-start w-full': position === 'left' || position === 'right',
                  }
                )}
                onClick={(e) => handleTabClick(item.key, e)}
                disabled={item.disabled}
                role="tab"
                aria-selected={isActive ? 'true' : 'false'}
                aria-controls={`tabpanel-${item.key}`}
                id={`tab-${item.key}`}
                tabIndex={isActive ? 0 : -1}
              >
              {item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              
              <span className="truncate">{item.label}</span>
              
              {item.badge && (
                <span className="flex-shrink-0">{item.badge}</span>
              )}
              
              {item.closable && type === 'editable-card' && (
                <button
                  onClick={(e) => handleClose(item.key, e)}
                  className="ml-1 p-1 rounded hover:bg-gray-200 flex-shrink-0"
                  aria-label={`Close ${typeof item.label === 'string' ? item.label : 'tab'}`}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </button>
            </li>
          );
        })}
        
        {/* Add button for editable-card type */}
        {type === 'editable-card' && !hideAdd && (
          <li role="presentation">
            <button
              onClick={handleAdd}
              className={cn(
                "flex items-center justify-center rounded-t-md border border-gray-200 border-b-0 bg-gray-50 hover:bg-gray-100 transition-colors ml-px",
                sizeClasses[size],
                "w-8"
              )}
              aria-label="Add tab"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </li>
        )}
      </ul>

      {/* Tab Content */}
      <div
        className={cn(
          "flex-1",
          {
            'border border-gray-200 rounded-b-lg': type === 'editable-card',
            'mt-4': position === 'top' && type !== 'editable-card',
            'mb-4': position === 'bottom' && type !== 'editable-card',
            'ml-4': position === 'left' && type !== 'editable-card',
            'mr-4': position === 'right' && type !== 'editable-card',
          },
          contentClassName
        )}
      >
        {destroyInactiveTabPane ? (
          activeItem && (
            <div
              role="tabpanel"
              aria-labelledby={`tab-${activeItem.key}`}
              id={`tabpanel-${activeItem.key}`}
              tabIndex={0}
            >
              {activeItem.content}
            </div>
          )
        ) : (
          items.map((item) => (
            <div
              key={item.key}
              className={cn(
                item.key !== activeKey && "hidden"
              )}
              role="tabpanel"
              aria-labelledby={`tab-${item.key}`}
              id={`tabpanel-${item.key}`}
              tabIndex={0}
              aria-hidden={item.key !== activeKey ? 'true' : 'false'}
            >
              {item.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export interface TabPaneProps {
  tab: React.ReactNode;
  key: string;
  disabled?: boolean;
  closable?: boolean;
  children: React.ReactNode;
}

const TabPane: React.FC<TabPaneProps> = ({ children }) => {
  return <>{children}</>;
};

export { Tabs, TabPane };
