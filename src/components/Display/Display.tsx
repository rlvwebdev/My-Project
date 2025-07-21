'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  label?: string;
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  lines?: number;
  animate?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    children, 
    variant = 'default',
    size = 'md',
    outline = false,
    removable = false,
    onRemove,
    ...props 
  }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center font-medium rounded-full transition-colors",
          // Sizes
          {
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-0.5 text-sm': size === 'md',
            'px-3 py-1 text-base': size === 'lg',
          },
          // Variants - filled
          !outline && {
            'bg-muted text-muted-foreground': variant === 'default',
            'bg-secondary text-secondary-foreground': variant === 'secondary',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': variant === 'success',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': variant === 'warning',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': variant === 'error',
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': variant === 'info',
          },
          // Variants - outline
          outline && {
            'border border-muted text-muted-foreground': variant === 'default',
            'border border-secondary text-secondary-foreground': variant === 'secondary',
            'border border-green-300 text-green-600 dark:border-green-700 dark:text-green-400': variant === 'success',
            'border border-yellow-300 text-yellow-600 dark:border-yellow-700 dark:text-yellow-400': variant === 'warning',
            'border border-red-300 text-red-600 dark:border-red-700 dark:text-red-400': variant === 'error',
            'border border-blue-300 text-blue-600 dark:border-blue-700 dark:text-blue-400': variant === 'info',
          },
          className
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 h-3 w-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center"
          >
            ×
          </button>
        )}
      </span>
    );
  }
);

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    src, 
    alt, 
    fallback,
    size = 'md',
    shape = 'circle',
    status,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center overflow-hidden bg-muted",
          // Sizes
          {
            'h-6 w-6 text-xs': size === 'xs',
            'h-8 w-8 text-sm': size === 'sm',
            'h-10 w-10 text-base': size === 'md',
            'h-12 w-12 text-lg': size === 'lg',
            'h-16 w-16 text-xl': size === 'xl',
            'h-20 w-20 text-2xl': size === '2xl',
          },
          // Shape
          {
            'rounded-full': shape === 'circle',
            'rounded-lg': shape === 'square',
          },
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || 'Avatar'}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-muted-foreground font-medium">
            {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
          </span>
        )}
        
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
              {
                'h-2 w-2': size === 'xs' || size === 'sm',
                'h-3 w-3': size === 'md',
                'h-4 w-4': size === 'lg' || size === 'xl' || size === '2xl',
              },
              {
                'bg-green-400': status === 'online',
                'bg-gray-400': status === 'offline',
                'bg-yellow-400': status === 'away',
                'bg-red-400': status === 'busy',
              }
            )}
          />
        )}
      </div>
    );
  }
);

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    className, 
    orientation = 'horizontal',
    variant = 'solid',
    spacing = 'md',
    label,
    ...props 
  }, ref) => {
    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative flex items-center",
            {
              'my-2': spacing === 'sm',
              'my-4': spacing === 'md',
              'my-6': spacing === 'lg',
            },
            className
          )}
          {...props}
        >
          <div className="flex-grow border-t border-muted" />
          <span className="mx-4 text-sm text-muted-foreground">{label}</span>
          <div className="flex-grow border-t border-muted" />
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "border-muted",
          // Orientation
          {
            'border-t w-full': orientation === 'horizontal',
            'border-l h-full': orientation === 'vertical',
          },
          // Variant
          {
            'border-solid': variant === 'solid',
            'border-dashed': variant === 'dashed',
            'border-dotted': variant === 'dotted',
          },
          // Spacing
          orientation === 'horizontal' && {
            'my-1': spacing === 'sm',
            'my-4': spacing === 'md',
            'my-6': spacing === 'lg',
          },
          orientation === 'vertical' && {
            'mx-1': spacing === 'sm',
            'mx-4': spacing === 'md',
            'mx-6': spacing === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value,
    max = 100,
    variant = 'default',
    size = 'md',
    showLabel = false,
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between text-sm mb-1">
            <span>{label || 'Progress'}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          className={cn(
            "w-full bg-muted rounded-full overflow-hidden",
            {
              'h-1': size === 'sm',
              'h-2': size === 'md',
              'h-3': size === 'lg',
            }
          )}
        >
          <div
            className={cn(
              "h-full transition-all duration-300 ease-in-out progress-bar",
              {
                'bg-primary': variant === 'default',
                'bg-green-500': variant === 'success',
                'bg-yellow-500': variant === 'warning',
                'bg-red-500': variant === 'error',
              }
            )}
            data-width={Math.round(percentage)}
          />
        </div>
      </div>
    );
  }
);

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    width,
    height,
    variant = 'rectangular',
    lines = 1,
    animate = true,
    ...props 
  }, ref) => {
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-4 bg-muted rounded",
                animate && "animate-pulse",
                index === lines - 1 && "w-3/4" // Last line is shorter
              )}
            />
          ))}
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "bg-muted",
          animate && "animate-pulse",
          {
            'rounded': variant === 'rectangular',
            'rounded-full': variant === 'circular',
            'h-4 rounded': variant === 'text',
          },
          // Default sizes if not specified
          !width && !height && {
            'w-full h-16': variant === 'rectangular',
            'w-10 h-10': variant === 'circular',
            'w-full h-4': variant === 'text',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
Avatar.displayName = "Avatar";
Divider.displayName = "Divider";
Progress.displayName = "Progress";
Skeleton.displayName = "Skeleton";

export { Badge, Avatar, Divider, Progress, Skeleton };
