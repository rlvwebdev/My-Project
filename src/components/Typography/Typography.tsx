import React from 'react';
import { cn } from '@/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'gradient' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'accent' | 'destructive';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  as?: 'p' | 'span' | 'div';
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'accent' | 'button';
  underline?: 'none' | 'hover' | 'always';
  external?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    className, 
    children, 
    level = 1,
    variant = 'default',
    weight = 'bold',
    align = 'left',
    as,
    ...props 
  }, ref) => {
    const Component = (as || `h${level}`) as React.ElementType;
    
    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          "font-sans tracking-tight",
          // Sizes based on level
          {
            'text-4xl md:text-5xl lg:text-6xl': level === 1,
            'text-3xl md:text-4xl lg:text-5xl': level === 2,
            'text-2xl md:text-3xl lg:text-4xl': level === 3,
            'text-xl md:text-2xl lg:text-3xl': level === 4,
            'text-lg md:text-xl lg:text-2xl': level === 5,
            'text-base md:text-lg lg:text-xl': level === 6,
          },
          // Variants
          {
            'text-foreground': variant === 'default',
            'text-muted-foreground': variant === 'muted',
            'bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent': variant === 'gradient',
          },
          // Weight
          {
            'font-normal': weight === 'normal',
            'font-medium': weight === 'medium',
            'font-semibold': weight === 'semibold',
            'font-bold': weight === 'bold',
            'font-extrabold': weight === 'extrabold',
          },
          // Alignment
          {
            'text-left': align === 'left',
            'text-center': align === 'center',
            'text-right': align === 'right',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ 
    className, 
    children, 
    variant = 'default',
    size = 'base',
    weight = 'normal',
    align = 'left',
    as = 'p',
    ...props 
  }, ref) => {
    const Component = as as React.ElementType;
    
    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          "font-sans",
          // Variants
          {
            'text-foreground': variant === 'default',
            'text-muted-foreground': variant === 'muted',
            'text-accent-foreground': variant === 'accent',
            'text-destructive': variant === 'destructive',
          },
          // Sizes
          {
            'text-xs': size === 'xs',
            'text-sm': size === 'sm',
            'text-base': size === 'base',
            'text-lg': size === 'lg',
            'text-xl': size === 'xl',
          },
          // Weight
          {
            'font-normal': weight === 'normal',
            'font-medium': weight === 'medium',
            'font-semibold': weight === 'semibold',
            'font-bold': weight === 'bold',
          },
          // Alignment
          {
            'text-left': align === 'left',
            'text-center': align === 'center',
            'text-right': align === 'right',
            'text-justify': align === 'justify',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    className, 
    children, 
    variant = 'default',
    underline = 'hover',
    external = false,
    href,
    ...props 
  }, ref) => {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          // Base styles
          "font-medium transition-colors",
          // Variants
          {
            'text-primary hover:text-primary/80': variant === 'default',
            'text-muted-foreground hover:text-foreground': variant === 'muted',
            'text-accent-foreground hover:text-accent-foreground/80': variant === 'accent',
            'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90': variant === 'button',
          },
          // Underline styles
          {
            'no-underline': underline === 'none',
            'no-underline hover:underline': underline === 'hover',
            'underline': underline === 'always',
          },
          className
        )}
        {...externalProps}
        {...props}
      >
        {children}
        {external && variant !== 'button' && (
          <span className="ml-1 inline-block text-xs">↗</span>
        )}
      </a>
    );
  }
);

Heading.displayName = "Heading";
Text.displayName = "Text";
Link.displayName = "Link";

export { Heading, Text, Link };
