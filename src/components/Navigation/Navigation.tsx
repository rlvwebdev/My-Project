'use client';

import React from 'react';
import { cn } from '@/utils';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
  onClick?: () => void;
  disabled?: boolean;
}

export interface SidebarNavProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  width?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
  showToggle?: boolean;
  className?: string;
}

export interface MobileNavProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}

const SidebarNav = React.forwardRef<HTMLDivElement, SidebarNavProps>(
  ({ 
    className,
    items,
    activeItem,
    onItemClick,
    collapsed = false,
    onToggleCollapsed,
    width = 'md',
    variant = 'default',
    showToggle = true,
    ...props 
  }, ref) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

    const toggleExpanded = (itemId: string) => {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      setExpandedItems(newExpanded);
    };

    const handleItemClick = (item: NavigationItem) => {
      if (item.children && item.children.length > 0) {
        toggleExpanded(item.id);
      } else {
        if (onItemClick) {
          onItemClick(item);
        }
        if (item.onClick) {
          item.onClick();
        }
      }
    };

    const renderNavItem = (item: NavigationItem, level = 0) => {
      const isActive = activeItem === item.id;
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id}>
          <button
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium transition-colors rounded-lg",
              "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              {
                'bg-primary text-primary-foreground hover:bg-primary/90': isActive,
                'text-muted-foreground hover:text-foreground': !isActive,
                'justify-center': collapsed && level === 0,
                'pl-6': level === 1 && !collapsed,
                'pl-9': level === 2 && !collapsed,
              }
            )}
          >
            {item.icon && (
              <span className={cn("flex-shrink-0", collapsed && level === 0 ? "w-5 h-5" : "w-4 h-4")}>
                {item.icon}
              </span>
            )}
            
            {(!collapsed || level > 0) && (
              <>
                <span className="flex-1 truncate">{item.label}</span>
                
                {item.badge && (
                  <span className="flex-shrink-0 px-2 py-0.5 text-xs bg-muted-foreground text-background rounded-full">
                    {item.badge}
                  </span>
                )}
                
                {hasChildren && (
                  <span className="flex-shrink-0">
                    <svg 
                      className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </>
            )}
          </button>

          {hasChildren && isExpanded && (!collapsed || level > 0) && (
            <div className="mt-1 space-y-1">
              {item.children!.map((child) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col bg-background border-r transition-all duration-300",
          {
            'w-16': collapsed && width === 'sm',
            'w-20': collapsed && width === 'md',
            'w-24': collapsed && width === 'lg',
            'w-48': !collapsed && width === 'sm',
            'w-64': !collapsed && width === 'md',
            'w-80': !collapsed && width === 'lg',
          },
          variant === 'minimal' && "border-0 bg-transparent",
          className
        )}
        {...props}
      >
        {/* Header with toggle */}
        {showToggle && onToggleCollapsed && (
          <div className="flex items-center justify-between p-4 border-b">
            {!collapsed && (
              <h2 className="text-lg font-semibold">Navigation</h2>
            )}
            <button
              onClick={onToggleCollapsed}
              className="p-1 rounded hover:bg-muted transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {items.map((item) => renderNavItem(item))}
        </nav>
      </div>
    );
  }
);

const MobileNav = React.forwardRef<HTMLDivElement, MobileNavProps>(
  ({ 
    className,
    items,
    activeItem,
    onItemClick,
    isOpen,
    onClose,
    title = "Navigation",
    ...props 
  }, ref) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

    const toggleExpanded = (itemId: string) => {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      setExpandedItems(newExpanded);
    };

    const handleItemClick = (item: NavigationItem) => {
      if (item.children && item.children.length > 0) {
        toggleExpanded(item.id);
      } else {
        if (onItemClick) {
          onItemClick(item);
        }
        if (item.onClick) {
          item.onClick();
        }
        onClose(); // Close mobile nav after selection
      }
    };

    const renderNavItem = (item: NavigationItem, level = 0) => {
      const isActive = activeItem === item.id;
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id}>
          <button
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-left text-base font-medium transition-colors",
              "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              {
                'bg-primary text-primary-foreground': isActive,
                'text-foreground': !isActive,
                'pl-8': level === 1,
                'pl-12': level === 2,
              }
            )}
          >
            {item.icon && (
              <span className="flex-shrink-0 w-5 h-5">
                {item.icon}
              </span>
            )}
            
            <span className="flex-1">{item.label}</span>
            
            {item.badge && (
              <span className="flex-shrink-0 px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                {item.badge}
              </span>
            )}
            
            {hasChildren && (
              <span className="flex-shrink-0">
                <svg 
                  className={cn("w-5 h-5 transition-transform", isExpanded && "rotate-90")}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </button>

          {hasChildren && isExpanded && (
            <div className="space-y-1">
              {item.children!.map((child) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />

        {/* Mobile Navigation Panel */}
        <div
          ref={ref}
          className={cn(
            "fixed top-0 left-0 bottom-0 w-80 bg-background border-r z-50 transform transition-transform duration-300 ease-in-out",
            "flex flex-col",
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="space-y-1">
              {items.map((item) => renderNavItem(item))}
            </div>
          </nav>
        </div>
      </>
    );
  }
);

SidebarNav.displayName = "SidebarNav";
MobileNav.displayName = "MobileNav";

export { SidebarNav, MobileNav };
