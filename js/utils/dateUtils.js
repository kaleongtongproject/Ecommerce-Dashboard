// dateUtils.js

/**
 * Formats a date string (YYYY-MM-DD or ISO) to something readable.
 * Example: "Mar 31, 2025"
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Returns a new Date object X days ago from today.
 */
export function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

/**
 * Checks if a date string is within the last X days.
 */
export function isWithinLastXDays(dateStr, days) {
  const date = new Date(dateStr);
  const cutoff = daysAgo(days);
  return date >= cutoff;
}
