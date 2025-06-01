import { useTranslation } from '@/localization/translations';
import useSettingsStore from '@/stores/settings-store';
import { useCallback } from 'react';

export default function useLocalization() {
  const { language, currency } = useSettingsStore();
  const { t } = useTranslation(language);
  
  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: currency.code,
      currencyDisplay: 'symbol',
    }).format(amount);
  }, [language, currency]);
  
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', options);
  }, [language]);
  
  const getDateRangeLabel = useCallback((startDate: string, endDate: string): string => {
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
  }, [language]);
  
  return {
    t,
    formatCurrency,
    formatDate,
    getDateRangeLabel,
    language,
    currency
  };
}