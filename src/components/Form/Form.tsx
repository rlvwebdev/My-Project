'use client';

import React from 'react';
import { cn } from '@/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  variant?: 'default' | 'filled';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  variant?: 'default' | 'filled';
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  variant?: 'default' | 'card';
}

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  variant?: 'default' | 'card';
}

export interface RadioGroupProps {
  children: React.ReactNode;
  error?: string;
  direction?: 'horizontal' | 'vertical';
}

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    error,
    helper,
    variant = 'default',
    resize = 'vertical',
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            // Base styles
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Variants
            {
              'border-input': variant === 'default',
              'border-transparent bg-muted': variant === 'filled',
            },
            // Resize
            {
              'resize-none': resize === 'none',
              'resize-y': resize === 'vertical',
              'resize-x': resize === 'horizontal',
              'resize': resize === 'both',
            },
            // Error state
            {
              'border-destructive focus-visible:ring-destructive': error,
            },
            className
          )}
          {...props}
        />
        {(helper || error) && (
          <p className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label,
    error,
    helper,
    variant = 'default',
    options = [],
    placeholder,
    id,
    children,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            // Base styles
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Variants
            {
              'border-input': variant === 'default',
              'border-transparent bg-muted': variant === 'filled',
            },
            // Error state
            {
              'border-destructive focus-visible:ring-destructive': error,
            },
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {(helper || error) && (
          <p className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    label,
    description,
    error,
    variant = 'default',
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    
    return (
      <div className="space-y-2">
        <div
          className={cn(
            "flex items-start space-x-3",
            variant === 'card' && "rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              "h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
          <div className="flex-1 space-y-1">
            {label && (
              <label htmlFor={checkboxId} className="text-sm font-medium text-foreground cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    className, 
    label,
    description,
    error,
    variant = 'default',
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;
    
    return (
      <div className="space-y-2">
        <div
          className={cn(
            "flex items-start space-x-3",
            variant === 'card' && "rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          )}
        >
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={cn(
              "h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
          <div className="flex-1 space-y-1">
            {label && (
              <label htmlFor={radioId} className="text-sm font-medium text-foreground cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  error,
  direction = 'vertical'
}) => {
  return (
    <div className="space-y-2">
      <div
        className={cn(
          "space-y-3",
          direction === 'horizontal' && "flex space-x-6 space-y-0"
        )}
        role="radiogroup"
      >
        {children}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ 
    className, 
    label,
    description,
    size = 'md',
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;
    
    return (
      <div className="flex items-center space-x-3">
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          className={cn(
            "peer sr-only",
            className
          )}
          {...props}
        />
        <div
          className={cn(
            "relative rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            {
              'h-5 w-9': size === 'sm',
              'h-6 w-11': size === 'md',
              'h-7 w-13': size === 'lg',
            }
          )}
        >
          <div
            className={cn(
              "absolute left-0.5 top-0.5 rounded-full bg-background transition-transform peer-checked:translate-x-4",
              {
                'h-4 w-4 peer-checked:translate-x-4': size === 'sm',
                'h-5 w-5 peer-checked:translate-x-5': size === 'md',
                'h-6 w-6 peer-checked:translate-x-6': size === 'lg',
              }
            )}
          />
        </div>
        <div className="flex-1 space-y-1">
          {label && (
            <label htmlFor={switchId} className="text-sm font-medium text-foreground cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
Select.displayName = "Select";
Checkbox.displayName = "Checkbox";
Radio.displayName = "Radio";
RadioGroup.displayName = "RadioGroup";
Switch.displayName = "Switch";

export { Textarea, Select, Checkbox, Radio, RadioGroup, Switch };
