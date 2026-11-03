import { format, formatRelative } from 'date-fns';

/**
 * Format an integer amount (rupees) as INR currency string.
 * e.g. formatINR(1499) → "₹1,499"
 */
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

/**
 * Returns current date, shifted by demo clock offset from `rt:demo-clock-offset`.
 */
export function getNow(): Date {
  let offsetDays = 0;
  try {
    const raw = localStorage.getItem('rt:demo-clock-offset');
    if (raw !== null) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed)) offsetDays = parsed;
    }
  } catch {
    // ignore
  }
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);
  return now;
}

/**
 * Format an ISO date string to a human-readable date.
 * e.g. "2024-03-15T10:00:00Z" → "Mar 15, 2024"
 */
export function formatDate(iso: string): string {
  return format(new Date(iso), 'MMM d, yyyy');
}

/**
 * Format an ISO date string relative to now (via getNow()).
 * e.g. "yesterday", "3 days ago"
 */
export function formatRelativeDate(iso: string): string {
  return formatRelative(new Date(iso), getNow());
}
