import useSettingsStore from '@/stores/settings-store';

export const formatDate = (dateString: string, language: string = 'en'): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', options);
};

export const formatCurrency = (amount: number): string => {
  const { currency, language } = useSettingsStore.getState();
  
  return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: currency.code,
    currencyDisplay: 'symbol',
  }).format(amount);
};

export const getCurrentMonth = (language: string = 'en'): string => {
  const date = new Date();
  return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
};

export const getMonthStartEnd = (): { start: string; end: string } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};

export const getDateRangeLabel = (startDate: string, endDate: string, language: string = 'en'): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';
  
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return start.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  }
  
  return `${start.toLocaleDateString(locale, { month: 'short' })} - ${end.toLocaleDateString(locale, { month: 'short', year: 'numeric' })}`;
};