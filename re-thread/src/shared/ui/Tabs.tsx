import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/shared/lib/cn';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  items: TabItem[];
  className?: string;
  'data-testid'?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  items,
  className,
  'data-testid': testId = 'tabs-group',
}) => {
  const initialValue = defaultValue || items[0]?.value || '';

  return (
    <TabsPrimitive.Root
      defaultValue={initialValue}
      value={value}
      onValueChange={onValueChange}
      className={cn('w-full flex flex-col', className)}
      data-testid={testId}
    >
      <TabsPrimitive.List
        className="flex border-b border-line gap-6 overflow-x-auto no-scrollbar"
        aria-label="Tab navigation"
      >
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            data-testid={`${testId}-tab-${item.value}`}
            className={cn(
              'pb-3 pt-1 text-xs uppercase tracking-widest font-medium text-muted whitespace-nowrap transition-colors duration-150',
              'border-b-2 border-transparent -mb-[1px]',
              'hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink',
              'data-[state=active]:border-ink data-[state=active]:text-ink'
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          data-testid={`${testId}-content-${item.value}`}
          className="pt-6 focus-visible:outline-none"
        >
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
};

