'use client';

import React from 'react';
import { cn } from '@/utils';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
  maxHeight?: string | number;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  emptyText?: string;
  className?: string;
  rowKey?: keyof T | ((record: T) => string);
  onRowClick?: (record: T, index: number) => void;
  rowClassName?: (record: T, index: number) => string;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  striped = false,
  hoverable = true,
  bordered = false,
  size = 'md',
  sticky = false,
  maxHeight,
  onSort,
  sortKey,
  sortDirection,
  emptyText = 'No data available',
  className,
  rowKey,
  onRowClick,
  rowClassName,
  pagination,
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    if (typeof rowKey === 'string') {
      return String(record[rowKey]);
    }
    return String(index);
  };

  const handleSort = (key: string) => {
    if (!onSort) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDirection === 'asc') {
      direction = 'desc';
    }
    
    onSort(key, direction);
  };

  const renderCell = (column: TableColumn<T>, record: T, index: number): React.ReactNode => {
    const value = column.dataIndex ? record[column.dataIndex] : undefined;
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    // Convert value to string for display
    if (value === null || value === undefined) {
      return '';
    }
    
    return String(value);
  };

  const tableContent = (
    <div
      className={cn(
        "relative overflow-auto",
        maxHeight && "max-h-[400px]" // Default fallback
      )}
    >
      <table className={cn("w-full border-collapse", className)}>
        <thead className={cn(sticky && "sticky top-0 z-10")}>
          <tr className="bg-muted">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "font-medium text-muted-foreground border-b",
                  {
                    'px-2 py-1 text-xs': size === 'sm',
                    'px-4 py-2 text-sm': size === 'md',
                    'px-6 py-3 text-base': size === 'lg',
                    'text-left': column.align === 'left' || !column.align,
                    'text-center': column.align === 'center',
                    'text-right': column.align === 'right',
                    'border-l border-r': bordered,
                  }
                )}
              >
                <div className="flex items-center gap-1">
                  <span>{column.title}</span>
                  {column.sortable && (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="p-1 hover:bg-muted-foreground/10 rounded transition-colors"
                      aria-label={`Sort by ${column.title}`}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {sortKey === column.key ? (
                          sortDirection === 'asc' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          )
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        )}
                      </svg>
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
                  <span className="text-muted-foreground">Loading...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((record, index) => {
              const key = getRowKey(record, index);
              const customRowClass = rowClassName ? rowClassName(record, index) : '';
              
              return (
                <tr
                  key={key}
                  onClick={onRowClick ? () => onRowClick(record, index) : undefined}
                  className={cn(
                    "border-b transition-colors",
                    {
                      'bg-muted/50': striped && index % 2 === 1,
                      'hover:bg-muted/50': hoverable,
                      'cursor-pointer': onRowClick,
                      'border-l border-r': bordered,
                    },
                    customRowClass
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        {
                          'px-2 py-1 text-xs': size === 'sm',
                          'px-4 py-2 text-sm': size === 'md',
                          'px-6 py-3 text-base': size === 'lg',
                          'text-left': column.align === 'left' || !column.align,
                          'text-center': column.align === 'center',
                          'text-right': column.align === 'right',
                          'border-l border-r': bordered,
                        }
                      )}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  if (pagination) {
    const { current, pageSize, total, onChange } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    const startItem = (current - 1) * pageSize + 1;
    const endItem = Math.min(current * pageSize, total);

    return (
      <div className="space-y-4">
        {bordered ? (
          <div className="border rounded-lg overflow-hidden">
            {tableContent}
          </div>
        ) : (
          tableContent
        )}
        
        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {total} entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChange(current - 1)}
              disabled={current <= 1}
              className="px-3 py-1 text-sm border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (current <= 3) {
                pageNum = i + 1;
              } else if (current >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = current - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => onChange(pageNum)}
                  className={cn(
                    "px-3 py-1 text-sm border rounded transition-colors",
                    current === pageNum
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-muted"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => onChange(current + 1)}
              disabled={current >= totalPages}
              className="px-3 py-1 text-sm border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return bordered ? (
    <div className="border rounded-lg overflow-hidden">
      {tableContent}
    </div>
  ) : (
    tableContent
  );
};

Table.displayName = "Table";

export { Table };
