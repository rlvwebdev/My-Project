import React from 'react';
import { cn } from '@/utils';

export interface ListItem {
  id: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode[];
  extra?: React.ReactNode;
  disabled?: boolean;
}

export interface ListProps {
  items: ListItem[];
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  split?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  loadingRows?: number;
  emptyText?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  itemLayout?: 'horizontal' | 'vertical';
  onItemClick?: (item: ListItem, index: number) => void;
  className?: string;
  itemClassName?: string;
}

export interface ChecklistItem extends Omit<ListItem, 'actions'> {
  checked?: boolean;
  indeterminate?: boolean;
}

export interface ChecklistProps extends Omit<ListProps, 'items' | 'onItemClick'> {
  items: ChecklistItem[];
  onItemCheck?: (item: ChecklistItem, checked: boolean, index: number) => void;
  showSelectAll?: boolean;
  onSelectAll?: (checked: boolean) => void;
}

export interface OrderedListProps {
  items: Array<{ id: string | number; content: React.ReactNode }>;
  type?: 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman';
  className?: string;
  itemClassName?: string;
}

export interface UnorderedListProps {
  items: Array<{ id: string | number; content: React.ReactNode }>;
  bulletType?: 'disc' | 'circle' | 'square' | 'none';
  className?: string;
  itemClassName?: string;
}

const ListSkeleton: React.FC<{ rows: number; size: 'sm' | 'md' | 'lg' }> = ({ rows, size }) => {
  const sizeClasses = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
  };

  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center space-x-3 p-3 animate-pulse",
            sizeClasses[size]
          )}
        >
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="w-16 h-8 bg-gray-200 rounded" />
        </div>
      ))}
    </>
  );
};

const List: React.FC<ListProps> = ({
  items,
  size = 'md',
  bordered = false,
  split = true,
  hoverable = true,
  loading = false,
  loadingRows = 3,
  emptyText = 'No data',
  header,
  footer,
  itemLayout = 'horizontal',
  onItemClick,
  className,
  itemClassName,
}) => {
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base',
  };

  const renderListItem = (item: ListItem, index: number) => (
    <div
      key={item.id}
      className={cn(
        "flex transition-colors",
        sizeClasses[size],
        {
          'border-b border-gray-200 last:border-b-0': split,
          'cursor-pointer hover:bg-gray-50': hoverable && onItemClick && !item.disabled,
          'opacity-50 cursor-not-allowed': item.disabled,
          'items-start': itemLayout === 'vertical',
          'items-center': itemLayout === 'horizontal',
        },
        itemClassName
      )}
      onClick={() => !item.disabled && onItemClick?.(item, index)}
      role={onItemClick ? 'button' : 'listitem'}
      tabIndex={onItemClick && !item.disabled ? 0 : undefined}
    >
      {item.avatar && (
        <div className={cn("flex-shrink-0", itemLayout === 'horizontal' ? 'mr-3' : 'mr-3 mt-1')}>
          {item.avatar}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className={cn(
          "flex",
          itemLayout === 'horizontal' ? 'items-center justify-between' : 'flex-col space-y-1'
        )}>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {item.title}
            </div>
            {item.description && (
              <div className="text-gray-500 text-sm mt-1">
                {item.description}
              </div>
            )}
          </div>
          
          {item.extra && (
            <div className={cn(
              "flex-shrink-0",
              itemLayout === 'horizontal' ? 'ml-3' : 'mt-2'
            )}>
              {item.extra}
            </div>
          )}
        </div>
        
        {item.actions && item.actions.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {item.actions.map((action, actionIndex) => (
              <div key={actionIndex}>{action}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn(
      "bg-white",
      {
        'border border-gray-200 rounded-lg': bordered,
      },
      className
    )}>
      {header && (
        <div className="border-b border-gray-200 p-4 font-medium text-gray-900">
          {header}
        </div>
      )}
      
      <div>
        {loading ? (
          <ListSkeleton rows={loadingRows} size={size} />
        ) : items.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {emptyText}
          </div>
        ) : (
          items.map(renderListItem)
        )}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 p-4 text-sm text-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

const Checklist: React.FC<ChecklistProps> = ({
  items,
  size = 'md',
  bordered = false,
  split = true,
  hoverable = true,
  loading = false,
  loadingRows = 3,
  emptyText = 'No items',
  header,
  footer,
  itemLayout = 'horizontal',
  onItemCheck,
  showSelectAll = false,
  onSelectAll,
  className,
  itemClassName,
}) => {
  const checkedCount = items.filter(item => item.checked).length;
  const isAllChecked = checkedCount === items.length && items.length > 0;
  const isIndeterminate = checkedCount > 0 && checkedCount < items.length;

  const handleSelectAll = (checked: boolean) => {
    onSelectAll?.(checked);
  };

  const handleItemCheck = (item: ChecklistItem, index: number) => (checked: boolean) => {
    onItemCheck?.(item, checked, index);
  };

  const checklistItems: ListItem[] = items.map((item, index) => ({
    ...item,
    title: (
      <div className="flex items-center space-x-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={item.checked}
            ref={(input) => {
              if (input) {
                input.indeterminate = item.indeterminate || false;
              }
            }}
            onChange={(e) => handleItemCheck(item, index)(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            disabled={item.disabled}
          />
          <span className="sr-only">
            {item.checked ? 'Uncheck' : 'Check'} {typeof item.title === 'string' ? item.title : 'item'}
          </span>
        </label>
        <span className={cn(item.checked && "line-through text-gray-500")}>
          {item.title}
        </span>
      </div>
    ),
  }));

  return (
    <div className={cn(
      "bg-white",
      {
        'border border-gray-200 rounded-lg': bordered,
      },
      className
    )}>
      {(header || showSelectAll) && (
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium text-gray-900">
              {header}
            </div>
            {showSelectAll && (
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = isIndeterminate;
                    }
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600">
                  Select all ({checkedCount}/{items.length})
                </span>
              </label>
            )}
          </div>
        </div>
      )}
      
      <List
        items={checklistItems}
        size={size}
        bordered={false}
        split={split}
        hoverable={hoverable}
        loading={loading}
        loadingRows={loadingRows}
        emptyText={emptyText}
        footer={footer}
        itemLayout={itemLayout}
        itemClassName={itemClassName}
      />
    </div>
  );
};

const OrderedList: React.FC<OrderedListProps> = ({
  items,
  type = 'decimal',
  className,
  itemClassName,
}) => {
  const typeClasses = {
    decimal: 'list-decimal',
    'lower-alpha': 'list-[lower-alpha]',
    'upper-alpha': 'list-[upper-alpha]',
    'lower-roman': 'list-[lower-roman]',
    'upper-roman': 'list-[upper-roman]',
  };

  return (
    <ol className={cn("pl-6 space-y-2", typeClasses[type], className)}>
      {items.map((item) => (
        <li key={item.id} className={cn("text-sm", itemClassName)}>
          {item.content}
        </li>
      ))}
    </ol>
  );
};

const UnorderedList: React.FC<UnorderedListProps> = ({
  items,
  bulletType = 'disc',
  className,
  itemClassName,
}) => {
  const bulletClasses = {
    disc: 'list-disc',
    circle: 'list-[circle]',
    square: 'list-[square]',
    none: 'list-none',
  };

  return (
    <ul className={cn("pl-6 space-y-2", bulletClasses[bulletType], className)}>
      {items.map((item) => (
        <li key={item.id} className={cn("text-sm", itemClassName)}>
          {item.content}
        </li>
      ))}
    </ul>
  );
};

export { List, Checklist, OrderedList, UnorderedList };
