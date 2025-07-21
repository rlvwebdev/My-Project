import React from 'react';
import { cn } from '@/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'accent' | 'primary';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  as?: 'section' | 'div' | 'article' | 'aside' | 'main';
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  };
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  divider?: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    className, 
    children, 
    size = 'lg',
    center = true,
    padding = 'md',
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "w-full",
          // Centering
          {
            'mx-auto': center,
          },
          // Sizes
          {
            'max-w-2xl': size === 'sm',
            'max-w-4xl': size === 'md',
            'max-w-6xl': size === 'lg',
            'max-w-7xl': size === 'xl',
            'max-w-none': size === 'full',
          },
          // Padding
          {
            'px-0': padding === 'none',
            'px-4': padding === 'sm',
            'px-6': padding === 'md',
            'px-8': padding === 'lg',
            'px-12': padding === 'xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    children, 
    variant = 'default',
    padding = 'lg',
    spacing = 'normal',
    as = 'section',
    ...props 
  }, ref) => {
    const Component = as as React.ElementType;
    
    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          "w-full",
          // Variants
          {
            'bg-background text-foreground': variant === 'default',
            'bg-muted text-muted-foreground': variant === 'muted',
            'bg-accent text-accent-foreground': variant === 'accent',
            'bg-primary text-primary-foreground': variant === 'primary',
          },
          // Padding
          {
            'py-0': padding === 'none',
            'py-8': padding === 'sm',
            'py-12': padding === 'md',
            'py-16': padding === 'lg',
            'py-24': padding === 'xl',
          },
          // Spacing between child elements
          {
            'space-y-4': spacing === 'tight',
            'space-y-6': spacing === 'normal',
            'space-y-8': spacing === 'relaxed',
            'space-y-12': spacing === 'loose',
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

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className, 
    children, 
    cols = 'auto',
    gap = 'md',
    responsive,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base grid
          "grid",
          // Columns
          {
            'grid-cols-1': cols === 1,
            'grid-cols-2': cols === 2,
            'grid-cols-3': cols === 3,
            'grid-cols-4': cols === 4,
            'grid-cols-5': cols === 5,
            'grid-cols-6': cols === 6,
            'grid-cols-12': cols === 12,
            'grid-cols-auto': cols === 'auto',
          },
          // Responsive columns
          responsive && {
            [`sm:grid-cols-${responsive.sm}`]: responsive.sm,
            [`md:grid-cols-${responsive.md}`]: responsive.md,
            [`lg:grid-cols-${responsive.lg}`]: responsive.lg,
            [`xl:grid-cols-${responsive.xl}`]: responsive.xl,
          },
          // Gaps
          {
            'gap-0': gap === 'none',
            'gap-2': gap === 'sm',
            'gap-4': gap === 'md',
            'gap-6': gap === 'lg',
            'gap-8': gap === 'xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    className, 
    children, 
    direction = 'row',
    align = 'start',
    justify = 'start',
    wrap = 'nowrap',
    gap = 'none',
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base flex
          "flex",
          // Direction
          {
            'flex-row': direction === 'row',
            'flex-col': direction === 'column',
            'flex-row-reverse': direction === 'row-reverse',
            'flex-col-reverse': direction === 'column-reverse',
          },
          // Align items
          {
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end',
            'items-stretch': align === 'stretch',
            'items-baseline': align === 'baseline',
          },
          // Justify content
          {
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
            'justify-between': justify === 'between',
            'justify-around': justify === 'around',
            'justify-evenly': justify === 'evenly',
          },
          // Wrap
          {
            'flex-wrap': wrap === 'wrap',
            'flex-nowrap': wrap === 'nowrap',
            'flex-wrap-reverse': wrap === 'wrap-reverse',
          },
          // Gap
          {
            'gap-0': gap === 'none',
            'gap-2': gap === 'sm',
            'gap-4': gap === 'md',
            'gap-6': gap === 'lg',
            'gap-8': gap === 'xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    children, 
    spacing = 'md',
    align = 'stretch',
    divider,
    ...props 
  }, ref) => {
    const childrenArray = React.Children.toArray(children);
    
    return (
      <div
        ref={ref}
        className={cn(
          // Base stack (column flex)
          "flex flex-col",
          // Spacing
          {
            'space-y-0': spacing === 'none',
            'space-y-1': spacing === 'xs',
            'space-y-2': spacing === 'sm',
            'space-y-4': spacing === 'md',
            'space-y-6': spacing === 'lg',
            'space-y-8': spacing === 'xl',
          },
          // Alignment
          {
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end',
            'items-stretch': align === 'stretch',
          },
          className
        )}
        {...props}
      >
        {divider
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && divider}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  }
);

Container.displayName = "Container";
Section.displayName = "Section";
Grid.displayName = "Grid";
Flex.displayName = "Flex";
Stack.displayName = "Stack";

export { Container, Section, Grid, Flex, Stack };
