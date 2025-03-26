// Utility functions for the application

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
  
  export function truncateText(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }
  
  export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }