/**
 * Format a date string based on the current locale
 * @param dateString - Date string in YYYY-MM-DD format
 * @param locale - Current locale (en or ar)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  
  // Arabic dates should be formatted with Arabic numerals and month names
  if (locale === 'ar') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    return new Intl.DateTimeFormat('ar-EG', options).format(date);
  }
  
  // English dates
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};