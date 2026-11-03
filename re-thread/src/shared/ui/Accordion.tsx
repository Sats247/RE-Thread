import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
  'data-testid'?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultValue,
  className,
  'data-testid': testId = 'accordion-group',
}) => {
  return (
    // @ts-expect-error Radix multiple/single conditional typing
    <AccordionPrimitive.Root
      type={type}
      defaultValue={defaultValue}
      collapsible={type === 'single'}
      className={cn('w-full border-t border-line', className)}
      data-testid={testId}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          data-testid={`${testId}-item-${item.id}`}
          className="border-b border-line"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              data-testid={`${testId}-trigger-${item.id}`}
              className={cn(
                'flex flex-1 items-center justify-between py-4 text-xs uppercase tracking-widest font-medium text-ink transition-all',
                'hover:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink [&[data-state=open]>svg]:rotate-180'
              )}
            >
              <span>{item.title}</span>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            data-testid={`${testId}-content-${item.id}`}
            className="overflow-hidden text-xs text-muted leading-relaxed pb-4 pt-1 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          >
            {item.content}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};

